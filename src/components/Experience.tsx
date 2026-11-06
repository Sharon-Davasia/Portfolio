import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experiences } from "../data/content";
import { EASE } from "../lib/motion";
import { Crosshair } from "./Chrome";
import { MaskedLines, Reveal } from "./primitives";

export function Experience() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative scroll-mt-24">
      <div className="shell">
        <div className="grid grid-cols-1 gap-8 border-t border-line pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-20">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <Crosshair className="text-ink-faint" />
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-ink-faint">
                  02 — Experience
                </span>
                <span className="h-px w-12 bg-line" />
              </div>
            </Reveal>
            <MaskedLines
              className="text-[1.9rem] font-medium leading-[1.04] tracking-[-0.035em] text-ink sm:text-[2.6rem] lg:text-[3.1rem]"
              lines={[
                <span key="a">Where the work</span>,
                <span key="b">
                  actually <span className="serif-accent">happened.</span>
                </span>,
              ]}
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-sm text-[0.875rem] leading-relaxed text-ink-mute">
                Three internships across computer vision, business intelligence, and product
                engineering — each one measured in latency, accuracy, or hours saved.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-10 hidden border border-line bg-sage-50/50 p-5 lg:block">
                <div className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Operating principle
                </div>
                <p className="mt-3 font-serif text-[1.375rem] leading-snug text-ink-soft">
                  “Ship the smallest system that survives contact with real data.”
                </p>
              </div>
            </Reveal>
          </div>

          {/* timeline */}
          <div ref={listRef} className="relative lg:col-span-7">
            {/* rail */}
            <div aria-hidden="true" className="absolute left-0 top-2 hidden h-full w-px bg-line sm:block">
              <motion.div
                className="absolute left-0 top-0 w-px origin-top bg-ink/60"
                style={{ height: "100%", scaleY: reduced ? 1 : lineScale }}
              />
            </div>

            <ol className="space-y-0">
              {experiences.map((exp, i) => (
                <motion.li
                  key={`${exp.org}-${exp.role}`}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ duration: 0.72, ease: EASE, delay: i * 0.06 }}
                  className="relative border-b border-line py-8 first:pt-0 sm:pl-8 lg:py-10"
                >
                  {/* node */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[3.5px] top-10 hidden h-2 w-2 rounded-full border border-ink/30 bg-paper sm:block"
                  >
                    {exp.status === "current" && (
                      <span className="absolute inset-0 animate-pulse-dot rounded-full bg-[#7B8F5E]" />
                    )}
                  </span>

                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <div>
                      <h3 className="text-lg font-medium leading-tight tracking-[-0.02em] text-ink sm:text-xl">
                        {exp.role}
                      </h3>
                      <p className="mt-1 text-[0.875rem] text-ink-soft">
                        {exp.org}
                        <span className="text-ink-faint"> · {exp.place}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
                        {exp.period}
                      </span>
                      {exp.status === "current" && (
                        <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-sage-300 bg-sage-50 px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-ink-soft">
                          <span className="h-1 w-1 rounded-full bg-[#7B8F5E]" />
                          Active
                        </div>
                      )}
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {exp.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[0.875rem] leading-relaxed text-ink-mute">
                        <span aria-hidden="true" className="mt-[0.55em] h-px w-3 shrink-0 bg-ink-faint/70" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {exp.stack.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
