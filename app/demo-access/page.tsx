import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DemoAccessPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Acceso Restringido</CardTitle>
          <CardDescription>
            Esta es una demo privada. Usa el enlace de demo proporcionado para acceder.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>Si tienes un enlace de demo, asegúrate de incluir el token de acceso completo.</p>
            <p className="mt-2">Ejemplo: tu-sitio.com/?demo=TOKEN_AQUI</p>
          </div>
          <div className="text-center">
            <Button asChild variant="outline">
              <Link href="/auth/login">
                Ir a Login
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
