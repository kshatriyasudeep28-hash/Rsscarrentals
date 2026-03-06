import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Check if the path starts with /admin/dashboard
    if (path.startsWith('/admin/dashboard')) {
        const adminToken = request.cookies.get('admin_token')?.value;

        // If no token, redirect to login
        if (!adminToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Check if user is already logged in and tries to access login page
    if (path === '/admin/login') {
        const adminToken = request.cookies.get('admin_token')?.value;
        if (adminToken) {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
