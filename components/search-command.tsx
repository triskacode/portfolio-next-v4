'use client'

import type { SearchItem } from '@/lib/search-index'
import { useMediaQuery } from '@/hooks/use-media-query'
import { getSearchIndex } from '@/lib/search-index'
import { cn } from '@/lib/utils'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FileTextIcon,
  HashIcon,
  MonitorIcon,
  SearchIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type JSX,
  type ReactNode,
  useEffect,
  useId,
  useState,
} from 'react'
import { themeList } from './theme-provider'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem as DefaultCommandItem,
} from './ui/command'
import { Dialog, DialogTitle, PlainDialogContent } from './ui/dialog'
import { Drawer, DrawerContent } from './ui/drawer'

export function SearchCommand(): JSX.Element {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [pages, setPages] = useState<string[]>([])
  const page = pages[pages.length - 1]
  const searchIndex = getSearchIndex()

  const handleOpen = (state: boolean) => () => {
    setOpen(state)
  }

  useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener('keydown', down)
    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [])

  const onEscapeKeydownHandler = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && pages.length > 0) {
      e.preventDefault()
      setSearch('')
      setPages(prevPages => prevPages.slice(0, -1))
    }
  }

  const onBackspaceKeydownHandler = (e: React.KeyboardEvent): void => {
    if (e.key === 'Backspace' && !search) {
      e.preventDefault()
      setPages(prevPages => prevPages.slice(0, -1))
    }
  }

  const moveToPreviousPage = (): void => {
    setPages(prevPages => prevPages.slice(0, -1))
    setSearch('')
  }

  const moveToNextPage = (value: string) => () => {
    setPages(prevPages => [...prevPages, value])
    setSearch('')
  }

  const run = (fn: () => void): void => {
    setPages([])
    setSearch('')
    setOpen(false)
    fn()
  }

  return (
    <>
      <SearchTrigger onClick={handleOpen(true)} />
      <DialogDrawerSearch
        open={open}
        onOpenChange={setOpen}
        contentProps={{
          onEscapeKeyDown: onEscapeKeydownHandler,
        }}
      >
        <CustomCommand>
          <CommandInput
            placeholder="Type a command or search..."
            value={search}
            onValueChange={setSearch}
            onKeyDown={onBackspaceKeydownHandler}
          />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            {!page && (
              <>
                <CommandGroup heading={searchIndex.navigation.title}>
                  <NavigationCommandList searchItems={searchIndex.navigation.items} runCommand={run} />
                </CommandGroup>
                <CommandGroup heading={searchIndex.posts.title}>
                  <PostsCommandList search={search} searchItems={searchIndex.posts.items} runCommand={run} />
                </CommandGroup>
                <CommandGroup heading="General">
                  <CommandItem
                    icon={<MonitorIcon />}
                    onSelect={moveToNextPage('change-theme')}
                  >
                    Change Theme...
                  </CommandItem>
                  <ChangeThemeCommandList runCommand={run} mount={Boolean(search)} />
                </CommandGroup>
              </>
            )}
            {page === 'change-theme' && (
              <CommandGroup>
                <CommandItem
                  icon={<ArrowLeftIcon />}
                  onSelect={moveToPreviousPage}
                >
                  Back
                </CommandItem>
                <ChangeThemeCommandList runCommand={run} />
              </CommandGroup>
            )}
          </CommandList>
        </CustomCommand>
      </DialogDrawerSearch>
    </>
  )
}

type SearchTriggerProps = React.ComponentPropsWithoutRef<'button'>

function SearchTrigger({
  className,
  ...props
}: SearchTriggerProps): JSX.Element {
  return (
    <Button
      size="sm"
      variant="ghost"
      className={cn(
        'relative size-9 items-center justify-center gap-1 p-0 font-normal md:h-8 md:w-64 md:justify-between md:border md:px-1.5 md:text-muted-foreground md:hover:bg-background md:hover:text-muted-foreground lg:w-80',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1 overflow-x-hidden">
        <SearchIcon className="size-6 md:size-4" />
        <span className="sr-only !truncate md:not-sr-only">
          Type a command or search...
        </span>
      </div>
      <kbd className="pointer-events-none hidden h-5 select-none items-center rounded border bg-muted px-1 font-sans text-[10px] font-medium text-muted-foreground md:flex md:gap-1">
        <span className="text-xs">⌘</span>
        <span>K</span>
      </kbd>
    </Button>
  )
}

type DialogDrawerSearchProps = ComponentPropsWithoutRef<typeof Dialog> & {
  contentProps?: ComponentPropsWithoutRef<typeof PlainDialogContent>
}

function DialogDrawerSearch({
  children,
  open,
  onOpenChange,
  contentProps,
  ...props
}: DialogDrawerSearchProps): JSX.Element {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const title = <DialogTitle className="sr-only">Search Command</DialogTitle>

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange} {...props}>
        <PlainDialogContent
          className="overflow-hidden p-0"
          aria-describedby={undefined}
          {...contentProps}
        >
          {title}
          {children}
        </PlainDialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      setBackgroundColorOnScale={false}
      repositionInputs={false}
      {...props}
    >
      <DrawerContent aria-describedby={undefined} {...contentProps}>
        {title}
        {children}
      </DrawerContent>
    </Drawer>
  )
}

