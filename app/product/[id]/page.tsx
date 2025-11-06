"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { ArrowLeft, Check, ShoppingCart, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"
import { BookingModal } from "@/components/booking-modal"

const productData = {
  "lau-ga-den": {
    id: "lau-ga-den",
    name: "Lẩu Gà Đen Tây Bắc",
    subtitle: "Tinh Hoa Ẩm Thực Núi Rừng",
    description:
      "Lẩu gà đen Tây Bắc mang trong mình tinh thần của núi rừng đại ngàn: đậm đà, dân dã nhưng đầy quyến rũ. Gà đen săn chắc, hầm cùng các loại rau rừng và thảo mộc tạo nên nước dùng ngọt thanh, dậy mùi thơm đặc trưng. Sốt chẩm chéo đậm vị Tây Bắc khiến từng miếng thịt thêm dậy hương và bùng nổ vị giác.",
    image: "/lau-ga-den-tay-bac.jpg",
    sets: [
      {
        id: "set-480k",
        name: "SET 480K",
        price: 480000,
        servings: "2-3 người",
        highlight:
          "Set cơ bản nhưng vẫn đầy đủ nguyên liệu đặc trưng, thích hợp cho nhóm nhỏ muốn trải nghiệm hương vị Tây Bắc nguyên bản.",
        ingredients: [
          "Gà đen nguyên con ~1,7kg",
          "Đồ nấu nước lẩu gà + sốt chấm chéo chuẩn vị Tây Bắc",
          "Nấm kim, ngô ngọt, cải thảo, cà rốt, lá nãi cứu",
          "Rau rừng tươi theo mùa",
          "Mì tôm thả lẩu",
        ],
      },
      {
        id: "set-680k",
        name: "SET 680K",
        price: 680000,
        servings: "4-5 người",
        highlight: "Nhiều topping hấp dẫn, tăng vị béo và bổ dưỡng – phù hợp cho gia đình hoặc nhóm đông người.",
        ingredients: [
          "Gà đen H'Mông tươi ngon ~1,7kg",
          "Thêm tràng trứng, trứng vịt lộn, tim heo",
          "Nhiều loại nấm hơn: nấm kim, nấm hương",
          "Rau củ thêm ngô ngọt, cải thảo, cà rốt",
          "Váng đậu, cá rô (tùy thời điểm)",
          "Rau rừng (phong phú theo mùa), mì tôm thả lẩu",
        ],
      },
    ],
  },
  "lau-ca-tam": {
    id: "lau-ca-tam",
    name: "Lẩu Cá Tầm",
    subtitle: "Tươi Ngon, Thanh Mát",
    description:
      "Lẩu cá tầm nổi bật bởi vị chua nhẹ của măng, vị ngọt từ cá tươi và rau củ. Cá tầm được sơ chế kỹ càng nên không tanh, thịt chắc ngọt, khi nấu lên hòa quyện cùng nước dùng chua cay tạo nên món lẩu thanh thanh, dễ ăn mà vẫn đậm đà.",
    image: "/lau-ca-tam.jpg",
    sets: [
      {
        id: "set-480k",
        name: "SET 480K",
        price: 480000,
        servings: "2-3 người",
        highlight: "Nhẹ nhàng, không quá cay – lý tưởng cho bữa ăn gia đình hoặc người ăn nhạt.",
        ingredients: [
          "Cá tầm tươi 1kg, chả cá viên",
          "Nước lẩu măng chua cay",
          "Đậu phụ, nấm kim, ngô ngọt, cà rốt, đậu bắp",
          "Hoa chuối, rau rừng (tùy thời điểm), cải thảo",
          "Mì tôm ăn kèm",
        ],
      },
      {
        id: "set-680k",
        name: "SET 680K",
        price: 680000,
        servings: "4-5 người",
        highlight: "Nhiều thịt cá hơn, nguyên liệu đa dạng – phục vụ nhóm lớn, tăng trải nghiệm no đủ và chất lượng.",
        ingredients: [
          "Cá tầm tươi 1,5kg (thịt nhiều hơn)",
          "Chả cá viên cao cấp",
          "Nước lẩu măng chua cay đậm đà",
          "Đậu phụ, nấm kim, nấm hương, ngô ngọt, cà rốt, đậu bắp",
          "Hoa chuối, rau xanh, rau rừng nhiều hơn, cải thảo",
          "Mì tôm ăn kèm",
        ],
      },
    ],
  },
  "lau-thai": {
    id: "lau-thai",
    name: "Lẩu Thái Chua Cay",
    subtitle: "Cay Nồng Mê Hoặc, Topping Ngập Nồi",
    description:
      "Đây là món lẩu 'quốc dân' được yêu thích bởi vị chua cay đặc trưng, mùi thơm của sả, lá chanh, ớt và nước cốt chanh. Nước lẩu đậm đà, ăn kèm các loại hải sản, bò, gà… khiến bữa ăn bùng nổ vị giác và không bao giờ nhàm chán.",
    image: "/lau-thai-chua-cay1.jpg",
    sets: [
      {
        id: "set-480k",
        name: "SET 480K",
        price: 480000,
        servings: "2-3 người",
        highlight: "Đầy đủ vị – cay, ngọt, béo, thơm. Phù hợp cho nhóm nhỏ yêu thích vị Thái đúng điệu.",
        ingredients: [
          "Gà, bò, tôm, mực, chả cá, thanh cua, ba chỉ bò Mỹ",
          "Sụn heo, đậu phụ, rau củ, nấm kim, cải thảo, rau muống",
          "Sốt Thái, sốt hải sản, tương ớt, nước chấm",
          "Mì tôm và rau rừng theo mùa",
        ],
      },
      {
        id: "set-780k",
        name: "SET 780K",
        price: 780000,
        servings: "4-6 người",
        highlight:
          "Nguyên liệu cao cấp hơn, topping nhiều gấp đôi – dành cho nhóm bạn hoặc gia đình muốn một nồi lẩu 'ngập topping', đậm đà, cay đúng vị Thái.",
        ingredients: [
          "Gà pha chọi, bò tươi, tôm tươi, mực lá, cá lăng",
          "Ngọc kê, tim heo – tăng độ bổ dưỡng",
          "Ba chỉ bò Mỹ, thanh cua, đậu phụ",
          "Rau củ, nấm kim, ngô ngọt, cải thảo, rau muống, rau rừng",
          "Combo nước lẩu Thái + nước chấm + sốt hải sản",
        ],
      },
    ],
  },
   "lau-rieu": {
    id: "lau-rieu",
    name: "Lẩu Riêu Cua Băp Bò",
    subtitle: "Tươi Ngon, Topping Ngập Nồi",
    description:
      "Lẩu riêu cua bắp bò là sự hòa quyện tuyệt vời giữa vị ngọt thanh tự nhiên của nước riêu cua truyền thống và sự béo ngậy, mềm thơm của bắp bò, sụn bò. Nước lẩu đậm đà, thoảng hương chua nhẹ từ cà chua và riêu cua, ăn kèm rau tươi, nấm, đậu và chấm chéo đậm đà – tất cả tạo nên một nồi lẩu vừa dân dã, vừa tinh tế, hấp dẫn mọi thực khách.",
    image: "/rieu-cua.jpg",
    sets: [
      {
        id: "set-480k",
        name: "SET 480K",
        price: 480000,
        servings: "2-3 người",
        highlight: "Set cơ bản, đầy đủ các thành phần chuẩn vị lẩu riêu cua truyền thống, thích hợp cho nhóm nhỏ muốn thưởng thức bữa ăn đậm đà, trọn vị.",
        ingredients: [
          "Sụn bò, bắp bò, 3 chỉ bò",
          "Sụn heo, đậu phụ, rau củ, nấm kim, cải thảo, rau muống, hoa chuối",
          "Đậu bọ, bầu (hoặc mướp), riêu cua",
          "Mì tôm và rau rừng theo mùa",
        ],
      },
      {
        id: "set-680k",
        name: "SET 680K",
        price: 680000,
        servings: "4-6 người",
        highlight:
          "Nhiều topping thịt và rau hơn, có thêm đuôi bò, sách bò, chả/ bò viên – mang lại trải nghiệm tròn vị, thích hợp cho nhóm đông hoặc bữa tiệc gia đình ấm cún.",
        ingredients: [
          "Sụn bò, bắp bò, 3 chỉ bò, đuôi bò",
          "Sụn heo, đậu phụ, rau củ, nấm kim, cải thảo, rau muống, hoa chuối",
          "Đậu bọ, bầu (hoặc mướp), riêu cua",
          "Mì tôm và rau rừng theo mùa",
          "Sách bò – topping đặc biệt giúp tăng độ giòn dai và đậm đà",
          "Chả/ bò viên",
        ],
      },
    ],
  },
}

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  const product = productData[id as keyof typeof productData]
  const { addItem } = useCart()
  const [selectedSet, setSelectedSet] = useState(product?.sets[0])
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
          <Link href="/">
            <Button>Về trang chủ</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (selectedSet) {
      addItem({
        id: `${product.id}-${selectedSet.id}`,
        name: `${product.name} - ${selectedSet.name}`,
        price: selectedSet.price,
        image: product.image,
      })
    }
  }

  const handleBookNow = () => {
    if (selectedSet) {
      addItem({
        id: `${product.id}-${selectedSet.id}`,
        name: `${product.name} - ${selectedSet.name}`,
        price: selectedSet.price,
        image: product.image,
      })
      setIsBookingModalOpen(true)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Link href="/#menu">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại menu
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{product.name}</h1>
              <p className="text-xl text-primary font-semibold">{product.subtitle}</p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Set Selection */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Chọn Set</h3>
              <div className="grid gap-4">
                {product.sets.map((set) => (
                  <Card
                    key={set.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedSet?.id === set.id
                        ? "border-primary border-2 shadow-lg"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedSet(set)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-bold text-foreground">{set.name}</h4>
                          <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <Users className="w-4 h-4" />
                            <span>{set.servings}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">{set.price.toLocaleString("vi-VN")}đ</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">{set.highlight}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-lg py-6 bg-transparent"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Thêm vào giỏ
              </Button>
              <Button
                size="lg"
                className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={handleBookNow}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Đặt bàn ngay
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-3">
              {selectedSet?.price.toLocaleString("vi-VN")}đ - {selectedSet?.servings}
            </p>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="bg-card rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Thành phần {selectedSet?.name}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {selectedSet?.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-card-foreground">{ingredient}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-foreground">
              <strong>Điểm nổi bật:</strong> {selectedSet?.highlight}
            </p>
          </div>
        </div>
      </div>

      <Footer />

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </main>
  )
}
