import Image from "next/image"

interface AppScreenshotsProps {
  screenshots: string[]
  appName: string
}

export default function AppScreenshots({ screenshots, appName }: AppScreenshotsProps) {
  if (screenshots.length === 0) return null

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {screenshots.map((screenshot, index) => (
          <div key={index} className="relative aspect-[9/16] rounded-lg overflow-hidden shadow-md">
            <Image
              src={screenshot || "/placeholder.svg"}
              alt={`${appName} screenshot ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
