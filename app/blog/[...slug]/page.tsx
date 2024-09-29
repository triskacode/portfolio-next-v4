import { type Post, posts } from '#site/content'
import { MDXContent } from '@/components/mdx-content'
import { PostTableOfContent } from '@/components/toc'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { cn, formatDate, formatTime } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ScrollToTopButton, ShareButton } from './button'
import '@/styles/mdx.css'

function getPostFromParams(params: { slug?: string[] }): Post | undefined {
  const slug = params.slug?.join('/')
  const foundPost = posts.find(post => post.slugAsParams === slug)
  if (!foundPost) {
    return
  }

  return foundPost
}

interface PageProps {
  params: { slug?: string[] }
}

export function generateStaticParams(): PageProps['params'][] {
  return posts.map(post => ({
    slug: post.slugAsParams.split('/'),
  }))
}

export default function Page({ params }: PageProps): React.JSX.Element {
  const post = getPostFromParams(params)
  if (!post) {
    notFound()
  }

  return (
    <main className="relative isolate bg-background pb-4 text-foreground md:pb-8 lg:pb-24">
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:gap-8 md:px-8 md:py-8 lg:grid-cols-[1fr_300px] lg:gap-10 lg:py-10 xl:gap-20">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:gap-8">
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
                {post.updated ? ' (Updated)' : ''}
              </time>
              <span className="text-muted-foreground odd:hidden">·</span>
              <span className="text-muted-foreground">
                {formatTime(post.info.readingTime)}
                {' '}
                read
              </span>
              <span className="text-muted-foreground odd:hidden">·</span>
              <span className="text-muted-foreground">
                {post.info.wordCount}
                {' '}
                words
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
        </div>
        <div className="hidden text-sm lg:block">
          <div
            className={cn(
              'sticky top-[var(--offset-top)] max-h-[calc(theme(maxHeight.dvh)-var(--offset-top))] overflow-y-auto',
              '[--offset-top:calc(var(--header-height)+theme(spacing.10))]',
            )}
          >
            <PostTableOfContent toc={post.toc} />
          </div>
        </div>
      </section>
    </main>
  )
}
