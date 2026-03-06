import Link from 'next/link';
import { ArrowRight, Gem, Users, Award, Globe, ShieldCheck, Star, Car } from 'lucide-react';

export const metadata = {
    title: 'About Us | Carvelle Luxury',
    description: 'Learn about Carvelle — India\'s premier luxury car rental experience.',
};

const VALUES = [
    {
        icon: ShieldCheck,
        title: 'Fully Insured',
        desc: 'Every vehicle in our fleet is comprehensively insured and roadworthy-certified.',
    },
    {
        icon: Star,
        title: 'Curated Fleet',
        desc: 'We hand-pick only the finest machines — no compromises on quality or prestige.',
    },
    {
        icon: Users,
        title: 'Concierge Support',
        desc: 'Our 24/7 team is always on standby to assist you before, during, and after your rental.',
    },
    {
        icon: Globe,
        title: 'Nationwide Access',
        desc: 'Pick up and drop off across major cities, airports, and luxury hotels.',
    },
];

const TEAM = [
    {
        name: 'Arjun Mehra',
        role: 'Founder & CEO',
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    },
    {
        name: 'Priya Kapoor',
        role: 'Head of Fleet Operations',
        img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    },
    {
        name: 'Rahul Sharma',
        role: 'Chief Experience Officer',
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    },
];

const STATS = [
    { icon: Car, value: '200+', label: 'Luxury Vehicles' },
    { icon: Users, value: '12,000+', label: 'Happy Customers' },
    { icon: Award, value: '4.9 ★', label: 'Average Rating' },
    { icon: Globe, value: '25+', label: 'Cities Covered' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen" style={{ background: 'var(--background)' }}>
            {/* Hero */}
            <section className="relative pt-36 pb-24 overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.12) 0%, transparent 65%)' }}
                />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                        style={{ background: 'var(--primary-gradient)', color: '#0a0a0f' }}
                    >
                        <Gem className="w-4 h-4" /> Our Story
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        Redefining Luxury<br />
                        <span style={{ color: 'var(--primary)' }}>Car Rental.</span>
                    </h1>
                    <p className="text-xl max-w-2xl mx-auto" style={{ color: 'rgba(240,237,232,0.55)' }}>
                        Founded in 2020, Carvelle was born from a belief that extraordinary driving experiences should be accessible to everyone who dares to dream big.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 border-y" style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'var(--surface)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map(({ icon: Icon, value, label }) => (
                            <div key={label} className="flex items-center gap-4 justify-center md:justify-start">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)' }}
                                >
                                    <Icon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-white">{value}</div>
                                    <div className="text-xs" style={{ color: 'rgba(240,237,232,0.45)' }}>{label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="section-label mb-3">Our Mission</p>
                            <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
                                More Than a Rental —<br />
                                <span style={{ color: 'var(--primary)' }}>An Experience.</span>
                            </h2>
                            <p className="text-lg mb-6" style={{ color: 'rgba(240,237,232,0.55)' }}>
                                At Carvelle, we don't just hand you keys — we craft a moment. From the second you browse our fleet to the moment you return, every touchpoint is designed to feel premium, seamless, and unforgettable.
                            </p>
                            <p className="mb-8" style={{ color: 'rgba(240,237,232,0.5)' }}>
                                Our fleet is maintained to showroom standards, our concierge team is available around the clock, and our commitment to your satisfaction is absolute. Because you deserve extraordinary.
                            </p>
                            <Link href="/cars">
                                <button className="btn-amber inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold amber-glow">
                                    Explore Our Fleet <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden"
                                style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2070&auto=format&fit=crop"
                                    alt="Luxury Porsche"
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: 'linear-gradient(135deg, rgba(10,10,15,0.4) 0%, transparent 50%)' }}
                                />
                            </div>
                            {/* Floating badge */}
                            <div
                                className="absolute -bottom-6 -left-6 p-5 rounded-2xl"
                                style={{
                                    background: 'var(--surface)',
                                    border: '1px solid rgba(201,169,110,0.2)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                }}
                            >
                                <p className="text-3xl font-extrabold" style={{ color: 'var(--primary)' }}>5+</p>
                                <p className="text-sm" style={{ color: 'rgba(240,237,232,0.5)' }}>Years of Excellence</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24" style={{ background: 'var(--surface)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="section-label mb-3">What We Stand For</p>
                        <h2 className="text-4xl font-extrabold text-white">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {VALUES.map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="p-6 rounded-2xl transition-all duration-300 hover-lift"
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                                    style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)' }}
                                >
                                    <Icon className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,237,232,0.5)' }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <p className="section-label mb-3">The People Behind Carvelle</p>
                        <h2 className="text-4xl font-extrabold text-white">Meet Our Team</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                        {TEAM.map(({ name, role, img }) => (
                            <div key={name} className="text-center group">
                                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden"
                                    style={{ border: '2px solid rgba(201,169,110,0.3)' }}>
                                    <img
                                        src={img}
                                        alt={name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="font-bold text-white text-lg">{name}</h3>
                                <p className="text-sm" style={{ color: 'var(--primary)' }}>{role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20" style={{ background: 'var(--surface)' }}>
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <p className="section-label mb-3">Ready to Ride?</p>
                    <h2 className="text-4xl font-extrabold text-white mb-6">
                        Your Dream Car <span style={{ color: 'var(--primary)' }}>Awaits.</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/cars">
                            <button className="btn-amber px-10 py-4 rounded-full font-semibold amber-glow">
                                Browse Fleet
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button
                                className="px-10 py-4 rounded-full font-semibold border transition-all duration-300"
                                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(240,237,232,0.75)' }}
                            >
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
