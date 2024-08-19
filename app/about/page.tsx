import { cn } from '@/lib/utils';

export default function About(): React.JSX.Element {
  return (
    <main className="relative isolate bg-background pb-4 text-foreground md:pb-8 lg:pb-24">
      <section
        className={cn(
          'mx-auto grid w-full max-w-2xl grid-cols-1 gap-x-8 gap-y-12 px-4 py-[var(--y-padding)] md:max-w-3xl md:px-8 lg:max-w-5xl lg:grid-cols-[min(50%,theme(maxWidth.md))_1fr] xl:max-w-7xl',
          '[--y-padding:theme(spacing.12)] md:[--y-padding:theme(spacing.20)] lg:[--y-padding:theme(spacing.24)]',
        )}
      >
        <div className="sticky top-[calc(var(--header-height)+var(--y-padding))] flex flex-col items-stretch justify-start gap-4 self-start md:gap-6 lg:gap-8">
          {/* intro */}
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-balance text-start text-4xl/none font-bold tracking-tight md:text-5xl lg:text-6xl">
              Triska Mahfud Khoiri
            </h1>
          </div>
        </div>
        <div className="min-h-dvh" />
      </section>
    </main>
  );
}
