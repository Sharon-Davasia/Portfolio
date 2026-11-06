import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { credentials, facts, profile, skillGroups } from "../data/content";
import { EASE } from "../lib/motion";
import { Crosshair } from "./Chrome";
import { MaskedLines, Reveal, StaggerGroup, StaggerItem } from "./primitives";

/**
 * Words that "light up" progressively as the sentence scrolls through —
 * a single scroll-linked text effect, used once, in the right place.
 */
function ScrollLitPhrase({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="mt-10 max-w-3xl text-[1.35rem] leading-[1.45] tracking-[-0.015em] text-ink sm:text-[1.7rem]"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.6 / words.length);
        return (
          <LitWord
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
            reduced={Boolean(reduced)}
          >
            {word}
          </LitWord>
        );
      })}
    </p>
  );
}

function LitWord({
  children,
  progress,
  range,
  reduced,
}: {
  children: React.ReactNode;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  reduced: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity: reduced ? 1 : opacity }} className="inline-block">
      {children}
      <span>&nbsp;</span>
    </motion.span>
  );
}

export function About() {
  return (
    <section id="about" className="relative isolate scroll-mt-24">
      {/* soft background transition band */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-sage-50/60 to-transparent" />
      </div>

      <div className="shell">
        <div className="border-t border-line pt-14 lg:pt-20">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <Crosshair className="text-ink-faint" />
              <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-ink-faint">
                03 — About
              </span>
              <span className="h-px w-12 bg-line" />
            </div>
          </Reveal>

          <MaskedLines
            className="max-w-4xl text-[1.9rem] font-medium leading-[1.04] tracking-[-0.035em] text-ink sm:text-[2.6rem] lg:text-[3.4rem]"
            lines={[
              <span key="a">Nine point eight eight</span>,
              <span key="b">
                isn&apos;t the <span className="serif-accent">point.</span>
              </span>,
            ]}
          />

          <ScrollLitPhrase
            text="The point is that a model scoring well on a benchmark and a system that a hospital, a warehouse, or a shopper can actually rely on are two different problems. I work on the second one — the data validation, the latency budget, the audit trail, the interface that makes a prediction actionable."
          />

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: facts + education */}
            <div className="lg:col-span-4">
              <Reveal>
                <h3 className="meta">At a glance</h3>
              </Reveal>
              <StaggerGroup className="mt-5 divide-y divide-line border-y border-line">
                {facts.map((fact) => (
                  <StaggerItem key={fact.label}>
                    <div className="flex items-baseline justify-between gap-4 py-3">
                      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
                        {fact.label}
                      </span>
                      <span className="text-right text-[0.8125rem] text-ink-soft">{fact.value}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <Reveal delay={0.1}>
                <div className="mt-8 border border-line bg-paper p-5">
                  <div className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
                    Education
                  </div>
                  <p className="mt-3 text-[0.9375rem] leading-snug text-ink">
                    {profile.degree}
                  </p>
                  <p className="mt-1 text-[0.8125rem] text-ink-mute">{profile.university}</p>
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-lineSoft pt-3">
                    {[
                      ["9.29", "S1"],
                      ["9.88", "S2"],
                      ["9.55", "S3"],
                      ["9.33", "S4"],
                    ].map(([score, sem]) => (
                      <div key={sem} className="flex items-baseline gap-1">
                        <span className="text-[0.875rem] font-medium text-ink">{score}</span>
                        <span className="font-mono text-[0.5rem] uppercase tracking-[0.1em] text-ink-faint">
                          {sem}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: skills matrix */}
            <div className="lg:col-span-8">
              <Reveal>
                <div className="flex items-baseline justify-between">
                  <h3 className="meta">Toolkit</h3>
                  <span className="font-mono text-[0.5625rem] tracking-[0.14em] text-ink-faint">
                    {skillGroups.reduce((acc, g) => acc + g.items.length, 0)} entries
                  </span>
                </div>
              </Reveal>

              <div className="mt-5 border-t border-line">
                {skillGroups.map((group, i) => (
                  <motion.div
                    key={group.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-6% 0px" }}
                    transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
                    className="group grid grid-cols-1 gap-3 border-b border-line py-5 sm:grid-cols-12 sm:items-start sm:gap-6"
                  >
                    <div className="sm:col-span-4">
                      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint transition-colors duration-300 group-hover:text-ink-mute">
                        {group.label}
                      </span>
                    </div>
                    <div className="sm:col-span-8">
                      <ul className="flex flex-wrap gap-x-2 gap-y-2">
                        {group.items.map((item) => (
                          <li key={item} className="tag">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Credentials */}
              <div className="mt-12">
                <Reveal>
                  <h3 className="meta">Certifications & recognition</h3>
                </Reveal>
                <StaggerGroup className="mt-4 border-t border-line" stagger={0.06}>
                  {credentials.map((item) => (
                    <StaggerItem key={item.title}>
                      <div className="group flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                        <span className="text-[0.875rem] leading-snug text-ink-soft transition-colors duration-300 group-hover:text-ink">
                          {item.title}
                        </span>
                        <span className="shrink-0 font-mono text-[0.5rem] uppercase tracking-[0.12em] text-ink-faint">
                          {item.meta}
                        </span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
