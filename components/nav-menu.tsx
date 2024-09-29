'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button, type ButtonProps } from './ui/button'
import { ScreenReaderOnly } from './ui/screen-reader-only'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const links = [
  {
    label: 'Project',
    href: '/project',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
]

interface NavMenuProps {
  readonly className?: string
}

export function NavMenu({ className }: NavMenuProps): JSX.Element {
  const pathname = usePathname()

  return (
    <nav
      className={cn('flex items-center gap-x-4 text-sm lg:gap-x-6', className)}
    >
      {links.map(link => (
        <Button
          key={link.href}
          asChild
          size="sm"
          variant="link"
          className={cn(
            'px-1 font-normal text-foreground/60 transition-colors hover:text-foreground/80',
            { 'text-foreground': pathname === link.href },
          )}
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </nav>
  )
}

type MobileMenuProps = ButtonProps

export function MobileMenu({
  className,
  ...props
}: MobileMenuProps): JSX.Element {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'h-9 w-9 flex-col items-center justify-center p-0',
            className,
          )}
          {...props}
        >
          <span
            className={cn(
              'h-0.5 w-3 -translate-x-0 -translate-y-1 rounded-full bg-current transition-all duration-300 ease-out',
              { '-translate-x-1 -translate-y-0 rotate-45': isMenuOpen },
            )}
          />
          <span
            className={cn(
              'my-0.5 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-out',
              { '-rotate-45': isMenuOpen },
            )}
          />
          <span
            className={cn(
              'h-0.5 w-3 translate-x-0 translate-y-1 rounded-full bg-current transition-all duration-300 ease-out',
              { 'translate-x-1 translate-y-0 rotate-45': isMenuOpen },
            )}
          />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="top-[var(--header-height)] h-[calc(100dvh-var(--header-height))] w-[min(85vw,360px)] border-none p-0 focus-visible:outline-none sm:w-[540px]"
        overlayClassName="top-[calc(var(--header-height))] h-[calc(100dvh-var(--header-height))]"
      >
        <ScreenReaderOnly>
          <SheetTitle>Portfolio Navigation</SheetTitle>
          <SheetDescription>
            Explore the portfolio of a Fullstack Developer
          </SheetDescription>
        </ScreenReaderOnly>
        <div className="scroller grid h-full grid-flow-row auto-rows-max content-between gap-y-4 overflow-y-auto p-4">
          <NavMenu
            className={cn(
              '-mx-4 flex-none flex-col items-stretch gap-x-0 gap-y-2',
              '[&>a]:justify-start [&>a]:px-4 [&>a]:text-base',
            )}
          />
          <div className="mt-auto flex flex-col items-start justify-center gap-2 rounded-md border p-2">
            <Button asChild className="w-full text-sm">
              <Link href="/login">Login</Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              Access your account to view exclusive Fullstack Developer case
              studies and project insights.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
