import { ProjectCard } from '@/components/project-card';
import { projects } from '#site/content';

export default function Project(): React.JSX.Element {
  return (
    <main className="relative isolate bg-background pb-4 text-foreground md:pb-8 lg:pb-24">
      {/* header intoduction */}
      <section className="mx-auto grid w-full max-w-2xl grid-cols-1 px-4 py-8 md:max-w-3xl md:px-8 md:py-16 lg:max-w-5xl xl:max-w-7xl">
        <div className="flex max-w-3xl flex-col items-stretch justify-center gap-4 md:gap-6">
          {/* intro */}
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-balance text-start text-4xl/none font-bold tracking-tight md:text-5xl lg:text-6xl">
              {/* intro text */}
              Fullstack Developer Project Showcase.
            </h1>
          </div>
          {/* brief description */}
          <div className="text-start text-base md:text-lg">
            <p>
              {/* description text */}
              Explore my journey as a Fullstack Developer through innovative
              projects. Dive into real — world solutions and cutting — edge
              technologies that showcase my expertise and problem — solving
              skills.
            </p>
          </div>
        </div>
      </section>
      <hr />
      {/* projects */}
      <section className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 px-4 py-8 md:max-w-3xl md:grid-cols-2 md:gap-8 md:p-8 lg:max-w-5xl lg:grid-cols-3 xl:max-w-7xl">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center">
            <p className="text-balance text-center text-base md:text-lg">
              No projects yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
