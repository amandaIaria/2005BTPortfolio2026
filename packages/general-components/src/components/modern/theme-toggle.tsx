import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useLayoutEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

const STORAGE_KEY = 'theme-mode';
type ColorMode = 'light' | 'dark';

function applyColorMode(mode: ColorMode) {
  const root = document.documentElement;
  if (mode === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }
}

function readStoredColorMode(): ColorMode | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'dark' || stored === 'light' ? stored : null;
}

function ThemeToggle() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useTranslation();
  const [mode, setMode] = useState<ColorMode>('light');

  useLayoutEffect(() => {
    const initial =
      readStoredColorMode() ??
      (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    setMode(initial);
    applyColorMode(initial);
  }, []);

  function toggle() {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      applyColorMode(next);
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }

  const isDark = mode === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={
        isDark
          ? t('themeToggle.lightModeLabel')
          : t('themeToggle.darkModeLabel')
      }
      data-component="theme-toggle-button"
      className="fixed top-12 right-4 z-[80] flex size-9 items-center justify-center rounded-full border border-[var(--sea-ink)]/15 bg-[var(--surface)] text-[var(--sea-ink)] shadow-sm backdrop-blur transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          className="flex"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.25,
            ease: 'easeInOut',
          }}
        >
          {isDark ? (
            <MoonIcon className="size-5" weight="fill" />
          ) : (
            <SunIcon className="size-5" weight="fill" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export { ThemeToggle };
