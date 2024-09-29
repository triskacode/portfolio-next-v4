import type { TocEntry } from '@/types/velite'
import { useEffect, useState } from 'react'

function flatItem(item: TocEntry): TocEntry[] {
  if (!item.items) {
    return [item]
  }
  return [{ ...item, items: [] }, ...item.items.flatMap(flatItem)]
}

function getTocIds(toc: TocEntry[]): string[] {
  return toc
    .flatMap(item => flatItem(item))
    .map(({ url }) => url.split('#').slice(1).join('#'))
}

export function useObserveToc(toc: TocEntry[]): string {
  const [activeTocId, setActiveTocId] = useState<string>('')

  useEffect(() => {
    const tocIds = getTocIds(toc)
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find(entry => entry.isIntersecting)
        if (activeEntry) {
          setActiveTocId(activeEntry.target.id)
        }
      },
      {
        rootMargin: '0px 0px -80% 0px',
      },
    )

    tocIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      tocIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
      observer.disconnect()
    }
  }, [toc])

  return activeTocId
}
