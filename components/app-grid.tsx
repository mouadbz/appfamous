import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { AppShowcase } from "@/lib/apps"

interface AppGridProps {
  apps: AppShowcase[]
}

export default function AppGrid({ apps }: AppGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {apps.map((app) => (
        <Link key={app.slug} href={`/apps/${app.slug}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={app.icon || "/placeholder.svg?height=64&width=64"}
                    alt={`${app.name} icon`}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1 truncate">{app.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{app.tagline}</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {app.category}
                    </span>
                    {app.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{app.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {app.screenshots.length > 0 && (
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={app.screenshots[0] || "/placeholder.svg"}
                    alt={`${app.name} screenshot`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <p className="text-sm text-gray-600 line-clamp-3">{app.description}</p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-sm font-medium text-green-600">{app.price}</span>
                {app.downloadCount && <span className="text-xs text-gray-500">{app.downloadCount} downloads</span>}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
