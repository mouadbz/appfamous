import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"

export interface AppShowcase {
  slug: string
  title: string
  name?: string
  date?: string
  lastModified?: string
  description?: string
  tagline?: string
  icon: string
  tags?: string[]
  appStoreUrl?: string
  githubUrl?: string
  websiteUrl?: string
  category: string
  featured?: boolean
  homepageOrder?: number
  rating?: number
  downloadCount?: string
  price?: string
  screenshots?: string[]
  content: string
  html: string
}

const appsDirectory = path.join(process.cwd(), "content/apps")

function markdownToHtml(source: string) {
  const file = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify).processSync(source)
  return String(file)
}

export function getAllApps(): AppShowcase[] {
  if (!fs.existsSync(appsDirectory)) fs.mkdirSync(appsDirectory, { recursive: true })

  const fileNames = fs.readdirSync(appsDirectory)
  const all = fileNames
    .filter((f) => /\.mdx?$/.test(f))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "")
      const fullPath = path.join(appsDirectory, fileName)
      const { data, content } = matter(fs.readFileSync(fullPath, "utf8"))
      const html = markdownToHtml(content)
      
      // Get file stats for automatic date handling
      const stats = fs.statSync(fullPath)
      const createdDate = stats.birthtime
      const modifiedDate = stats.mtime
      
      // Use frontmatter date or fallback to file creation date
      const publishDate = data.date || createdDate.toISOString().split('T')[0]
      const lastModified = modifiedDate.toISOString().split('T')[0]

      return {
        slug,
        content,
        html,
        title: data.title,
        date: publishDate,
        lastModified: lastModified,
        description: data.description,
        icon: data.icon,
        tags: data.tags || [],
        appStoreUrl: data.appStoreUrl,
        githubUrl: data.githubUrl,
        websiteUrl: data.websiteUrl,
        category: data.category,
        featured: data.featured || false,
        homepageOrder: data.homepageOrder || 999,
      } as AppShowcase
    })

  return all.sort((a, b) => (a.date && b.date ? new Date(b.date).getTime() - new Date(a.date).getTime() : 0))
}

export function getAppBySlug(slug: string): AppShowcase | null {
  const mdPath = [".mdx", ".md"].map((ext) => path.join(appsDirectory, `${slug}${ext}`)).find((p) => fs.existsSync(p))

  if (!mdPath) return null

  const { data, content } = matter(fs.readFileSync(mdPath, "utf8"))
  const html = markdownToHtml(content)
  
  // Get file stats for automatic date handling
  const stats = fs.statSync(mdPath)
  const createdDate = stats.birthtime
  const modifiedDate = stats.mtime
  
  // Use frontmatter date or fallback to file creation date
  const publishDate = data.date || createdDate.toISOString().split('T')[0]
  const lastModified = modifiedDate.toISOString().split('T')[0]

  return {
    slug,
    content,
    html,
    title: data.title,
    date: publishDate,
    lastModified: lastModified,
    description: data.description,
    icon: data.icon,
    tags: data.tags || [],
    appStoreUrl: data.appStoreUrl,
    githubUrl: data.githubUrl,
    websiteUrl: data.websiteUrl,
    category: data.category,
    featured: data.featured || false,
    homepageOrder: data.homepageOrder || 999,
  }
}

export function getFeaturedApps(): AppShowcase[] {
  return getAllApps().filter((app) => app.featured)
}

// Get apps for homepage based on configuration (similar to articles)
export function getHomepageApps(): AppShowcase[] {
  const allApps = getAllApps()
  const featuredApps = allApps.filter((app) => app.featured)

  // Sort by homepageOrder, then by date
  return featuredApps
    .sort((a, b) => {
      if (a.homepageOrder !== b.homepageOrder) {
        return (a.homepageOrder || 999) - (b.homepageOrder || 999)
      }
      return new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
    })
    .slice(0, 4) // Show max 4 apps on homepage
}
