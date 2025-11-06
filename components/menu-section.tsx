"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

const featuredHotpots = [
  {
    id: "lau-ga-den",
    name: "Lẩu Gà Đen Tây Bắc",
    shortDesc: "Tinh hoa ẩm thực núi rừng",
    priceFrom: 480000,
    image: "/lau-ga-den-tay-bac.jpg",
    hasDetailPage: true,
    badge: "Đặc sản",
  },
  {
    id: "lau-ca-tam",
    name: "Lẩu Cá Tầm",
    shortDesc: "Tươi ngon, thanh mát",
    priceFrom: 480000,
    image: "/lau-ca-tam.jpg",
    hasDetailPage: true,
    badge: "Đặc sản",
  },
  {
    id: "lau-thai",
    name: "Lẩu Thái Chua Cay",
    shortDesc: "Cay nồng mê hoặc, topping ngập nồi",
    priceFrom: 480000,
    image: "/lau-thai-chua-cay1.jpg",
    hasDetailPage: true,
    badge: "Đặc sản",
  },
  {
    id: "lau-rieu",
    name: "Lẩu Riêu Cua Bắp Bò",
    shortDesc: "Tươi ngon, topping ngập nồi",
    priceFrom: 480000,
    image: "/rieu-cua.jpg",
    hasDetailPage: true,
    badge: "Đặc sản",
  },
]

