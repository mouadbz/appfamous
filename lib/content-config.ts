import { getHomepageApps } from "./apps"

export interface FeaturedApp {
  id: string
  name: string
  description: string
  image: string
  category: string
  featured: boolean
  order: number
  link?: string
}

export interface FeaturedArticleConfig {
  maxArticles: number
  excludeSlugs?: string[]
  includeSlugs?: string[]
  sortBy: "date" | "featured" | "custom"
}

// Homepage Articles Configuration
export const homepageArticlesConfig: FeaturedArticleConfig = {
  maxArticles: 3,
  excludeSlugs: [],
  includeSlugs: [],
  sortBy: "date",
}

// Get featured apps for homepage (from markdown files)
export function getFeaturedApps(): FeaturedApp[] {
  const mdApps = getHomepageApps()

  return mdApps.map((app) => ({
    id: app.slug,
    name: app.title,
    description: app.description || "",
    image: app.icon,
    category: app.category,
    featured: app.featured || false,
    order: app.homepageOrder || 999,
    link: `/apps/${app.slug}`,
  }))
}
