import Header from "@/components/header"
import Hero from "@/components/hero"
import RecentApps from "@/components/recent-apps"
import RecentBlogs from "@/components/recent-blogs"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import { getHomepageArticles } from "@/lib/mdx"
import type { Metadata } from "next"
import { siteConfig, getCanonicalUrl } from "@/lib/config"

export const metadata: Metadata = {
  title: "AppsGaleria.com - Master iOS App Design | Tutorials & Resources",
  description:
    "Discover the latest iOS app design trends, techniques, and best practices. Comprehensive guides, tutorials, and resources for creating stunning iOS applications.",
  keywords: ["iOS app design", "mobile UI/UX", "iOS development", "app design tutorials", "iOS design patterns"],
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: getCanonicalUrl("/"),
  },
  openGraph: {
    title: "AppsGaleria.com - Master iOS App Design",
    description:
      "Discover the latest iOS app design trends, techniques, and best practices. Comprehensive guides and tutorials for creating stunning iOS applications.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AppsGaleria.com - iOS App Design Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AppsGaleria.com - Master iOS App Design",
    description: "Discover the latest iOS app design trends, techniques, and best practices.",
    images: [`${siteConfig.url}/og-image.png`],
    creator: "@AppsGaleria",
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

export default function Home() {
  // Use the new homepage articles function
  const recentArticles = getHomepageArticles()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: "Master iOS app design with comprehensive guides, tutorials, and design resources.",
    url: siteConfig.url,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-white">
        <Header />
        <Hero />
        <RecentApps />
        <RecentBlogs articles={recentArticles} />
        <FAQ />
        <Footer />
      </main>
    </>
  )
}
