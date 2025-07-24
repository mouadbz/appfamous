import Link from "next/link"
import Image from "next/image"
import type { Article } from "@/lib/mdx"

interface ArticleListProps {
  articles: Article[]
  basePath?: string // Allow custom base path for apps
}

export default function ArticleList({ articles, basePath = "/articles" }: ArticleListProps) {
  return (
    <div className="space-y-8">
      {articles.map((article) => (
        <Link
          key={article.slug}
          href={`${basePath}/${article.slug}`}
          className="flex gap-5 items-center hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          <div className="w-16 h-16 relative flex-shrink-0">
            <Image
              src={article.image || "/placeholder.svg?height=64&width=64&query=iOS app"}
              alt={article.title}
              fill
              className={`object-cover ${basePath === "/apps" ? "rounded-xl" : "rounded-lg"}`}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">{article.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  )
}
