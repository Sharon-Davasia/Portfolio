import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { DUR, EASE, EASE_OUT, STAGGER } from "../lib/motion";

/* ------------------------------------------------------------------ */
/*  Split words — masked upward reveal, staggered                      */
/* ------------------------------------------------------------------ */

type SplitTextProps = {
  text: string;
  className?: string;
  /** per-word delay */
  stagger?: number;
  delay?: number;
  /** animate on mount instead of on scroll */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /** words rendered in serif italic accent */
  accentWords?: string[];
};

export function SplitText({
  text,
  className = "",
  stagger = STAGGER.word,
  delay = 0,
  immediate = false,
  as = "div",
  accentWords = [],
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduced = useReducedMotion();
  const active = immediate || inView;

  const words = text.split(" ");
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      className={className}
      initial="hidden"
      animate={active ? "show" : "hidden"}
    >
      {words.map((word, i) => {
        const isAccent = accentWords.includes(word.replace(/[^\w]/g, ""));
        return (
          <span key={`${word}-${i}`} className="word-mask">
            <motion.span
              className={`inline-block will-change-transform ${
                isAccent ? "serif-accent pr-[0.06em]" : ""
              }`}
              variants={{
                hidden: { y: reduced ? 0 : "108%", opacity: reduced ? 0 : 1, rotate: reduced ? 0 : 2 },
                show: {
                  y: "0%",
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    duration: reduced ? 0.001 : DUR.reveal,
                    ease: EASE,
                    delay: reduced ? 0 : delay + i * stagger,
                  },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? <span>&nbsp;</span> : null}
          </span>
        );
      })}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Masked line reveal for multi-line editorial headings               */
/* ------------------------------------------------------------------ */

export function MaskedLines({
  lines,
  className = "",
  lineClassName = "",
  stagger = 0.09,
  delay = 0,
  immediate = false,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();
  const active = immediate || inView;

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} className="word-mask">
          <motion.div
            className={lineClassName}
            initial={{ y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 }}
            animate={active ? { y: "0%", opacity: 1 } : { y: reduced ? 0 : "110%", opacity: reduced ? 0 : 1 }}
            transition={{
              duration: reduced ? 0.001 : DUR.reveal,
              ease: EASE,
              delay: reduced ? 0 : delay + i * stagger,
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Generic scroll reveal                                              */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
  once = true,
  blur = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  blur?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-8% 0px -8% 0px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y, filter: blur ? "blur(6px)" : "blur(0px)" }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: reduced ? 0 : y, filter: blur ? "blur(6px)" : "blur(0px)" }
      }
      transition={{ duration: reduced ? 0.001 : DUR.reveal, ease: EASE, delay: reduced ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Staggered group — parents/children pair                            */
/* ------------------------------------------------------------------ */

export function StaggerGroup({
  children,
  className = "",
  stagger = STAGGER.item,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px -6% 0px" });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: reduced ? 0 : delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  y = 14,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.001 : 0.62, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated hairline that draws itself into view                      */
/* ------------------------------------------------------------------ */

export function DrawLine({
  className = "",
  delay = 0,
  vertical = false,
}: {
  className?: string;
  delay?: number;
  vertical?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="bg-line"
        style={{
          ...(vertical ? { width: 1, height: "100%" } : { height: 1, width: "100%" }),
          transformOrigin: vertical ? "top" : "left",
        }}
        initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1, opacity: 0.4 }}
        animate={inView ? { scaleX: 1, scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: reduced ? 0.001 : 1.1, ease: EASE_OUT, delay: reduced ? 0 : delay }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Arrow glyph with directional hover motion                           */
/* ------------------------------------------------------------------ */

export function ArrowUpRight({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRight({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2.5 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
