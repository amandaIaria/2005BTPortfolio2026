import { motion } from 'motion/react';

interface MenuToggleIconProps {
  isOpen: boolean;
  shouldReduceMotion: boolean | null;
}

function MenuToggleIcon({ isOpen, shouldReduceMotion }: MenuToggleIconProps) {
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.3,
    ease: 'easeInOut' as const,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      data-component="menu-toggle-icon"
      className="size-5"
    >
      <motion.line
        x1="4"
        x2="20"
        y1="6"
        y2="6"
        style={{ originX: '50%', originY: '50%' }}
        animate={{ translateY: isOpen ? 6 : 0, rotate: isOpen ? 45 : 0 }}
        transition={transition}
      />
      <motion.line
        x1="4"
        x2="20"
        y1="12"
        y2="12"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={transition}
      />
      <motion.line
        x1="4"
        x2="20"
        y1="18"
        y2="18"
        style={{ originX: '50%', originY: '50%' }}
        animate={{ translateY: isOpen ? -6 : 0, rotate: isOpen ? -45 : 0 }}
        transition={transition}
      />
    </svg>
  );
}

export { MenuToggleIcon };
