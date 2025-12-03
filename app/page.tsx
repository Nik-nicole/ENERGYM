"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Hero from "@/components/hero"
import SedesCarousel from "@/components/sedes-carousel"
import PlanesSection from "@/components/plans-section"
import ServiciosSection from "@/components/servicios-section"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <img src="/logo Gym.png" alt="Gym Logo" className="h-12 w-auto rounded-lg">

          </img>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="#sedes" className="text-sm hover:text-primary transition">
              SEDES
            </Link>
            <Link href="#planes" className="text-sm hover:text-primary transition">
              PLANES
            </Link>
            <Link href="#servicios" className="text-sm hover:text-primary transition">
              SERVICIOS
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Auth Button */}
          <Link href="/auth/login" className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90">PLANES</Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-4 py-4 space-y-4">
              <Link href="#sedes" className="block text-sm hover:text-primary">
                SEDES
              </Link>
              <Link href="#planes" className="block text-sm hover:text-primary">
                PLANES
              </Link>
              <Link href="#servicios" className="block text-sm hover:text-primary">
                SERVICIOS
              </Link>
              <Link href="/auth/login" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90">PLANES</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Sedes Section with 3D Carousel */}
      <section id="sedes" className="bg-background py-12">
        <SedesCarousel />
      </section>

      {/* Planes Section */}
      <section id="planes" className="bg-card/50 py-12">
        <PlanesSection />
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="bg-background py-12">
        <ServiciosSection />
      </section>
    </div>
  )
}
