import { PostCard } from '@/components/post-card';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { posts, projects } from '#site/content';

export default function Home(): JSX.Element {
  return (
    <main className="relative isolate bg-background py-4 text-foreground md:py-8 lg:py-24">
      {/* header introduction */}
      <section className="mx-auto grid w-full max-w-2xl grid-cols-1 px-4 py-12 md:max-w-3xl md:px-8 md:py-20 lg:max-w-5xl lg:py-24 xl:max-w-7xl">
        <div className="flex max-w-3xl flex-col items-center justify-center gap-4 justify-self-center md:gap-6 lg:gap-8">
          {/* intro */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-balance text-center text-4xl/none font-bold tracking-tight md:text-5xl lg:text-6xl">
              Code Architect Building Digital Ecosystems.
            </h1>
          </div>
          {/* brief description */}
          <div className="text-center text-base md:text-lg">
            <p>
              Triska Mahfud K here. I craft end-to-end web solutions that
              breathe life into ideas. Dive into my fullstack journey through
              real-world projects and tech insights.
            </p>
          </div>
          {/* buttons cta */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-x-6">
            <Button variant="default" size="lg">
              Explore Projects
            </Button>
            <Button variant="outline" size="lg">
              Read Tech Insights
            </Button>
          </div>
        </div>
      </section>
      {/* projects section */}
      <section
        className={cn(
          'mx-auto grid w-full max-w-2xl grid-cols-1 gap-[var(--y-padding)] px-4 py-[calc(72px-var(--y-padding))] md:max-w-3xl md:grid-cols-2 md:px-8 md:py-[calc(140px-var(--y-padding))] lg:max-w-5xl lg:grid-cols-3 lg:gap-6 xl:max-w-7xl',
          '[--y-padding:theme(spacing.6)] md:[--y-padding:theme(spacing.10)] lg:[--y-padding:theme(spacing.12)]',
        )}
      >
        <div className="flex max-w-3xl flex-col items-center justify-center gap-6 self-start justify-self-center md:col-span-2 lg:col-span-1 lg:items-start lg:justify-self-start">
          {/* project intro  */}
          <div className="flex flex-col items-center justify-start gap-2 md:gap-4 lg:items-start">
            <div className="flex flex-row items-center justify-start gap-2">
              <Icon.Lucide name="code" className="h-4 w-4" />
              <h2 className="text-sm md:text-base/5">Featured Work</h2>
            </div>
            <h3 className="text-balance text-center text-2xl font-semibold tracking-tight md:text-3xl lg:text-start lg:text-4xl">
              Featured Fullstack Projects.
            </h3>
          </div>
          {/* project description */}
          <div className="text-center text-base md:text-lg lg:text-start">
            <p>
              Dive into my diverse portfolio of fullstack applications, each
              demonstrating end-to-end development expertise.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-subgrid gap-4 md:col-span-2 md:gap-8">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      {/* post section */}
      <section
        className={cn(
          'mx-auto grid w-full max-w-2xl grid-cols-1 gap-[var(--y-padding)] px-4 py-[calc(72px-var(--y-padding))] md:max-w-3xl md:grid-cols-2 md:px-8 md:py-[calc(140px-var(--y-padding))] lg:max-w-5xl lg:grid-cols-3 xl:max-w-7xl',
          '[--y-padding:theme(spacing.6)] md:[--y-padding:theme(spacing.10)] lg:[--y-padding:theme(spacing.12)]',
        )}
      >
        <div className="flex max-w-3xl flex-col items-center justify-center gap-6 justify-self-center md:col-span-2 lg:col-span-3">
          {/* post intro  */}
          <div className="flex flex-col items-center justify-start gap-2 md:gap-4">
            <div className="flex flex-row items-center justify-start gap-2">
              <Icon.Lucide name="lightbulb" className="h-4 w-4" />
              <h2 className="text-sm md:text-base/5">Tech Insights</h2>
            </div>
            <h3 className="text-balance text-center text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl">
              Fullstack Insights and Development Chronicles.
            </h3>
          </div>
          {/* post description */}
          <div className="text-center text-base md:text-lg">
            <p>
              Explore my latest articles on fullstack development, tech trends,
              and in-depth case studies. Gain valuable insights from real-world
              project experiences and stay updated with cutting-edge web
              technologies.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-subgrid gap-y-10 md:col-span-2 md:gap-x-8 lg:col-span-3">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      {/* subscribe newsletter and contact section */}
      <section
        className={cn(
          'mx-auto grid w-full max-w-2xl grid-cols-1 gap-[calc(var(--y-padding)*2)] px-4 py-[calc(72px-var(--y-padding))] md:max-w-3xl md:px-8 md:py-[calc(140px-var(--y-padding))] lg:max-w-5xl lg:grid-cols-3 lg:gap-6 xl:max-w-7xl',
          '[--y-padding:theme(spacing.6)] md:[--y-padding:theme(spacing.10)] lg:[--y-padding:theme(spacing.12)]',
        )}
      >
        {/* subscribe newsletter */}
        <div className="flex max-w-2xl flex-col items-center justify-between gap-6 justify-self-center py-[var(--y-padding)] lg:col-span-2 lg:items-start lg:justify-self-start">
          {/* subscribe newsletter intro  */}
          <div className="text-balance text-center text-xl tracking-tight lg:text-start lg:text-2xl">
            <p>
              <b className="text-foreground">Elevate your fullstack skills.</b>{' '}
              Get exclusive insights, case studies, and development tips
              straight to your inbox.
            </p>
          </div>
          {/* subscribe newsletter form */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <form className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="email@example.com" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        {/* contact section */}
        <div className="flex items-center justify-center lg:py-[calc(var(--y-padding)/2)]">
          <div className="flex h-full max-w-2xl flex-col items-center justify-between gap-6 justify-self-center rounded-md border p-[var(--y-padding)] lg:col-span-2 lg:items-start lg:justify-self-start lg:p-[calc(var(--y-padding)/2)]">
            {/* contact section intro  */}
            <div className="text-balance text-center text-base lg:text-start">
              <p>
                <b className="text-foreground">Let&apos;s collaborate</b> on
                your next fullstack project. Reach out for consultations or case
                study discussions.
              </p>
            </div>
            {/* contact cta */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              <Button>Get started</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
