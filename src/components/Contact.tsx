import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/content";
import { EASE } from "../lib/motion";
import { Crosshair } from "./Chrome";
import { ArrowRight, ArrowUpRight, MaskedLines, Reveal } from "./primitives";

const socials = [
  { label: "GitHub", href: profile.github, handle: "@Sharon-Davasia" },
  { label: "LinkedIn", href: profile.linkedin, handle: "sharon-k-davasia" },
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
];

export function Contact() {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      className="grain relative isolate mt-16 scroll-mt-20 overflow-hidden border-t border-line"
    >
      {/* background composition */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-paper via-cream/60 to-sage-50" />
        <div className="grid-lines absolute inset-0 opacity-50" />
        <motion.div
          className="absolute -left-24 top-1/4 h-[22rem] w-[22rem] rounded-full bg-sage-100/80 blur-[80px]"
          animate={reduced ? undefined : { y: [0, -22, 0], x: [0, 14, 0] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className="absolute -right-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-cream blur-[70px]"
          animate={reduced ? undefined : { y: [0, 18, 0], x: [0, -12, 0] }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        />

        {/* large arc accent */}
        <svg
          viewBox="0 0 1200 600"
          className="absolute inset-x-0 bottom-0 h-auto w-full opacity-[0.5]"
          preserveAspectRatio="xMidYMax slice"
        >
          {[220, 320, 420, 520].map((r, i) => (
            <circle
              key={r}
              cx="600"
              cy="780"
              r={r}
              fill="none"
              stroke="rgba(18,20,15,0.09)"
              strokeWidth="0.9"
              strokeDasharray={i === 3 ? "2 8" : undefined}
            />
          ))}
        </svg>
      </div>

      <div className="shell pb-14 pt-20 sm:pt-24 lg:pb-20 lg:pt-32">
        <Reveal>
          <div className="flex items-center gap-3">
            <Crosshair className="text-ink-faint" />
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-ink-faint">
              04 — Contact
            </span>
            <span className="h-px w-12 bg-line" />
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <MaskedLines
              className="text-[2.4rem] font-medium leading-[0.98] tracking-[-0.04em] text-ink sm:text-[4rem] lg:text-[5.2rem]"
              lineClassName="text-[2.4rem] font-medium leading-[0.98] tracking-[-0.04em] text-ink sm:text-[4rem] lg:text-[5.2rem]"
              lines={[
                <span key="1">Let&apos;s build</span>,
                <span key="2">
                  something <span className="serif-accent">honest.</span>
                </span>,
              ]}
            />

            <Reveal delay={0.18}>
              <p className="mt-7 max-w-prose text-[0.9375rem] leading-relaxed text-ink-mute">
                I&apos;m looking for AI/ML or full-stack work where the model matters less than
                the system around it. If that sounds like your team, I&apos;d like to hear about
                the problem you&apos;re stuck on.
              </p>
            </Reveal>

            {/* Primary email CTA */}
            <Reveal delay={0.26}>
              <a
                href={`mailto:${profile.email}`}
                className="group mt-10 inline-flex w-full items-center justify-between gap-6 border-y border-ink/15 py-5 transition-colors duration-300 hover:border-ink sm:w-auto sm:min-w-[26rem] sm:pr-6"
                aria-label={`Email ${profile.name} at ${profile.email}`}
              >
                <span className="text-[1.125rem] tracking-[-0.015em] text-ink sm:text-[1.35rem]">
                  {profile.email}
                </span>
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-all duration-300 ease-smooth group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                  <span className="absolute transition-all duration-300 ease-smooth group-hover:translate-x-3 group-hover:opacity-0">
                    <ArrowRight size={15} />
                  </span>
                  <span className="absolute -translate-x-3 opacity-0 transition-all duration-300 ease-smooth group-hover:translate-x-0 group-hover:opacity-100">
                    <ArrowUpRight size={15} />
                  </span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="btn-primary group">
                  Start a conversation
                  <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-1">
                    <ArrowRight size={13} />
                  </span>
                </a>
                <a
                  href="https://github.com/Sharon-Davasia?tab=repositories"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-ghost group"
                >
                  Read the code
                  <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={13} />
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Social column */}
          <div className="lg:col-span-4 lg:pl-8">
            <Reveal delay={0.2}>
              <h3 className="meta">Elsewhere</h3>
            </Reveal>
            <div className="mt-5 border-t border-line">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.07 }}
                  className="group flex items-center justify-between border-b border-line py-4"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.5rem] uppercase tracking-[0.12em] text-ink-faint">
                      0{i + 1}
                    </span>
                    <span className="text-[0.9375rem] text-ink">{social.label}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-[0.5625rem] tracking-[0.06em] text-ink-faint opacity-0 transition-all duration-500 ease-smooth group-hover:max-w-[12rem] group-hover:opacity-100">
                      {social.handle}
                    </span>
                    <span className="text-ink-mute transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink">
                      <ArrowUpRight size={13} />
                    </span>
                  </span>
                </motion.a>
              ))}
            </div>

            <Reveal delay={0.4}>
              <div className="mt-8 flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-halo rounded-full bg-[#7B8F5E]" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7B8F5E]" />
                </span>
                <span className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-mute">
                  {profile.availability}
                </span>
              </div>
              <p className="mt-3 font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.14em] text-ink-faint">
                {profile.location} · UTC +5:30
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative border-t border-ink/10">
        <div className="shell flex flex-col items-start justify-between gap-4 py-7 sm:flex-row sm:items-center">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-[1.1rem] leading-none">Sharon Davasia</span>
            <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-ink-faint">
              © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.5rem] uppercase tracking-[0.14em] text-ink-faint">
            <span>Designed & built by hand</span>
            <span className="hidden h-3 w-px bg-line sm:block" />
            <a href="#hero" className="link-quiet font-mono text-[0.5rem] uppercase tracking-[0.14em]">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
