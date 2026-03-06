import BookingForm from '@/components/BookingForm';
import React, { Suspense } from 'react';

export const metadata = {
    title: 'Book a Car | Carvelle Luxury',
    description: 'Secure your luxury vehicle reservation with Razorpay.',
};

export default function BookingPage() {
    return (
        <div className="min-h-screen py-20" style={{ background: 'var(--background)' }}>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <p className="section-label mb-3">Step 2 of 2</p>
                    <h1 className="text-4xl font-extrabold text-white mb-3">Complete Reservation</h1>
                    <p style={{ color: 'rgba(240,237,232,0.5)' }}>
                        You are one step away from your extraordinary drive.
                    </p>
                </div>
                <Suspense fallback={
                    <div
                        className="rounded-2xl p-16 text-center"
                        style={{ background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: '#c9a96e' }} />
                        <p className="mt-4 text-sm" style={{ color: 'rgba(240,237,232,0.4)' }}>Loading...</p>
                    </div>
                }>
                    <BookingForm />
                </Suspense>
            </div>
        </div>
    );
}

