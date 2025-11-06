import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone } from "lucide-react"

const locations = [
  { id: 1, address: tây hồ", district: "thọ xuân", phone: "*1986" }
]

export function LocationsSection() {
  return (
    <section id="locations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Hệ thống cơ sở</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cơ sở RELAXGADEN Thọ Xuân - Luôn sẵn sàng phục vụ quý khách
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <Card key={location.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg text-card-foreground mb-1">{location.address}</h3>
                    <p className="text-sm text-muted-foreground">{location.district}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${location.phone}`} className="font-semibold hover:underline">
                    {location.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
