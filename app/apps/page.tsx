import Header from "@/components/header"
import Footer from "@/components/footer"
import ArticleList from "@/components/article-list"
import { getAllApps } from "@/lib/apps"
import type { Metadata } from "next"
import { siteConfig, getCanonicalUrl } from "@/lib/config"

export const metadata: Metadata = {
  title: "iOS App Showcases - Design Case Studies | refocus",
  description:
    "Explore our collection of iOS app design showcases and case studies. Learn from real-world examples of beautiful, functional mobile applications.",
  keywords: ["iOS app showcase", "app design case studies", "mobile app examples", "iOS UI design"],
  alternates: {
    canonical: getCanonicalUrl("/apps"),
  },
  openGraph: {
    title: "iOS App Showcases - Design Case Studies",
    description: "Explore our collection of iOS app design showcases and case studies.",
    url: getCanonicalUrl("/apps"),
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-apps.png`,
        width: 1200,
        height: 630,
        alt: "iOS App Design Showcases",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iOS App Showcases - Design Case Studies",
    description: "Explore our collection of iOS app design showcases and case studies.",
    images: [`${siteConfig.url}/og-apps.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function AppsPage() {
  const apps = getAllApps()

  // Convert apps to article format for the ArticleList component
  const appsAsArticles = apps.map((app) => ({
    slug: app.slug,
    title: app.title,
    date: app.date,
    description: app.description,
    image: app.icon, // Use icon as the small image
    tags: app.tags,
    featured: app.featured,
    homepageOrder: app.homepageOrder,
    content: app.content,
    html: app.html,
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "iOS App Design Showcases",
    description: "Collection of iOS app design showcases and case studies",
    url: getCanonicalUrl("/apps"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: apps.map((app, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: app.title,
          description: app.description,
          url: getCanonicalUrl(`/apps/${app.slug}`),
          applicationCategory: app.category,
          operatingSystem: "iOS",
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
          <h1 className="text-4xl font-bold text-center mb-12">App Showcases</h1>
          <div className="max-w-2xl mx-auto">
            <ArticleList articles={appsAsArticles} basePath="/apps" />
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}
