import { motion, useScroll, useSpring, useTransform } from "framer-motion";


/** Hairline scroll progress pinned to the very top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-ink/70"
      style={{ scaleX }}
    />
  );
}

/** Vertical section counter on the right edge (desktop only). */
export function SectionRail() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 2xl:block"
    >
      <div className="relative h-40 w-px bg-line">
        <motion.span
          className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-ink"
          style={{ y }}
        />
      </div>
      <div className="mt-4 flex justify-center">
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.22em] text-ink-faint [writing-mode:vertical-rl]">
          Scroll
        </span>
      </div>
    </div>
  );
}

/** Corner crosshair — a quiet technical accent. */
export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      className={className}
    >
      <path d="M7.5 0V15M0 7.5H15" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}
