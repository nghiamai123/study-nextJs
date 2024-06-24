import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('isLogin')?.value
  
  const { pathname } = request.nextUrl

  console.log(pathname)

  if (currentUser && (pathname === '/' || pathname === '/me' || pathname === '/products' || pathname === '/management')) {
    console.log('1')
    return NextResponse.next()
  }
  
  if (currentUser && (pathname === '/login' || pathname === '/register')) {
  console.log('2')

    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!currentUser && !(pathname === '/login' || pathname === '/register')) {
  console.log('3')

    return NextResponse.redirect(new URL('/login', request.url))
  }

  console.log('4')

  return NextResponse.next()
}
 
export const config = {
  matcher: ['/', '/me', '/login', '/register', '/profile', '/products', '/management']
}
