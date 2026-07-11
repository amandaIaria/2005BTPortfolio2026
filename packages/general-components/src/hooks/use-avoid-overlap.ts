import * as React from 'react';

type Side = 'right' | 'left';
type Mode = 'padding' | 'clip-path';

interface UseAvoidOverlapOptions {
  /** Which side the obstacle is on — determines clipping direction (default: 'right') */
  side?: Side;
  /** Extra gap in pixels between target edge and obstacle (default: 12) */
  gap?: number;
  /** Whether the hook is active (default: true) */
  enabled?: boolean;
  /** 'padding' shifts content inward; 'clip-path' carves a notch around the obstacle (default: 'clip-path') */
  mode?: Mode;
}

const SPACER_ATTR = 'data-avoid-overlap-spacer';

/**
 * Dynamically adjusts target elements so they don't overlap
 * with an absolutely-positioned obstacle element.
 *
 * In 'clip-path' mode, a polygon is generated that carves out the
 * corner where the obstacle intrudes, reshaping the visible area.
 * A floated spacer with shape-outside is also injected so that
 * inline content wraps within the clipped region.
 *
 * In 'padding' mode, padding is added to push content away.
 */
function useAvoidOverlap(
  obstacleRef: React.RefObject<HTMLElement | null>,
  targetRefs: React.RefObject<HTMLElement | null>[],
  options: UseAvoidOverlapOptions = {},
) {
  const { side = 'right', gap = 12, enabled = true, mode = 'clip-path' } = options;

  React.useEffect(() => {
    if (!enabled) return;

    const obstacle = obstacleRef.current;
    if (!obstacle) return;

    const paddingProp =
      side === 'right' ? 'paddingRight' : 'paddingLeft';

    const spacers: HTMLElement[] = [];
    const displayOverrides: HTMLElement[] = [];

    /**
     * Locate the container where inline content lives.
     * For Radix ScrollArea targets this is the viewport's content wrapper;
     * for plain elements it returns the element itself.
     */
    function findContentContainer(el: HTMLElement): HTMLElement {
      const viewport = el.querySelector('[data-slot="scroll-area-viewport"]');
      if (viewport) {
        const wrapper = viewport.firstElementChild as HTMLElement | null;
        if (wrapper && !wrapper.hasAttribute('data-slot')) {
          // Radix may wrap content in a div with display:table —
          // override to block so floats + shape-outside work.
          if (getComputedStyle(wrapper).display === 'table') {
            wrapper.style.display = 'block';
            displayOverrides.push(wrapper);
          }
          return wrapper;
        }
        return viewport as HTMLElement;
      }
      return el;
    }

    function getOrCreateSpacer(el: HTMLElement): HTMLElement {
      const container = findContentContainer(el);
      let spacer = container.querySelector<HTMLElement>(
        `[${SPACER_ATTR}]`,
      );
      if (!spacer) {
        spacer = document.createElement('div');
        spacer.setAttribute(SPACER_ATTR, '');
        spacer.setAttribute('aria-hidden', 'true');
        spacer.style.pointerEvents = 'none';
        spacer.style.padding = '0';
        spacer.style.margin = '0';
        spacer.style.border = 'none';
        spacer.style.background = 'transparent';
        container.prepend(spacer);
        spacers.push(spacer);
      }
      return spacer;
    }

    function update() {
      const obstacleRect = obstacle!.getBoundingClientRect();

      for (const ref of targetRefs) {
        const el = ref.current;
        if (!el) continue;

        const targetRect = el.getBoundingClientRect();

        // Check vertical overlap
        const overlapsVertically =
          targetRect.top < obstacleRect.bottom &&
          targetRect.bottom > obstacleRect.top;

        if (!overlapsVertically) {
          el.style.clipPath = '';
          el.style[paddingProp] = '';
          const spacer = el.querySelector<HTMLElement>(
            `[${SPACER_ATTR}]`,
          );
          if (spacer) spacer.style.display = 'none';
          continue;
        }

        const targetW = targetRect.width;
        const targetH = targetRect.height;

        if (mode === 'clip-path') {
          // Where does the obstacle start/end relative to the target?
          const obstacleTopInTarget = Math.max(
            0,
            obstacleRect.top - targetRect.top - gap,
          );
          const obstacleLeftInTarget =
            side === 'right'
              ? Math.max(0, obstacleRect.left - targetRect.left - gap)
              : 0;
          const obstacleRightInTarget =
            side === 'left'
              ? Math.min(targetW, obstacleRect.right - targetRect.left + gap)
              : targetW;

          // Convert to percentages
          const topPct = (obstacleTopInTarget / targetH) * 100;
          const leftPct = (obstacleLeftInTarget / targetW) * 100;
          const rightPct = (obstacleRightInTarget / targetW) * 100;

          // Build polygon that carves out the obstacle corner
          let polygon: string;

          if (side === 'right') {
            // Full width at top, then narrows at obstacle top, stays narrow to bottom
            polygon = `polygon(
              0% 0%,
              100% 0%,
              100% ${topPct}%,
              ${leftPct}% ${topPct}%,
              ${leftPct}% 100%,
              0% 100%
            )`;
          } else {
            // Full width at top, then narrows on left at obstacle top, stays narrow to bottom
            polygon = `polygon(
              0% 0%,
              100% 0%,
              100% 100%,
              ${rightPct}% 100%,
              ${rightPct}% ${topPct}%,
              0% ${topPct}%
            )`;
          }

          el.style.clipPath = polygon;
          el.style[paddingProp] = '';

          // --- Float spacer for text wrapping (scroll areas only) ---
          // Only inject a spacer into elements that contain a scroll
          // viewport with a constrained height. Plain elements (like
          // the footer) would grow infinitely because the spacer's
          // height feeds back into the element's natural height.
          const viewport = el.querySelector(
            '[data-slot="scroll-area-viewport"]',
          );

          if (viewport) {
            const spacer = getOrCreateSpacer(el);
            spacer.style.display = 'block';
            spacer.style.float = side === 'right' ? 'right' : 'left';

            // Intrusion width
            let intrusionW: number;
            if (side === 'right') {
              intrusionW = targetRect.right - obstacleRect.left + gap;
            } else {
              intrusionW = obstacleRect.right - targetRect.left + gap;
            }
            intrusionW = Math.max(0, intrusionW);

            // Account for scroll so the spacer shape tracks the obstacle
            const scrollTop = viewport.scrollTop;
            const contentTopOffset = Math.max(
              0,
              obstacleRect.top - targetRect.top + scrollTop - gap,
            );

            const container = findContentContainer(el);
            const contentH = Math.max(container.scrollHeight, targetH);

            spacer.style.width = `${intrusionW}px`;
            spacer.style.height = `${contentH}px`;
            spacer.style.shapeOutside = `inset(${contentTopOffset}px 0px 0px 0px)`;
          }
        } else {
          // Padding mode
          let intrusion: number;
          if (side === 'right') {
            intrusion = targetRect.right - obstacleRect.left + gap;
          } else {
            intrusion = obstacleRect.right - targetRect.left + gap;
          }

          el.style.clipPath = '';
          if (intrusion > 0) {
            el.style[paddingProp] = `${intrusion}px`;
          } else {
            el.style[paddingProp] = '';
          }
        }
      }
    }

    // Run once on mount
    update();

    // Watch for resize
    const ro = new ResizeObserver(update);
    ro.observe(obstacle);
    for (const ref of targetRefs) {
      if (ref.current) ro.observe(ref.current);
    }

    // Watch for scroll on the window
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });

    // Also watch for scroll inside each scroll-area viewport
    const viewportCleanups: (() => void)[] = [];
    for (const ref of targetRefs) {
      if (!ref.current) continue;
      const viewport = ref.current.querySelector(
        '[data-slot="scroll-area-viewport"]',
      );
      if (viewport) {
        const handler = () => update();
        viewport.addEventListener('scroll', handler, { passive: true });
        viewportCleanups.push(() =>
          viewport.removeEventListener('scroll', handler),
        );
      }
    }

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      for (const cleanup of viewportCleanups) cleanup();

      // Remove injected spacers
      for (const spacer of spacers) spacer.remove();

      // Reset display overrides
      for (const el of displayOverrides) el.style.display = '';

      // Clean up inline styles
      for (const ref of targetRefs) {
        if (ref.current) {
          ref.current.style.clipPath = '';
          ref.current.style[paddingProp] = '';
        }
      }
    };
  }, [obstacleRef, targetRefs, side, gap, enabled, mode]);
}

export { useAvoidOverlap };
export type { UseAvoidOverlapOptions };
