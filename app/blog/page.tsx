import { PostCard } from '@/components/post-card';
import { posts } from '@/lib/placeholder-data';

export default function Blog(): React.JSX.Element {
  return (
    <main className="relative isolate bg-background pb-4 text-foreground md:pb-8 lg:pb-24">
      {/* header intoduction */}
      <section className="mx-auto grid w-full max-w-2xl grid-cols-1 px-4 py-12 md:max-w-3xl md:px-8 md:py-20 lg:max-w-5xl lg:py-24 xl:max-w-7xl">
        <div className="flex max-w-3xl flex-col items-stretch justify-center gap-4 md:gap-6 lg:gap-8">
          {/* intro */}
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-balance text-start text-4xl/none font-bold tracking-tight md:text-5xl lg:text-6xl">
              Fullstack Developer Insights From Code to Case Studies
            </h1>
          </div>
          {/* brief description */}
          <div className="text-start text-base md:text-lg">
            <p>
              Explore my journey as a <b>Fullstack Developer</b> through case
              studies and hands-on experiences. Dive into insights on web
              technologies and real-world project breakdowns.
            </p>
          </div>
        </div>
      </section>
      <hr />
      {/* blog posts */}
      <section className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-8 px-4 py-8 md:max-w-3xl md:grid-cols-2 md:p-8 lg:max-w-5xl lg:grid-cols-3 xl:max-w-7xl">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
