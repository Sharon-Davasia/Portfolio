import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { usePointerFine } from "../lib/motion";

/**
 * Abstract portrait composition — used instead of inventing a face.
 * Layered geometry, sage surfaces and a monogram inside an offset frame.
 */
export function ProfileVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const finePointer = usePointerFine();
  const reduced = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const springX = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 90, damping: 22, mass: 0.6 });

  const circleX = useTransform(springX, [0, 1], ["-16px", "16px"]);
  const circleY = useTransform(springY, [0, 1], ["-12px", "12px"]);
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
        {/* fine grid */}
        <div
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(18,20,15,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(18,20,15,0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* soft cursor-tracking highlight */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            left: highlightX,
            top: highlightY,
            background:
              "radial-gradient(circle, rgba(199,207,189,0.55) 0%, rgba(233,237,228,0.15) 45%, transparent 70%)",
          }}
        />

        {/* geometric composition */}
        <motion.svg
          viewBox="0 0 400 500"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          style={{ x: reduced ? 0 : circleX, y: reduced ? 0 : circleY }}
        >
          <defs>
            <linearGradient id="arcFade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#12140F" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#12140F" stopOpacity="0.06" />
            </linearGradient>
          </defs>

          {/* concentric arcs */}
          {[150, 175, 200, 225, 250].map((r, i) => (
            <circle
              key={r}
              cx="200"
              cy="268"
              r={r}
              fill="none"
              stroke="rgba(18,20,15,0.13)"
              strokeWidth={i === 2 ? 0.9 : 0.6}
              strokeDasharray={i === 4 ? "1 7" : undefined}
            />
          ))}

          {/* rotating dashed ring */}
          <motion.g
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 96, ease: "linear", repeat: Infinity }}
            style={{ originX: "200px", originY: "268px" }}
          >
            <circle
              cx="200"
              cy="268"
              r="132"
              fill="none"
              stroke="rgba(18,20,15,0.2)"
              strokeWidth="0.75"
              strokeDasharray="2 10"
            />
            <circle cx="200" cy="136" r="2.6" fill="#12140F" opacity="0.55" />
          </motion.g>

          {/* horizon line */}
          <line x1="24" y1="268" x2="376" y2="268" stroke="url(#arcFade)" strokeWidth="0.85" />
          <line x1="200" y1="40" x2="200" y2="470" stroke="rgba(18,20,15,0.07)" strokeWidth="0.85" />

          {/* solid arc block */}
          <path
            d="M200 268 m -150 0 a 150 150 0 0 1 300 0 z"
            fill="#DCE2D4"
            opacity="0.55"
          />
          <path
            d="M200 268 m -96 0 a 96 96 0 0 1 192 0 z"
            fill="#F7F5EF"
            opacity="0.9"
          />

          {/* crosshair marks */}
          {[
            [200, 42],
            [200, 494],
            [26, 268],
            [374, 268],
          ].map(([cx, cy], i) => (
            <g key={i} stroke="rgba(18,20,15,0.35)" strokeWidth="0.8">
              <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} />
              <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} />
            </g>
          ))}
        </motion.svg>

        {/* monogram */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
            className="font-serif text-[5.5rem] leading-none tracking-[-0.04em] text-ink/85 sm:text-[6.5rem]"
          >
            SD
          </motion.span>
        </div>

        {/* in-frame metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.6 }}
          className="absolute inset-x-0 bottom-0 flex items-end justify-between border-t border-line/80 bg-paper/60 px-4 py-3 backdrop-blur-[2px]"
        >
          <div className="font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.14em] text-ink-mute">
            <div>Portrait — Abstract</div>
            <div className="text-ink-faint">No. 001 / 2026</div>
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
