'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Gem, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (err: unknown) {
            const code = (err as { code?: string }).code;
            if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
                setError('Invalid email or password. Please try again.');
            } else if (code === 'auth/too-many-requests') {
                setError('Too many failed attempts. Please try again later.');
            } else {
                setError('Failed to sign in. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
            {/* Left — Car Image Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2070&auto=format&fit=crop"
                    alt="Luxury Car"
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.3) 100%)' }}
                />
                {/* Content on image */}
                <div className="absolute inset-0 flex flex-col justify-end p-12 z-10">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit"
                        style={{ background: 'var(--primary-gradient)', color: '#0a0a0f' }}
                    >
                        <Gem className="w-4 h-4" />
                        Carvelle Luxury
                    </div>
                    <h2 className="text-4xl font-extrabold text-white mb-3 leading-tight">
                        Drive the<br />
                        <span style={{ color: 'var(--primary)' }}>Extraordinary.</span>
                    </h2>
                    <p className="text-sm" style={{ color: 'rgba(240,237,232,0.6)', maxWidth: '300px' }}>
                        Access your account to manage bookings and explore our exclusive fleet.
                    </p>
                </div>
            </div>

            {/* Right — Form Panel */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-16">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 mb-2">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: 'var(--primary-gradient)' }}
                        >
                            <Gem className="h-5 w-5" style={{ color: '#0a0a0f' }} />
                        </div>
                        <span className="text-xl font-bold text-white">
                            Car<span style={{ color: 'var(--primary)' }}>velle</span>
                        </span>
                    </Link>

                    <div>
                        <h1 className="text-3xl font-extrabold text-white mb-2">Welcome back</h1>
                        <p className="text-sm" style={{ color: 'rgba(240,237,232,0.5)' }}>
                            Don't have an account?{' '}
                            <Link
                                href="/register"
                                className="font-semibold transition-colors"
                                style={{ color: 'var(--primary)' }}
                            >
                                Create one
                            </Link>
                        </p>
                    </div>

                    {/* Form */}
                    {error && (
                        <div
                            className="rounded-xl px-4 py-3 text-sm"
                            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}
                        >
                            {error}
                        </div>
                    )}
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
                                    placeholder="you@example.com"
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
                                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                                    style={{ color: 'rgba(240,237,232,0.35)' }}
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded"
                                    style={{ accentColor: '#c9a96e' }}
                                />
                                <span className="text-sm" style={{ color: 'rgba(240,237,232,0.55)' }}>Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium transition-colors" style={{ color: 'var(--primary)' }}>
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-amber w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 amber-glow disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full" style={{ height: '1px', background: 'rgba(255,255,255,0.07)' }} />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 text-xs" style={{ background: 'var(--background)', color: 'rgba(240,237,232,0.35)' }}>
                                Employee Access
                            </span>
                        </div>
                    </div>

                    {/* Admin Portal */}
                    <Link href="/admin/login">
                        <button
                            className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                            style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: 'rgba(240,237,232,0.55)',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,169,110,0.4)';
                                (e.currentTarget as HTMLButtonElement).style.color = '#c9a96e';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
                                (e.currentTarget as HTMLButtonElement).style.color = 'rgba(240,237,232,0.55)';
                            }}
                        >
                            <Lock className="w-4 h-4" /> Admin Portal Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
