"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Minus, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { useCart } from "@/contexts/cart-context"
import { Card, CardContent } from "@/components/ui/card"

const locations = ["Ăn tại quán", "Ship tận nhà"]

const timeSlots = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
]

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    guests: "2",
    time: "",
    notes: "",
    address: "",
  })
  const { items, updateQuantity, removeItem, totalAmount, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [phoneError, setPhoneError] = useState("")

  const validatePhone = (phone: string): boolean => {
    // Vietnamese phone format: 10 digits starting with 0, or 9 digits without 0
    const phoneRegex = /^(0|\+84)?[3|5|7|8|9][0-9]{8}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value })
    if (value && !validatePhone(value)) {
      setPhoneError("Vui lòng nhập đúng số điện thoại (10 số, bắt đầu bằng 0)")
    } else {
      setPhoneError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePhone(formData.phone)) {
      setPhoneError("Vui lòng nhập đúng số điện thoại (10 số, bắt đầu bằng 0)")
      return
    }

    if (items.length === 0) {
      alert("Vui lòng chọn món ăn trước khi đặt hàng!")
      return
    }

    if (!date || !formData.location || !formData.time) {
      alert("Vui lòng điền đầy đủ thông tin đặt bàn!")
      return
    }

    if (formData.location === "Ship tận nhà" && !formData.address.trim()) {
      alert("Vui lòng nhập địa chỉ giao hàng!")
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        guests: formData.guests,
        date: format(date, "dd/MM/yyyy", { locale: vi }),
        time: formData.time,
        notes: formData.notes,
        address: formData.location === "Ship tận nhà" ? formData.address : undefined,
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        })),
        totalAmount,
        orderTime: new Date().toISOString(),
      }

      console.log("[v0] Submitting order:", orderData)

      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()
      console.log("[v0] Order response:", result)

      if (!result.success) {
        throw new Error(result.message || "Không thể gửi đơn hàng")
      }

      clearCart()
      alert("Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm.")
      onClose()

      setFormData({
        name: "",
        phone: "",
        location: "",
        guests: "2",
        time: "",
        notes: "",
        address: "",
      })
      setDate(undefined)
    } catch (error) {
      console.error("[v0] Error submitting order:", error)
      const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra"
      alert(`${errorMessage}\n\nVui lòng thử lại hoặc gọi hotline: 0356709536`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Đặt hàng & Đặt bàn</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Giỏ hàng của bạn</h3>
            {items.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  Chưa có món ăn nào. Vui lòng chọn món từ thực đơn.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm line-clamp-2">{item.name}</h4>
                          <p className="text-primary font-bold">{item.price.toLocaleString("vi-VN")}đ</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-7 w-7 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-7 w-7 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeItem(item.id)}
                              className="h-7 w-7 p-0 ml-auto"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="bg-accent/10">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Tạm tính:</span>
                      <span className="font-bold text-2xl text-primary">{totalAmount.toLocaleString("vi-VN")}đ</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Thông tin của bạn</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nhập họ tên"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="Nhập số điện thoại (VD: 0912345678)"
                    className={phoneError ? "border-red-500" : ""}
                  />
                  {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Thông tin đặt bàn</h3>

              <div className="space-y-2">
                <Label htmlFor="location">Lựa chọn dịch vụ *</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dịch vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.location === "Ship tận nhà" && (
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Nhập địa chỉ giao hàng"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guests">Số lượng khách *</Label>
                  <Select
                    value={formData.guests}
                    onValueChange={(value) => setFormData({ ...formData, guests: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(20)].map((_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1)}>
                          {i + 1} người
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ngày đặt *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "dd/MM/yyyy", { locale: vi }) : "Chọn ngày"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Giờ đến *</Label>
                  <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Ghi chú</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Yêu cầu đặc biệt (nếu có)"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Huỷ
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={isSubmitting || items.length === 0}
              >
                {isSubmitting ? "Đang xử lý..." : "Đặt hàng ngay"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
