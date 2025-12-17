import { updateSession } from "@/lib/supabase/middleware"
import { createServerClient } from "@supabase/ssr"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // CAPA 1: Protección de acceso a demo
  const demoToken = process.env.DEMO_ACCESS_TOKEN

  // Si no hay token configurado, modo desarrollo - acceso abierto
  if (!demoToken) {
    return await updateSession(request)
  }

  const url = request.nextUrl
  const pathname = url.pathname
  const response = NextResponse.next()

  // Rutas excluidas de protección de demo
  const excludedPaths = ['/demo-access', '/auth']
  const isExcluded = excludedPaths.some(path => pathname.startsWith(path))

  // Verificar acceso por tres métodos: cookie, sesión Supabase, o query param
  let hasDemoAccess = false
  let needsCookieSet = false

  // 1. Verificar cookie de demo existente
  const demoCookie = request.cookies.get('demo_access')
  if (demoCookie?.value === 'true') {
    hasDemoAccess = true
  }

  // 2. Verificar query param (solo si no hay cookie)
  if (!hasDemoAccess && !isExcluded) {
    const providedToken = url.searchParams.get('demo')
    if (providedToken && providedToken === demoToken) {
      hasDemoAccess = true
      needsCookieSet = true
    }
  }

  // 3. Verificar sesión Supabase (si no hay acceso demo)
  if (!hasDemoAccess) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
              response.cookies.set(name, value, options)
            })
          },
        },
      },
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Si tiene sesión Supabase válida, permitir acceso
    if (user) {
      // Verificar si es demo por user_metadata
      const isDemo = user.user_metadata?.is_demo === "true"
      if (isDemo) {
        hasDemoAccess = true
      } else {
        // Opción: permitir acceso a cualquier usuario logueado
        hasDemoAccess = true
      }
    }
  }

  // Establecer cookie si se validó por query param
  if (needsCookieSet) {
    response.cookies.set('demo_access', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 horas
    })
  }

  // Redirigir a acceso denegado si no cumple ninguna validación
  if (!hasDemoAccess && !isExcluded) {
    const accessDeniedUrl = new URL('/demo-access', request.url)
    return NextResponse.redirect(accessDeniedUrl)
  }

  // CAPA 2: Protección de Supabase Auth (existente)
  return await updateSession(request)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
