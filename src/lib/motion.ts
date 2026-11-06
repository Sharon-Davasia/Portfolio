import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/** Motion language — one source of truth for the whole site. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  micro: 0.18,
  button: 0.24,
  reveal: 0.72,
  image: 0.9,
  section: 0.6,
} as const;

export const STAGGER = {
  word: 0.075,
  item: 0.07,
  section: 0.09,
} as const;

/** Hero choreography offsets (seconds). */
export const HERO_TIMING = {
  nav: 0.15,
  label: 0.45,
  heading: 0.62,
  description: 1.32,
  actions: 1.5,
  visual: 0.95,
  accents: 1.7,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.reveal, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.reveal, ease: EASE } },
};

export const revealScale = {
  hidden: { opacity: 0, scale: 1.06 },
  show: { opacity: 1, scale: 1, transition: { duration: DUR.image, ease: EASE } },
};

/** Helpers to keep DOM tidy while still respecting reduced motion. */
export function useMotionPreference() {
  const reduced = useReducedMotion();
  return {
    reduced: Boolean(reduced),
    /** Distance helpers collapse under reduced motion. */
    dist: (px: number) => (reduced ? 0 : px),
    dur: (seconds: number) => (reduced ? 0.001 : seconds),
  };
}

/** Media query hook (SSR-safe, no layout thrash). */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True on devices with a real pointer — gates cursor-follow effects. */
export function usePointerFine() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
