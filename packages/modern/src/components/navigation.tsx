import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn, Container, WebGLTentacleWall } from '@general/components';
import { Link } from '@tanstack/react-router';
import json from '@json/data/json/navigation.json';

const TICKER_SPEED_PX_PER_SECOND = 120;

interface NavigationProps {
  onNavigate?: () => void;
}

interface NavLink {
  href: string;
  label: string;
}

interface NavItemProps {
  link: NavLink;
  onNavigate?: () => void;
}

function NavItem({ link, onNavigate }: NavItemProps) {
  const itemRef = useRef<HTMLAnchorElement>(null);
  const [repeatCount, setRepeatCount] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    function recompute() {
      const itemWidth = element?.offsetWidth;
      if (!itemWidth) return;
      const count = Math.ceil((window.innerWidth * 2) / itemWidth) + 4;
      const evenCount = count % 2 === 0 ? count : count + 1;
      setRepeatCount(evenCount);
      setDuration((itemWidth * evenCount) / 2 / TICKER_SPEED_PX_PER_SECOND);
      const rect = element.getBoundingClientRect();
      setCenterY(rect.top + rect.height / 2);
    }

    recompute();

    const resizeObserver = new ResizeObserver(recompute);
    resizeObserver.observe(element);
    window.addEventListener('resize', recompute);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', recompute);
    };
  }, []);

  const solidClassNames = 'text-solid group-hover:text-outline';
  const outlineClassNames = 'text-outline group-hover:text-solid';
  const isHiddenClass = 'transition-opacity duration-300 group-hover:opacity-0';

  return (
    <li className="group relative">
      <Link
        ref={itemRef}
        href={link.href}
        onClick={onNavigate}
        className={cn('relative z-10 text-white')}
      >
        <span className={cn(solidClassNames, isHiddenClass)}>{link.label}</span>
        {repeatCount > 0 && (
          <div
            aria-hidden="true"
            style={{ top: centerY, transform: 'translateY(-50%)' }}
            className="pointer-events-none fixed left-0 z-0 w-screen overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <motion.div
              className="flex items-center whitespace-nowrap gap-5"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                ease: 'linear',
                duration: duration || 1,
                repeat: Infinity,
              }}
            >
              {Array.from({ length: repeatCount }, (_, index) => (
                <span
                  key={index}
                  className={cn(
                    'flex shrink-0 items-center gap-[0.3em]',
                    index % 2 === 0 ? outlineClassNames : solidClassNames,
                  )}
                >
                  <span>{link.label}</span>
                </span>
              ))}
            </motion.div>
          </div>
        )}
      </Link>
    </li>
  );
}

function Navigation({ onNavigate }: NavigationProps) {
  return (
    <>
      {/* <div className="absolute inset-0 -z-10">
        <WebGLTentacleWall tentacleCount={6} />
      </div> */}
      <Container data-component="modern-navigation">
        <nav className="grid h-screen place-content-center">
          <ul className="font-mono grid gap-[clamp(0.5rem,6vh,2rem)] text-[clamp(1.5rem,6vh,6rem)] font-bold uppercase text-white mix-blend-difference">
            {json.map((link: NavLink) => (
              <NavItem key={link.href} link={link} onNavigate={onNavigate} />
            ))}
          </ul>
        </nav>
      </Container>
    </>
  );
}

export { Navigation };
