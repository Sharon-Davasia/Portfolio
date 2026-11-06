import { MotionConfig } from "framer-motion";
import { About } from "./components/About";
import { ScrollProgress, SectionRail } from "./components/Chrome";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Ticker } from "./components/Ticker";
import { Work } from "./components/Work";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-paper">
        {/* Skip link for keyboard users */}
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <Nav />
        <SectionRail />

        <main>
          <Hero />

          <Ticker />

          <Work />

          <div className="shell">
            <div className="hairline" />
          </div>

          <Experience />

          <div className="mt-16">
            <About />
          </div>

          <Contact />
        </main>
      </div>
    </MotionConfig>
  );
}