const menuItems = [
  {
    id: 1,
    name: "Gà Đen Tây Bắc",
    description: "Gà đen đặc sản vùng cao, thịt săn chắc, ngọt tự nhiên – ngon nhất khi nhúng lẩu hoặc nướng.",
    price: 140000,
    image: "/ga-den-tay-bac.png",
    category: "Lẩu",
  },
  {
    id: 2,
    name: "Trứng Non",
    description: "Trứng gà non tươi, béo bùi, thường dùng nhúng lẩu hoặc xào me.",
    price: 50000,
    image: "/trung-non.png",
    category: "Lẩu",
  },
  {
    id: 3,
    name: "Cá Tầm",
    description: "Thịt cá tầm dai ngọt, ít xương, thích hợp ăn lẩu hoặc nướng.",
    price: 120000,
    image: "/ca-tam.jpg",
    category: "Lẩu",
  },
  {
    id: 4,
    name: "Tôm Tươi",
    description: "Tôm tươi ngọt thịt, săn chắc, giữ trọn hương vị biển.",
    price: 95000,
    image: "/tom-tuoi.png",
    category: "Lẩu",
  },
  {
    id: 5,
    name: "Mực Tươi",
    description: "Mực tươi giòn ngọt, có thể nhúng lẩu hoặc chiên bơ tỏi.",
    price: 95000,
    image: "/muc-tuoi.png",
    category: "Lẩu",
  },
  {
    id: 6,
    name: "Ba Chỉ Bò",
    description: "Thịt bò ba chỉ mềm, xen chút mỡ tạo vị béo ngậy, nhúng lẩu cực ngon.",
    price: 95000,
    image: "/ba-chi-bo.png",
    category: "Lẩu",
  },
  {
    id: 7,
    name: "Gà Chọi",
    description: "Thịt gà săn chắc, thơm đậm đà, thích hợp cho món nướng hoặc nhúng lẩu.",
    price: 95000,
    image: "/ga-choi.png",
    category: "Lẩu",
  },
  {
    id: 8,
    name: "Xúc Xích",
    description: "Xúc xích nướng hoặc chiên giòn, thích hợp làm món ăn kèm hoặc nhắm bia.",
    price: 30000,
    image: "/xuc-xich.jpg",
    category: "Ăn chơi",
  },
  {
    id: 9,
    name: "Thanh Cua",
    description: "Thanh cua mềm ngọt, thơm nhẹ mùi hải sản, hợp ăn lẩu.",
    price: 40000,
    image: "/thanh-cua.png",
    category: "Lẩu",
  },
  {
    id: 10,
    name: "Bò Tươi",
    description: "Thịt bò tươi thái mỏng, mềm và ngọt tự nhiên.",
    price: 95000,
    image: "/bo-tuoi.png",
    category: "Lẩu",
  },
  {
    id: 11,
    name: "Sụn Heo",
    description: "Sụn heo giòn sật, ăn vui miệng, phù hợp cho món nướng hoặc nhúng lẩu.",
    price: 50000,
    image: "/sun-heo.jpg",
    category: "Lẩu",
  },
  {
    id: 12,
    name: "Bắp Bò",
    description: "Phần thịt bắp bò dai giòn, ít mỡ, vị ngọt đậm – rất hợp ăn lẩu.",
    price: 95000,
    image: "/bap-bo.png",
    category: "Lẩu",
  },
  {
    id: 13,
    name: "Đuôi Bò",
    description: "Giàu collagen, ninh mềm béo ngậy, dùng làm nước lẩu hoặc món hầm.",
    price: 95000,
    image: "/duoi-bo.png",
    category: "Lẩu",
  },
  {
    id: 14,
    name: "Riêu Cua",
    description: "Riêu cua đồng tươi, thơm béo, dùng làm nước lẩu đặc trưng vị Bắc.",
    price: 50000,
    image: "/rieu-cuaa.png",
    category: "Lẩu",
  },
  {
    id: 15,
    name: "Rau Muống",
    description: "Rau muống xanh giòn, tươi, hợp với mọi loại lẩu.",
    price: 10000,
    image: "/rau-muong.jpg",
    category: "Rau",
  },
  {
    id: 16,
    name: "Rau Chuối",
    description: "Rau chuối thái mỏng, chát nhẹ, giúp cân bằng vị béo.",
    price: 20000,
    image: "/rau-chuoi.jpg",
    category: "Rau",
  },
  {
    id: 17,
    name: "Rau Mồng Tơi",
    description: "Rau mồng tơi thanh mát, trơn nhẹ, giúp nước lẩu thêm ngọt.",
    price: 10000,
    image: "/rau-mong-toi.jpg",
    category: "Rau",
  },
  {
    id: 18,
    name: "Nấm Kim Châm",
    description: "Nấm kim châm giòn, dai nhẹ, hấp thu nước lẩu rất ngon.",
    price: 10000,
    image: "/nam-kim-cham.jpg",
    category: "Rau",
  },
  {
    id: 19,
    name: "Đậu Phụ",
    description: "Đậu phụ mềm béo, vàng ươm, thích hợp ăn lẩu hoặc chiên.",
    price: 15000,
    image: "/dau-phu.jpg",
    category: "Rau",
  },
  {
    id: 20,
    name: "Ngô Ngọt",
    description: "Ngô non tươi, ngọt dịu, làm nước lẩu thêm đậm vị.",
    price: 15000,
    image: "/ngo-ngot.jpg",
    category: "Rau",
  },
  {
    id: 21,
    name: "Đọt Mùng",
    description: "Đọt mùng giòn mát, giúp giảm độ ngấy của các món thịt.",
    price: 10000,
    image: "/dot-mung.webp",
    category: "Rau",
  },
  {
    id: 22,
    name: "Măng Chua",
    description: "Măng chua giòn ngon, chua dịu, đặc biệt hợp với lẩu riêu cua.",
    price: 40000,
    image: "/mang-chua.jpg",
    category: "Rau",
  },
  {
    id: 23,
    name: "Váng Đậu",
    description: "Váng đậu giòn tan khi nhúng, thơm mùi đậu nành tự nhiên.",
    price: 15000,
    image: "/vang-dau.jpg",
    category: "Rau",
  },
  {
    id: 24,
    name: "Ngải Cứu",
    description: "Ngải cứu vị đắng nhẹ, tốt cho sức khỏe, đặc biệt hợp lẩu gà.",
    price: 15000,
    image: "/ngai-cuu.jpg",
    category: "Rau",
  },
  {
    id: 25,
    name: "Giá Đỗ",
    description: "Giá đỗ giòn, thanh, giúp bữa ăn thêm tươi mát.",
    price: 15000,
    image: "/gia-do.jpg",
    category: "Rau",
  },
  {
    id: 26,
    name: "Cơm Rang Thập Cẩm",
    description: "Cơm rang vàng giòn, kết hợp hải sản, trứng, rau củ.",
    price: 50000,
    image: "/com-rang-thap-cam.jpg",
    category: "Ăn chơi",
  },
  {
    id: 27,
    name: "Cơm Rang Dưa Bò",
    description: "Cơm rang cùng dưa chua và thịt bò mềm thơm, đậm vị truyền thống.",
    price: 50000,
    image: "/com-rang-dua-bo.jpg",
    category: "Ăn chơi",
  },
  {
    id: 28,
    name: "Cơm Rang Hải Sản",
    description: "Cơm rang cùng tôm, mực, thanh cua – vị biển đậm đà.",
    price: 50000,
    image: "/com-rang-hai-san.jpg",
    category: "Ăn chơi",
  },
  {
    id: 29,
    name: "Chân Gà Xả Tắc",
    description: "Chân gà ngâm chua cay, giòn sần sật, vị xả ớt kích thích vị giác.",
    price: 80000,
    image: "/chan-ga-xa-tac.jpg",
    category: "Ăn chơi",
  },
  {
    id: 30,
    name: "Khoai Lang Kén",
    description: "Khoai nghiền chiên vàng, giòn ngoài mềm trong, vị ngọt bùi.",
    price: 30000,
    image: "/khoai-lang-ken.jpg",
    category: "Ăn chơi",
  },
  {
    id: 31,
    name: "Ngô Chiên",
    description: "Ngô ngọt chiên bơ giòn tan, thơm nức mũi, ăn vui miệng.",
    price: 30000,
    image: "/ngo-chien.png",
    category: "Ăn chơi",
  },
]

