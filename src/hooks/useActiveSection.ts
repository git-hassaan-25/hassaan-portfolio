import { useEffect, useState } from 'react';

/**
 * Scrollspy: returns the id of the section currently occupying the
 * middle band of the viewport. `ids` should be stable across renders.
 */
export function useActiveSection(ids: readonly string[]): string {
  // Starts empty so nothing is highlighted until a section actually enters the band.
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|')]);

  return active;
}
