export const profile = {
  name: "Sharon K Davasia",
  firstName: "Sharon",
  lastName: "Davasia",
  role: "AI/ML Engineer & Full-Stack Developer",
  location: "Moradabad, India",
  timezone: "Asia/Kolkata",
  email: "davasiasharon@gmail.com",
  phone: "+91 7306190702",
  github: "https://github.com/Sharon-Davasia",
  linkedin: "https://linkedin.com/in/sharon-k-davasia-432080307",
  university: "Teerthanker Mahaveer University",
  degree: "B.Tech — Computer Science (AI, ML, DL)",
  sgpa: "9.88",
  availability: "Open to AI/ML internships & full-stack roles",
  summary:
    "I build production-grade AI systems — retrieval-augmented assistants, healthcare triage platforms, and real-time computer vision. Full-stack by default: React, Node, Python, and the vector databases in between.",
} as const;

export const navLinks = [
  { id: "work", label: "Work", index: "01" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "about", label: "About", index: "03" },
  { id: "contact", label: "Contact", index: "04" },
] as const;

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  year: string;
  summary: string;
  detail: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  links: ProjectLink[];
  featured: boolean;
  visual: "triage" | "rag" | "ar";
};

export const projects: Project[] = [
  {
    slug: "cardioassist",
    title: "CardioAssist",
    kicker: "Healthcare · Triage",
    year: "2025",
    summary:
      "An emergency triage platform that classifies patient risk in under ten seconds — turning a fifteen-minute judgement call into a structured, auditable decision.",
    detail:
      "End-to-end pipeline: a validation layer standardises messy clinical intake, a risk model labels patients Low / Medium / High, and a Snowflake-backed warehouse keeps every decision traceable. Role-based access control and PII masking keep it HIPAA-aligned.",
    stack: ["React", "Node.js", "Python", "Snowflake"],
    metrics: [
      { value: "< 10s", label: "risk classification" },
      { value: "15 → 10 min", label: "triage decision time" },
      { value: "+15%", label: "model accuracy" },
    ],
    links: [
      { label: "Repository", href: "https://github.com/Sharon-Davasia" },
      { label: "Live demo", href: "https://github.com/Sharon-Davasia" },
    ],
    featured: true,
    visual: "triage",
  },
  {
    slug: "neurogrid",
    title: "NeuroGrid",
    kicker: "RAG · Knowledge",
    year: "2025",
    summary:
      "A retrieval-augmented knowledge assistant that answers from your documents — with citations, not confabulation.",
    detail:
      "A full RAG pipeline: semantic chunking, embedding generation, vector search across 500+ indexed chunks, and grounded LLM generation. Sub-second retrieval with a 40% accuracy lift over vanilla prompting.",
    stack: ["Python", "LangChain", "Pinecone", "Chroma", "OpenAI API"],
    metrics: [
      { value: "500+", label: "chunks indexed" },
      { value: "sub-second", label: "retrieval latency" },
      { value: "+40%", label: "answer accuracy" },
    ],
    links: [{ label: "Repository", href: "https://github.com/Sharon-Davasia" }],
    featured: true,
    visual: "rag",
  },
  {
    slug: "elegance",
    title: "Elegance",
    kicker: "E-commerce · AR",
    year: "2025",
    summary:
      "AR try-on for a 200+ item catalogue, paired with collaborative filtering that learns taste before the cart does.",
    detail:
      "TensorFlow.js and AR.js power real-time 3D previews in the browser; a collaborative-filtering engine personalises recommendations. Simulated return rates dropped 20% while engagement time rose 25%.",
    stack: ["React", "Node.js", "MongoDB", "TensorFlow.js", "AR.js"],
    metrics: [
      { value: "+25%", label: "engagement time" },
      { value: "−20%", label: "simulated returns" },
      { value: "200+", label: "catalogue items" },
    ],
    links: [{ label: "Repository", href: "https://github.com/Sharon-Davasia" }],
    featured: false,
    visual: "ar",
  },
];

