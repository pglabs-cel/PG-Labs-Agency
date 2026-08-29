export interface TechnologyCategory {
  category: string;
  items: string[];
}

export const TECHNOLOGIES: TechnologyCategory[] = [
  {
    category: "FRONTEND",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "BACKEND",
    items: ["Node.js", "Express", "Python", "FastAPI"],
  },
  {
    category: "DATA",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    category: "INFRASTRUCTURE",
    items: ["Docker", "Cloud Platforms", "CI/CD"],
  },
  {
    category: "AI",
    items: ["Python", "Computer Vision", "Machine Learning", "LLM APIs"],
  },
];