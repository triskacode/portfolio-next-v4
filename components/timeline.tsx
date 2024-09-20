import { Tag } from 'lucide-react';
import { type ComponentProps, type JSX, type ReactNode } from 'react';
import { cn, formatDate } from '@/lib/utils';

type TimelineGroupProps = ComponentProps<'div'>;

export function TimelineGroup({
  children,
  className,
  ...props
}: TimelineGroupProps): JSX.Element {
  return (
    <div className={cn('relative mt-4', className)} {...props}>
      {children}
    </div>
  );
}

type TimelineProps = ComponentProps<'div'> & {
  icon?: ReactNode;
  iconComponentProps?: ComponentProps<'div'>;
  date?: string | [string, string];
  title?: string;
};

export function Timeline({
  children,
  className,
  date,
  icon,
  iconComponentProps: {
    className: iconClassName,
    ...iconComponentPropsRest
  } = {},
  title,
  ...props
}: TimelineProps): JSX.Element {
  const iconNode = icon ?? <Tag className="size-4" />;
  const dateNode = date ? (
    <time
      className="mb-2 block text-sm font-normal leading-none text-muted-foreground"
      aria-label="timeline-date"
    >
      {Array.isArray(date)
        ? `${formatDate(date[0])} - ${formatDate(date[1])}`
        : formatDate(date)}
    </time>
  ) : null;

  return (
    <div
      className={cn(
        'flex gap-2 border-s-2 py-4 first:pt-0 last:pb-0',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'ms-[calc(theme(spacing.9)/-2+1px)] flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-secondary-foreground/70 ring-8 ring-background',
          iconClassName,
        )}
        aria-label="timeline-icon"
        {...iconComponentPropsRest}
      >
        {iconNode}
      </div>
      <div className="mt-1">
        <div className="mb-2" aria-label="timeline-header">
          <h3
            className="m-0 mb-1 flex items-center text-lg font-semibold"
            aria-label="timeline-title"
          >
            {title}
          </h3>
          {dateNode}
        </div>
        <div className="mt-4" aria-label="timeline-content">
          {children}
        </div>
      </div>
    </div>
  );
}
