import { notFound } from "next/navigation"
import { getArticleBySlug, getAllArticles } from "@/lib/mdx"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import type { Metadata } from "next"
import { siteConfig, getCanonicalUrl } from "@/lib/config"
import { getAppBySlug } from "@/lib/apps"

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    }
  }

  const articleUrl = getCanonicalUrl(`/articles/${article.slug}`)
  const ogImage = article.image || `${siteConfig.url}/og-article-default.png`

  return {
    title: article.title,
    description: article.description || `Learn about ${article.title} in this comprehensive iOS app design guide.`,
    keywords: article.tags || ["iOS app design", "mobile development", "UI/UX"],
    authors: [{ name: siteConfig.creator }],
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description || `Learn about ${article.title}`,
      url: articleUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      authors: [siteConfig.creator],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description || `Learn about ${article.title}`,
      images: [ogImage],
      creator: "@refocus",
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

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  // If appSlug is present, fetch the app
  const linkedApp = article.appSlug ? getAppBySlug(article.appSlug) : null

  const readingTime = Math.ceil(article.content.split(" ").length / 200)
  const wordCount = article.content.split(" ").length
  const articleUrl = getCanonicalUrl(`/articles/${article.slug}`)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.image || `${siteConfig.url}/og-article-default.png`,
    datePublished: article.date,
    dateModified: article.date,
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
    url: articleUrl,
    wordCount: wordCount,
    keywords: article.tags?.join(", ") || "iOS app design, mobile development",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: "iOS App Design",
    inLanguage: "en-US",
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
        {/* Fixed App Store Banner for Mobile */}
        {(linkedApp?.appStoreUrl || article.appStoreUrl) && (
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t p-4 flex items-center justify-between md:hidden">
            {linkedApp?.icon && (
              <Image src={linkedApp.icon} alt={linkedApp.title + " app icon"} width={40} height={40} className="rounded-lg mr-2" />
            )}
            <span className="font-semibold flex-1">Get the app: {linkedApp?.title}</span>
            <a href={linkedApp?.appStoreUrl || article.appStoreUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-black text-white px-4 py-2 rounded-full">Get App</button>
            </a>
          </div>
        )}
        <article className="container mx-auto px-4 py-8 max-w-3xl">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            {article.description && <p className="text-xl text-gray-600 mb-4">{article.description}</p>}

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              {article.date && (
                <time dateTime={article.date}>
                  Published on{" "}
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              <span>•</span>
              <span>{readingTime} min read</span>
              <span>•</span>
              <span>{wordCount.toLocaleString()} words</span>
            </div>
          </header>

          {article.image && (
            <div className="relative w-full h-64 md:h-96 mb-8">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.html }} />

          {/* Tags at the Bottom */}
          {article.tags && (
            <section className="mt-12">
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* App Promo Section at the End */}
          {(linkedApp?.appStoreUrl || article.appStoreUrl) && (
            <section className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                {linkedApp?.icon && (
                  <Image src={linkedApp.icon} alt={linkedApp.title + " app icon"} width={80} height={80} className="rounded-lg shadow" />
                )}
                {article.appPromoImages?.map((img, i) => (
                  <img key={i} src={img} alt={`App screenshot ${i + 1}`} className="w-40 rounded-lg shadow" />
                ))}
              </div>
              <p className="mb-4 text-lg">{article.appPromoText || linkedApp?.description || "Download our app for the best experience!"}</p>
              <a href={linkedApp?.appStoreUrl || article.appStoreUrl} target="_blank" rel="noopener noreferrer">
                <button className="bg-black text-white px-6 py-3 rounded-full text-lg">Download on the App Store</button>
              </a>
            </section>
          )}
        </article>
        <Footer />
      </div>
    </>
  )
}
