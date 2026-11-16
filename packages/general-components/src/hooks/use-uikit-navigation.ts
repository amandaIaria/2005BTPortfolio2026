import { useActiveSection } from '../hooks/use-active-section';
import { useEffect, useRef, useState, type RefObject } from 'react';

export function useUIkitNavigation(ref: RefObject<HTMLDivElement | null>) {
    const [tocItems, setTocItems] = useState<{ id: string; title: string }[]>([]);

    useEffect(() => {
        const sections = ref.current?.querySelectorAll('section[id]');
        if (!sections) return;
        setTocItems(
            Array.from(sections).map((section) => ({
                id: section.id,
                title: section.querySelector('h2')?.textContent ?? section.id,
            })),
        );
    }, []);

    const activeId = useActiveSection(tocItems.map((item) => item.id));

    return {
        activeId,
        tocItems
    }
}