import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">¡Cuenta Creada!</CardTitle>
          <CardDescription>Por favor, verifica tu email para confirmar tu cuenta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Hemos enviado un link de confirmación a tu email. Haz clic en él para activar tu cuenta.
          </p>
          <Link href="/">
            <Button className="w-full">Volver a Inicio</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
