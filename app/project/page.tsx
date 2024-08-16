import { ProjectCard } from '@/components/project-card';
import { projects } from '@/lib/placeholder-data';

export default function Project(): React.JSX.Element {
  return (
    <main className="relative isolate bg-background pb-4 text-foreground md:pb-8 lg:pb-24">
      {/* header intoduction */}
      <section className="mx-auto grid w-full max-w-2xl grid-cols-1 px-4 py-12 md:max-w-3xl md:px-8 md:py-20 lg:max-w-5xl lg:py-24 xl:max-w-7xl">
        <div className="flex max-w-3xl flex-col items-stretch justify-center gap-4 md:gap-6 lg:gap-8">
          {/* intro */}
          <div className="flex flex-col items-start justify-center">
            <h1 className="text-balance text-start text-4xl/none font-bold tracking-tight md:text-5xl lg:text-6xl">
              Crafting Digital Solutions From{' '}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Backend
              </span>{' '}
              to{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Frontend.
              </span>
            </h1>
          </div>
          {/* brief description */}
          <div className="text-start text-base md:text-lg">
            <p>
              Welcome to my project showcase. As a versatile Fullstack
              Developer, I bring ideas to life across the entire stack. Discover
              how I tackle complex challenges and deliver innovative solutions
              in these featured case studies.
            </p>
          </div>
        </div>
      </section>
      <hr />
      {/* projects */}
      <section className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-4 px-4 py-8 md:max-w-3xl md:grid-cols-2 md:p-8 lg:max-w-5xl lg:grid-cols-3 xl:max-w-7xl">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </main>
  );
}
