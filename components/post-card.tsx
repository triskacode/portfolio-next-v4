import Link from 'next/link';
import Image from 'next/image';
import { type Post } from '#site/content';
import { cn, formatDate, formatTime } from '@/lib/utils';

export interface PostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Post;
}

export function PostCard({
  post,
  className,
  ...props
}: PostCardProps): JSX.Element {
  return (
    <article
      className={cn('group flex flex-col gap-4', className)}
      aria-label={`Post card for ${post.title}`}
      {...props}
    >
      <Link href={post.slug} className="flex items-center">
        <Image
          src={post.cover.src}
          width={post.cover.width}
          height={post.cover.height}
          placeholder="blur"
          blurDataURL={post.cover.blurDataURL}
          className="w-full rounded-md border bg-muted transition-colors"
          alt={`Cover image for ${post.title}`}
          priority
        />
      </Link>
      <dl className="flex flex-auto flex-col items-stretch justify-start gap-2">
        {/* post title */}
        <div className="flex flex-col items-start justify-start gap-1">
          <dl className="flex flex-row flex-wrap gap-2 text-sm text-muted-foreground">
            <div>
              <dt className="sr-only">
                {post.updated ? 'Updated on' : 'Published on'}
              </dt>
              <time dateTime={post.updated ?? post.date}>
                {formatDate(post.updated ?? post.date)}
              </time>
            </div>
            <span className="last:hidden">•</span>
            <div>
              <dt className="sr-only">Reading time</dt>
              <dd>{formatTime(post.info.readingTime)} read</dd>
            </div>
          </dl>
          <dt className="sr-only">Title</dt>
          <dd className="line-clamp-2 w-full text-xl font-semibold tracking-tight md:text-2xl">
            <Link
              href={`/blog/${post.slug}`}
              className="hover:text-blue-500"
              aria-label={post.title}
            >
              {post.title}
            </Link>
          </dd>
        </div>
        {/* post description */}
        <div className="line-clamp-2 text-sm md:text-base">
          <dt className="sr-only">Description</dt>
          <dd>{post.description}</dd>
        </div>
        {/* post tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-row flex-wrap items-center justify-between gap-4">
            <dt className="sr-only">Tags</dt>
            <dd>
              <ul className="flex flex-row flex-wrap items-center justify-start gap-2 text-sm text-muted-foreground">
                {post.tags.map((tag) => (
                  <li key={tag}>{`#${tag}`}</li>
                ))}
              </ul>
            </dd>
          </div>
        )}
      </dl>
    </article>
  );
}
