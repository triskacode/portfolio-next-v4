import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MobileMenu, NavMenu } from './nav-menu';
import { Button } from './ui/button';
import { Icon } from './ui/icon';

export function PageHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-[var(--header-height,4rem)] max-w-screen-2xl items-center justify-between">
        <div className="flex gap-6 lg:gap-9">
          <Button
            variant="link"
            className="px-0 text-xl font-semibold hover:no-underline"
            asChild
          >
            <Link href="/">_triskacode</Link>
          </Button>
          <NavMenu className="hidden md:flex" />
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'relative h-9 w-9 p-0 text-sm font-normal shadow-none md:h-8 md:w-40 md:justify-start md:border md:border-input md:pl-3 md:pr-12 md:text-muted-foreground lg:w-64',
            )}
          >
            <Icon.Lucide name="search" className="h-6 md:hidden" />
            <span className="hidden md:inline-flex lg:hidden">Search...</span>
            <span className="hidden lg:inline-flex">
              Search documentation...
            </span>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border border-input bg-muted px-1.5 font-sans text-[10px] font-medium opacity-100 md:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          <MobileMenu />
          <Button asChild size="sm" className="hidden text-sm md:flex">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
