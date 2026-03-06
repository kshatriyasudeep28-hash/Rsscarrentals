'use client';

import Link from 'next/link';
import { Gem, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    if (pathname?.startsWith('/admin')) return null;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-2xl'
                : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: 'var(--primary-gradient)' }}>
                            <Gem className="h-5 w-5" style={{ color: '#0a0a0f' }} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">
                            Car<span style={{ color: 'var(--primary)' }}>velle</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { label: 'Home', href: '/' },
                            { label: 'Fleet', href: '/cars' },
                            { label: 'About', href: '/about' },
                            { label: 'Contact', href: '/contact' },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-sm font-medium transition-colors duration-300 group"
                                style={{ color: 'rgba(240,237,232,0.65)' }}
                            >
                                <span className="group-hover:text-white transition-colors duration-300">
                                    {link.label}
                                </span>
                                <span
                                    className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                                    style={{ background: 'var(--primary)' }}
                                />
                            </Link>
                        ))}

                        <Link
                            href="/login"
                            className="text-sm font-medium transition-colors duration-300"
                            style={{ color: 'rgba(240,237,232,0.65)' }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.65)')}
                        >
                            Sign In
                        </Link>

                        <Link href="/booking">
                            <button
                                className="btn-amber px-6 py-2.5 rounded-full text-sm font-semibold amber-glow-sm"
                            >
                                Book Now
                            </button>
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg transition-colors"
                        style={{ color: 'var(--foreground)', background: 'rgba(255,255,255,0.05)' }}
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden glass-card border-t border-white/5 p-6 space-y-5">
                    {[
                        { label: 'Home', href: '/' },
                        { label: 'Fleet', href: '/cars' },
                        { label: 'About', href: '/about' },
                        { label: 'Contact', href: '/contact' },
                        { label: 'Sign In', href: '/login' },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block text-sm font-medium transition-colors"
                            style={{ color: 'rgba(240,237,232,0.7)' }}
                            onClick={() => setIsOpen(false)}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a96e')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,237,232,0.7)')}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/booking" onClick={() => setIsOpen(false)}>
                        <button className="btn-amber w-full py-3 rounded-full text-sm font-semibold mt-2">
                            Book Now
                        </button>
                    </Link>
                </div>
            )}
        </nav>
    );
}
