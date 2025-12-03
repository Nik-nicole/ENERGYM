"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export function PlanPurchaseSection() {
  const [plans, setPlans] = useState<any[]>([])
  const [sedes, setSedes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedSede, setSelectedSede] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()

      const { data: plansData } = await supabase.from("plans").select("*").order("price", { ascending: true })

      const { data: sedesData } = await supabase.from("sedes").select("*")

      setPlans(plansData || [])
      setSedes(sedesData || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  const handlePurchase = async () => {
    if (!selectedPlan || !selectedSede) {
      alert("Por favor selecciona un plan y una sede")
      return
    }

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Debes estar autenticado para comprar")
      return
    }

    const plan = plans.find((p) => p.id === selectedPlan)
    const startDate = new Date()
    const endDate = new Date(startDate.getTime() + plan.duration_days * 24 * 60 * 60 * 1000)

    const { error } = await supabase.from("subscriptions").insert({
      user_id: user.id,
      plan_id: selectedPlan,
      sede_id: selectedSede,
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      status: "active",
    })

    if (error) {
      alert("Error al comprar plan: " + error.message)
      return
    }

    alert("¡Plan comprado exitosamente!")
    window.location.reload()
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center">
          <Loader2 className="animate-spin" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compra un Plan</CardTitle>
        <CardDescription>Selecciona un plan y una sede para comenzar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Selecciona un Plan:</label>
          <select
            value={selectedPlan || ""}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-background"
          >
            <option value="">-- Elige un plan --</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - ${plan.price}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Selecciona una Sede:</label>
          <select
            value={selectedSede || ""}
            onChange={(e) => setSelectedSede(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-background"
          >
            <option value="">-- Elige una sede --</option>
            {sedes.map((sede) => (
              <option key={sede.id} value={sede.id}>
                {sede.city}
              </option>
            ))}
          </select>
        </div>

        {selectedPlan && (
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm">
              Plan: <strong>{plans.find((p) => p.id === selectedPlan)?.name}</strong>
            </p>
            <p className="text-sm">
              Precio: <strong>${plans.find((p) => p.id === selectedPlan)?.price}</strong>
            </p>
          </div>
        )}

        <Button onClick={handlePurchase} className="w-full" disabled={!selectedPlan || !selectedSede}>
          Comprar Plan
        </Button>
      </CardContent>
    </Card>
  )
}
