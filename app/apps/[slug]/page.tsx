import { notFound } from "next/navigation"
import { getAppBySlug, getAllApps } from "@/lib/apps"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Globe } from "lucide-react"
import type { Metadata } from "next"
import { siteConfig, getCanonicalUrl } from "@/lib/config"
import { formatDateForDisplay, formatDateForSEO } from "@/lib/utils"

export async function generateStaticParams() {
  const apps = getAllApps()
  return apps.map((app) => ({ slug: app.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const app = getAppBySlug(params.slug)
  if (!app) {
    return {
      title: "App Not Found",
      description: "The requested app showcase could not be found.",
    }
  }

  const appUrl = getCanonicalUrl(`/apps/${app.slug}`)
  const ogImage = app.icon || `${siteConfig.url}/og-app-default.png`

  return {
    title: `${app.title} | AppsGalleria.com`,
    description: app.description || `Learn about ${app.title} in this comprehensive iOS app showcase.`,
    keywords: app.tags || ["iOS app design", "mobile development", "UI/UX", app.category],
    authors: [{ name: siteConfig.creator }],
    alternates: {
      canonical: appUrl,
    },
    openGraph: {
      title: `${app.title} | AppsGalleria.com`,
      description: app.description || `Learn about ${app.title}`,
      url: appUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: app.title,
        },
      ],
      type: "article",
      authors: [siteConfig.creator],
      tags: app.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: app.title,
      description: app.description || `Learn about ${app.title}`,
      images: [ogImage],
      creator: "@AppsGalleria",
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
}

export default function AppShowcasePage({ params }: { params: { slug: string } }) {
  const app = getAppBySlug(params.slug)
  if (!app) notFound()

  const readingTime = Math.ceil(app.content.split(" ").length / 200)
  const wordCount = app.content.split(" ").length
  const appUrl = getCanonicalUrl(`/apps/${app.slug}`)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: app.title,
    description: app.description,
    image: app.icon || `${siteConfig.url}/og-app-default.png`,
    datePublished: app.date ? formatDateForSEO(app.date) : undefined,
    dateModified: app.lastModified ? formatDateForSEO(app.lastModified) : (app.date ? formatDateForSEO(app.date) : undefined),
    author: {
      "@type": "Organization",
      name: siteConfig.creator,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
        width: 200,
        height: 60,
      },
      url: siteConfig.url,
    },
    url: appUrl,
    wordCount: wordCount,
    keywords: app.tags?.join(", ") || "iOS app design, mobile development",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": appUrl,
    },
    articleSection: "iOS App Showcase",
    inLanguage: "en-US",
    about: {
      "@type": "SoftwareApplication",
      name: app.title,
      applicationCategory: app.category,
      operatingSystem: "iOS",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="min-h-screen bg-white">
        <Header />
        <article className="container mx-auto px-4 py-8 max-w-3xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{app.title}</h1>
            {/* {app.description && <p className="text-xl text-gray-600 mb-4">{app.description}</p>} */}

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              {app.date && (
                <time dateTime={app.date}>
                  Published on {formatDateForDisplay(app.date)}
                </time>
              )}
              <span>•</span>
              <span>{readingTime} min read</span>
              <span>•</span>
              <span>{wordCount.toLocaleString()} words</span>
            </div>
          </header>

          {/* App Icon */}
          {app.icon && (
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32">
                <Image
                  src={app.icon || "/placeholder.svg"}
                  alt={`${app.title} app icon`}
                  fill
                  className="object-cover rounded-3xl shadow-lg"
                  priority
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: app.html }} />

          {/* Tags and Sharing Buttons at the Bottom */}
          {(app.tags || app.appStoreUrl || app.githubUrl || app.websiteUrl) && (
            <section className="mt-12">
              {app.tags && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {app.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
                {app.appStoreUrl && (
                  <Link href={app.appStoreUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="flex items-center gap-2 w-full sm:w-auto justify-center">
                      <ExternalLink className="w-4 h-4" />
                      App Store
                    </Button>
                  </Link>
                )}
                {app.githubUrl && (
                  <Link href={app.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent w-full sm:w-auto justify-center">
                      <Github className="w-4 h-4" />
                      GitHub
                    </Button>
                  </Link>
                )}
                {app.websiteUrl && (
                  <Link href={app.websiteUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent w-full sm:w-auto justify-center">
                      <Globe className="w-4 h-4" />
                      Website
                    </Button>
                  </Link>
                )}
              </div>
            </section>
          )}
        </article>
        <Footer />
      </div>
    </>
  )
}
