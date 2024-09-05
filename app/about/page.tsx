import '@/styles/mdx.css';
import { cn } from '@/lib/utils';
import { about } from '#site/content';
import { MDXContent } from '@/components/mdx-content';

export default function About(): React.JSX.Element {
  return (
    <main className="relative isolate bg-background pb-4 text-foreground md:pb-8 lg:pb-24">
      <section
        className={cn(
          'mx-auto grid w-full max-w-2xl grid-cols-1 gap-x-8 gap-y-[var(--y-padding)] px-4 py-[var(--y-padding)] md:max-w-3xl md:px-8 lg:max-w-5xl lg:grid-cols-[min(50%,theme(maxWidth.md))_1fr] xl:max-w-7xl',
          '[--y-padding:theme(spacing.8)] md:[--y-padding:theme(spacing.16)]',
        )}
      >
        <div className="flex flex-col items-stretch justify-start gap-4 self-start md:sticky md:top-[calc(var(--header-height)+var(--y-padding))] md:gap-6">
          {/* intro */}
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-balance text-start text-4xl/none font-bold tracking-tight md:text-5xl lg:text-6xl">
              {about.personalInfo.name}
            </h1>
          </div>
          {/* description */}
          <div className="text-start text-base md:text-lg">
            <p>
              Great things are built through dedication, perseverance, and the
              will to grow.
            </p>
          </div>
        </div>
        <div className="w-full max-w-lg justify-self-center">
          <MDXContent code={about.content} />
        </div>
      </section>
    </main>
  );
}
