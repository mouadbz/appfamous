import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { homepageArticlesConfig } from "./content-config"

export interface Article {
  slug: string
  title: string
  date?: string
  description?: string
  image?: string
  tags?: string[]
  featured?: boolean // Add featured flag
  homepageOrder?: number // Custom order for homepage
  content: string
  html: string
  appStoreUrl?: string
  appPromoImages?: string[]
  appPromoText?: string
  appSlug?: string
}

const articlesDirectory = path.join(process.cwd(), "content/articles")

function markdownToHtml(source: string) {
  const file = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify).processSync(source)
  return String(file)
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) fs.mkdirSync(articlesDirectory, { recursive: true })

  const fileNames = fs.readdirSync(articlesDirectory)
  const all = fileNames
    .filter((f) => /\.mdx?$/.test(f))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "")
      const fullPath = path.join(articlesDirectory, fileName)
      const { data, content } = matter(fs.readFileSync(fullPath, "utf8"))
      const html = markdownToHtml(content)

      return {
        slug,
        content,
        html,
        title: data.title,
        date: data.date,
        description: data.description,
        image: data.image,
        tags: data.tags || [],
        featured: data.featured || false,
        homepageOrder: data.homepageOrder || 999,
        appStoreUrl: data.appStoreUrl,
        appPromoImages: data.appPromoImages,
        appPromoText: data.appPromoText,
        appSlug: data.appSlug,
      } as Article
    })

  return all.sort((a, b) => (a.date && b.date ? new Date(b.date).getTime() - new Date(a.date).getTime() : 0))
}

export function getArticleBySlug(slug: string): Article | null {
  const mdPath = [".mdx", ".md"]
    .map((ext) => path.join(articlesDirectory, `${slug}${ext}`))
    .find((p) => fs.existsSync(p))

  if (!mdPath) return null

  const { data, content } = matter(fs.readFileSync(mdPath, "utf8"))
  const html = markdownToHtml(content)

  return {
    slug,
    content,
    html,
    title: data.title,
    date: data.date,
    description: data.description,
    image: data.image,
    tags: data.tags || [],
    featured: data.featured || false,
    homepageOrder: data.homepageOrder || 999,
    appStoreUrl: data.appStoreUrl,
    appPromoImages: data.appPromoImages,
    appPromoText: data.appPromoText,
    appSlug: data.appSlug,
  }
}

// Get articles for homepage based on configuration
export function getHomepageArticles(): Article[] {
  const allArticles = getAllArticles()
  const config = homepageArticlesConfig

  let filteredArticles = allArticles

  // Filter out excluded articles
  if (config.excludeSlugs && config.excludeSlugs.length > 0) {
    filteredArticles = filteredArticles.filter((article) => !config.excludeSlugs!.includes(article.slug))
  }

  // If specific articles are included, use only those
  if (config.includeSlugs && config.includeSlugs.length > 0) {
    filteredArticles = allArticles.filter((article) => config.includeSlugs!.includes(article.slug))
  }

  // Sort based on configuration
  switch (config.sortBy) {
    case "featured":
      filteredArticles = filteredArticles.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
      })
      break
    case "custom":
      filteredArticles = filteredArticles.sort((a, b) => (a.homepageOrder || 999) - (b.homepageOrder || 999))
      break
    case "date":
    default:
      // Already sorted by date in getAllArticles
      break
  }

  // Return only the specified number of articles
  return filteredArticles.slice(0, config.maxArticles)
}
