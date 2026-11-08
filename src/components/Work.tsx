import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { projects, type Project } from "../data/content";
import { EASE, usePointerFine } from "../lib/motion";
import { ProjectVisual } from "./ProjectVisual";
import { ArrowUpRight, MaskedLines, Reveal } from "./primitives";
import { Crosshair } from "./Chrome";

/* ------------------------------------------------------------------ */
/*  Hover indicator that follows the cursor inside a preview          */
/* ------------------------------------------------------------------ */

function usePreviewHover() {
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 30, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 30, mass: 0.4 });
  const enabled = fine && !reduced;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return { enabled, springX, springY, onMove };
}

function PreviewChrome({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative h-full w-full">
      {children}
      <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-line/90 bg-paper/85 px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-soft backdrop-blur-sm">
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured project — large editorial layout                          */
/* ------------------------------------------------------------------ */

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const visualRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const flip = index % 2 === 1;
  const { enabled, springX, springY, onMove } = usePreviewHover();

  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1.08, 1, 1.04]);
  const driftY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-4%", "4%"]);

  return (
    <article className="group relative border-t border-line py-14 first:border-t-0 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        {/* ---------- visual ---------- */}
        <motion.div
          ref={visualRef}
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          whileInView={{ clipPath: "inset(0 0 0% 0)" }}
          viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
          transition={{ duration: reduced ? 0.001 : 1.05, ease: EASE }}
          className={`relative lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
        >
          <div
            className="relative aspect-[16/11] overflow-hidden border border-line bg-cream transition-colors duration-500 ease-smooth group-hover:border-ink/20 sm:aspect-[16/10]"
            onPointerMove={onMove}
          >
            <motion.div className="absolute inset-0" style={{ scale, y: driftY }}>
              <motion.div
                className="absolute inset-[-2%] transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.045]"
                initial={false}
              >
                <PreviewChrome label={`0${index + 1} / ${project.year}`}>
                  <ProjectVisual kind={project.visual} />
                </PreviewChrome>
              </motion.div>
            </motion.div>

            {/* hover veil for legibility of the cursor chip */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* cursor chip */}
            {enabled && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-20 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-ink text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
              >
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em]">View</span>
              </motion.div>
            )}

            {/* corner ticks */}
            <span className="pointer-events-none absolute bottom-3 right-3 z-10 h-4 w-4 border-b border-r border-ink/25" />
            <span className="pointer-events-none absolute right-3 top-3 z-10 h-4 w-4 border-r border-t border-ink/25" />
          </div>

          {/* caption line under the visual */}
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-lineSoft pt-3">
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
              {project.kicker}
            </span>
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
              Case {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* ---------- information ---------- */}
        <div
          className={`lg:col-span-5 lg:pt-2 ${flip ? "lg:order-1" : ""}`}
        >
          <Reveal delay={0.06}>
            <h3 className="text-[2rem] font-medium leading-[1.02] tracking-[-0.035em] text-ink sm:text-[2.6rem]">
              {project.title}
            </h3>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-prose text-[0.9375rem] leading-relaxed text-ink-mute">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-4 max-w-prose text-[0.875rem] leading-relaxed text-ink-faint">
              {project.detail}
            </p>
          </Reveal>

          {/* metrics */}
          <Reveal delay={0.24}>
            <dl className="mt-8 grid grid-cols-3 gap-3 border-y border-line py-5">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <div className="text-[1.0625rem] font-medium tracking-tight text-ink">
                      {metric.value}
                    </div>
                    <div className="mt-1 font-mono text-[0.5rem] uppercase leading-relaxed tracking-[0.12em] text-ink-faint">
                      {metric.label}
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* stack */}
          <Reveal delay={0.3}>
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technology stack">
              {project.stack.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* links */}
          <Reveal delay={0.36}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/link relative inline-flex items-center gap-2 text-[0.875rem] text-ink"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-smooth group-hover/link:scale-x-100" />
                  </span>
                  <span className="transition-transform duration-300 ease-smooth group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                    <ArrowUpRight size={12} />
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Compact project row                                                */
/* ------------------------------------------------------------------ */

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { enabled, springX, springY, onMove } = usePreviewHover();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group border-t border-line"
    >
      <div className="grid grid-cols-1 gap-6 py-9 sm:grid-cols-12 sm:items-center sm:gap-8">
        <div className="sm:col-span-1">
          <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="sm:col-span-4">
          <div
            className="relative aspect-[16/9] overflow-hidden border border-line bg-cream transition-colors duration-500 ease-smooth group-hover:border-ink/20"
            onPointerMove={onMove}
          >
            <div className="absolute inset-0 transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.06]">
              <PreviewChrome label={project.kicker}>
                <ProjectVisual kind={project.visual} />
              </PreviewChrome>
            </div>
            {enabled && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-20 h-9 w-9 rounded-full border border-ink/30 bg-paper/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
              />
            )}
          </div>
        </div>

        <div className="sm:col-span-5">
          <h3 className="text-xl font-medium tracking-[-0.025em] text-ink transition-transform duration-500 ease-smooth group-hover:-translate-y-0.5 sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-2 max-w-prose text-[0.875rem] leading-relaxed text-ink-mute">
            {project.summary}
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 sm:text-right">
          <div className="flex items-center gap-5 sm:flex-col sm:items-end sm:gap-2">
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
              {project.year}
            </span>
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group/link inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                {link.label}
                <span className="transition-transform duration-300 ease-smooth group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                  <ArrowUpRight size={11} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function Work() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative scroll-mt-24">
      <div className="shell">
        {/* header */}
        <div className="grid grid-cols-1 gap-8 border-t border-line pb-4 pt-14 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pt-20">
          <div className="lg:col-span-8">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <Crosshair className="text-ink-faint" />
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-ink-faint">
                  01 — Selected work
                </span>
                <span className="h-px w-12 bg-line" />
              </div>
            </Reveal>
            <MaskedLines
              className="text-[1.9rem] font-medium leading-[1.04] tracking-[-0.035em] text-ink sm:text-[2.6rem] lg:text-[3.1rem]"
              lines={[
                <span key="l1">Systems built to</span>,
                <span key="l2">
                  hold up{" "}
                  <span className="serif-accent">in production.</span>
                </span>,
              ]}
            />
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.12}>
              <p className="max-w-sm text-[0.875rem] leading-relaxed text-ink-mute lg:ml-auto">
                Three builds that shaped how I think about latency, trust, and the space between
                a model that works and a system that ships.
              </p>
            </Reveal>
          </div>
        </div>

        {/* featured */}
        <div className="mt-6">
          {featured.map((project, i) => (
            <FeaturedProject key={project.slug} project={project} index={i} />
          ))}
          {rest.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={featured.length + i} />
          ))}
        </div>

        {/* footer link */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 border-t border-line py-8 sm:flex-row sm:items-center">
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
              More experiments on GitHub — RecallPad, ideaforge, NeetCode
            </p>
            <a
              href="https://github.com/Sharon-Davasia"
              target="_blank"
              rel="noreferrer noopener"
              className="group/link inline-flex items-center gap-2 text-[0.875rem] text-ink"
            >
              <span className="relative">
                Browse repositories
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-smooth group-hover/link:scale-x-100" />
              </span>
              <span className="transition-transform duration-300 ease-smooth group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                <ArrowUpRight size={12} />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
