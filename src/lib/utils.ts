import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes with conflict resolution.
 *
 * `clsx` flattens conditionals and arrays, `twMerge` then drops earlier classes
 * that a later one overrides, so a caller can pass `className` to override a
 * component's defaults without fighting specificity.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
