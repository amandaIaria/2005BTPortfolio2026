import { motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { useState } from 'react';
import { MenuToggleIcon } from './menu-toggle-icon';
import { Navigation } from './navigation';

const panelVariants: Variants = {
  open: { width: '100%' },
  closed: { width: 0 },
};

function NavToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        data-component="nav-toggle-button"
        className="fixed top-12 left-4 z-[80] flex items-center justify-center rounded bg-black p-2 text-white"
      >
        <MenuToggleIcon
          isOpen={isOpen}
          shouldReduceMotion={shouldReduceMotion}
        />
      </button>
      <motion.div
        data-component="nav-toggle-panel"
        className="fixed inset-0 z-[55] overflow-hidden"
        variants={panelVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.6,
          ease: 'easeInOut',
        }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <Navigation onNavigate={() => setIsOpen(false)} />
      </motion.div>
    </>
  );
}

export { NavToggle };
