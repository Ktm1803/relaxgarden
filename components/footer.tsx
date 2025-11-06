import { Facebook, Instagram, Youtube, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img
  src="/logo-relaxgarden.jpg"
  alt="RelaxGarden Logo"
  className="h-28 mb-4"
/>

            <p className="text-primary-foreground/80 mb-4">Không gian xanh mát - Nơi bạn thư giãn và tận hưởng</p>
            <div className="flex gap-4">
              <a href="https://web.facebook.com/share/1BpL9XgyWw/?mibextid=wwXIfr&_rdc=1&_rdr" className="hover:text-accent transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Liên kết</h4>
            <ul className="space-y-2">
              <li>
                <a href="#menu" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Thực đơn
                </a>
              </li>
              <li>
                <a href="#promotions" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Ưu đãi
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Hotline</p>
                  <a href="tel:*0356709536" className="text-primary-foreground/80 hover:text-accent transition-colors">
                    0356709536
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a
                    href="mailto:info@emai.com"
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    info@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Giờ mở cửa</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Thứ 2 - Thứ 6: 11:00 - 23:00</li>
              <li>Thứ 7 - Chủ nhật: 10:00 - 23:30</li>
              <li className="text-accent font-semibold">Phục vụ cả ngày lễ</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2025 RelaxGarden. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
