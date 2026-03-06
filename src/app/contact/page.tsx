'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, ArrowRight } from 'lucide-react';

const CONTACT_INFO = [
    {
        icon: Phone,
        label: 'Phone',
        value: '+91 98765 43210',
        sub: 'Mon–Sat, 9am–8pm IST',
    },
    {
        icon: Mail,
        label: 'Email',
        value: 'hello@carvelle.com',
        sub: 'We reply within 2 hours',
    },
    {
        icon: MapPin,
        label: 'Head Office',
        value: 'Bandra Kurla Complex',
        sub: 'Mumbai, Maharashtra 400051',
    },
    {
        icon: Clock,
        label: 'Support Hours',
        value: '24 / 7 Available',
        sub: 'For urgent roadside assistance',
    },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1200));
        setLoading(false);
        setSubmitted(true);
    };

    const inputCls = "w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300";
    const inputStyle = {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'var(--foreground)',
    };
    const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)';
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.08)';
    };
    const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = 'none';
    };
    const labelCls = "block text-xs font-semibold uppercase tracking-wider mb-2";
    const labelStyle = { color: 'rgba(240,237,232,0.5)' };

    return (
        <div className="min-h-screen" style={{ background: 'var(--background)' }}>
            {/* Hero */}
            <section className="relative pt-36 pb-20 text-center overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.1) 0%, transparent 60%)' }}
                />
                <div className="relative z-10 max-w-2xl mx-auto px-4">
                    <p className="section-label mb-3">Get in Touch</p>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                        We&apos;d Love to<br /><span style={{ color: 'var(--primary)' }}>Hear From You.</span>
                    </h1>
                    <p className="text-lg" style={{ color: 'rgba(240,237,232,0.5)' }}>
                        Whether you have a booking question, need concierge help, or just want to say hello — our team is ready.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* LEFT — Contact info */}
                    <div className="space-y-5">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-5" style={{ color: 'rgba(240,237,232,0.4)' }}>
                                Contact Details
                            </p>
                            {CONTACT_INFO.map(({ icon: Icon, label, value, sub }) => (
                                <div
                                    key={label}
                                    className="flex items-start gap-4 p-5 rounded-2xl mb-4"
                                    style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.06)' }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)' }}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(240,237,232,0.35)' }}>
                                            {label}
                                        </p>
                                        <p className="text-sm font-semibold text-white">{value}</p>
                                        <p className="text-xs mt-0.5" style={{ color: 'rgba(240,237,232,0.4)' }}>{sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat CTA */}
                        <div
                            className="p-6 rounded-2xl"
                            style={{
                                background: 'linear-gradient(135deg, rgba(201,169,110,0.1) 0%, rgba(201,169,110,0.03) 100%)',
                                border: '1px solid rgba(201,169,110,0.2)',
                            }}
                        >
                            <MessageSquare className="w-8 h-8 mb-3" style={{ color: 'var(--primary)' }} />
                            <h3 className="font-bold text-white mb-1">Need instant help?</h3>
                            <p className="text-sm mb-4" style={{ color: 'rgba(240,237,232,0.5)' }}>
                                Our live chat agents are available for roadside assistance, booking changes, and more.
                            </p>
                            <button
                                className="flex items-center gap-2 text-sm font-semibold transition-colors"
                                style={{ color: 'var(--primary)' }}
                            >
                                Start Live Chat <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT — Contact form */}
                    <div className="lg:col-span-2">
                        <div
                            className="rounded-2xl p-8"
                            style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)' }}
                        >
                            {submitted ? (
                                <div className="text-center py-12">
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                                        style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)' }}
                                    >
                                        <Send className="w-7 h-7" style={{ color: '#34d399' }} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p style={{ color: 'rgba(240,237,232,0.5)' }}>
                                        Thank you for reaching out. We&apos;ll get back to you within 2 hours.
                                    </p>
                                    <button
                                        className="mt-8 btn-amber px-8 py-3 rounded-full text-sm font-semibold"
                                        onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-extrabold text-white mb-1">Send us a Message</h2>
                                        <p className="text-sm" style={{ color: 'rgba(240,237,232,0.45)' }}>
                                            Fill in the form and we&apos;ll respond as soon as possible.
                                        </p>
                                    </div>

                                    <form className="space-y-5" onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className={labelCls} style={labelStyle}>Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="John Doe"
                                                    value={form.name}
                                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                                    className={inputCls}
                                                    style={inputStyle}
                                                    onFocus={focusHandler}
                                                    onBlur={blurHandler}
                                                />
                                            </div>
                                            <div>
                                                <label className={labelCls} style={labelStyle}>Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="you@example.com"
                                                    value={form.email}
                                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                                    className={inputCls}
                                                    style={inputStyle}
                                                    onFocus={focusHandler}
                                                    onBlur={blurHandler}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className={labelCls} style={labelStyle}>Subject</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="How can we help you?"
                                                value={form.subject}
                                                onChange={e => setForm({ ...form, subject: e.target.value })}
                                                className={inputCls}
                                                style={inputStyle}
                                                onFocus={focusHandler}
                                                onBlur={blurHandler}
                                            />
                                        </div>

                                        <div>
                                            <label className={labelCls} style={labelStyle}>Message</label>
                                            <textarea
                                                required
                                                rows={6}
                                                placeholder="Tell us more about your enquiry…"
                                                value={form.message}
                                                onChange={e => setForm({ ...form, message: e.target.value })}
                                                className={inputCls}
                                                style={{ ...inputStyle, resize: 'vertical' }}
                                                onFocus={focusHandler}
                                                onBlur={blurHandler}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn-amber w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 amber-glow disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                    Sending…
                                                </>
                                            ) : (
                                                <>
                                                    Send Message <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
