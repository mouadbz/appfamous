import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Article } from "@/lib/mdx"

interface RecentBlogsProps {
  articles: Article[]
}

export default function RecentBlogs({ articles }: RecentBlogsProps) {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
          <p className="text-lg text-gray-600">Stay updated with the latest iOS design trends and tutorials</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group hover:shadow-lg transition-shadow rounded-lg overflow-hidden bg-white border"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={article.image || "/placeholder.svg?height=192&width=384&query=iOS app design"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {article.featured && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">{article.title}</h3>
                {article.description && <p className="text-gray-600 text-sm line-clamp-2">{article.description}</p>}
                {article.date && (
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/articles">
            <Button variant="outline" size="lg" className="rounded-full bg-transparent">
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
