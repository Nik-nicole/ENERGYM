import { updateSession } from "@/lib/supabase/middleware"
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

  // Rutas excluidas de protección de demo
  const excludedPaths = ['/demo-access', '/auth']
  const isExcluded = excludedPaths.some(path => pathname.startsWith(path))

  if (!isExcluded) {
    const providedToken = url.searchParams.get('demo')
    
    // Si no hay token o es incorrecto, redirigir a página de acceso denegado
    if (!providedToken || providedToken !== demoToken) {
      const accessDeniedUrl = new URL('/demo-access', request.url)
      return NextResponse.redirect(accessDeniedUrl)
    }
  }

  // CAPA 2: Protección de Supabase Auth (existente)
  return await updateSession(request)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
