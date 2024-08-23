import '@/styles/mdx.css';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { posts, type Post } from '#site/content';
import { formatDate, formatTime } from '@/lib/utils';
import { MDXContent } from '@/components/mdx-content';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ScrollToTopButton, ShareButton } from './button';

function getPostFromParams(params: { slug?: string[] }): Post | undefined {
  const slug = params.slug?.join('/');
  const foundPost = posts.find((post) => post.slugAsParams === slug);
  if (!foundPost) {
    return;
  }

  return foundPost;
}

interface PageProps {
  params: { slug?: string[] };
}

export function generateStaticParams(): PageProps['params'][] {
  return posts.map((post) => ({
    slug: post.slugAsParams.split('/'),
  }));
}

export default function Page({ params }: PageProps): React.JSX.Element {
  const post = getPostFromParams(params);
  if (!post) {
    notFound();
  }

  return (
    <main className="relative isolate bg-background pb-4 text-foreground md:pb-8 lg:pb-24">
      <section className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 px-4 py-6 md:gap-8 md:px-8 md:py-8 lg:py-10">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-balance text-start text-4xl/none font-bold tracking-tight md:text-5xl">
              {post.title}
            </h1>
          </div>
          <div className="text-start text-base md:text-lg">
            <p>{post.description}</p>
          </div>
          <div className="flex flex-row flex-wrap gap-2 text-sm">
            <time
              dateTime={post.updated ?? post.date}
              className="text-muted-foreground"
            >
              {formatDate(post.updated ?? post.date)}
              {post.updated ? ' (Updated)' : ' (Updated)'}
            </time>
            <span className="text-muted-foreground odd:hidden">·</span>
            <span className="text-muted-foreground">
              {formatTime(post.info.readingTime)} read
            </span>
            <span className="text-muted-foreground odd:hidden">·</span>
            <span className="text-muted-foreground">
              {post.info.wordCount} words as
            </span>
          </div>
        </div>
        <Image
          src={post.cover.src}
          width={post.cover.width}
          height={post.cover.height}
          placeholder="blur"
          blurDataURL={post.cover.blurDataURL}
          className="rounded-md border bg-muted transition-colors"
          alt={`Cover image for ${post.title}`}
        />
        <article>
          <MDXContent code={post.body} />
        </article>
        <hr />
        <div className="flex flex-row items-center justify-between gap-4">
          <div>
            <Button variant="outline" asChild>
              <Link href="/blog">
                <Icon.Lucide name="chevron-left" className="mr-2 size-4" />
                See all posts
              </Link>
            </Button>
          </div>
          <div className="flex flex-row items-center justify-end gap-2">
            <ShareButton post={post} />
            <ScrollToTopButton />
          </div>
        </div>
      </section>
    </main>
  );
}
