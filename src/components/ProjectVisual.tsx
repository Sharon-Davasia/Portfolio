import type { Project } from "../data/content";

const VISUAL_ASSETS: Record<
  Project["visual"],
  { src: string; alt: string; bg: string }
> = {
  triage: {
    src: "/images/project-cardioassist.png",
    alt: "Minimalist matte 3D studio render representing CardioAssist: an ivory ceramic pulse wave resting over sage limestone blocks",
    bg: "bg-[#F3F5F0]",
  },
  rag: {
    src: "/images/project-neurogrid.png",
    alt: "Minimalist matte 3D studio render representing NeuroGrid: frosted sage glass planes and stone fragments linked by fine charcoal threads to a central moss core",
    bg: "bg-[#F3F5F0]",
  },
  ar: {
    src: "/images/project-elegance.png",
    alt: "Minimalist matte 3D studio render representing Elegance: a draped off-white ceramic silhouette inside a fine charcoal wireframe frame on a sage stone base",
    bg: "bg-[#F7F5EF]",
  },
};

/**
 * Palette-matched matte 3D studio renders for each project preview frame.
 */
export function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  const asset = VISUAL_ASSETS[kind];

  return (
    <div className={`relative h-full w-full overflow-hidden ${asset.bg}`}>
      <img
        src={asset.src}
        alt={asset.alt}
        className="h-full w-full object-cover object-center"
        loading="lazy"
        decoding="async"
      />
      {/* subtle warm paper edge glaze for seamless frame integration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/[0.04] via-transparent to-paper/[0.12]"
      />
    </div>
  );
}