export function MenuSection() {
  const [visibleCount, setVisibleCount] = useState(12)
  const { addItem } = useCart()

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4)
  }

  const handleQuickOrder = (item: (typeof menuItems)[0]) => {
    addItem({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })
  }

  const visibleItems = menuItems.slice(0, visibleCount)
  const remainingCount = menuItems.length - visibleCount

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Lẩu Đặc Sản</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Khám phá 4 món lẩu đặc sắc được chế biến từ nguyên liệu tươi ngon, phục vụ từ 2-6 người
            </p>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory max-w-full">
            {featuredHotpots.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full md:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] snap-center"
              >
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 h-full">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {item.badge}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-2xl mb-1 text-balance">{item.name}</h3>
                      <p className="text-sm text-white/90">{item.shortDesc}</p>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-card">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Giá từ</p>
                        <span className="text-2xl font-bold text-primary">
                          {item.priceFrom.toLocaleString("vi-VN")}đ
                        </span>
                        <p className="text-xs text-muted-foreground mt-2">Nhiều set lựa chọn cho 2-6 người</p>
                      </div>
                      <Link href={`/product/${item.id}`}>
                        <Button
                          size="lg"
                          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-auto px-3 py-2"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Thực Đơn Đa Dạng</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Khám phá đa dạng món ăn kèm lẩu và đồ ăn vặt cho bữa ăn thêm trọn vị
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleItems.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                      {item.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4 bg-card flex flex-col flex-1">
                  <h3 className="font-bold text-base mb-2 text-foreground line-clamp-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">{item.description}</p>
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
                    <span className="text-lg font-bold text-primary">{item.price.toLocaleString("vi-VN")}đ</span>
                    <Button
                      onClick={() => handleQuickOrder(item)}
                      size="sm"
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-1"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Đặt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {remainingCount > 0 && (
            <div className="text-center mt-12">
              <Button
                onClick={handleShowMore}
                size="lg"
                variant="outline"
                className="min-w-[200px] bg-transparent border-primary text-primary hover:bg-primary/5"
              >
                Xem thêm món ({remainingCount} món)
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
