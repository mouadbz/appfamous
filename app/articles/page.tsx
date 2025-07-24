import Header from "@/components/header"
import ArticleList from "@/components/article-list"
import Footer from "@/components/footer"
import { getAllArticles } from "@/lib/mdx"
import type { Metadata } from "next"
import { siteConfig, getCanonicalUrl } from "@/lib/config"

export const metadata: Metadata = {
  title: "Articles - iOS App Design Tutorials & Guides | refocus",
  description:
    "Browse all articles about iOS app design and development. Learn from comprehensive tutorials, design patterns, and best practices for creating stunning iOS applications.",
  keywords: ["iOS tutorials", "app design articles", "mobile UI guides", "iOS development tips"],
  alternates: {
    canonical: getCanonicalUrl("/articles"),
  },
  openGraph: {
    title: "Articles - iOS App Design Tutorials & Guides",
    description:
      "Browse all articles about iOS app design and development. Comprehensive tutorials and best practices.",
    url: getCanonicalUrl("/articles"),
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-articles.png`,
        width: 1200,
        height: 630,
        alt: "iOS App Design Articles",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles - iOS App Design Tutorials & Guides",
    description: "Browse all articles about iOS app design and development.",
    images: [`${siteConfig.url}/og-articles.png`],
  },
}

export default function ArticlesPage() {
  const articles = getAllArticles()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "iOS App Design Articles",
    description: "Collection of articles about iOS app design and development",
    url: getCanonicalUrl("/articles"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          headline: article.title,
          description: article.description,
          url: getCanonicalUrl(`/articles/${article.slug}`),
          datePublished: article.date,
        },
      })),
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-12">Articles</h1>
          <div className="max-w-2xl mx-auto">
            <ArticleList articles={articles} />
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
