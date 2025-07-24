import { Code } from "lucide-react"

interface AppTechStackProps {
  techStack: string[]
}

export default function AppTechStack({ techStack }: AppTechStackProps) {
  if (techStack.length === 0) return null

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Code className="w-5 h-5" />
        Tech Stack
      </h3>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech, index) => (
          <span key={index} className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border">
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
