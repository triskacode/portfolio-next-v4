import { Icon } from './ui/icon';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export function LightDarkThemeSwitcher(): JSX.Element {
  return (
    <RadioGroup
      defaultValue="system"
      className="flex flex-row items-center justify-center gap-0 rounded-full border p-0.5 focus-within:ring-1 focus-within:ring-ring"
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
