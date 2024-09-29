import { cn } from '@/lib/utils'
import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { createElement } from 'react'
import * as runtime from 'react/jsx-runtime'
import { Callout } from './callout'
import { Button } from './ui/button'
import { Icon } from './ui/icon'

interface MDXComponentProps {
  components?: Record<string, unknown>
}

function useMDXComponent(code: string): React.ComponentType<MDXComponentProps> {
  // eslint-disable-next-line no-new-func
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MDXContentProps extends MDXComponentProps {
  code: string
}

const sharedComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Headings level={1} {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Headings level={2} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Headings level={3} {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Headings level={4} {...props} />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Headings level={5} {...props} />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Headings level={6} {...props} />
  ),
  a: Anchor,
  p: Paragraph,
  ul: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ListGroup as="ul" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ListGroup as="ol" {...props} />
  ),
  li: ListItem,
  blockquote: Blockquote,
  img: Img,
  hr: Hr,
  table: Table,
  tr: Tr,
  th: Th,
  td: Td,
  pre: Pre,
  code: Code,
  Image: StyledImage,
  Callout,
}

export function MDXContent({
  code,
  components,
}: MDXContentProps): React.JSX.Element {
  const Component = useMDXComponent(code)

  return <Component components={{ ...sharedComponents, ...components }} />
}

interface HeadingsProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
}

function HeadingComponent({ level, ...props }: HeadingsProps) {
  return createElement(`h${level}`, props)
}

function Headings({
  level,
  id,
  className,
  children,
  ...props
}: HeadingsProps): React.JSX.Element {
  return (
    <HeadingComponent
      level={level}
      id={id}
      className={cn(
        'group relative scroll-m-[var(--header-height)] font-semibold tracking-tight',
        {
          'mt-2 text-4xl font-bold': level === 1,
          'mt-10 border-b pb-1 text-3xl first:mt-0': level === 2,
          'mt-8 text-2xl': level === 3,
          'mt-8 text-xl': level === 4,
          'mt-8 text-lg': level === 5,
          'mt-8 text-base': level === 6,
        },
        className,
      )}
      {...props}
    >
      <Link href={`#${id ?? ''}`} className="lg:-ml-2 lg:pl-2">
        <Button
          variant="ghost"
          className="absolute -left-8 top-1/2 hidden size-6 -translate-y-1/2 transform p-0 opacity-0 group-hover:opacity-100 md:flex"
        >
          <span className="sr-only">
            Anchor link for
            {children}
          </span>
          <Icon.Lucide name="hash" className="size-4" />
        </Button>
        {children}
      </Link>
    </HeadingComponent>
  )
}

function Anchor({
  className,
  href = '#',
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>): React.JSX.Element {
  return (
    <Link
      className={cn('font-medium underline underline-offset-4', className)}
      href={href}
      {...props}
    />
  )
}

function Paragraph({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>): React.JSX.Element {
  return (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  )
}

type ListGroupProps = React.HTMLAttributes<HTMLUListElement> & {
  as: 'ul' | 'ol'
}

function ListGroup({
  as = 'ul',
  className,
  ...props
}: ListGroupProps): React.JSX.Element {
  const Component = as

  return (
    <Component
      className={cn(
        'my-6 ml-6',
        {
          'list-disc': as === 'ul',
          'list-decimal': as === 'ol',
        },
        className,
      )}
      {...props}
    />
  )
}

function ListItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>): JSX.Element {
  return <li className={cn('mt-2', className)} {...props} />
}

function Blockquote({
  className,
  ...props
}: React.BlockquoteHTMLAttributes<HTMLQuoteElement>): React.JSX.Element {
  return (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      {...props}
    />
  )
}

function Img({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>): React.JSX.Element {
  return (
    // eslint-disable-next-line next/no-img-element
    <img className={cn('my-4 rounded-md', className)} {...props} />
  )
}

function Hr({ ...props }): React.JSX.Element {
  return <hr className="my-4 md:my-8" {...props} />
}

function Table({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>): React.JSX.Element {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props} />
    </div>
  )
}

function Tr({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>): React.JSX.Element {
  return (
    <tr
      className={cn('m-0 border-t p-0 even:bg-muted', className)}
      {...props}
    />
  )
}

function Th({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>): React.JSX.Element {
  return (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  )
}

function Td({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>): React.JSX.Element {
  return (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className,
      )}
      {...props}
    />
  )
}

function Pre({
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>): React.JSX.Element {
  return (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg border bg-muted p-4',
        className,
      )}
      {...props}
    />
  )
}

function Code({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>): React.JSX.Element {
  return (
    <code
      className={cn(
        'relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className,
      )}
      {...props}
    />
  )
}

function StyledImage(props: ImageProps): React.JSX.Element {
  return (
    <Image
      className="rounded-md border bg-muted transition-colors"
      {...props}
    />
  )
}
