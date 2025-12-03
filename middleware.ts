import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  if (!req.cookies.get('sl_locale')) {
    res.cookies.set('sl_locale', 'tr', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365
    })
  }
  return res
}
