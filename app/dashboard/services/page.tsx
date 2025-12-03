"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ClassSchedule {
  id: string
  service_id: string
  sede_id: string
  start_time: string
  end_time: string
  instructor: string
  capacity: number
  services: { name: string }
  sedes: { city: string }
}

interface Service {
  id: string
  name: string
  description: string
  price: number
  capacity: number
  image_url: string
}

interface Sede {
  id: string
  city: string
  phone: string
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [schedules, setSchedules] = useState<ClassSchedule[]>([])
  const [sedes, setSedes] = useState<Sede[]>([])
  const [selectedSede, setSelectedSede] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const supabase = createClient()

    const { data: servicesData } = await supabase.from("services").select("*")
    const { data: sedesData } = await supabase.from("sedes").select("*")
    const { data: schedulesData } = await supabase.from("class_schedules").select("*, services(name), sedes(city)")

    setServices(servicesData || [])
    setSedes(sedesData || [])
    setSchedules(schedulesData || [])
    if (sedesData && sedesData.length > 0) {
      setSelectedSede(sedesData[0].id)
    }
    setLoading(false)
  }

  if (loading) return <div>Cargando...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Servicios Disponibles</h1>
        <p className="text-muted-foreground">Explora nuestras clases y servicios</p>
      </div>

      {/* Sede Selector */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Selecciona tu Sede</h2>
        <Tabs value={selectedSede} onValueChange={setSelectedSede}>
          <TabsList>
            {sedes.map((sede) => (
              <TabsTrigger key={sede.id} value={sede.id}>
                {sede.city}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Services Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Nuestros Servicios</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="hover:border-primary/50 transition">
              <CardHeader>
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-2xl font-bold">${service.price.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">por sesión</p>
                </div>
                <Button className="w-full">Inscribirse</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Class Schedules */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Horarios de Clases</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-semibold">Servicio</th>
                <th className="text-left py-4 px-4 font-semibold">Sede</th>
                <th className="text-left py-4 px-4 font-semibold">Hora</th>
                <th className="text-left py-4 px-4 font-semibold">Instructor</th>
                <th className="text-left py-4 px-4 font-semibold">Acción</th>
              </tr>
            </thead>
            <tbody>
              {schedules
                .filter((s) => s.sede_id === selectedSede)
                .map((schedule) => (
                  <tr key={schedule.id} className="border-b border-border hover:bg-card/50">
                    <td className="py-4 px-4">{schedule.services.name}</td>
                    <td className="py-4 px-4">{schedule.sedes.city}</td>
                    <td className="py-4 px-4">
                      {schedule.start_time} - {schedule.end_time}
                    </td>
                    <td className="py-4 px-4">{schedule.instructor}</td>
                    <td className="py-4 px-4">
                      <Button size="sm">Inscribirse</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
