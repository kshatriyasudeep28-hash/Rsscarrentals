'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { cars } from '@/data/cars';
import { Car } from '@/types';
import { Calendar, MapPin, User, Mail, Phone, CreditCard, ShieldCheck, AlertCircle } from 'lucide-react';

// Razorpay types
declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}
interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void;
    prefill?: { name?: string; email?: string; contact?: string };
    notes?: Record<string, string>;
    theme?: { color?: string };
    modal?: { ondismiss?: () => void };
}
interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}
interface RazorpayInstance {
    open: () => void;
}

const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const loadRazorpayScript = (): Promise<boolean> =>
    new Promise((resolve) => {
        if (document.getElementById('razorpay-script')) { resolve(true); return; }
        const script = document.createElement('script');
        script.id = 'razorpay-script';
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

type PaymentStatus = 'idle' | 'creating_order' | 'processing' | 'success' | 'failed';

export default function BookingForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const carId = searchParams.get('carId');
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
    const [paymentId, setPaymentId] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        pickupLocation: '',
        pickupDate: '',
        dropoffDate: '',
    });

    useEffect(() => {
        if (carId) {
            const car = cars.find((c) => c.id === carId);
            if (car) setSelectedCar(car);
        }
    }, [carId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const calculateDays = () => {
        if (!formData.pickupDate || !formData.dropoffDate) return 0;
        const start = new Date(formData.pickupDate);
        const end = new Date(formData.dropoffDate);
        const diff = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    };

    const calculateTotal = () => {
        if (!selectedCar) return 0;
        return calculateDays() * selectedCar.pricePerDay;
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCar || calculateTotal() === 0) return;

        setPaymentStatus('creating_order');

        // Step 1: Load Razorpay SDK
        const loaded = await loadRazorpayScript();
        if (!loaded) {
            setPaymentStatus('failed');
            return;
        }

        try {
            // Step 2: Create Razorpay order via API route
            const orderRes = await fetch('/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: calculateTotal(),
                    currency: 'INR',
                    receipt: `booking_${selectedCar.id}_${Date.now()}`,
                }),
            });

            if (!orderRes.ok) throw new Error('Failed to create order');
            const { orderId, amount } = await orderRes.json();

            setPaymentStatus('processing');

            // Step 3: Open Razorpay checkout
            const options: RazorpayOptions = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                amount,
                currency: 'INR',
                name: 'Carvelle Luxury',
                description: `${selectedCar.make} ${selectedCar.model} — ${calculateDays()} day${calculateDays() > 1 ? 's' : ''}`,
                image: selectedCar.image,
                order_id: orderId,
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone,
                },
                notes: {
                    carId: selectedCar.id,
                    pickupLocation: formData.pickupLocation,
                    pickupDate: formData.pickupDate,
                    dropoffDate: formData.dropoffDate,
                },
                theme: { color: '#c9a96e' },
                handler: async (response: RazorpayResponse) => {
                    // Step 4: Verify on server
                    try {
                        const verifyRes = await fetch('/api/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(response),
                        });
                        const result = await verifyRes.json();
                        if (result.success) {
                            setPaymentId(result.paymentId);
                            setPaymentStatus('success');
                        } else {
                            setPaymentStatus('failed');
                        }
                    } catch {
                        setPaymentStatus('failed');
                    }
                },
                modal: {
                    ondismiss: () => {
                        if (paymentStatus === 'processing') setPaymentStatus('idle');
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error(err);
            setPaymentStatus('failed');
        }
    };

    // ─── Success Screen ───────────────────────────────────────────────────────
    if (paymentStatus === 'success') {
        return (
            <div
                className="rounded-2xl p-10 text-center space-y-6"
                style={{ background: 'var(--surface)', border: '1px solid rgba(201,169,110,0.25)' }}
            >
                <div
                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                    style={{ background: 'rgba(201,169,110,0.12)', border: '2px solid rgba(201,169,110,0.4)' }}
                >
                    <ShieldCheck className="w-10 h-10" style={{ color: '#c9a96e' }} />
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold text-white mb-2">Booking Confirmed!</h2>
                    <p style={{ color: 'rgba(240,237,232,0.6)' }}>
                        Your {selectedCar?.make} {selectedCar?.model} is reserved.
                    </p>
                </div>
                <div
                    className="rounded-xl p-4 text-left space-y-2"
                    style={{ background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.15)' }}
                >
                    <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: '#c9a96e' }}>Payment Details</p>
                    <div className="flex justify-between text-sm">
                        <span style={{ color: 'rgba(240,237,232,0.55)' }}>Payment ID</span>
                        <span className="font-mono text-white text-xs">{paymentId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span style={{ color: 'rgba(240,237,232,0.55)' }}>Amount Paid</span>
                        <span className="font-bold" style={{ color: '#c9a96e' }}>{formatINR(calculateTotal())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span style={{ color: 'rgba(240,237,232,0.55)' }}>Duration</span>
                        <span className="text-white">{calculateDays()} day{calculateDays() > 1 ? 's' : ''}</span>
                    </div>
                </div>
                <button
                    onClick={() => router.push('/')}
                    className="btn-amber w-full py-3.5 rounded-xl font-semibold amber-glow"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    const inputStyle = {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'var(--foreground)',
    };
    const focusHandlers = {
        onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.07)';
        },
        onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.boxShadow = 'none';
        },
    };
    const labelStyle = { color: 'rgba(240,237,232,0.5)' };

    return (
        <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
            {/* Header */}
            <div className="px-8 pt-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 className="text-2xl font-extrabold text-white mb-1">Reserve Your Vehicle</h2>
                <p style={{ color: 'rgba(240,237,232,0.45)', fontSize: '0.875rem' }}>
                    Complete the details below to confirm your luxury booking.
                </p>
            </div>

            <div className="p-8">
                {/* Selected Car Preview */}
                {selectedCar && (
                    <div
                        className="mb-8 rounded-xl overflow-hidden flex items-center gap-4 p-4"
                        style={{ background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.2)' }}
                    >
                        <img
                            src={selectedCar.image}
                            alt={selectedCar.model}
                            className="w-24 h-16 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white truncate">
                                {selectedCar.make} {selectedCar.model}
                            </h3>
                            <p className="text-sm" style={{ color: 'rgba(240,237,232,0.5)' }}>
                                {selectedCar.year} · {selectedCar.transmission} · {selectedCar.fuelType}
                            </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                            <div className="text-lg font-bold" style={{ color: '#c9a96e' }}>
                                {formatINR(selectedCar.pricePerDay)}
                            </div>
                            <div className="text-xs" style={{ color: 'rgba(240,237,232,0.4)' }}>/day</div>
                        </div>
                    </div>
                )}

                {/* Failed Banner */}
                {paymentStatus === 'failed' && (
                    <div
                        className="mb-6 rounded-xl p-4 flex items-center gap-3"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#f87171' }} />
                        <p className="text-sm" style={{ color: '#f87171' }}>
                            Payment failed or was cancelled. Please try again.
                        </p>
                    </div>
                )}

                <form onSubmit={handlePayment} className="space-y-5">
                    {/* Name Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { id: 'firstName', label: 'First Name', placeholder: 'Arjun', icon: User },
                            { id: 'lastName', label: 'Last Name', placeholder: 'Sharma', icon: User },
                        ].map(({ id, label, placeholder, icon: Icon }) => (
                            <div key={id} className="space-y-1.5">
                                <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>
                                    {label}
                                </label>
                                <div className="relative">
                                    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(240,237,232,0.3)' }} />
                                    <input
                                        required
                                        type="text"
                                        id={id}
                                        name={id}
                                        value={formData[id as keyof typeof formData]}
                                        onChange={handleChange}
                                        placeholder={placeholder}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                                        style={inputStyle}
                                        {...focusHandlers}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(240,237,232,0.3)' }} />
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="arjun@example.com"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                                    style={inputStyle}
                                    {...focusHandlers}
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(240,237,232,0.3)' }} />
                                <input
                                    required
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                                    style={inputStyle}
                                    {...focusHandlers}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pick-up Location */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>Pick-up Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(240,237,232,0.3)' }} />
                            <select
                                required
                                id="pickupLocation"
                                name="pickupLocation"
                                value={formData.pickupLocation}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 appearance-none"
                                style={inputStyle}
                                {...focusHandlers}
                            >
                                <option value="">Select a location</option>
                                <option value="BOM">Chhatrapati Shivaji Maharaj Int. Airport (BOM)</option>
                                <option value="BCT">Mumbai Central Railway Station</option>
                                <option value="BKC">Bandra Kurla Complex (BKC)</option>
                                <option value="NP">Nariman Point</option>
                                <option value="JUHU">Juhu Beach Area</option>
                                <option value="VASHI">Navi Mumbai (Vashi)</option>
                            </select>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { id: 'pickupDate', label: 'Pick-up Date' },
                            { id: 'dropoffDate', label: 'Drop-off Date' },
                        ].map(({ id, label }) => (
                            <div key={id} className="space-y-1.5">
                                <label className="block text-xs font-semibold uppercase tracking-wider" style={labelStyle}>{label}</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(240,237,232,0.3)' }} />
                                    <input
                                        required
                                        type="date"
                                        id={id}
                                        name={id}
                                        value={formData[id as keyof typeof formData]}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                                        style={{ ...inputStyle, colorScheme: 'dark' }}
                                        {...focusHandlers}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Price Summary */}
                    {calculateTotal() > 0 && (
                        <div
                            className="rounded-xl p-5 space-y-3"
                            style={{ background: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.18)' }}
                        >
                            <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: '#c9a96e' }}>Price Summary</p>
                            <div className="flex justify-between text-sm">
                                <span style={{ color: 'rgba(240,237,232,0.55)' }}>{formatINR(selectedCar!.pricePerDay)} × {calculateDays()} day{calculateDays() > 1 ? 's' : ''}</span>
                                <span className="text-white">{formatINR(calculateTotal())}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span style={{ color: 'rgba(240,237,232,0.55)' }}>GST (18%)</span>
                                <span className="text-white">{formatINR(Math.round(calculateTotal() * 0.18))}</span>
                            </div>
                            <div
                                className="flex justify-between pt-3 font-bold"
                                style={{ borderTop: '1px solid rgba(201,169,110,0.15)' }}
                            >
                                <span className="text-white">Total Payable</span>
                                <span style={{ color: '#c9a96e', fontSize: '1.1rem' }}>
                                    {formatINR(Math.round(calculateTotal() * 1.18))}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Pay Button */}
                    <button
                        type="submit"
                        disabled={paymentStatus === 'creating_order' || paymentStatus === 'processing' || calculateTotal() === 0}
                        className="btn-amber w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2.5 amber-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {paymentStatus === 'creating_order' || paymentStatus === 'processing' ? (
                            <>
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                {paymentStatus === 'creating_order' ? 'Preparing Payment...' : 'Opening Checkout...'}
                            </>
                        ) : (
                            <>
                                <CreditCard className="w-5 h-5" />
                                Pay {calculateTotal() > 0 ? formatINR(Math.round(calculateTotal() * 1.18)) : ''} with Razorpay
                            </>
                        )}
                    </button>

                    {/* Trust badges */}
                    <div className="flex items-center justify-center gap-6 pt-1">
                        {['UPI', 'Cards', 'Net Banking', 'Wallets'].map((method) => (
                            <span
                                key={method}
                                className="text-xs font-medium"
                                style={{ color: 'rgba(240,237,232,0.3)' }}
                            >
                                {method}
                            </span>
                        ))}
                    </div>
                    <p className="text-center text-xs" style={{ color: 'rgba(240,237,232,0.25)' }}>
                        🔒 Secured by Razorpay · PCI DSS Compliant
                    </p>
                </form>
            </div>
        </div>
    );
}
