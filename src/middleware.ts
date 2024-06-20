// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('sessionToken');
  const { pathname } = req.nextUrl;

  if (!token && pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  } else if (token && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const requestHeaders = new Headers(req.headers);
  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/', '/login', '/register'], // Specify the paths you want the middleware to apply to
};
