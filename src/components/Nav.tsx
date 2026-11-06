import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks, profile } from "../data/content";
import { useActiveSection, useLocalTime } from "../lib/hooks";
import { DUR, EASE, HERO_TIMING } from "../lib/motion";
import { ArrowUpRight } from "./primitives";

const sectionIds = ["hero", "work", "experience", "about", "contact"];

export function Nav() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const time = useLocalTime(profile.timezone);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 48);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -22, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: EASE, delay: HERO_TIMING.nav }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ease-smooth ${
            condensed
              ? "border-b border-line bg-paper/85 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="shell flex items-center justify-between py-4 sm:py-5">
            {/* Wordmark */}
            <a
              href="#hero"
              className="group flex items-baseline gap-2.5"
              aria-label={`${profile.name} — back to top`}
            >
              <span className="font-serif text-[1.35rem] leading-none tracking-tight">
                Sharon<span className="text-ink-faint">.</span>
              </span>
              <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-faint transition-colors duration-300 group-hover:text-ink-mute sm:block">
                AI&nbsp;/&nbsp;ML
              </span>
            </a>

            {/* Desktop links */}
            <nav className="hidden items-center md:flex" aria-label="Primary">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <li key={link.id}>
                      <a
                        href={`#${link.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`group relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.8125rem] transition-colors duration-300 ease-smooth ${
                          isActive ? "text-ink" : "text-ink-mute hover:text-ink"
                        }`}
                      >
                        <span className="font-mono text-[0.5625rem] tracking-[0.12em] text-ink-faint opacity-70">
                          {link.index}
                        </span>
                        <span>{link.label}</span>
                        {isActive ? (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-2 -bottom-px h-px bg-ink"
                            transition={{ duration: 0.42, ease: EASE }}
                          />
                        ) : (
                          <span className="absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 bg-ink-faint transition-transform duration-300 ease-smooth group-hover:scale-x-100" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint lg:flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-halo rounded-full bg-[#7B8F5E]" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#7B8F5E]" />
                </span>
                IST {time}
              </span>

              <a
                href="#contact"
                className="group hidden items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[0.8125rem] text-ink transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-ink/25 hover:bg-sage-50 sm:inline-flex"
              >
                Let&apos;s talk
                <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={12} />
                </span>
              </a>

              {/* Mobile toggle */}
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-paper/70 md:hidden"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: DUR.button, ease: EASE }}
                  className="block h-px w-3.5 bg-ink"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: DUR.button, ease: EASE }}
                  className="block h-px w-3.5 bg-ink"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 bg-paper md:hidden"
          >
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
            <div className="shell relative flex h-full flex-col justify-between pb-10 pt-24">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.08 + i * 0.06 }}
                    className="border-b border-line"
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="text-3xl tracking-tight">{link.label}</span>
                      <span className="font-mono text-[0.625rem] tracking-[0.14em] text-ink-faint">
                        {link.index}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="space-y-4"
              >
                <a href={`mailto:${profile.email}`} className="block text-lg text-ink-soft">
                  {profile.email}
                </a>
                <div className="flex items-center gap-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                  <a href={profile.github} target="_blank" rel="noreferrer noopener">
                    GitHub
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                    LinkedIn
                  </a>
                  <span>IST {time}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
