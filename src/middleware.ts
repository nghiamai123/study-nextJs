import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('isLogin')?.value
  
  const { pathname } = request.nextUrl

  console.log(pathname)

  if (currentUser && (pathname === '/' || pathname === '/me' || pathname === '/products' || pathname === '/management')) {
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
  matcher: ['/', '/me', '/login', '/register', '/profile', '/products', '/management'],
}
