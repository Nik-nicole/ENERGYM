"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, ChevronUp } from "lucide-react"

const servicios = [
  {
    id: 1,
    nombre: "CrossFit",
    descripcion: "Entrenamientos funcionales de alta intensidad",
    precio: "$50.000",
    imagen: "https://i.pinimg.com/736x/0f/4b/fa/0f4bfa9b6edb3b7f04155b1518001af3.jpg",
    horarios: [
      { dia: "Lunes - Viernes", hora: "6:00 AM, 12:00 PM, 6:00 PM" },
      { dia: "Sábado", hora: "9:00 AM" },
    ],
    capacidad: 15,
    features: ["Incluye calentamiento", "Seguimiento personalizado", "Comunidad motivadora"],
  },
  {
    id: 2,
    nombre: "Personal Training",
    descripcion: "Entrenamiento individual con experto certificado",
    precio: "$100.000",
    imagen: "/personalTraining.jpg",
    horarios: [
      { dia: "Lunes - Viernes", hora: "Horario flexible" },
      { dia: "Sábado", hora: "Disponible" },
    ],
    capacidad: 1,
    features: ["Rutina personalizada", "Evaluación inicial", "Plan nutricional"],
  },
  {
    id: 3,
    nombre: "Zumba",
    descripcion: "Clases de baile con ritmos latinos",
    precio: "$30.000",
    imagen: "https://i.pinimg.com/1200x/8a/e2/fe/8ae2fe87f914288949e23890f7c9b996.jpg",
    horarios: [
      { dia: "Lunes - Viernes", hora: "5:00 PM, 7:00 PM" },
      { dia: "Domingo", hora: "10:00 AM" },
    ],
    capacidad: 30,
    features: ["Ambiente divertido", "Cardio efectivo", "Para todos los niveles"],
  },
  {
    id: 4,
    nombre: "Yoga",
    descripcion: "Equilibrio entre cuerpo y mente",
    precio: "$40.000",
    imagen: "/holi.jpg",
    horarios: [
      { dia: "Lunes - Viernes", hora: "7:00 AM, 6:00 PM" },
      { dia: "Domingo", hora: "9:00 AM" },
    ],
    capacidad: 20,
    features: ["Relajación total", "Mejora flexibilidad", "Meditación guiada"],
  },
]

export default function ServiciosSection() {
  const [expandedService, setExpandedService] = useState<number | null>(null)

  const toggleExpanded = (id: number) => {
    setExpandedService(expandedService === id ? null : id)
  }

  return (
    <div className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">NUEVOS SERVICIOS</h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          Complementa tu entrenamiento con nuestras clases especializadas
        </p>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
            >
              {/* Service Image */}
              <div
                className="h-48 w-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `url('${servicio.imagen}')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Service Info */}
              <div className="p-6 bg-card">
                <h3 className="text-2xl font-bold mb-2">{servicio.nombre}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{servicio.descripcion}</p>

                {/* Quick Info */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border text-center text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Precio</p>
                    <p className="font-bold text-primary">{servicio.precio}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Capacidad</p>
                    <p className="font-bold">{servicio.capacidad} personas</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Sesión</p>
                    <p className="font-bold">60 min</p>
                  </div>
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => toggleExpanded(servicio.id)}
                  className="w-full border border-border rounded-lg py-3 px-4 flex items-center justify-between hover:bg-card/50 transition-colors mb-4"
                >
                  <span className="font-medium text-sm">
                    {expandedService === servicio.id ? "Ver menos" : "Ver horarios"}
                  </span>
                  {expandedService === servicio.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {/* Expanded Details */}
                {expandedService === servicio.id && (
                  <div className="space-y-4 mb-6 pb-6 border-t border-border pt-6">
                    <div>
                      <p className="text-sm font-semibold mb-3">Horarios disponibles:</p>
                      {servicio.horarios.map((h, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm mb-2">
                          <Calendar size={16} className="text-primary" />
                          <span className="text-muted-foreground">{h.dia}</span>
                          <span className="text-foreground font-medium">{h.hora}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <p className="text-sm font-semibold mb-3">Beneficios:</p>
                      {servicio.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm mb-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <Link href="/auth/login" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 font-semibold">
                    Inscribirme
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
