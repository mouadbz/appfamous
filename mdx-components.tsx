import type { MDXComponents } from "mdx/types"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => <h1 className={cn("mt-8 mb-4 text-3xl font-bold", className)} {...props} />,
    h2: ({ className, ...props }) => <h2 className={cn("mt-8 mb-4 text-2xl font-bold", className)} {...props} />,
    h3: ({ className, ...props }) => <h3 className={cn("mt-8 mb-4 text-xl font-bold", className)} {...props} />,
    p: ({ className, ...props }) => <p className={cn("mb-4 leading-7", className)} {...props} />,
    a: ({ className, ...props }) => (
      <Link className={cn("text-primary underline underline-offset-4", className)} {...props} />
    ),
    ul: ({ className, ...props }) => <ul className={cn("mb-4 list-disc pl-6", className)} {...props} />,
    ol: ({ className, ...props }) => <ol className={cn("mb-4 list-decimal pl-6", className)} {...props} />,
    li: ({ className, ...props }) => <li className={cn("mt-2", className)} {...props} />,
    blockquote: ({ className, ...props }) => (
      <blockquote className={cn("mt-6 border-l-2 border-gray-300 pl-6 italic text-gray-700", className)} {...props} />
    ),
    img: ({ className, alt, ...props }) => (
      // @ts-ignore
      <Image className={cn("rounded-md", className)} alt={alt} sizes="(max-width: 768px) 100vw, 768px" {...props} />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn("relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm", className)}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre className={cn("mb-4 mt-6 overflow-x-auto rounded-lg bg-gray-100 p-4", className)} {...props} />
    ),
    ...components,
  }
}
