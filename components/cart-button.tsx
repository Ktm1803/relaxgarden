"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import { BookingModal } from "./booking-modal"

export function CartButton() {
  const { totalItems } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-accent hover:bg-accent/90 text-accent-foreground relative"
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Giỏ hàng
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </Button>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
