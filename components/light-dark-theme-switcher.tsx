'use client';

import { useTheme } from 'next-themes';
import { memo } from 'react';
import { cn } from '@/lib/utils';
import { useMounted } from '@/hooks/use-mounted';
import { Icon } from './ui/icon';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Skeleton } from './ui/skeleton';

interface ThemeOption {
  id: string;
  value: string;
  icon: 'sun' | 'moon' | 'monitor';
  label: string;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'switch-to-light-theme',
    value: 'light',
    icon: 'sun',
    label: 'switch to light theme',
  },
  {
    id: 'switch-to-system-theme',
    value: 'system',
    icon: 'monitor',
    label: 'switch to system theme',
  },
  {
    id: 'switch-to-dark-theme',
    value: 'dark',
    icon: 'moon',
    label: 'switch to dark theme',
  },
] as const;

function LightDarkThemeSwitcherComponent(): React.JSX.Element {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

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
      aria-label="theme switcher"
    >
      {themeOptions.map((option) => (
        <div
          key={option.id}
          className="flex flex-row items-center justify-center gap-0"
        >
          <RadioGroupItem
            id={option.id}
            value={option.value}
            className="peer sr-only"
          />
          <ThemeSwitchLabel htmlFor={option.id}>
            <span className="sr-only">{option.label}</span>
            <Icon.Lucide name={option.icon} className="h-4 w-4" />
          </ThemeSwitchLabel>
        </div>
      ))}
    </RadioGroup>
  );
}

export const LightDarkThemeSwitcher = memo(LightDarkThemeSwitcherComponent);

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

type ThemeSwitchLabelProps = React.ComponentProps<typeof Label>;

function ThemeSwitchLabel(props: ThemeSwitchLabelProps): React.JSX.Element {
  const { children, className, htmlFor, ...defaultProps } = props;
  return (
    <Label
      htmlFor={htmlFor}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent hover:text-accent-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground',
        className,
      )}
      {...defaultProps}
    >
      {children}
    </Label>
  );
}
