import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Only protect /admin routes (but not login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Check for session cookie
    const adminSession = request.cookies.get('aura-admin-session')

    // For now, we use sessionStorage (client-side) so middleware just passes through
    // Real auth would check Supabase session cookies here
    // When Supabase is configured, uncomment the lines below:
    // if (!adminSession) {
    //   return NextResponse.redirect(new URL('/admin/login', request.url))
    // }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
