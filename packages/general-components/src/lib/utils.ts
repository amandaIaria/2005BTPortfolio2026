import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function componentName(fn: { name: string }) {
  return fn.name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
