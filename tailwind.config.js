/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FCFCFA",
        cream: "#F7F5EF",
        sage: {
          50: "#F3F5F0",
          100: "#E9EDE4",
          200: "#DCE2D4",
          300: "#C7CFBD",
        },
        ink: {
          DEFAULT: "#12140F",
          soft: "#2A2D26",
          mute: "#6E726A",
          faint: "#9AA096",
        },
        line: "#E3E4DC",
        lineSoft: "#EDEEE7",
      },
      fontFamily: {
        sans: ['"Inter Tight Variable"', "Inter Tight", "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xs": ["clamp(2rem, 5vw, 3rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-sm": ["clamp(2.4rem, 6vw, 4.2rem)", { lineHeight: "1", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(2.4rem, 6.1vw, 5.1rem)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(3.6rem, 11vw, 9rem)", { lineHeight: "0.9", letterSpacing: "-0.05em" }],
        meta: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.16em" }],
      },
      maxWidth: {
        shell: "1440px",
        prose: "62ch",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
        soft: "cubic-bezier(0.4, 0, 0.2, 1)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.78)" },
        },
        "halo": {
          "0%": { transform: "scale(0.85)", opacity: "0.65" },
          "70%": { transform: "scale(2.1)", opacity: "0" },
          "100%": { transform: "scale(2.1)", opacity: "0" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "50%": { transform: "translate3d(0,-14px,0) rotate(1.2deg)" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(-60%)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(160%)", opacity: "0" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2.6s ease-in-out infinite",
        halo: "halo 3s ease-out infinite",
        drift: "drift 11s ease-in-out infinite",
        "scroll-cue": "scroll-cue 2.4s cubic-bezier(0.4,0,0.2,1) infinite",
        shimmer: "shimmer 1.6s ease-out infinite",
        marquee: "marquee 44s linear infinite",
      },
    },
  },
  plugins: [],
};
