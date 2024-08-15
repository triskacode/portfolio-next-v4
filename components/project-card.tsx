import { type Project } from '@/lib/definition';
import { cn } from '@/lib/utils';

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
        'flex flex-col gap-4 rounded-md border p-6 shadow-sm',
        className,
      )}
      {...props}
    >
      <div className="mb-6 flex h-10 items-center">
        <div className="aspect-[1/1] h-10 w-10 rounded-full bg-secondary" />
      </div>
      <div className="flex flex-col items-stretch justify-start gap-2 text-balance">
        {/* project name */}
        <div className="flex flex-row items-center justify-start gap-2">
          <h4 className="line-clamp-2 text-lg font-semibold tracking-tight md:text-xl">
            {project.name}
          </h4>
        </div>
        {/* project description */}
        <div className="line-clamp-2 text-sm md:text-base">
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  );
}
