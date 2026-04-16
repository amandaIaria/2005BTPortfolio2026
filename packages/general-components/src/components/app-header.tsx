import * as React from 'react';
import { cn } from '../lib/utils';
import { Switch } from './ui/switch';

type ThemeVariant = '2005' | 'modern';
type ColorMode = 'light' | 'dark';

interface AppHeaderProps extends React.ComponentProps<'header'> {
  themeVariant?: ThemeVariant;
  onThemeVariantChange?: (variant: ThemeVariant) => void;
  colorMode?: ColorMode;
  onColorModeChange?: (mode: ColorMode) => void;
  /** Called when the theme variant changes — use to navigate between routes */
  navigate?: (path: string) => void;
}

function AppHeader({
  themeVariant: controlledVariant,
  onThemeVariantChange,
  colorMode: controlledMode,
  onColorModeChange,
  navigate,
  className,
  children,
  ...props
}: AppHeaderProps) {
  const [internalVariant, setInternalVariant] =
    React.useState<ThemeVariant>('2005');
  const [internalMode, setInternalMode] = React.useState<ColorMode>(() => {
    if (typeof window === 'undefined') return 'light';
    return document.documentElement.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light';
  });

  const variant = controlledVariant ?? internalVariant;
  const mode = controlledMode ?? internalMode;

  const isModern = variant === 'modern';
  const isDark = mode === 'dark';

  const handleVariantToggle = (checked: boolean) => {
    const next = checked ? 'modern' : '2005';
    setInternalVariant(next);
    onThemeVariantChange?.(next);
    navigate?.(next === 'modern' ? '/modern' : '/');
  };

  const handleModeToggle = (checked: boolean) => {
    const next = checked ? 'dark' : 'light';
    setInternalMode(next);
    onColorModeChange?.(next);

    const root = document.documentElement;
    if (next === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  };

  return (
    <header
      data-component="app-header"
      className={cn(
        'flex items-center justify-between px-4 py-2 bg-cyan-500',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <label
          htmlFor="theme-variant-switch"
          className="cursor-pointer select-none text-xs font-medium text-white"
        >
          2005
        </label>
        <Switch
          id="theme-variant-switch"
          checked={isModern}
          onCheckedChange={handleVariantToggle}
          size="sm"
          aria-label="Switch between 2005 and modern theme"
        />
        <label
          htmlFor="theme-variant-switch"
          className="cursor-pointer select-none text-xs font-medium text-white"
        >
          Modern
        </label>
      </div>

      {children}

      <div className="flex items-center gap-2">
        <label
          htmlFor="color-mode-switch"
          className="cursor-pointer select-none text-xs font-medium text-white"
        >
          Light
        </label>
        <Switch
          id="color-mode-switch"
          checked={isDark}
          onCheckedChange={handleModeToggle}
          size="sm"
          aria-label="Switch between light and dark mode"
        />
        <label
          htmlFor="color-mode-switch"
          className="cursor-pointer select-none text-xs font-medium text-white"
        >
          Dark
        </label>
      </div>
    </header>
  );
}

export { AppHeader };
export type { AppHeaderProps, ThemeVariant, ColorMode };
