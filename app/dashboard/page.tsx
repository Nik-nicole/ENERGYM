import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlanPurchaseSection } from "@/components/plan-purchase-section"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user?.id).maybeSingle()

  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select("*, plan:plans(name, type, price, features), sede:sedes(city)")
    .eq("user_id", user?.id)
    .eq("status", "active")

  const { data: enrollments } = await supabase
    .from("class_enrollments")
    .select("*, schedule:class_schedules(start_time, end_time, instructor, service:services(name))")
    .eq("user_id", user?.id)
    .eq("status", "enrolled")
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Bienvenido, {profile?.full_name || user?.email}</h1>
        <p className="text-muted-foreground">Aquí está tu información de suscripción y clases</p>
      </div>

      {/* Subscriptions Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Tu Plan Activo</h2>
          {subscriptions && subscriptions.length > 0 ? (
            <div className="space-y-4">
              {subscriptions.map((subscription: any) => (
                <Card key={subscription.id} className="border-primary/20">
                  <CardHeader>
                    <CardTitle>{subscription.plan.name}</CardTitle>
                    <CardDescription>{subscription.sede.city}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Válido hasta</p>
                      <p className="text-lg font-semibold">
                        {new Date(subscription.end_date).toLocaleDateString("es-CO")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Características</p>
                      <ul className="space-y-1">
                        {subscription.plan.features.map((feature: string, i: number) => (
                          <li key={i} className="text-sm">
                            ✓ {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent" asChild>
                        <Link href="/dashboard/services">Explorar Servicios</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <PlanPurchaseSection />
          )}
        </div>

        {/* Recent Classes */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Tus Clases</h2>
          {enrollments && enrollments.length > 0 ? (
            <div className="space-y-3">
              {enrollments.map((enrollment: any) => (
                <Card key={enrollment.id}>
                  <CardContent className="pt-4">
                    <p className="font-semibold">{enrollment.schedule.service.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {enrollment.schedule.start_time} - {enrollment.schedule.end_time}
                    </p>
                    <p className="text-sm text-muted-foreground">Instructor: {enrollment.schedule.instructor}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">Aún no estás inscrito en clases</p>
                <Button asChild>
                  <Link href="/dashboard/services">Inscribirse en Clases</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
