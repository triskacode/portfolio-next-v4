import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { type Post } from '#site/content';
import { getPostBySlug } from '@/lib/post';
import { PostNotFoundException } from '@/lib/exceptions';
import { formatDate, formatTime } from '@/lib/utils';
import { MDXContent } from '@/components/mdx-content';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

function getPostFromParams(params?: { slug?: string[] }): Post | undefined {
  try {
    const slug = params?.slug?.join('/');

    if (!slug) {
      return notFound();
    }

    return getPostBySlug(slug);
  } catch (error) {
    if (error instanceof PostNotFoundException) {
      notFound();
    }
  }
}

interface PageProps {
  params: { slug?: string[] };
}

export default function Page({ params }: PageProps): React.JSX.Element {
  const post = getPostFromParams(params);

  return (
    <main className="relative isolate bg-background pb-4 text-foreground md:pb-8 lg:pb-24">
      <section className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 px-4 py-6 md:gap-8 md:px-8 md:py-8 lg:py-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-balance text-start text-4xl/none font-bold tracking-tight md:text-5xl">
              {post?.title}
            </h1>
          </div>
          <div className="text-start text-base md:text-lg">
            <p>{post?.description}</p>
          </div>
          <div className="flex flex-row gap-2 text-sm">
            {post?.date ? (
              <time
                dateTime={post.updated ?? post.date}
                className="text-muted-foreground"
              >
                {post.updated ? 'Updated' : 'Published'} on{' '}
                {formatDate(post.updated ?? post.date)}
              </time>
            ) : null}
            <span className="text-muted-foreground last:hidden">·</span>
            {post?.info.readingTime ? (
              <span className="text-muted-foreground">
                {formatTime(post.info.readingTime)} read
              </span>
            ) : null}
            <span className="text-muted-foreground last:hidden">·</span>
            {post?.info.wordCount ? (
              <span className="text-muted-foreground">
                {post.info.wordCount} words
              </span>
            ) : null}
          </div>
        </div>
        {post?.cover ? (
          <Image
            src={post.cover.src}
            width={post.cover.width}
            height={post.cover.height}
            placeholder="blur"
            blurDataURL={post.cover.blurDataURL}
            className="rounded-md border bg-muted transition-colors"
            alt={`Cover image for ${post.title}`}
          />
        ) : null}
        {post?.body ? <MDXContent code={post.body} /> : null}
        <hr />
        <div className="flex flex-col gap-2">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <Icon.Lucide name="arrow-left" className="mr-2 size-4" />
              See all posts
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
