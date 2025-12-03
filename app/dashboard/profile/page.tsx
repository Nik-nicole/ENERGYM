import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user?.id).maybeSingle()

  let finalProfile = profile
  if (!profile && user) {
    const { data: newProfile } = await supabase
      .from("profiles")
      .insert([
        {
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Usuario",
        },
      ])
      .select()
      .single()

    finalProfile = newProfile
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8">Mi Perfil</h1>

      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
          <CardDescription>Tus datos de cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">Nombre Completo</p>
            <p className="text-lg font-semibold">{finalProfile?.full_name || "No especificado"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-lg font-semibold">{finalProfile?.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Miembro desde</p>
            <p className="text-lg font-semibold">
              {finalProfile?.created_at ? new Date(finalProfile.created_at).toLocaleDateString("es-CO") : "Reciente"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
