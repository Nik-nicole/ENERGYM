"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
        >
          <source src="/sony-a7iv.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">SUBE TU NIVEL</h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-12 tracking-wide">
          TRANSFORMA TU CUERPO, SUPERA TUS LÍMITES, EMPIEZA HOY
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/login">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-6 text-base font-semibold">
              COMPARAR PLAN
            </Button>
          </Link>
          <Link href="#servicios">
            <Button
              variant="outline"
              className="border-secondary text-foreground hover:bg-secondary/10 px-8 py-6 text-base font-semibold bg-transparent"
            >
              NUEVOS SERVICIOS
            </Button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-secondary" />
        </div>
      </div>
    </div>
  )
}
