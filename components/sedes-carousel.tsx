"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

const sedes = [
  {
    id: 1,
    ciudad: "Bogotá",
    direccion: "Cra 7 #125-26, Usaquén",
    telefono: "+57 (1) 629-2000",
    horario: "Lunes - Domingo: 6AM - 10PM",
    image: "/gym-bogota-fitness-center.jpg",
    features: ["Área CrossFit", "Cardio", "Pesas"],
  },
  {
    id: 2,
    ciudad: "Medellín",
    direccion: "Cra 43A #5-96, Laureles",
    telefono: "+57 (4) 444-2000",
    horario: "Lunes - Domingo: 6AM - 10PM",
    image: "/gym-medellin-modern-fitness.jpg",
    features: ["Piscina", "Sauna", "Spinning"],
  },
  {
    id: 3,
    ciudad: "Barranquilla",
    direccion: "Cra 53 #72-12, Altos",
    telefono: "+57 (5) 385-2000",
    horario: "Lunes - Domingo: 6AM - 10PM",
    image: "/gym-barranquilla-tropical-fitness.jpg",
    features: ["Yoga Studio", "Zumba", "Boxeo"],
  },
  {
    id: 4,
    ciudad: "Cartagena",
    direccion: "Cra 2 #2-01, Centro",
    telefono: "+57 (5) 664-2000",
    horario: "Lunes - Domingo: 6AM - 10PM",
    image: "/gym-cartagena-caribbean-fitness.jpg",
    features: ["Personal Training", "Nutrición", "Terapia"],
  },
]

export default function SedesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [rotation, setRotation] = useState(0)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (!isAutoPlay) return

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sedes.length)
      setRotation((prev) => prev + 90)
    }, 5000)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isAutoPlay])

  const handlePrev = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev - 1 + sedes.length) % sedes.length)
    setRotation((prev) => prev - 90)
    setTimeout(() => setIsAutoPlay(true), 1000)
  }

  const handleNext = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => (prev + 1) % sedes.length)
    setRotation((prev) => prev + 90)
    setTimeout(() => setIsAutoPlay(true), 1000)
  }

  const currentSede = sedes[currentIndex]

  return (
    <div className="w-full py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">NUESTRAS SEDES</h2>
        <p className="text-center text-muted-foreground mb-16">
          Visita nuestras modernas instalaciones en las principales ciudades de Colombia
        </p>

        {/* 3D Carousel Container */}
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          {/* 3D Card Display */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div
              className="w-80 h-96 md:w-96 md:h-[480px] relative"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Carousel Cards with 3D Transform */}
              <div
                className="w-full h-full relative transition-transform duration-700"
                style={{
                  transform: `rotateY(${rotation}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {sedes.map((sede, index) => {
                  const angle = (index * 90) % 360
                  const isVisible = index === currentIndex

                  return (
                    <div
                      key={sede.id}
                      className="absolute w-full h-full"
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(200px)`,
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <div
                        className={`w-full h-full rounded-xl overflow-hidden transition-all duration-500 ${
                          isVisible ? "opacity-100" : "opacity-40"
                        }`}
                        style={{
                          backgroundImage: `url('${sede.image}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="w-full h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                          <h3 className="text-3xl font-bold mb-2">{sede.ciudad}</h3>
                          <p className="text-sm opacity-80">{sede.direccion}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-3xl font-bold mb-4">{currentSede.ciudad}</h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">Dirección</p>
                    <p className="text-foreground">{currentSede.direccion}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-primary mt-1 flex-shrink-0">📞</div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="text-foreground">{currentSede.telefono}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-primary mt-1 flex-shrink-0">🕐</div>
                  <div>
                    <p className="text-sm text-muted-foreground">Horario</p>
                    <p className="text-foreground text-sm">{currentSede.horario}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-3">Servicios disponibles</p>
                <div className="flex flex-wrap gap-2">
                  {currentSede.features.map((feature, idx) => (
                    <span key={idx} className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6">
                Visitar Sede
              </Button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button
                onClick={handlePrev}
                variant="outline"
                size="icon"
                className="w-12 h-12 border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Indicators */}
              <div className="flex items-center gap-2">
                {sedes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsAutoPlay(false)
                      setCurrentIndex(idx)
                      setRotation(idx * 90)
                      setTimeout(() => setIsAutoPlay(true), 1000)
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentIndex ? "bg-primary w-8" : "bg-border hover:bg-border/80"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                variant="outline"
                size="icon"
                className="w-12 h-12 border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
