'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gem, Lock, Mail, Eye, EyeOff, ArrowRight, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 900));

        if (email === 'admin@carvelle.com' && password === 'admin123') {
            document.cookie = 'admin_token=mock_token; path=/';
            router.push('/admin/dashboard');
        } else {
            setError('Invalid credentials. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--background)' }}>
            {/* Ambient glow */}
            <div
                className="fixed inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(201,169,110,0.07) 0%, transparent 65%)' }}
            />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2.5">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'var(--primary-gradient)' }}
                        >
                            <Gem className="h-5 w-5" style={{ color: '#0a0a0f' }} />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            Car<span style={{ color: 'var(--primary)' }}>velle</span>
                        </span>
                    </Link>
                </div>

                {/* Card */}
                <div
                    className="rounded-2xl p-8 space-y-7"
                    style={{
                        background: 'var(--surface)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
                    }}
                >
                    {/* Header */}
                    <div className="text-center">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                            style={{ background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)' }}
                        >
                            <ShieldAlert className="w-7 h-7" style={{ color: 'var(--primary)' }} />
                        </div>
                        <h1 className="text-2xl font-extrabold text-white mb-1">Admin Portal</h1>
                        <p className="text-sm" style={{ color: 'rgba(240,237,232,0.45)' }}>
                            Restricted access — authorised personnel only.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleLogin}>
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.5)' }}>
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(240,237,232,0.35)' }} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@carvelle.com"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
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
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.5)' }}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(240,237,232,0.35)' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
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
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                    style={{ color: 'rgba(240,237,232,0.35)' }}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div
                                className="py-3 px-4 rounded-xl text-sm text-center"
                                style={{
                                    background: 'rgba(239,68,68,0.08)',
                                    border: '1px solid rgba(239,68,68,0.2)',
                                    color: '#f87171',
                                }}
                            >
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-amber w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 amber-glow disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Sign in to Dashboard <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Hint */}
                    <div
                        className="py-3 px-4 rounded-xl text-center"
                        style={{
                            background: 'rgba(201,169,110,0.05)',
                            border: '1px solid rgba(201,169,110,0.1)',
                        }}
                    >
                        <p className="text-xs" style={{ color: 'rgba(240,237,232,0.4)' }}>
                            Demo credentials:{' '}
                            <span style={{ color: 'var(--primary)' }}>admin@carvelle.com</span>
                            {' '}/ <span style={{ color: 'var(--primary)' }}>admin123</span>
                        </p>
                    </div>
                </div>

                <p className="text-center text-xs mt-6" style={{ color: 'rgba(240,237,232,0.3)' }}>
                    <Link href="/" style={{ color: 'rgba(240,237,232,0.5)' }}>← Back to Carvelle</Link>
                </p>
            </div>
        </div>
    );
}
