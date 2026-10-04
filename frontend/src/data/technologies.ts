export interface TechnologyItem {
  name: string;
  badge: string;
  description: string;
}

export interface TechnologyCategory {
  id: string;
  category: string;
  index: string;
  subtitle: string;
  items: TechnologyItem[];
}

export const TECHNOLOGIES: TechnologyCategory[] = [
  {
    id: "frontend",
    category: "FRONTEND",
    index: "01",
    subtitle: "Modern UI & Conversion",
    items: [
      { name: "Next.js", badge: "Core", description: "Hybrid SSR/SSG, Server Components & top Core Web Vitals" },
      { name: "React", badge: "UI", description: "Declarative component hierarchy & robust modern ecosystem" },
      { name: "TypeScript", badge: "Types", description: "Type-safe development preventing runtime errors and regressions" },
      { name: "Tailwind CSS", badge: "Design", description: "Systematic utility-first styling & dark theme tokens" },
      { name: "Framer Motion", badge: "Motion", description: "Physics-based fluid interactions & page transitions" },
    ],
  },
  {
    id: "backend",
    category: "BACKEND",
    index: "02",
    subtitle: "High-Throughput APIs",
    items: [
      { name: "Node.js", badge: "Runtime", description: "Event-driven asynchronous I/O backend execution" },
      { name: "Express", badge: "HTTP", description: "Minimalist, robust REST API routing & middleware pipeline" },
      { name: "Python", badge: "Compute", description: "Data processing, machine learning & rapid microservices" },
      { name: "FastAPI", badge: "Async", description: "High-performance asynchronous Python API endpoints" },
      { name: "REST APIs", badge: "API", description: "Secure, documented, and versioned JSON interfaces" },
    ],
  },
  {
    id: "data",
    category: "DATA & STORAGE",
    index: "03",
    subtitle: "Persistence & Caching",
    items: [
      { name: "PostgreSQL", badge: "Relational", description: "ACID-compliant relational database for structured business data" },
      { name: "MongoDB", badge: "Document", description: "High-scale JSON document store for flexible product models" },
      { name: "Redis", badge: "Cache", description: "In-memory caching, pub/sub queues & instant session storage" },
      { name: "Database Schema", badge: "Schema", description: "Optimized indexing, query analysis, and data integrity design" },
    ],
  },
  {
    id: "platforms",
    category: "PLATFORMS & GROWTH",
    index: "04",
    subtitle: "E-Commerce, Ads & CMS",
    items: [
      { name: "Shopify", badge: "Store", description: "High-converting storefronts, Liquid customization & checkout optimization" },
      { name: "WordPress", badge: "CMS", description: "Custom themes, WooCommerce stores & manageable business websites" },
      { name: "Google Ads", badge: "Paid", description: "High-intent search, shopping & display advertising campaigns" },
      { name: "Meta Ads", badge: "Paid", description: "Targeted Facebook & Instagram customer acquisition and retargeting" },
      { name: "Google Analytics", badge: "GA4", description: "Event tracking, funnel analytics & conversion attribution" },
      { name: "Figma", badge: "Design", description: "Product UI/UX design systems, component libraries & interactive mockups" },
    ],
  },
  {
    id: "ai",
    category: "AI & ML",
    index: "05",
    subtitle: "Intelligent Workflows",
    items: [
      { name: "Python", badge: "Core", description: "Standard ecosystem foundation for data science & ML pipelines" },
      { name: "Computer Vision", badge: "Vision", description: "Custom YOLO object detection & optical inspection models" },
      { name: "Machine Learning", badge: "Predict", description: "Custom regression, anomaly detection & data intelligence" },
      { name: "LLM APIs", badge: "Agents", description: "Claude, OpenAI & Gemini structured workflow automation" },
    ],
  },
  {
    id: "infrastructure",
    category: "INFRASTRUCTURE",
    index: "06",
    subtitle: "Cloud & Reliability",
    items: [
      { name: "Docker", badge: "Containers", description: "Hermetic containerization ensuring reliable dev/prod parity" },
      { name: "Cloud Platforms", badge: "DevOps", description: "AWS, GCP, Vercel & Render managed infrastructure" },
      { name: "CI/CD", badge: "Pipeline", description: "Automated test suites, preview environments & zero-downtime releases" },
      { name: "Linux & Security", badge: "Systems", description: "Hardened environments, reverse proxies & SSL configurations" },
    ],
  },
];