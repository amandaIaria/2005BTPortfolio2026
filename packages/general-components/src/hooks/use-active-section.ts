import * as React from 'react';

/**
 * Tracks which of the given section ids is currently "active" — the one
 * nearest the top of the viewport. Used to drive scrollspy-style table of
 * contents highlighting.
 */
function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const topMost = visible.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top
            ? entry
            : closest,
        );

        setActiveId(topMost.target.id);
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: 0 },
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

export { useActiveSection };
