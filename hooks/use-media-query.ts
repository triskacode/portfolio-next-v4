import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    const matchMedia = window.matchMedia(query)

    matchMedia.addEventListener('change', callback)
    return () => {
      matchMedia.removeEventListener('change', callback)
    }
  }

  const getSnapshot = (): boolean => {
    return window.matchMedia(query).matches
  }

  const getServerSnapshot = (): boolean => {
    return typeof window !== 'undefined' && window.matchMedia(query).matches
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
