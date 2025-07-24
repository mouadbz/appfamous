export const siteConfig = {
  name: "refocus",
  description: "Master iOS app design with comprehensive guides, tutorials, and design resources.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://appfamous.com",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/refocus",
    github: "https://github.com/refocus",
  },
  creator: "refocus Team",
}

export const getCanonicalUrl = (path: string) => {
  return `${siteConfig.url}${path}`
} 