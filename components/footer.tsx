import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full py-4 px-4 mx-auto my-6 max-w-5xl">
      <div className="bg-black text-white py-3 px-4 md:px-6 rounded-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <Link href="/" className="text-xl md:text-2xl font-bold">
          AppsGalleria.com
        </Link>
        <div className="flex items-center gap-4 md:gap-6 text-sm md:text-lg">
          <Link href="/articles" className="hover:text-gray-300 transition-colors">
            Articles
          </Link>
          <Link href="/apps" className="hover:text-gray-300 transition-colors">
            Apps
          </Link>
          <span className="text-gray-400 text-xs md:text-sm">© 2025</span>
        </div>
      </div>
    </footer>
  )
}
