import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatYear(input: string | number): string {
  const date = new Date(input);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
  });
}

export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes.toString()} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours.toString()} hour${hours > 1 ? 's' : ''}`;
  }
  return `${hours.toString()} hour${hours > 1 ? 's' : ''} ${remainingMinutes.toString()} min`;
}

/** @see https://github.com/sindresorhus/is-absolute-url/blob/main/index.js */
export function isAbsoluteUrl(url: string): boolean {
  const absoluteUrlRegex = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
  return absoluteUrlRegex.test(url);
}
