import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Master iOS App Design
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Discover the latest trends, techniques, and best practices for creating stunning iOS applications. From UI/UX
          principles to implementation guides.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/articles">
            <Button size="lg" className="rounded-full px-8">
              Explore Articles
            </Button>
          </Link>
          <Link href="/apps">
            <Button variant="outline" size="lg" className="rounded-full px-8 bg-transparent">
              Apps
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
