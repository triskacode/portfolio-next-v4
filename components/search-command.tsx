'use client';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type JSX,
  type ReactNode,
  useEffect,
  useState,
} from 'react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MonitorIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { getSearchIndex } from '@/lib/search-index';
import { Button } from './ui/button';
import { Dialog, DialogTitle, PlainDialogContent } from './ui/dialog';
import { Drawer, DrawerContent } from './ui/drawer';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem as DefaultCommandItem,
} from './ui/command';

export function SearchCommand(): JSX.Element {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState<string[]>([]);
  const page = pages[pages.length - 1];
  const searchIndex = getSearchIndex();

  const handleOpen = (state: boolean) => () => {
    setOpen(state);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', down);
    return () => {
      document.removeEventListener('keydown', down);
    };
  }, []);

  const onEscapeKeydownHandler = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && pages.length > 0) {
      e.preventDefault();
      setSearch('');
      setPages((prevPages) => prevPages.slice(0, -1));
    }
  };

  const onBackspaceKeydownHandler = (e: React.KeyboardEvent): void => {
    if (e.key === 'Backspace' && !search) {
      e.preventDefault();
      setPages((prevPages) => prevPages.slice(0, -1));
    }
  };

  const moveToPreviousPage = (): void => {
    setPages((prevPages) => prevPages.slice(0, -1));
    setSearch('');
  };

  const moveToNextPage = (value: string) => () => {
    setPages((prevPages) => [...prevPages, value]);
    setSearch('');
  };

  const run = (fn: () => void): void => {
    setPages([]);
    setSearch('');
    setOpen(false);
    fn();
  };

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
          <CommandList className="min-h-48 md:h-auto">
            {!page && (
              <>
                {searchIndex.map((searchGroup, i) => (
                  <CommandGroup key={i} heading={searchGroup.title}>
                    {searchGroup.items?.length
                      ? searchGroup.items.map((item, j) => (
                          <CommandItem
                            key={j}
                            {...(item.url
                              ? {
                                  onSelect: () => {
                                    run(() => {
                                      router.push(item.url ?? '');
                                    });
                                  },
                                }
                              : {})}
                          >
                            {item.title}
                          </CommandItem>
                        ))
                      : null}
                  </CommandGroup>
                ))}
                <CommandGroup heading="General">
                  <CommandItem
                    icon={<MonitorIcon />}
                    onSelect={moveToNextPage('change-theme')}
                  >
                    Change Theme...
                  </CommandItem>

                  {search ? <ChangeThemeCommandList runCommand={run} /> : null}
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
  );
}

type SearchTriggerProps = React.ComponentPropsWithoutRef<'button'>;

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
  );
}

type DialogDrawerSearchProps = ComponentPropsWithoutRef<typeof Dialog> & {
  contentProps?: ComponentPropsWithoutRef<typeof PlainDialogContent>;
};

function DialogDrawerSearch({
  children,
  open,
  onOpenChange,
  contentProps,
  ...props
}: DialogDrawerSearchProps): JSX.Element {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const title = <DialogTitle className="sr-only">Search Command</DialogTitle>;

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
    );
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
  );
}

type CustomCommandProps = ComponentProps<typeof Command>;

function CustomCommand({
  className,
  ...props
}: CustomCommandProps): JSX.Element {
  return (
    <Command
      className={cn(
        '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2 [&_[cmdk-item]_svg]:size-4',
        className,
      )}
      {...props}
    />
  );
}

type CommandItemProps = ComponentProps<typeof DefaultCommandItem> & {
  icon?: ReactNode;
  noIcon?: boolean;
};

function CommandItem({
  icon,
  noIcon,
  children,
  ...props
}: CommandItemProps): JSX.Element {
  const iconNode = icon ?? <ArrowRightIcon />;

  return (
    <DefaultCommandItem
      className="flex cursor-pointer items-center gap-2 [&_svg]:size-4"
      {...props}
    >
      {!noIcon ? iconNode : null}
      {children}
    </DefaultCommandItem>
  );
}

interface ChangeThemeCommandListProps {
  runCommand: (fn: () => void) => void;
}

function ChangeThemeCommandList({
  runCommand,
}: ChangeThemeCommandListProps): JSX.Element {
  const { setTheme } = useTheme();

  const changeTheme = (theme: string) => () => {
    runCommand(() => {
      setTheme(theme);
    });
  };

  return (
    <>
      <CommandItem icon={<MoonIcon />} onSelect={changeTheme('dark')}>
        Change Theme to Dark
      </CommandItem>
      <CommandItem icon={<SunIcon />} onSelect={changeTheme('light')}>
        Change Theme to Light
      </CommandItem>
      <CommandItem icon={<MonitorIcon />} onSelect={changeTheme('system')}>
        Change Theme to System
      </CommandItem>
    </>
  );
}
