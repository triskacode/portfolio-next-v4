'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from './ui/sheet';
import { ScreenReaderOnly } from './ui/screen-reader-only';

const links = [
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Project',
    href: '/project',
  },
];

interface NavMenuProps {
  readonly className?: string;
}

export function NavMenu({ className }: NavMenuProps): JSX.Element {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex flex-row items-center gap-x-4 text-sm lg:gap-x-6',
        className,
      )}
    >
      {links.map((link) => (
        <Button
          key={link.href}
          asChild
          variant="link"
          className={cn(
            'px-0 font-normal text-foreground/60 transition-colors hover:text-foreground/80',
            { 'text-foreground': pathname === link.href },
          )}
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </nav>
  );
}

export function MobileMenu(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 w-9 flex-col items-center justify-center p-0 md:hidden"
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
        className="top-[var(--header-height,4rem)] h-[calc(100dvh-var(--header-height,4rem))] w-[min(80vw,360px)] focus-visible:outline-none sm:w-[540px]"
        overlayClassName="top-[calc(var(--header-height,4rem))] h-[calc(100dvh-var(--header-height,4rem))]"
      >
        <ScreenReaderOnly>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Main site navigation options</SheetDescription>
        </ScreenReaderOnly>
        <div className="-mx-6 flex h-full flex-col justify-between gap-y-6">
          <NavMenu
            className={cn(
              'flex-col items-stretch gap-y-2',
              '[&>a]:justify-start [&>a]:px-6 [&>a]:text-base',
            )}
          />
          <div className="px-6">
            <div className="rounded-md border px-3 py-2">
              <Button asChild className="w-full text-sm">
                <Link href="/login">Login</Link>
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">
                Login to comment on blog posts, and stay updated on my latest
                work and join the discussion!
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
