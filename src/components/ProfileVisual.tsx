import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { usePointerFine } from "../lib/motion";

/**
 * Editorial matte 3D studio sculpture composition for the hero frame.
 * Preserves cursor parallax, offset binding frame, and metadata overlay.
 */
export function ProfileVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const finePointer = usePointerFine();
  const reduced = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const springX = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 90, damping: 22, mass: 0.6 });

  const imageX = useTransform(springX, [0, 1], ["-10px", "10px"]);
  const imageY = useTransform(springY, [0, 1], ["-8px", "8px"]);
  const highlightX = useTransform(springX, [0, 1], ["28%", "72%"]);
  const highlightY = useTransform(springY, [0, 1], ["24%", "76%"]);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!finePointer || reduced || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onPointerLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div className="relative">
      {/* Offset frame — the "binding" of the composition */}
      <motion.div
        aria-hidden="true"
        className="absolute -right-3 -top-3 bottom-3 left-3 border border-sage-300/70 sm:-right-5 sm:-top-5 sm:bottom-5 sm:left-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 1.45 }}
      />

      <motion.div
        ref={containerRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        initial={{ opacity: 0, scale: 1.035 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.95 }}
        className="relative aspect-[4/5] w-full overflow-hidden border border-line bg-sage-50 sm:aspect-[5/6]"
      >
        {/* studio 3D render */}
        <motion.div
          className="absolute inset-[-3%]"
          style={{ x: reduced ? 0 : imageX, y: reduced ? 0 : imageY }}
        >
          <img
            src="/images/hero-visual.png"
            alt="Minimalist matte 3D ceramic and limestone sculptural composition in sage, ivory, and charcoal"
            className="h-full w-full object-cover object-center"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        {/* subtle palette-harmonizing atmospheric highlight */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55 mix-blend-soft-light blur-3xl"
          style={{
            left: highlightX,
            top: highlightY,
            background:
              "radial-gradient(circle, rgba(252,252,250,0.85) 0%, rgba(233,237,228,0.25) 50%, transparent 75%)",
          }}
        />

        {/* fine inner veil for bottom bar legibility */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-paper/55 via-paper/15 to-transparent"
        />

        {/* in-frame metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.6 }}
          className="absolute inset-x-0 bottom-0 flex items-end justify-between border-t border-line/80 bg-paper/75 px-4 py-3 backdrop-blur-sm"
        >
          <div className="font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.14em] text-ink-mute">
            <div>Studio Still — 01</div>
            <div className="text-ink-faint">Equilibrium / 2026</div>
          </div>
          <div className="text-right font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.14em] text-ink-faint">
            <div>28.83° N</div>
            <div>78.77° E</div>
          </div>
        </motion.div>
      </motion.div>

      {/* floating caption, outside the frame */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.75 }}
        className="absolute -left-2 bottom-16 hidden -translate-x-full items-center gap-2 lg:flex"
      >
        <span className="h-px w-8 bg-ink-faint/60" />
        <span className="max-w-[9rem] font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.14em] text-ink-faint">
          Systems that read the world
        </span>
      </motion.div>
    </div>
  );
}