type CustomCommandProps = ComponentProps<typeof Command>

function CustomCommand({
  className,
  ...props
}: CustomCommandProps): JSX.Element {
  return (
    <Command
      className={cn(
        '[&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]_svg]:size-4',
        className,
      )}
      {...props}
    />
  )
}

type CommandItemCompProps = ComponentProps<typeof DefaultCommandItem> & {
  subItems?: boolean
}

function CommandItemComp({ subItems, children, ...props }: CommandItemCompProps): JSX.Element {
  return subItems
    ? (
        <DefaultCommandItem
          className="flex cursor-pointer truncate py-0 items-center gap-2 [&_svg]:size-4"
          {...props}
        >
          <div className="ml-2 border-l-2 pl-4 py-1.5 flex items-center gap-2">
            {children}
          </div>
        </DefaultCommandItem>
      )
    : (
        <DefaultCommandItem
          className="flex cursor-pointer truncate items-center gap-2 [&_svg]:size-4"
          {...props}
        >
          {children}
        </DefaultCommandItem>
      )
}

type CommandItemProps = ComponentProps<typeof DefaultCommandItem> & {
  icon?: ReactNode
  noIcon?: boolean
  subItems?: boolean
}

function CommandItem({
  icon,
  noIcon,
  subItems,
  children,
  ...props
}: CommandItemProps): JSX.Element {
  const iconNode = icon ?? <ArrowRightIcon />

  return (
    <CommandItemComp subItems={subItems} {...props}>
      {!noIcon ? iconNode : null}
      {children}
    </CommandItemComp>
  )
}

interface ChangeThemeCommandListProps {
  runCommand: (fn: () => void) => void
  mount?: boolean
}

function ChangeThemeCommandList({
  runCommand,
  mount = true,
}: ChangeThemeCommandListProps): JSX.Element {
  const { setTheme } = useTheme()

  const changeTheme = (theme: string) => () => {
    runCommand(() => {
      setTheme(theme)
    })
  }

  return (
    <>
      {mount && Object.entries(themeList).map(([theme, { icon, label }]) => (
        <CommandItem
          key={theme}
          icon={icon}
          onSelect={changeTheme(theme)}
        >
          {label}
        </CommandItem>
      ))}
    </>
  )
}

interface NavigationCommandListProps {
  searchItems: SearchItem[]
  runCommand: (fn: () => void) => void
  mount?: boolean

}

function NavigationCommandList({
  searchItems,
  runCommand,
  mount = true,
}: NavigationCommandListProps): JSX.Element {
  const router = useRouter()

  const navigate = (path: string) => () => {
    runCommand(() => {
      router.push(path)
    })
  }

  return (
    <>
      {mount && searchItems.map(searchItem => (
        <CommandItem
          key={searchItem.url}
          icon={<ArrowRightIcon />}
          onSelect={navigate(searchItem.url)}
        >
          Go to
          {' '}
          <span className="font-semibold">{searchItem.title}</span>
          {' '}
          page
        </CommandItem>
      ))}
    </>
  )
}

interface PostsCommandListProps {
  search: string
  searchItems: SearchItem[]
  runCommand: (fn: () => void) => void
  mount?: boolean
}

function PostsCommandList({
  search,
  searchItems,
  runCommand,
  mount = true,
}: PostsCommandListProps): JSX.Element {
  return (
    <div>
      {mount && searchItems.map(searchItem => (
        <PostsCommandGroup
          key={searchItem.url}
          search={search}
          searchItem={searchItem}
          runCommand={runCommand}
        />
      ))}
    </div>
  )
}

interface PostsCommandGroupProps {
  search: string
  searchItem: SearchItem
  runCommand: (fn: () => void) => void
}

function PostsCommandGroup({
  search,
  searchItem,
  runCommand,
}: PostsCommandGroupProps): JSX.Element {
  const router = useRouter()
  const navigate = (path: string) => () => {
    runCommand(() => {
      router.push(path)
    })
  }

  const containerId = useId()
  const container = document.getElementById(containerId)

  return (
    <div id={containerId}>
      <CommandItem
        icon={<FileTextIcon />}
        data-type={searchItem.type}
        onSelect={navigate(searchItem.url)}
        forceMount={Boolean(container?.childElementCount)}
      >
        {searchItem.title}
      </CommandItem>
      {search !== '' && searchItem.items.map(contentId => (
        <CommandItem
          key={contentId.url}
          icon={<HashIcon />}
          data-type={contentId.type}
          onSelect={navigate(contentId.url)}
          subItems
        >
          {contentId.title}
        </CommandItem>
      ))}
    </div>
  )
}
