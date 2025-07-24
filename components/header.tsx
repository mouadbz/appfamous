import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-2 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-black text-white py-2 px-6 rounded-full flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            refocus
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/articles" className="text-lg hover:text-gray-300 transition-colors">
              Articles
            </Link>
            <Link href="/apps">
              <Button variant="secondary" size="sm" className="rounded-full">
                Apps
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
