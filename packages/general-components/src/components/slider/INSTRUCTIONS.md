# Slider Component Instructions

## Overview

Modular carousel component with vertical-translate animations, keyboard/swipe navigation, accessible pagination, and container-query responsive design.

**Key Features:**

- Vertical slide transitions (direction-aware: left pane up/down, right pane inverted)
- Container queries for responsive stacking on mobile
- Keyboard arrows (←/→) + horizontal swipe gestures
- Centered pagination dots with size-differentiated active/inactive states
- Full accessibility (ARIA roles, live regions, screen reader support)
- Reduced-motion support (crossfade fallback)
- Dark mode via CSS custom properties
- Serif typography (Fraunces) on titles with dark dividers

## Component Structure

```
slider/
├── types.ts                 # Type definitions (SliderProps, SliderSlide, etc.)
├── slide-content.tsx        # Right pane content (title, description, list, button)
├── slide-pane.tsx          # Image & copy panes (left, right, mobile)
├── slider-pagination.tsx   # Pagination controls (prev/next buttons, dots)
├── slider-container.tsx    # Main logic (state, transitions, event handlers)
└── index.ts                # Barrel export
```

Each component has single responsibility. Container orchestrates state and transitions.

## Usage

```tsx
import { Slider } from '@general/components';
import type { SliderSlides } from '@general/components';

const slides: SliderSlides = [
  {
    left: {
      image: {
        src: 'https://...',
        alt: 'Description',
      },
    },
    right: {
      title: 'Project Title',
      description: 'Multi-line description text.',
      list: ['Feature 1', 'Feature 2', 'Feature 3'],
      link: { url: '#', copy: 'View Project' },
    },
  },
  // ... more slides
];

export default function SliderDemo() {
  return (
    <div className="h-screen w-screen">
      <Slider
        slides={slides}
        ariaLabel="Featured projects"
        onSlideChange={(index) => console.log(index)}
      />
    </div>
  );
}
```

## Props

```typescript
interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  slides: SliderSlides; // Array of slide objects (required)
  initialIndex?: number; // Start at slide index (default: 0)
  loop?: boolean; // Wrap past first/last slide (default: true)
  ariaLabel?: string; // Accessibility label (default: 'Slides')
  onSlideChange?: (index: number) => void; // Called on navigation
}

interface SliderSlide {
  left: { image: SliderSlideImage };
  right: {
    title: string;
    description: string;
    list: string[];
    link: SliderSlideLink;
  };
}

interface SliderSlideImage {
  src: string;
  alt: string;
}

interface SliderSlideLink {
  url: string;
  copy?: string; // Button text (default: 'Go to site')
}
```

## File Responsibilities

### types.ts

- Defines all TypeScript interfaces
- No component logic or styling

### slide-content.tsx

- Renders right pane content only
- Title with Fraunces serif font
- Dark full-width divider below title (h-0.5, max-w-[90%])
- Description (max-h-48 overflow)
- Dark centered short divider (h-px, w-8, mx-auto)
- List with bullets
- CTA button (size="lg", teal background)
- **Receives:** SliderSlide object
- **Does NOT handle:** Layout, transitions, pane ref

### slide-pane.tsx

- Three exported functions:
  - `SlidePaneImage` - Left pane with image (desktop only, hidden @lg:hidden)
  - `SlidePaneRight` - Right pane container with flex layout
  - `SlideMobileImage` - Mobile image (shown below @lg:hidden)
- Each handles outgoing/incoming phase rendering
- **Receives:** slide, isOutgoing, isTransitioning, outgoingRef (for transitions)
- **Does NOT handle:** Content rendering (delegates to SlideContent)

### slider-pagination.tsx

- Prev/Next buttons (size="lg", 28px icons, shadow-md)
- Centered pagination dots
  - Active: w-3 h-3, teal
  - Inactive: w-1.5 h-1.5, dark with hover
