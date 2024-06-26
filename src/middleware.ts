import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('sessionToken')?.value
  
  const { pathname } = request.nextUrl

  if (currentUser && (pathname === '/' || pathname === '/me' || pathname === '/products' || pathname === '/management' || pathname === '/management/users' || pathname === '/management/products')) {
    return NextResponse.next()
  }
  
  if (currentUser && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!currentUser && !(pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: ['/', '/me', '/login', '/register', '/profile', '/products', '/management', '/management/users', '/management/products']
}
