'use client'

import type { TocEntry } from '@/types/velite'
import type { JSX } from 'react'
import { useObserveToc } from '@/hooks/use-observe-toc'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface TocProps {
  toc: TocEntry[]
}

export function PostTableOfContent({ toc }: TocProps): JSX.Element {
  const activeTocId = useObserveToc(toc)

  return (
    <div className="flex flex-col gap-2">
      <h2 className="mb-2 text-sm font-semibold">On this page</h2>
      <nav className="flex flex-col gap-2">
        <Tree tree={toc} activeTocId={activeTocId} />
      </nav>
    </div>
  )
}

interface TreeProps {
  tree: TocEntry[]
  activeTocId: string
  level?: number
}

function Tree({ tree, activeTocId, level = 1 }: TreeProps): JSX.Element {
  return (
    <ul className={cn('m-0 list-none', { 'pl-4': level === 2 })}>
      {tree.map(entry => (
        <li key={entry.url} className="mt-0 pt-2">
          <Link
            href={entry.url}
            className={cn(
              'inline-block no-underline',
              entry.url === `#${activeTocId}`
                ? 'font-medium text-primary'
                : 'text-sm text-muted-foreground',
            )}
          >
            {entry.title}
          </Link>
          {entry.items
            ? (
                <Tree
                  tree={entry.items}
                  activeTocId={activeTocId}
                  level={level + 1}
                />
              )
            : null}
        </li>
      ))}
    </ul>
  )
}