export type Experience = {
  role: string;
  org: string;
  place: string;
  period: string;
  status: "current" | "complete";
  points: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    role: "Deep Learning Intern",
    org: "Uptoskills",
    place: "Remote · Delhi",
    period: "Jul 2025 — Present",
    status: "current",
    points: [
      "Engineered a real-time multi-model CV pipeline across nine processing stages for CCTV anomaly and chain-snatching detection, sustaining sub-200 ms per-frame GPU latency.",
      "Cut false positives by 85% through a six-signal weighted decision-fusion engine.",
      "Built a geometric behavioural pre-filter that eliminated 99% of non-suspicious footage before invoking deep models.",
      "Trained a 256-component GMM reaching 99.8% accuracy on UCF101 / HMDB51 benchmarks.",
    ],
    stack: ["Python", "Computer Vision", "GMM", "GPU pipelines"],
  },
  {
    role: "Business Intelligence Intern",
    org: "Microsoft Elevate (AICTE)",
    place: "Remote",
    period: "Feb 2026 — Mar 2026",
    status: "complete",
    points: [
      "Built a Sales Performance dashboard and a state-wise Maternal Health Analytics dashboard (MMR, anaemia prevalence, SDG 2030 progress) in Power BI.",
      "Used filled maps, Top-N combo charts, and gauge visuals to make dense public-health data legible.",
      "Scored 9/10 by evaluators for dashboard design, visual balance, and analytical depth.",
    ],
    stack: ["Power BI", "DAX", "Data Visualisation", "ETL"],
  },
  {
    role: "Web Development Assistant",
    org: "Anant Webtics",
    place: "Moradabad",
    period: "Mar 2025 — May 2025",
    status: "complete",
    points: [
      "Co-built a Library Management web app with seat booking and admin controls, improving booking efficiency by 25%.",
      "Integrated responsive frontend components across Agile sprints, cutting design-to-deploy time by 20%.",
      "Delivered 100% on-time across every sprint commitment.",
    ],
    stack: ["React", "Node.js", "Git", "Agile"],
  },
];

export const skillGroups = [
  {
    label: "Languages",
    items: ["Python", "JavaScript", "Java", "SQL"],
  },
  {
    label: "AI / ML",
    items: ["RAG", "LangChain", "Pinecone", "Chroma", "TensorFlow", "Scikit-learn", "NLP"],
  },
  {
    label: "Web & Backend",
    items: ["React.js", "Next.js", "Node.js", "Express.js", "REST APIs", "HTML/CSS"],
  },
  {
    label: "Data & Cloud",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Snowflake", "Firebase", "Vercel", "Docker"],
  },
  {
    label: "BI & Tools",
    items: ["Power BI", "DAX", "ETL Pipelines", "Git / GitHub", "Postman", "Figma"],
  },
] as const;

export const credentials = [
  {
    title: "AWS Academy Graduate — Generative AI Foundations",
    meta: "Feb 2026",
  },
  {
    title: "Oracle Cloud Infrastructure 2025 — Generative AI Professional",
    meta: "2025",
  },
  {
    title: "Best Project Award — TMU Internal Hackathon",
    meta: "Feb 2025 · Top 3 of 50+",
  },
  {
    title: "Microsoft Elevate — AICTE Power BI Internship",
    meta: "Feb 2026",
  },
  {
    title: "MongoDB — RAG, Advanced Schema Patterns",
    meta: "2025",
  },
] as const;

export const facts = [
  { label: "Currently", value: "B.Tech CS (AI/ML/DL), 4th semester" },
  { label: "SGPA", value: "9.88 — Semester 2" },
  { label: "Based in", value: "Moradabad, Uttar Pradesh" },
  { label: "Languages", value: "English · Hindi · Malayalam · Tamil" },
] as const;
