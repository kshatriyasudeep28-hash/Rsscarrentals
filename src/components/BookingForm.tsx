'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { cars } from '@/data/cars';
import { Car } from '@/types';
import { Calendar, MapPin, User, Mail, Phone, ShieldCheck, AlertCircle } from 'lucide-react';

const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export default function BookingForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const carId = searchParams.get('carId');
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCar || calculateTotal() === 0) return;
        setLoading(true);
        setError('');
        try {
            // Simulate a short processing delay
            await new Promise((res) => setTimeout(res, 1000));
            setSubmitted(true);
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // ─── Success Screen ────────────────────────────────────────────────────────
    if (submitted) {
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
                        Your {selectedCar?.make} {selectedCar?.model} is reserved. We&apos;ll contact you at{' '}
                        <span className="text-white font-medium">{formData.email}</span> to confirm details.
                    </p>
                </div>
                <div
                    className="rounded-xl p-4 text-left space-y-2"
                    style={{ background: 'rgba(201,169,110,0.06)', border: '1px solid rgba(201,169,110,0.15)' }}
                >
                    <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: '#c9a96e' }}>Booking Summary</p>
                    <div className="flex justify-between text-sm">
                        <span style={{ color: 'rgba(240,237,232,0.55)' }}>Duration</span>
                        <span className="text-white">{calculateDays()} day{calculateDays() > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span style={{ color: 'rgba(240,237,232,0.55)' }}>Total (incl. GST)</span>
                        <span className="font-bold" style={{ color: '#c9a96e' }}>{formatINR(Math.round(calculateTotal() * 1.18))}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span style={{ color: 'rgba(240,237,232,0.55)' }}>Pick-up</span>
                        <span className="text-white">{formData.pickupDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span style={{ color: 'rgba(240,237,232,0.55)' }}>Drop-off</span>
                        <span className="text-white">{formData.dropoffDate}</span>
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

                {/* Error Banner */}
                {error && (
                    <div
                        className="mb-6 rounded-xl p-4 flex items-center gap-3"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#f87171' }} />
                        <p className="text-sm" style={{ color: '#f87171' }}>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
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

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || calculateTotal() === 0}
                        className="btn-amber w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2.5 amber-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Confirming Booking...
                            </>
                        ) : (
                            <>
                                <ShieldCheck className="w-5 h-5" />
                                Confirm Booking {calculateTotal() > 0 ? `· ${formatINR(Math.round(calculateTotal() * 1.18))}` : ''}
                            </>
                        )}
                    </button>

                    <p className="text-center text-xs" style={{ color: 'rgba(240,237,232,0.25)' }}>
                        🔒 Your details are safe and secure
                    </p>
                </form>
            </div>
        </div>
    );
}
