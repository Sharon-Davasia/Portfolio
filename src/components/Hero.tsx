import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "../data/content";
import { EASE, HERO_TIMING } from "../lib/motion";
import { ArrowRight, ArrowUpRight, SplitText } from "./primitives";
import { ProfileVisual } from "./ProfileVisual";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "5%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0.25]);

  return (
    <section
      id="hero"
      ref={ref}
      className="grain relative isolate overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 opacity-[0.65] mask-fade-b" />
        <div className="absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-sage-100/70 blur-[110px]" />
        <div className="absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-cream blur-[90px]" />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(18,20,15,0.14), transparent)",
          }}
        />
      </div>

      <motion.div style={{ y: contentY, opacity: fade }} className="shell">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---------------- Left: editorial copy ---------------- */}
          <div className="relative lg:col-span-7 xl:col-span-7">
            {/* 1. label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: HERO_TIMING.label }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3 py-1.5 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-soft backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-halo rounded-full bg-[#7B8F5E]" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7B8F5E]" />
                </span>
                Available for 2026
              </span>
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                AI / ML · Full-stack
              </span>
            </motion.div>

            {/* 2. heading */}
            <h1 className="mt-7 max-w-[19ch] text-display-md font-medium text-ink sm:mt-9">
              <SplitText
                as="span"
                text="Engineering"
                delay={HERO_TIMING.heading}
                className="block"
                immediate
              />
              <SplitText
                as="span"
                text="intelligence that"
                delay={HERO_TIMING.heading + 0.09}
                className="block"
                immediate
              />
              <span className="block">
                <SplitText
                  as="span"
                  text="ships."
                  delay={HERO_TIMING.heading + 0.18}
                  accentWords={["ships"]}
                  className="inline"
                  immediate
                />
              </span>
            </h1>

            {/* animated underline sweep under the heading */}
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.25, ease: EASE, delay: HERO_TIMING.heading + 0.7 }}
              className="mt-6 h-px w-full max-w-[26rem] origin-left bg-gradient-to-r from-ink/40 via-line to-transparent"
            />

            {/* 3. description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: HERO_TIMING.description }}
              className="mt-6 max-w-prose text-[0.9375rem] leading-relaxed text-ink-mute sm:text-base"
            >
              {profile.summary}
            </motion.p>

            {/* 4. actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: HERO_TIMING.actions }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="#work" className="btn-primary group">
                View selected work
                <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-1">
                  <ArrowRight size={13} />
                </span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="btn-ghost group"
              >
                Get in touch
                <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={13} />
                </span>
              </a>
            </motion.div>

            {/* 5. stat strip */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: HERO_TIMING.accents + 0.15 }}
              className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-3"
            >
              {[
                { value: "9.88", label: "SGPA · Sem 2" },
                { value: "3", label: "Internships" },
                { value: "Top 3", label: "of 50+ · Hackathon" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <div className="text-xl font-medium tracking-tight text-ink">{stat.value}</div>
                    <div className="mt-1 font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.14em] text-ink-faint">
                      {stat.label}
                    </div>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------------- Right: profile visual ---------------- */}
          <div className="relative lg:col-span-5 xl:col-span-4 xl:col-start-9 lg:pt-6">
            <motion.div style={{ y: visualY }} className="relative mx-auto max-w-[22rem] lg:mx-0 lg:ml-auto lg:max-w-[24rem]">
              <ProfileVisual />

              {/* rotating technical label */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: HERO_TIMING.accents + 0.3 }}
                className="absolute -bottom-6 -left-6 hidden h-20 w-20 sm:block"
                aria-hidden="true"
              >
                <motion.svg
                  viewBox="0 0 100 100"
                  className="h-full w-full"
                  animate={reduced ? undefined : { rotate: -360 }}
                  transition={{ duration: 34, ease: "linear", repeat: Infinity }}
                >
                  <defs>
                    <path id="labelCircle" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
                  </defs>
                  <circle cx="50" cy="50" r="42" fill="#FCFCFA" stroke="#E3E4DC" strokeWidth="1" />
                  <text
                    fill="#6E726A"
                    fontSize="7.4"
                    fontFamily="'JetBrains Mono', monospace"
                    letterSpacing="2.6"
                  >
                    <textPath href="#labelCircle" startOffset="0">
                      · PYTHON · REACT · RAG · VISION
                    </textPath>
                  </text>
                  <circle cx="50" cy="50" r="2.4" fill="#12140F" />
                </motion.svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: HERO_TIMING.accents + 0.6 }}
        className="shell mt-16 hidden items-center gap-3 lg:mt-24 lg:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-ink-faint">
          Scroll
        </span>
        <span className="relative h-8 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-3 animate-scroll-cue bg-ink" />
        </span>
      </motion.div>
    </section>
  );
}
