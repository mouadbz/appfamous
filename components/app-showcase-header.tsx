import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, Download } from "lucide-react"
import type { AppShowcase } from "@/lib/apps"

interface AppShowcaseHeaderProps {
  app: AppShowcase
}

export default function AppShowcaseHeader({ app }: AppShowcaseHeaderProps) {
  return (
    <div className="mb-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={app.icon || "/placeholder.svg?height=128&width=128"}
            alt={`${app.name} icon`}
            fill
            className="object-cover rounded-3xl shadow-lg"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold">{app.name}</h1>
            <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">{app.category}</span>
          </div>

          <p className="text-xl text-gray-600 mb-4">{app.tagline}</p>
          <p className="text-gray-700 mb-6 max-w-2xl">{app.description}</p>

          <div className="flex items-center gap-4 mb-6">
            {app.rating && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(app.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{app.rating}</span>
              </div>
            )}

            {app.downloadCount && (
              <div className="flex items-center gap-1">
                <Download className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{app.downloadCount}</span>
              </div>
            )}

            <span className="text-lg font-semibold text-green-600">{app.price}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {app.appStoreUrl && (
              <Link href={app.appStoreUrl} target="_blank" rel="noopener noreferrer">
                <Button className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  App Store
                </Button>
              </Link>
            )}

            {app.githubUrl && (
              <Link href={app.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Github className="w-4 h-4" />
                  GitHub
                </Button>
              </Link>
            )}

            {app.websiteUrl && (
              <Link href={app.websiteUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <ExternalLink className="w-4 h-4" />
                  Website
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
