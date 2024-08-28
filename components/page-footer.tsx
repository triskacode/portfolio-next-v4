import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Icon } from './ui/icon';
import { Input } from './ui/input';
import { LightDarkThemeSwitcher } from './light-dark-theme-switcher';

type PageFooterProps = React.HTMLAttributes<HTMLElement>;

export function PageFooter({
  className,
  ...props
}: PageFooterProps): JSX.Element {
  return (
    <footer
      className={cn(
        'relative isolate grid grid-cols-1 gap-[calc(var(--y-padding)*2)] border-t py-8',
        '[--y-padding:theme(spacing.6)] md:[--y-padding:theme(spacing.10)] lg:[--y-padding:theme(spacing.12)]',
        className,
      )}
      {...props}
    >
      <div className="mx-auto grid w-full max-w-2xl grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-x-8 gap-y-10 px-4 md:max-w-3xl md:px-8 lg:max-w-5xl lg:grid-cols-6 xl:max-w-7xl">
        <div className="col-span-full flex w-full flex-row items-center justify-between gap-4 lg:col-span-2 lg:flex-col lg:items-start lg:justify-start">
          <Button
            variant="link"
            className="px-1 text-xl font-semibold hover:no-underline lg:-mt-2"
            asChild
          >
            <Link href="/">
              <span className="sr-only">Brand logo for Triskacode</span>
              _triskacode
            </Link>
          </Button>
          <div className="flex items-center justify-start gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="https://github.com/triskacode" target="_blank">
                <span className="sr-only">GitHub profile</span>
                <Icon.GitHub className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-sm font-semibold">
            <p>Resources</p>
          </div>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/project">Project</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-sm font-semibold">
            <p>More</p>
          </div>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <Link href="/about">About Triskacode</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="https://github.com/triskacode" target="_blank">
                Github
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-full flex w-full max-w-sm flex-col gap-4 md:col-span-2">
          <div className="text-sm font-semibold">
            <p>Subscribe to our newsletter</p>
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <div className="text-start text-sm">
              <p>
                Subscribe to our newsletter to receive updates about our latest
                projects and events.
              </p>
            </div>
            <form className="relative flex w-full flex-row items-center">
              <Input
                type="email"
                placeholder="email@example.com"
                className="h-10 pr-24"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute right-1"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-2xl grid-cols-2 justify-items-stretch gap-8 px-4 md:max-w-3xl md:px-8 lg:max-w-5xl xl:max-w-7xl">
        <div className="flex items-center text-start text-sm">
          <p>&copy; 2023 Triskacode. All rights reserved.</p>
        </div>
        <div className="justify-self-end">
          <LightDarkThemeSwitcher />
        </div>
      </div>
    </footer>
  );
}
