import { auth } from './auth'
import { NextResponse } from 'next/server'

export default auth(req => {
  const url = req.nextUrl
  const session = req.auth
  const AuthPath = url.pathname == '/sign-in' || '/sign-up'
  if (!session&& !AuthPath) {
    return NextResponse.redirect(new URL('/sign-in', url))
  }
  if (session && AuthPath) {
    return NextResponse.redirect(new URL('/', url))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
