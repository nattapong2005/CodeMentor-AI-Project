import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const publicRoutes = ['/login', '/register']
const loginPage = '/login'

async function getSecretKey() {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('ไม่พบ JWT_SECRET')
  }
  return new TextEncoder().encode(secret)
}

async function verifyToken(token: string) {
  try {
    const secretKey = await getSecretKey()
    const { payload } = await jwtVerify(token, secretKey)
    return payload as { user_id: string; role: string }
  } catch (error) {
    return null
  }
}

export async function middleware(req: NextRequest) {
  
  const token = req.cookies.get('auth_token')?.value
  const { pathname } = req.nextUrl

  const isPublicRoute = publicRoutes.includes(pathname)
  const isTeacherRoute = pathname.startsWith("/teacher")
  const isStudentRoute = pathname.startsWith("/student")

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL(loginPage, req.url))
  }

  let payload = null
  if (token) {
    payload = await verifyToken(token)
    if (!payload) {
      const res = NextResponse.redirect(new URL(loginPage, req.url))
      res.cookies.delete('auth_token')
      return res
    }
  }

  if (isPublicRoute && payload) {
    if (payload.role === 'TEACHER') {
      return NextResponse.redirect(new URL("/teacher/home", req.url))
    }
    if (payload.role === 'STUDENT') {
      return NextResponse.redirect(new URL("/home", req.url))
    }
    return NextResponse.next()
  }

  if (isTeacherRoute) {
    if (payload?.role !== 'TEACHER') {
      return NextResponse.redirect(new URL("/not-found", req.url))
    }
    return NextResponse.next()
  }

  if (isStudentRoute) {
    if (payload?.role !== 'STUDENT') {
      return NextResponse.redirect(new URL("/not-found", req.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
