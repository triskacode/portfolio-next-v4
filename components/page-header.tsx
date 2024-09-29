import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { MobileMenu, NavMenu } from './nav-menu'
import { SearchCommand } from './search-command'
import { Button } from './ui/button'

type PageHeaderProps = React.HTMLAttributes<HTMLElement>

export function PageHeader({ className }: PageHeaderProps): JSX.Element {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className,
      )}
    >
      <div className="mx-auto grid h-[var(--header-height)] max-w-screen-2xl auto-cols-max grid-flow-col items-center justify-between px-4 md:px-8">
        <div className="flex gap-6 lg:gap-10">
          <Button
            size="sm"
            variant="link"
            className="px-1 text-xl font-semibold hover:no-underline"
            asChild
          >
            <Link href="/">_triskacode</Link>
          </Button>
          <NavMenu className="hidden md:flex" />
        </div>
        <div className="flex gap-2 lg:gap-4">
          <SearchCommand />
          <MobileMenu className="md:hidden" />
          <Button asChild size="sm" className="hidden md:flex">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
