import {
  motion,
  animate,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import { useState } from 'react';
import { Navigation } from './navigation';

function NavToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const width = useMotionValue(0);

  function toggle() {
    const next = !isOpen;
    setIsOpen(next);
    animate(width, next ? window.innerWidth : 0, {
      duration: shouldReduceMotion ? 0 : 0.6,
      ease: 'easeInOut',
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        data-component="nav-toggle-button"
        className="fixed top-4 left-4 z-[80] px-4 py-2 rounded bg-black text-white"
      >
        {isOpen ? 'Close' : 'Menu'}
      </button>
      <motion.div
        data-component="nav-toggle-panel"
        className="fixed inset-0 z-[55] overflow-hidden"
        style={{ width, pointerEvents: isOpen ? 'auto' : 'none' }}
      >
        <Navigation onNavigate={() => setIsOpen(false)} />
      </motion.div>
    </>
  );
}

export { NavToggle };
