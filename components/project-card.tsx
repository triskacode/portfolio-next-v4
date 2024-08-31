import Link from 'next/link';
import { type Project } from '#site/content';
import { cn, formatYear } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Icon } from './ui/icon';

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
}

export function ProjectCard({
  project,
  className,
  ...props
}: ProjectCardProps): JSX.Element {
  return (
    <div
      className={cn(
        'group rounded-md border border-border/50 p-6 shadow-sm transition-colors hover:border-border/100',
        className,
      )}
      {...props}
    >
      <dl className="flex flex-col items-stretch justify-start gap-4">
        {/* project header */}
        <div className="flex flex-row items-center justify-start gap-2">
          {/* project icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-muted text-muted-foreground" />
          {/* project name */}
          <div className="flex flex-col items-start justify-start">
            <dt className="sr-only">Project name</dt>
            <dd
              className="w-full text-balance text-base font-medium md:text-lg"
              aria-label="Project name"
            >
              {project.displayName}
            </dd>
            <div className="flex flex-row flex-nowrap gap-2 text-sm text-muted-foreground">
              {project.links.live ? (
                <div>
                  <dt className="sr-only">Live project</dt>
                  <dd aria-label="Live project">
                    <Link
                      href={project.links.live.url}
                      className="transition-all hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="block max-w-[150px] truncate">
                        {project.links.live.displayName}
                      </span>
                    </Link>
                  </dd>
                </div>
              ) : null}
              <span className="first:hidden">•</span>
              <div>
                <dt className="sr-only">Created on</dt>
                <time dateTime={project.date} aria-label="Created on">
                  {formatYear(project.date)}
                </time>
              </div>
            </div>
          </div>
        </div>
        {/* project links */}
        {project.links.repository ? (
          <div className="flex flex-row flex-wrap items-center justify-start gap-2">
            <dt className="sr-only">
              {`${project.links.repository.kind} repository`}
            </dt>
            <dd
              className="flex flex-row flex-wrap gap-x-2 gap-y-1"
              aria-label={`${project.links.repository.kind} repository`}
            >
              <Button
                asChild
                key={project.links.repository.url}
                variant="secondary"
                size="sm"
                className="h-6 max-w-full flex-row items-center justify-start gap-1 rounded-full px-2.5"
              >
                <Link
                  href={project.links.repository.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.links.repository.kind === 'github' ? (
                    <Icon.GitHub className="h-4 w-4 flex-none" />
                  ) : null}
                  <span className="block max-w-[250px] flex-grow truncate">
                    {project.links.repository.displayName}
                  </span>
                </Link>
              </Button>
            </dd>
          </div>
        ) : null}
        {/* project description */}
        <div className="text-sm md:text-base">
          <dt className="sr-only">Project description</dt>
          <dd aria-label="Project description">{project.description}</dd>
        </div>
        {/* project technologies */}
        {project.technologies.length > 0 && (
          <div className="flex flex-row flex-wrap items-center justify-start gap-2">
            <dt className="sr-only">Technologies used</dt>
            <dd
              className="flex flex-row flex-wrap gap-x-2 gap-y-1"
              aria-label="Technologies used"
              role="list"
            >
              {project.technologies.map((technology) => (
                <Badge
                  key={technology}
                  variant="outline"
                  className="max-w-full truncate rounded-full px-2.5 py-1 text-xs font-normal"
                  role="listitem"
                >
                  {technology}
                </Badge>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}
