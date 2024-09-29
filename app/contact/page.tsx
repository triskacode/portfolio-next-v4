import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'

export default function Contact(): React.JSX.Element {
  return (
    <main className="relative isolate bg-background pb-4 text-foreground md:pb-8 lg:pb-24">
      <section className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-x-8 gap-y-12 px-4 py-12 md:max-w-3xl md:grid-cols-2 md:px-8 md:py-20 lg:max-w-5xl lg:py-24 xl:max-w-7xl">
        <div className="flex flex-col items-stretch justify-start gap-4 md:gap-6 lg:gap-8">
          {/* intro */}
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-balance text-start text-4xl/none font-bold tracking-tight md:text-5xl lg:text-6xl">
              Got a Challenge for a Fullstack Developer?
            </h1>
          </div>
        </div>
        <form className="flex w-full max-w-md flex-col items-stretch justify-start gap-4 justify-self-center">
          <div className="flex flex-col items-start justify-start gap-2">
            <Label htmlFor="input-name" className="text-sm font-medium">
              What&apos;s your name?
            </Label>
            <Input id="input-name" type="text" placeholder="Enter your name" />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <Label htmlFor="input-email" className="text-sm font-medium">
              Where can I reach you?
            </Label>
            <Input id="input-email" type="email" placeholder="your@email.com" />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <Label htmlFor="input-message" className="text-sm font-medium">
              What&apos;s your project vision?
            </Label>
            <Textarea
              id="input-message"
              placeholder="Tell me about your ideas or challenges"
              className="min-h-[200px]"
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <Button>Let&apos;s Connect!</Button>
          </div>
        </form>
      </section>
    </main>
  )
}
