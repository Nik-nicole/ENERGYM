import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const handleLogout = async () => {
    "use server"
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Navigation */}
      <nav className="fixed w-full top-0 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold tracking-tighter">
            HYRO
          </Link>

          <div className="flex gap-6 items-center">
            <Link href="/dashboard" className="text-sm hover:text-primary transition">
              Dashboard
            </Link>
            <Link href="/dashboard/services" className="text-sm hover:text-primary transition">
              Servicios
            </Link>
            <Link href="/dashboard/profile" className="text-sm hover:text-primary transition">
              Perfil
            </Link>

            <form action={handleLogout}>
              <Button type="submit" variant="outline" size="sm">
                Cerrar Sesión
              </Button>
            </form>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-12">{children}</main>
    </div>
  )
}
