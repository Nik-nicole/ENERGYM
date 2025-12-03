"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

const planes = [
  {
    id: 1,
    nombre: "Plan Día",
    precio: "$15.000",
    periodo: "por día",
    badge: null,
    descripcion: "Acceso ilimitado por un día",
    features: ["Acceso a todas las áreas", "Uso de máquinas", "Vestieres y duchas", "WiFi gratis", "No incluye clases"],
    cta: "Comprar",
  },
  {
    id: 2,
    nombre: "Plan Semanal",
    precio: "$80.000",
    periodo: "por semana",
    badge: null,
    descripcion: "Acceso ilimitado durante 7 días",
    features: [
      "Acceso a todas las áreas",
      "Uso de máquinas",
      "Clases grupales incluidas",
      "Vestieres premium",
      "WiFi y bebidas",
      "Reserva de máquinas",
    ],
    cta: "Comprar",
  },
  {
    id: 3,
    nombre: "Plan Mensual",
    precio: "$250.000",
    periodo: "por mes",
    badge: "MÁS VENDIDO",
    descripcion: "Membresía completa por 30 días",
    features: [
      "Acceso ilimitado 24/7",
      "Todas las máquinas y áreas",
      "Clases grupales ilimitadas",
      "Asesoría personalizada",
      "Seguimiento nutricional",
      "Acceso a apps de entrenamiento",
      "Descuento en servicios extras",
      "Ducha y vestieres premium",
    ],
    cta: "Comprar",
  },
  {
    id: 4,
    nombre: "Plan Trimestral",
    precio: "$630.000",
    periodo: "por 3 meses",
    badge: null,
    descripcion: "Suscripción de 90 días con beneficios adicionales",
    features: [
      "Todo incluido en Plan Mensual",
      "Personal trainer sesión gratis",
      "Evaluación de composición corporal",
      "Plan nutricional personalizado",
      "Acceso a eventos especiales",
      "Ahorro del 15%",
    ],
    cta: "Comprar",
  },
]

export default function PlanesSection() {
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null)

  const toggleExpanded = (id: number) => {
    setExpandedPlan(expandedPlan === id ? null : id)
  }

  return (
    <div className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">PLANES DE MEMBRESÍA</h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          Elige el plan perfecto para ti y comienza tu transformación
        </p>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {planes.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-lg border transition-all duration-300 overflow-hidden ${
                plan.badge
                  ? "border-primary bg-card/80 shadow-lg shadow-primary/20 md:col-span-1 lg:-translate-y-4"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground py-2 text-center text-sm font-bold">
                  {plan.badge}
                </div>
              )}

              {/* Plan Content */}
              <div className={`p-6 ${plan.badge ? "pt-14" : ""}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.nombre}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.descripcion}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.precio}</span>
                    <span className="text-muted-foreground text-sm">{plan.periodo}</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 mb-6">
                  <Link href="/auth/login" className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 font-semibold">
                      {plan.cta}
                    </Button>
                  </Link>

                  <button
                    onClick={() => toggleExpanded(plan.id)}
                    className="w-full border border-border rounded-lg py-3 px-4 flex items-center justify-between hover:bg-card/50 transition-colors"
                  >
                    <span className="font-medium text-sm">Ver detalles</span>
                    {expandedPlan === plan.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                {/* Expanded Details */}
                {expandedPlan === plan.id && (
                  <div className="border-t border-border pt-6 space-y-3">
                    <p className="text-sm font-semibold text-primary mb-4">Incluye:</p>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground/90">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-card/50 border border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Todos nuestros planes incluyen acceso a nuestras 4 sedes en Colombia
          </p>
          <p className="text-sm text-muted-foreground">
            ¿Dudas sobre cuál plan escoger? Contacta con nuestro equipo de ventas
          </p>
        </div>
      </div>
    </div>
  )
}
