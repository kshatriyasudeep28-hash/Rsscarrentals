'use client';

import Link from 'next/link';
import { Gem, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith('/admin')) return null;

    return (
        <footer
            style={{
                background: '#060609',
                borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
        >
            {/* Top amber gradient line */}
            <div
                className="h-px w-full"
                style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.4), transparent)' }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-5">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{ background: 'var(--primary-gradient)' }}
                            >
                                <Gem className="h-5 w-5" style={{ color: '#0a0a0f' }} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                Car<span style={{ color: 'var(--primary)' }}>velle</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,237,232,0.45)', maxWidth: '220px' }}>
                            Connecting verified car owners with drivers seeking high-end vehicle experiences worldwide.
                        </p>
                        {/* Social icons */}
                        <div className="flex gap-3">
                            {([Facebook, Twitter, Instagram] as const).map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="hover-social w-9 h-9 rounded-full flex items-center justify-center"
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        color: 'rgba(240,237,232,0.5)',
                                    }}
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="section-label mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'Our Fleet', href: '/cars' },
                                { label: 'About Us', href: '/about' },
                                { label: 'How It Works', href: '/#how-it-works' },
                                { label: 'Book a Car', href: '/booking' },
                                { label: 'Terms of Service', href: '/terms' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="hover-amber text-sm"
                                        style={{ color: 'rgba(240,237,232,0.45)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Fleet Categories */}
                    <div>
                        <h3 className="section-label mb-6">Fleet Categories</h3>
                        <ul className="space-y-3">
                            {['Sports Cars', 'Luxury Sedans', 'SUVs & 4x4', 'Electric Vehicles', 'Classic Cars'].map((cat) => (
                                <li key={cat}>
                                    <Link
                                        href="/cars"
                                        className="hover-amber text-sm"
                                        style={{ color: 'rgba(240,237,232,0.45)' }}
                                    >
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="section-label mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                                <span className="text-sm" style={{ color: 'rgba(240,237,232,0.45)' }}>
                                    123 Colaba Causeway,<br />Mumbai, Maharashtra 400001
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                                <span className="text-sm" style={{ color: 'rgba(240,237,232,0.45)' }}>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                                <span className="text-sm" style={{ color: 'rgba(240,237,232,0.45)' }}>hello@carvelle.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div
                    className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                    <p className="text-xs" style={{ color: 'rgba(240,237,232,0.3)' }}>
                        © {new Date().getFullYear()} Carvelle. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {['Privacy Policy', 'Cookie Policy', 'Terms'].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="hover-amber text-xs"
                                style={{ color: 'rgba(240,237,232,0.3)' }}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
