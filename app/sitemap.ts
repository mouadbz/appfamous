import { getAllArticles } from "@/lib/mdx"
import type { MetadataRoute } from "next"
import { siteConfig, getCanonicalUrl } from "@/lib/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const articleUrls = articles.map((article) => ({
    url: getCanonicalUrl(`/articles/${article.slug}`),
    lastModified: article.date ? new Date(article.date) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: getCanonicalUrl("/articles"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...articleUrls,
  ]
}
