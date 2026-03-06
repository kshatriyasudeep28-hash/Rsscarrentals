'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Gem, Lock, Mail, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            router.push('/');
        } catch (err: unknown) {
            const code = (err as { code?: string }).code;
            if (code === 'auth/email-already-in-use') {
                setError('An account with this email already exists.');
            } else if (code === 'auth/weak-password') {
                setError('Password is too weak. Use at least 8 characters.');
            } else {
                setError('Failed to create account. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'var(--foreground)' as string,
    };

    const focusInput = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)';
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.08)';
    };
    const blurInput = (e: React.FocusEvent<HTMLInputElement>) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.boxShadow = 'none';
    };

    const fields = [
        { id: 'name', label: 'Full Name', type: 'text', value: name, onChange: setName, icon: User, placeholder: 'John Doe' },
        { id: 'email', label: 'Email Address', type: 'email', value: email, onChange: setEmail, icon: Mail, placeholder: 'you@example.com' },
    ];

    return (
        <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
            {/* Left — Image Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2074&auto=format&fit=crop"
                    alt="Luxury Car"
                    className="w-full h-full object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, rgba(10,10,15,0.75) 0%, rgba(10,10,15,0.35) 100%)' }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-12 z-10">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 w-fit"
                        style={{ background: 'var(--primary-gradient)', color: '#0a0a0f' }}
                    >
                        <Gem className="w-4 h-4" />
                        Join Carvelle
                    </div>
                    <h2 className="text-4xl font-extrabold text-white mb-3 leading-tight">
                        Start Your<br />
                        <span style={{ color: 'var(--primary)' }}>Luxury Journey.</span>
                    </h2>
                    <p className="text-sm" style={{ color: 'rgba(240,237,232,0.6)', maxWidth: '300px' }}>
                        Create your account and get instant access to our verified fleet of extraordinary vehicles.
                    </p>
                </div>
            </div>

            {/* Right — Form Panel */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-16">
                <div className="w-full max-w-md space-y-7">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5">
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
                        <h1 className="text-3xl font-extrabold text-white mb-2">Create account</h1>
                        <p className="text-sm" style={{ color: 'rgba(240,237,232,0.5)' }}>
                            Already have an account?{' '}
                            <Link href="/login" className="font-semibold" style={{ color: 'var(--primary)' }}>
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div
                            className="rounded-xl px-4 py-3 text-sm"
                            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}
                        >
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleRegister}>
                        {/* Name + Email */}
                        {fields.map(({ id, label, type, value, onChange, icon: Icon, placeholder }) => (
                            <div key={id} className="space-y-2">
                                <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.5)' }}>
                                    {label}
                                </label>
                                <div className="relative">
                                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(240,237,232,0.35)' }} />
                                    <input
                                        id={id}
                                        type={type}
                                        required
                                        value={value}
                                        onChange={(e) => onChange(e.target.value)}
                                        placeholder={placeholder}
                                        className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
                                        style={inputStyle}
                                        onFocus={focusInput}
                                        onBlur={blurInput}
                                    />
                                </div>
                            </div>
                        ))}

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
                                    placeholder="Min. 8 characters"
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
                                    style={inputStyle}
                                    onFocus={focusInput}
                                    onBlur={blurInput}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(240,237,232,0.35)' }}>
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.5)' }}>
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(240,237,232,0.35)' }} />
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Repeat your password"
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300"
                                    style={inputStyle}
                                    onFocus={focusInput}
                                    onBlur={blurInput}
                                />
                            </div>
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded" style={{ accentColor: '#c9a96e' }} />
                            <span className="text-sm" style={{ color: 'rgba(240,237,232,0.5)' }}>
                                I agree to Carvelle&apos;s{' '}
                                <Link href="/terms" className="font-semibold" style={{ color: 'var(--primary)' }}>Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="font-semibold" style={{ color: 'var(--primary)' }}>Privacy Policy</Link>
                            </span>
                        </label>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-amber w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 amber-glow disabled:opacity-50"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
