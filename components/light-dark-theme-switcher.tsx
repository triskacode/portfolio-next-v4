'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Icon } from './ui/icon';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Skeleton } from './ui/skeleton';

export function LightDarkThemeSwitcher(): React.JSX.Element {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <LightDarkThemeSwitcherSkeleton />;
  }

  return (
    <RadioGroup
      className="flex flex-row items-center justify-center gap-0 rounded-full border p-0.5 focus-within:ring-1 focus-within:ring-ring"
      defaultValue={theme}
      onValueChange={(value) => {
        setTheme(value);
      }}
    >
      <div>
        <RadioGroupItem
          id="light-theme-radio-switch"
          value="light"
          className="peer sr-only"
        />
        <Label
          htmlFor="light-theme-radio-switch"
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent hover:text-accent-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground"
        >
          <Icon.Lucide name="sun" className="h-4 w-4" />
        </Label>
      </div>
      <div>
        <RadioGroupItem
          id="system-theme-radio-switch"
          value="system"
          className="peer sr-only"
        />
        <Label
          htmlFor="system-theme-radio-switch"
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent hover:text-accent-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground"
        >
          <Icon.Lucide name="monitor" className="h-4 w-4" />
        </Label>
      </div>
      <div>
        <RadioGroupItem
          id="dark-theme-radio-switch"
          value="dark"
          className="peer sr-only"
        />
        <Label
          htmlFor="dark-theme-radio-switch"
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent hover:text-accent-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground"
        >
          <Icon.Lucide name="moon" className="h-4 w-4" />
        </Label>
      </div>
    </RadioGroup>
  );
}

export function LightDarkThemeSwitcherSkeleton(): React.JSX.Element {
  return (
    <div className="flex flex-row items-center justify-center gap-0 rounded-full border p-0.5 focus-within:ring-1 focus-within:ring-ring">
      <Skeleton
        className={cn(
          'h-[var(--light-theme-radio-switch-height)] w-[var(--light-theme-radio-switch-width)] rounded-full',
          '[--light-theme-radio-switch-height:theme(spacing.8)] [--light-theme-radio-switch-width:calc((theme(spacing.8)*3))]',
        )}
      />
    </div>
  );
}