- Uses refs to position dots
- **Receives:** total, current, callbacks, isFirst, isLast, loop, refs
- **Does NOT handle:** Dot centering logic (handled by container via refs)

### slider-container.tsx

- Main logic hub: state management, transitions, event handlers
- Orchestrates useSlider hook for navigation state
- Manages outgoing/incoming pane refs for CSS transitions
- Pagination dot centering via getBoundingClientRect + ResizeObserver
- Keyboard (arrow keys) and swipe (horizontal >50px) handlers
- Inline <style> block with vertical-translate rules (direction-aware)
- Reduced-motion crossfade animations
- **Calls:** useSlider, all child components
- **Owns:** transitionend listeners, DOM measurement logic

### index.ts

- Single barrel export of all public APIs
- Exports: Slider, types, subcomponents, hooks

## Styling & Customization

### Typography

- Title: Fraunces serif, text-4xl @lg:text-5xl, bold, dark (var(--sea-ink))
- Description/list: text-sm @lg:text-base, soft (var(--sea-ink-soft))
- All dark mode via dark: prefix

### Layout

- Desktop: 50/50 split (left image, right copy)
- Mobile: stacked, full-width image then copy below
- Copy constrained to max-w-xl for readable line length

### Colors

- Dividers: dark var(--sea-ink) (not teal)
- Center marker: teal var(--lagoon) (kept as accent)
- Buttons: teal background, hover darker
- Dark mode: auto via CSS custom properties

### Transitions

- Panes: 500ms cubic-bezier(0.4, 0, 0.2, 1)
- Pagination dots: 350ms ease
- Reduced-motion: 150ms crossfade

## Development Workflow

### Adding a Feature

1. Identify which component owns it (container > pane > content)
2. Add prop to types.ts if needed
3. Update component function signature
4. Pass through SliderContainer if crossing boundaries
5. Run `npm run check` (lint + format + type check)

### Styling Changes

- Modify className in target component only
- Preference: Tailwind utilities over custom CSS
- Keep color tokens (var(--sea-ink), var(--lagoon), etc.)
- Dark mode: always include dark: variant

### Transition Changes

- Edit <style> block in slider-container.tsx only
- Keep data-direction/data-phase attributes (CSS selector hooks)
- Test with prefers-reduced-motion: reduce

### Testing

- Dev server: `npm run dev` → localhost:3000/ui-kit/slider
- UI Kit bounded demo: localhost:3000/ui-kit
- Verify: keyboard nav, swipe on mobile, dark mode, reduced-motion

## Performance Notes

- ResizeObserver on dots track for re-centering on resize
- getBoundingClientRect in effect (not render-loop)
- outgoingRef prevents re-renders of outgoing pane (transition continues in DOM)
- Ref-based DOM queries (not querySelector in render)

## Accessibility

- role="region" with aria-roledescription="carousel"
- role="tab" on dots (not button), selected state tracked
- Live region announces current slide: "Slide X of N: [title]"
- aria-controls links dots to slide containers
- Keyboard: arrows ←/→ for prev/next (prevent default)
- Touch: horizontal swipe >50px delta

## Common Patterns

### Conditional Rendering Based on State

```tsx
{
  previous !== null && outgoingSlide && (
    <SlidePaneImage slide={outgoingSlide} isOutgoing />
  );
}
<SlidePaneImage slide={currentSlide} isOutgoing={false} />;
```

Use `previous` (null = not transitioning) to conditionally mount outgoing pane.

### Ref Forwarding

```tsx
const SliderContainer = forwardRef<HTMLDivElement, SliderProps>(...)
```

Allows parent to call .scrollIntoView(), .focus(), etc. on section element.

### CSS Rule Targeting

Data attributes scope CSS to slider context:

```css
[data-component="slider"][data-direction="next"] [data-pane="left"][data-phase="outgoing"]
```

Prevents style leakage. Attribute set only during transitions.
