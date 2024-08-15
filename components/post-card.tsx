import { type Post } from '@/lib/definition';
import { cn } from '@/lib/utils';

export interface PostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Post;
}

export function PostCard({
  post,
  className,
  ...props
}: PostCardProps): JSX.Element {
  return (
    <div className={cn('group flex flex-col gap-4', className)} {...props}>
      <div className="flex items-center">
        <div className="h-[250px] w-full rounded-md bg-secondary" />
      </div>
      <div className="flex flex-auto flex-col items-stretch justify-start gap-2">
        {/* post title */}
        <div className="flex flex-row items-center justify-start gap-2">
          <h4 className="line-clamp-2 text-lg font-semibold tracking-tight md:text-xl">
            {post.title}
          </h4>
        </div>
        {/* post description */}
        <div className="line-clamp-2 text-sm md:text-base">
          <p>{post.description}</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-between gap-4">
        {/* post tags */}
        <ul className="flex flex-row flex-wrap items-center justify-start gap-2 text-sm text-muted-foreground">
          {post.tags.map((tag) => (
            <li key={tag}>{`#${tag}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
