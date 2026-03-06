'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Calendar, Search, Shield, Star, Car } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
    const [location, setLocation] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    return (
        <div className="relative min-h-screen flex flex-col overflow-hidden" style={{ paddingTop: '80px' }}>

            {/* Background image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: 'linear-gradient(to right, rgba(10,10,15,0.92) 40%, rgba(10,10,15,0.55) 70%, rgba(10,10,15,0.2) 100%)'
                    }}
                />
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: 'linear-gradient(to top, rgba(10,10,15,1) 0%, transparent 50%)'
                    }}
                />
                <img
                    src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury Car"
                    className="w-full h-full object-cover animate-zoom"
                    style={{ objectPosition: 'center 35%' }}
                />
            </div>

            {/* Ambient glow */}
            <div
                className="absolute z-10 pointer-events-none"
                style={{
                    top: '20%',
                    left: '5%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(201,169,110,0.07) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />

            {/* Hero Content */}
            <div className="relative z-20 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="max-w-2xl space-y-6">

                    {/* Label */}
                    <div className="animate-in flex items-center gap-2">
                        <span
                            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
                            style={{ color: 'var(--primary)', background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.25)' }}
                        >
                            <Shield className="w-3 h-3" />
                            Verified Luxury Fleet
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="animate-in delay-100 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
                        Drive the<br />
                        <span style={{ color: 'var(--primary)' }}>Extraordinary.</span>
                    </h1>

                    {/* Subtext */}
                    <p
                        className="animate-in delay-200 text-lg md:text-xl leading-relaxed max-w-lg"
                        style={{ color: 'rgba(240,237,232,0.65)' }}
                    >
                        Connect with verified owners of the world's finest vehicles. From supercars to classic icons — your dream drive awaits.
                    </p>

                    {/* CTA Buttons */}
                    <div className="animate-in delay-300 flex flex-col sm:flex-row gap-4 pt-2">
                        <Link href="/cars">
                            <button
                                className="btn-amber flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold amber-glow"
                            >
                                Browse Fleet <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                        <Link href="/about">
                            <button
                                className="px-8 py-4 rounded-full text-base font-semibold border transition-all duration-300 hover:bg-white/5"
                                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(240,237,232,0.8)' }}
                            >
                                How It Works
                            </button>
                        </Link>
                    </div>

                    {/* Trust stats */}
                    <div className="animate-in delay-400 flex items-center gap-6 pt-4">
                        {[
                            { icon: Car, value: '200+', label: 'Luxury Cars' },
                            { icon: Star, value: '4.9★', label: 'Avg Rating' },
                            { icon: MapPin, value: '50+', label: 'Cities' },
                        ].map(({ icon: Icon, value, label }) => (
                            <div key={label} className="flex items-center gap-2">
                                <Icon className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                                <div>
                                    <div className="text-sm font-bold text-white">{value}</div>
                                    <div className="text-xs" style={{ color: 'rgba(240,237,232,0.5)' }}>{label}</div>
                                </div>
                                {label !== 'Cities' && (
                                    <div className="w-px h-6 ml-4" style={{ background: 'rgba(255,255,255,0.1)' }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Glassmorphic Search Bar */}
            <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto">
                <div
                    className="rounded-2xl p-6 md:p-8 animate-in delay-500"
                    style={{
                        background: 'rgba(17,17,24,0.75)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                    }}
                >
                    <p className="section-label mb-5">Quick Search</p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        {/* Location */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'rgba(240,237,232,0.55)' }}>
                                <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                                Pick-up Location
                            </label>
                            <input
                                type="text"
                                placeholder="City or Airport"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: 'var(--foreground)',
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.08)'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                            />
                        </div>

                        {/* Pick-up Date */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'rgba(240,237,232,0.55)' }}>
                                <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                                Pick-up Date
                            </label>
                            <input
                                type="date"
                                value={pickupDate}
                                onChange={(e) => setPickupDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: pickupDate ? 'var(--foreground)' : 'rgba(240,237,232,0.4)',
                                    colorScheme: 'dark',
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.08)'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                            />
                        </div>

                        {/* Return Date */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5 text-xs font-medium" style={{ color: 'rgba(240,237,232,0.55)' }}>
                                <Calendar className="w-3.5 h-3.5" style={{ color: 'var(--primary)' }} />
                                Return Date
                            </label>
                            <input
                                type="date"
                                value={returnDate}
                                onChange={(e) => setReturnDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    color: returnDate ? 'var(--foreground)' : 'rgba(240,237,232,0.4)',
                                    colorScheme: 'dark',
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.08)'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                            />
                        </div>

                        {/* Search Button */}
                        <Link href="/cars" className="w-full">
                            <button
                                className="btn-amber w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 amber-glow"
                            >
                                <Search className="w-4 h-4" />
                                Find My Car
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="hidden md:block absolute bottom-[220px] right-8 z-20">
                <div
                    className="w-7 h-12 rounded-full border flex justify-center pt-2"
                    style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                >
                    <div
                        className="w-1 h-2.5 rounded-full animate-float"
                        style={{ background: 'var(--primary)' }}
                    />
                </div>
            </div>
        </div>
    );
}
