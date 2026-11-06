import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./primitives";

const items = [
  "RAG pipelines",
  "Vector search",
  "Computer vision",
  "React + Node",
  "Power BI",
  "LangChain",
  "Real-time inference",
  "Snowflake",
  "TensorFlow",
  "Sub-200ms latency",
];

/**
 * A quiet kinetic separator between the hero and the work section.
 * Pauses on hover, respects reduced motion, decorative only.
 */
export function Ticker() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["3%", "-3%"]);

  return (
    <div ref={ref} className="relative border-y border-line bg-paper/40 py-4">
      <Reveal>
        <div className="group/marquee flex overflow-hidden" aria-hidden="true">
          <motion.div style={{ x }} className="flex min-w-full shrink-0">
            <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8 group-hover/marquee:[animation-play-state:paused]">
              {[...items, ...items].map((item, i) => (
                <span key={`a-${item}-${i}`} className="flex shrink-0 items-center gap-8">
                  <span className="whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-mute">
                    {item}
                  </span>
                  <span className="h-1 w-1 shrink-0 rounded-full bg-sage-300" />
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Reveal>

      {/* edge masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-paper to-transparent" />
    </div>
  );
}
