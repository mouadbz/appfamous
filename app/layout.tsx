import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/lib/config"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://appfamous.com"),
  title: {
    default: "appfamous - Master iOS App Design",
    template: "%s | appfamous",
  },
  description:
    "Master iOS app design with comprehensive guides, tutorials, and design resources. Stay updated with the latest trends and best practices.",
  keywords: ["iOS app design", "mobile UI/UX", "iOS development", "app design tutorials", "iOS design patterns"],
  authors: [{ name: "appfamous Team" }],
  creator: "appfamous",
  publisher: "appfamous",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
                  openGraph: {
                  type: "website",
                  locale: "en_US",
                  url: siteConfig.url,
                  siteName: siteConfig.name,
                  title: "appfamous - Master iOS App Design",
                  description: "Master iOS app design with comprehensive guides, tutorials, and design resources.",
                  images: [
                    {
                      url: `${siteConfig.url}/og-image.png`,
                      width: 1200,
                      height: 630,
                      alt: "appfamous - iOS App Design Blog",
                    },
                  ],
                },
                twitter: {
                  card: "summary_large_image",
                  title: "appfamous - Master iOS App Design",
                  description: "Master iOS app design with comprehensive guides, tutorials, and design resources.",
                  images: ["/og-image.png"],
                  creator: "@appfamous",
                },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={siteConfig.url} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="pt-16">
            {children}s
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
