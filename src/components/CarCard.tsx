import Link from 'next/link';
import { Car } from '@/types';
import { Users, Fuel, Settings, ArrowRight } from 'lucide-react';

interface CarCardProps {
    car: Car;
}

const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export default function CarCard({ car }: CarCardProps) {
    return (
        <div
            className="hover-lift group rounded-2xl overflow-hidden flex flex-col h-full"
            style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
            }}
        >
            {/* Image */}
            <div className="relative h-52 w-full overflow-hidden">
                <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(17,17,24,0.8) 0%, transparent 60%)' }}
                />
                {/* Year badge */}
                <div
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
                    style={{
                        background: 'rgba(17,17,24,0.7)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(240,237,232,0.8)',
                    }}
                >
                    {car.year}
                </div>
                {/* Premium badge */}
                {car.pricePerDay > 42000 && (
                    <div
                        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                        style={{ background: 'var(--primary-gradient)', color: '#0a0a0f' }}
                    >
                        Premium
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3
                            className="font-bold text-lg tracking-tight"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {car.make} {car.model}
                        </h3>
                        <p className="text-sm mt-0.5" style={{ color: 'rgba(240,237,232,0.45)' }}>
                            {car.features[0]}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="block font-bold text-xl" style={{ color: 'var(--primary)' }}>
                            {formatINR(car.pricePerDay)}
                        </span>
                        <span className="text-xs uppercase tracking-wider font-medium" style={{ color: 'rgba(240,237,232,0.35)' }}>
                            / day
                        </span>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-2 mb-5">
                    {[
                        { icon: Settings, label: car.transmission },
                        { icon: Fuel, label: car.fuelType },
                        { icon: Users, label: `${car.seats} Seats` },
                    ].map(({ icon: Icon, label }) => (
                        <div
                            key={label}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg flex-1 justify-center"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.06)',
                            }}
                        >
                            <Icon className="h-3.5 w-3.5" style={{ color: 'var(--primary)' }} />
                            <span className="text-xs font-medium" style={{ color: 'rgba(240,237,232,0.6)' }}>
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* CTAs */}
                <div
                    className="mt-auto flex gap-3 pt-4"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                    <Link href={`/cars/${car.id}`} className="flex-1">
                        <button
                            className="hover-ghost-amber w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: 'rgba(240,237,232,0.65)',
                            }}
                        >
                            Details <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </Link>
                    <Link href={`/booking?carId=${car.id}`} className="flex-1">
                        <button className="btn-amber w-full py-2.5 rounded-xl text-sm font-semibold">
                            Book Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
