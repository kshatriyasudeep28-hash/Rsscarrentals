import Link from 'next/link';
import { cars } from '@/data/cars';
import { ArrowLeft, Check, Fuel, Settings, Users, Star, ShieldCheck, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';

interface CarDetailsPageProps {
    params: Promise<{ id: string }>;
}

const formatINR = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

export async function generateMetadata({ params }: CarDetailsPageProps) {
    const { id } = await params;
    const car = cars.find((c) => c.id === id);
    if (!car) return { title: 'Car Not Found' };
    return {
        title: `${car.make} ${car.model} | Carvelle Luxury`,
        description: `Rent a ${car.make} ${car.model} starting at ${formatINR(car.pricePerDay)} per day.`,
    };
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
    const { id } = await params;
    const car = cars.find((c) => c.id === id);
    if (!car) notFound();

    const relatedCars = cars.filter((c) => c.id !== car.id).slice(0, 3);

    return (
        <div className="min-h-screen pt-24 pb-20" style={{ background: 'var(--background)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    href="/cars"
                    className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors group"
                    style={{ color: 'rgba(240,237,232,0.5)' }}
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to Fleet
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                    {/* LEFT — Image */}
                    <div className="space-y-4">
                        <div className="relative aspect-video rounded-2xl overflow-hidden"
                            style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                            <img
                                src={car.image}
                                alt={`${car.make} ${car.model}`}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient overlay */}
                            <div
                                className="absolute inset-0"
                                style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.6) 0%, transparent 60%)' }}
                            />
                            {/* Year chip */}
                            <div
                                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
                                style={{
                                    background: 'rgba(10,10,15,0.7)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    color: 'rgba(240,237,232,0.85)',
                                }}
                            >
                                {car.year}
                            </div>
                            {/* Premium badge */}
                            {car.pricePerDay > 42000 && (
                                <div
                                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                                    style={{ background: 'var(--primary-gradient)', color: '#0a0a0f' }}
                                >
                                    Premium
                                </div>
                            )}
                        </div>

                        {/* Thumbnail row — duplicate image tinted */}
                        <div className="grid grid-cols-3 gap-3">
                            {[0.8, 0.5, 0.3].map((op, i) => (
                                <div
                                    key={i}
                                    className="aspect-video rounded-xl overflow-hidden relative cursor-pointer group"
                                    style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                                >
                                    <img
                                        src={car.image}
                                        alt={`${car.make} view ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        style={{ opacity: op }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Trust badges */}
                        <div
                            className="grid grid-cols-3 gap-3 mt-2"
                        >
                            {[
                                { icon: ShieldCheck, label: 'Fully Insured' },
                                { icon: Star, label: '4.9 Rated' },
                                { icon: Calendar, label: 'Free Cancel' },
                            ].map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex flex-col items-center gap-2 py-4 rounded-xl text-center"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                    }}
                                >
                                    <Icon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    <span className="text-xs font-medium" style={{ color: 'rgba(240,237,232,0.6)' }}>
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — Details */}
                    <div className="space-y-8">
                        {/* Title & price */}
                        <div>
                            <p className="section-label mb-2">Available Now</p>
                            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-1">
                                {car.make} {car.model}
                            </h1>
                            <p className="text-sm" style={{ color: 'rgba(240,237,232,0.45)' }}>
                                {car.year} · {car.fuelType} · {car.transmission}
                            </p>

                            <div className="flex items-baseline gap-2 mt-6 pb-6"
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                <span className="text-5xl font-extrabold" style={{ color: 'var(--primary)' }}>
                                    {formatINR(car.pricePerDay)}
                                </span>
                                <span className="text-base" style={{ color: 'rgba(240,237,232,0.4)' }}>
                                    / day
                                </span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { icon: Settings, label: 'Transmission', value: car.transmission },
                                { icon: Users, label: 'Capacity', value: `${car.seats} Seats` },
                                { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
                            ].map(({ icon: Icon, label, value }) => (
                                <div
                                    key={label}
                                    className="p-4 rounded-2xl text-center"
                                    style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.07)',
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                                        style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)' }}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <div className="text-sm font-bold text-white mb-0.5">{value}</div>
                                    <div className="text-xs" style={{ color: 'rgba(240,237,232,0.4)' }}>{label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {car.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl"
                                        style={{
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.06)',
                                        }}
                                    >
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{ background: 'rgba(201,169,110,0.15)' }}
                                        >
                                            <Check className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                                        </div>
                                        <span className="text-sm" style={{ color: 'rgba(240,237,232,0.7)' }}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA */}
                        <div className="pt-2 space-y-3">
                            <Link href={`/booking?carId=${car.id}`} className="block">
                                <button className="btn-amber w-full py-4 rounded-2xl text-base font-semibold amber-glow">
                                    Book This Car — {formatINR(car.pricePerDay)}/day
                                </button>
                            </Link>
                            <p className="text-center text-xs" style={{ color: 'rgba(240,237,232,0.35)' }}>
                                ✓ Free cancellation up to 48 hours before pick-up &nbsp;·&nbsp; ✓ Instant confirmation
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Cars */}
                <div className="mt-24">
                    <div className="mb-10">
                        <p className="section-label mb-2">Explore More</p>
                        <h2 className="text-3xl font-extrabold text-white">Similar Vehicles</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedCars.map((rc) => (
                            <Link key={rc.id} href={`/cars/${rc.id}`}>
                                <div
                                    className="group rounded-2xl overflow-hidden hover-lift"
                                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                                >
                                    <div className="relative h-44 overflow-hidden">
                                        <img
                                            src={rc.image}
                                            alt={`${rc.make} ${rc.model}`}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-white">{rc.make} {rc.model}</h4>
                                        <p className="text-sm mt-1" style={{ color: 'var(--primary)' }}>
                                            {formatINR(rc.pricePerDay)}<span style={{ color: 'rgba(240,237,232,0.4)' }}>/day</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
