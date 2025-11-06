"use client"

import { useState } from "react"
import { Menu, Phone, X } from "lucide-react"
import { CartButton } from "@/components/cart-button"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="text-2xl font-bold text-primary-foreground hover:text-accent transition-colors cursor-pointer">
                RelaxGarden
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#menu" className="text-primary-foreground hover:text-accent transition-colors">
                Thực đơn
              </a>

              <a href="#promotions" className="text-primary-foreground hover:text-accent transition-colors">
                Ưu đãi
              </a>
              <a href="#contact" className="text-primary-foreground hover:text-accent transition-colors">
                Liên hệ
              </a>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <a
                href="tel:0356709536"
                className="hidden sm:flex items-center gap-2 text-primary-foreground hover:text-accent transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold">0356709536</span>
              </a>
              <CartButton />
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-primary-foreground">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-primary-foreground/10">
              <div className="flex flex-col gap-4">
                <a href="#menu" className="text-primary-foreground hover:text-accent transition-colors">
                  Thực đơn
                </a>
                <a href="#promotions" className="text-primary-foreground hover:text-accent transition-colors">
                  Ưu đãi
                </a>
                <a href="#contact" className="text-primary-foreground hover:text-accent transition-colors">
                  Liên hệ
                </a>
                <a
                  href="tel:0356709536"
                  className="flex items-center gap-2 text-primary-foreground hover:text-accent transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-semibold">Hotline: 0356709536</span>
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  )
}
