import { NextResponse } from 'next/server'
//import type { NextRequest } from 'next/server'

export function middleware(request) {

    let authToken = request.cookies.get('auth-token')?.value

    if (!authToken && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (authToken && request.nextUrl.pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/admin/banners/main', request.url))
    }

}

export const config = {
    matcher: ['/admin/:path*', '/auth/:path*']
}