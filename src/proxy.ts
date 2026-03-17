import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protect /admin routes (but not login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const adminSession = request.cookies.get('aura-admin-session')

    // Auth is handled client-side via sessionStorage for now
    // When Supabase is configured, uncomment the lines below:
    // if (!adminSession) {
    //   return NextResponse.redirect(new URL('/admin/login', request.url))
    // }
    void adminSession // suppress unused variable warning
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
