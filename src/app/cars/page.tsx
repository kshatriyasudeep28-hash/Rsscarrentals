'use client';

import { useState, useMemo } from 'react';
import CarCard from '@/components/CarCard';
import { cars } from '@/data/cars';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';

const FUEL_OPTIONS = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid'];
const TRANSMISSION_OPTIONS = ['All', 'Automatic', 'Manual'];
const SEAT_OPTIONS = ['All', '2', '4', '5'];
const SORT_OPTIONS = [
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Newest First', value: 'year_desc' },
];

export default function CarsPage() {
    const [search, setSearch] = useState('');
    const [fuel, setFuel] = useState('All');
    const [transmission, setTransmission] = useState('All');
    const [seats, setSeats] = useState('All');
    const [sort, setSort] = useState('price_asc');
    const [showFilters, setShowFilters] = useState(false);

    const filtered = useMemo(() => {
        let result = cars.filter((car) => {
            const q = search.toLowerCase();
            const matchSearch =
                !q ||
                car.make.toLowerCase().includes(q) ||
                car.model.toLowerCase().includes(q) ||
                car.fuelType.toLowerCase().includes(q);
            const matchFuel = fuel === 'All' || car.fuelType === fuel;
            const matchTrans = transmission === 'All' || car.transmission === transmission;
            const matchSeats = seats === 'All' || car.seats.toString() === seats;
            return matchSearch && matchFuel && matchTrans && matchSeats;
        });

        if (sort === 'price_asc') result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        else if (sort === 'price_desc') result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        else if (sort === 'year_desc') result.sort((a, b) => b.year - a.year);

        return result;
    }, [search, fuel, transmission, seats, sort]);

    const hasFilters = fuel !== 'All' || transmission !== 'All' || seats !== 'All' || search;

    const clearFilters = () => {
        setSearch('');
        setFuel('All');
        setTransmission('All');
        setSeats('All');
    };

    const chipStyle = (active: boolean) => ({
        background: active ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.04)',
        border: active ? 'none' : '1px solid rgba(255,255,255,0.08)',
        color: active ? '#0a0a0f' : 'rgba(240,237,232,0.65)',
        cursor: 'pointer',
        padding: '6px 16px',
        borderRadius: '9999px',
        fontSize: '0.8rem',
        fontWeight: active ? 700 : 500,
        transition: 'all 0.2s',
        whiteSpace: 'nowrap' as const,
    });

    return (
        <div className="min-h-screen" style={{ background: 'var(--background)' }}>
            {/* Hero Banner */}
            <div
                className="pt-32 pb-16 px-4 text-center relative overflow-hidden"
                style={{ background: 'linear-gradient(to bottom, rgba(201,169,110,0.06) 0%, transparent 100%)' }}
            >
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.12) 0%, transparent 65%)' }}
                />
                <p className="section-label mb-3">Our Fleet</p>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                    Extraordinary Vehicles
                </h1>
                <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(240,237,232,0.5)' }}>
                    Every car is verified, insured, and ready to deliver an unforgettable experience.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                {/* Search + Sort Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                            style={{ color: 'rgba(240,237,232,0.35)' }}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by make, model, or fuel type…"
                            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: 'var(--foreground)',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)';
                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.08)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div className="flex gap-3">
                        {/* Sort select */}
                        <div className="relative">
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="pl-4 pr-9 py-3 rounded-xl text-sm outline-none appearance-none transition-all cursor-pointer"
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: 'rgba(240,237,232,0.7)',
                                }}
                            >
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value} style={{ background: '#111118' }}>
                                        {o.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
                                style={{ color: 'rgba(240,237,232,0.4)' }}
                            />
                        </div>

                        {/* Filter toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                            style={{
                                background: showFilters ? 'rgba(201,169,110,0.12)' : 'rgba(255,255,255,0.04)',
                                border: `1px solid ${showFilters ? 'rgba(201,169,110,0.4)' : 'rgba(255,255,255,0.08)'}`,
                                color: showFilters ? 'var(--primary)' : 'rgba(240,237,232,0.65)',
                            }}
                        >
                            <SlidersHorizontal className="w-4 h-4" /> Filters
                        </button>
                    </div>
                </div>

                {/* Filter chips panel */}
                {showFilters && (
                    <div
                        className="rounded-2xl p-6 mb-6 space-y-5"
                        style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        {/* Fuel */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'rgba(240,237,232,0.4)' }}>
                                Fuel Type
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {FUEL_OPTIONS.map((f) => (
                                    <button key={f} style={chipStyle(fuel === f)} onClick={() => setFuel(f)}>
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Transmission */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'rgba(240,237,232,0.4)' }}>
                                Transmission
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {TRANSMISSION_OPTIONS.map((t) => (
                                    <button key={t} style={chipStyle(transmission === t)} onClick={() => setTransmission(t)}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Seats */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'rgba(240,237,232,0.4)' }}>
                                Seats
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {SEAT_OPTIONS.map((s) => (
                                    <button key={s} style={chipStyle(seats === s)} onClick={() => setSeats(s)}>
                                        {s === 'All' ? 'All' : `${s} Seats`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Active filters banner */}
                {hasFilters && (
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-sm" style={{ color: 'rgba(240,237,232,0.5)' }}>
                            Showing <span className="text-white font-semibold">{filtered.length}</span> of {cars.length} vehicles
                        </p>
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
                            style={{ color: 'var(--primary)' }}
                        >
                            <X className="w-3.5 h-3.5" /> Clear all
                        </button>
                    </div>
                )}

                {/* Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((car) => (
                            <CarCard key={car.id} car={car} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <p className="text-5xl mb-4">🚗</p>
                        <h3 className="text-2xl font-bold text-white mb-2">No vehicles found</h3>
                        <p className="mb-6" style={{ color: 'rgba(240,237,232,0.45)' }}>
                            Try adjusting your filters or search term.
                        </p>
                        <button onClick={clearFilters} className="btn-amber px-8 py-3 rounded-full text-sm font-semibold">
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
