import { Check } from "lucide-react"

interface AppFeaturesProps {
  features: string[]
}

export default function AppFeatures({ features }: AppFeaturesProps) {
  if (features.length === 0) return null

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">Key Features</h3>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
