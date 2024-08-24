import { PostCard } from '@/components/post-card';
import { posts } from '#site/content';

export default function Page(): React.JSX.Element {
  return (
    <main className="relative isolate bg-background pb-4 text-foreground md:pb-8 lg:pb-24">
      {/* header intoduction */}
      <section className="mx-auto grid w-full max-w-2xl grid-cols-1 px-4 py-8 md:max-w-3xl md:px-8 md:py-16 lg:max-w-5xl xl:max-w-7xl">
        <div className="flex max-w-3xl flex-col items-stretch justify-center gap-4 md:gap-6">
          {/* intro */}
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-balance text-start text-4xl/none font-bold tracking-tight md:text-5xl lg:text-6xl">
              Fullstack Developer Insights.
            </h1>
          </div>
          {/* description */}
          <div className="text-start text-base md:text-lg">
            <p>
              Explore a Fullstack Developer&apos;s journey through case studies
              and experiences. Dive into practical solutions and innovative
              approaches from real-world projects in web development.
            </p>
          </div>
        </div>
      </section>
      <hr />
      {/* blog posts */}
      <section className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-y-10 px-4 py-8 md:max-w-3xl md:grid-cols-2 md:gap-x-8 md:p-8 lg:max-w-5xl lg:grid-cols-3 xl:max-w-7xl">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        ) : (
          <p>No posts available at the moment.</p>
        )}
      </section>
    </main>
  );
}
