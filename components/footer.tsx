import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full py-4 px-6 mx-auto my-6 max-w-5xl">
      <div className="bg-black text-white py-3 px-6 rounded-full flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          refocus
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/articles" className="text-lg hover:text-gray-300 transition-colors">
            Articles
          </Link>
          <Link href="/apps" className="text-lg hover:text-gray-300 transition-colors">
            Apps
          </Link>
          <span className="text-gray-400">© 2025</span>
        </div>
      </div>
    </footer>
  )
}
