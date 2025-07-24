import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// SEO-friendly date formatting utilities
export function formatDateForSEO(date: string): string {
  return new Date(date).toISOString()
}

export function formatDateForDisplay(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatDateForMeta(date: string): string {
  return new Date(date).toISOString().split('T')[0]
}

// Get current date in ISO format for new content
export function getCurrentDateISO(): string {
  return new Date().toISOString().split('T')[0]
}
