import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json(
                { error: 'Missing payment verification parameters' },
                { status: 400 }
            );
        }

        // Verify signature: HMAC-SHA256 of "order_id|payment_id" using key_secret
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        const isValid = expectedSignature === razorpay_signature;

        if (!isValid) {
            return NextResponse.json(
                { error: 'Payment verification failed — invalid signature' },
                { status: 400 }
            );
        }

        // Payment is verified — you can save booking to DB here
        return NextResponse.json({
            success: true,
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            message: 'Payment verified successfully',
        });
    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { error: 'Internal server error during verification' },
            { status: 500 }
        );
    }
}
