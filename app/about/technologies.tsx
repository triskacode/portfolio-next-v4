import type { JSX } from 'react'
import { technologies, type Technology } from '#site/content'
import { Icon } from '@/components/ui/icon'

const availableIcon = {
  typescript: Icon.Typescript,
  javascript: Icon.Javascript,
  nextjs: Icon.Nextjs,
  react: Icon.React,
  tailwindcss: Icon.Tailwindcss,
  nodejs: Icon.Nodejs,
  expressjs: Icon.Expressjs,
  nestjs: Icon.Nestjs,
  golang: Icon.Golang,
  fiber: Icon.Fiber,
} as Record<string, React.FC<React.HTMLAttributes<SVGElement>>>

type TechnologyItemProps = React.HTMLAttributes<HTMLDivElement> & {
  technology: Technology
}

function TechnologyItem({
  technology,
  ...props
}: TechnologyItemProps): JSX.Element {
  const IconTech = availableIcon[technology.key]

  return (
    <div
      role="listitem"
      className="flex flex-row items-center gap-2"
      {...props}
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md border bg-secondary">
        {IconTech
          ? (
              <IconTech className="w-4" />
            )
          : (
              <Icon.Lucide name="package" className="w-4" />
            )}
      </div>
      <div className="overflow-hidden text-base">
        <p className="overflow-hidden text-ellipsis">
          {technology.displayName}
        </p>
      </div>
    </div>
  )
}

export default function Technologies(): JSX.Element {
  return (
    <div
      role="list"
      className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-3 [&:not(:first-child)]:mt-6"
    >
      {technologies.map(technology => (
        <TechnologyItem key={technology.key} technology={technology} />
      ))}
    </div>
  )
}
