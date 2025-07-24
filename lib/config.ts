export const siteConfig = {
  name: "appfamous",
  description: "Master iOS app design with comprehensive guides, tutorials, and design resources.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://appfamous.com",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/appfamous",
    github: "https://github.com/appfamous",
  },
  creator: "appfamous Team",
}

export const getCanonicalUrl = (path: string) => {
  return `${siteConfig.url}${path}`
} 