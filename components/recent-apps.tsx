import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getFeaturedApps } from "@/lib/content-config"

export default function RecentApps() {
  const featuredApps = getFeaturedApps()

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured App Showcases</h2>
          <p className="text-lg text-gray-600">Explore our latest iOS app design showcases and case studies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredApps.map((app) => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Link href={app.link || "#"}>
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={app.image || "/placeholder.svg?height=80&width=80"}
                      alt={app.name}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg hover:text-blue-600 transition-colors">{app.name}</h3>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
