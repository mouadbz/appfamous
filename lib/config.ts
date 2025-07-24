export const siteConfig = {
  name: "AppsGalleria.com",
  description: "Master iOS app design with comprehensive guides, tutorials, and design resources.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://appsgalleria.com",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/AppsGalleria",
    github: "https://github.com/AppsGalleria",
  },
  creator: "AppsGalleria Team",
}

export const getCanonicalUrl = (path: string) => {
  return `${siteConfig.url}${path}`
} 