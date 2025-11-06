import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, Percent, Star, Truck } from "lucide-react"

const promotions = [
  {
    id: 1,
    title: "Giảm 5% khi đặt bàn online",
    description: "Áp dụng cho tất cả các khách hàng đầu tiên trên toàn hệ thống",
    icon: Percent,
    color: "text-accent",
  },
  {
    id: 2,
    title: "Ship toàn Thọ Xuân - Lẩu Riêu Cua Băp Bò Chỉ Từ 480K",
    description: "Miễn phí ship cho đơn hàng bán kính dưới 5KM",
    icon: Truck,
    color: "text-secondary",
  },
  {
    id: 3,
    title: "Tích điểm đổi quà",
    description: "Mỗi 1000K tích 1 điểm, đổi quà hấp dẫn",
    icon: Star,
    color: "text-primary",
  },
]

export function PromotionsSection() {
  return (
    <section id="promotions" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Ưu đãi đặc biệt</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nhiều chương trình khuyến mãi hấp dẫn dành cho khách hàng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {promotions.map((promo) => {
            const Icon = promo.icon
            return (
              <Card key={promo.id} className="text-center hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Icon className={`w-8 h-8 ${promo.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">{promo.title}</h3>
                  <p className="text-muted-foreground">{promo.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="relative rounded-2xl overflow-hidden">
          <img src="/vietnamese-restaurant-food-spread-with-hotpot-and-.jpg" alt="Promotional banner" className="w-full h-[400px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Đặt bàn ngay hôm nay</h3>
                <p className="text-lg text-primary-foreground/90 mb-6">
                  Nhận ngay ưu đãi 5% cho lần đặt bàn đầu tiên qua website
                </p>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                  Đặt bàn ngay
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
