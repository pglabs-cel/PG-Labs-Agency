export interface ProjectItem {
  slug: string;
  title: string;
  category: string;
  categories?: string[];
  shortDescription: string;
  description: string;
  technologies: string[];
  features: string[];
  challenge: string;
  solution: string;
  outcome?: string;
  year: string;
  featured: boolean;
  thumbnail?: string;
  images?: string[];
  videoUrl?: string;
  liveUrl?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    slug: "gaba-traders-inventory",
    title: "Gaba Traders Inventory",
    category: "AI / Business Software",
    shortDescription:
      "AI-powered inventory management designed to help identify and manage truck spare parts faster.",
    description:
      "A custom inventory and identification suite built for high-throughput spare parts wholesale. Incorporates computer vision to identify complex unlabelled mechanical components, sync stock levels in real time, and streamline warehouse dispatch.",
    technologies: ["YOLO", "FastAPI", "MongoDB", "Next.js"],
    features: [
      "Real-time visual spare parts identification",
      "FastAPI microservice for inference",
      "Multi-tier inventory categorization",
      "Instant stock-level dispatch alerts",
      "Offline-first warehouse tablet UI",
    ],
    challenge:
      "Warehouse workers had to manually cross-reference thousands of unlabelled mechanical truck components against thick paper catalogs, causing dispatch delays and stock discrepancy.",
    solution:
      "Trained custom YOLO computer-vision models deployed on FastAPI, tied directly to a responsive Next.js inventory portal with instant search and MongoDB indexing.",
    outcome:
      "Significantly accelerated identification speed and eliminated catalog lookup bottlenecks across the warehouse floor.",
    year: "2025",
    featured: true,
  },
  {
    slug: "hiremeet",
    title: "HireMeet",
    category: "SaaS / EdTech",
    shortDescription:
      "A full-stack interview preparation platform combining coding challenges, automated evaluation, video interviews and real-time communication.",
    description:
      "A comprehensive recruitment and candidate training platform designed for technical interviews. Combines live coding environments with isolated Docker code execution, integrated peer-to-peer video streaming, and automated evaluation metrics.",
    technologies: ["React", "Node.js", "MongoDB", "Docker"],
    features: [
      "In-browser code editor with syntax highlighting",
      "Sandboxed multi-language code execution using Docker",
      "Low-latency WebRTC video and audio channels",
      "Automated unit test evaluation engine",
      "Comprehensive interviewer scorecard system",
    ],
    challenge:
      "Conducting technical interviews often requires juggling multiple tools — one for video calls, another for shared documents, and external compilers — leading to broken interview flow.",
    solution:
      "Constructed a unified platform bringing video conferencing, collaborative coding, and secure Docker-isolated code runners into a single, cohesive workflow.",
    outcome:
      "Unified the technical evaluation lifecycle into a seamless interface, eliminating tool switching during live interview sessions.",
    year: "2024",
    featured: true,
  },
  {
    slug: "ckb-examination-platform",
    title: "CKB Examination Platform",
    category: "Web Application",
    shortDescription:
      "A scalable online examination platform with real-time monitoring and proctoring capabilities.",
    description:
      "An enterprise-ready assessment platform engineered to handle concurrent test sessions reliably. Features strict integrity controls, automated randomized question banks, real-time proctoring telemetry, and instant automated grading.",
    technologies: ["React", "Node.js", "MongoDB"],
    features: [
      "Concurrent high-traffic test submission handling",
      "Automated question randomization and section timers",
      "Real-time student status telemetry for invigilators",
      "Automated evaluation and grade distribution",
      "Resilient offline-recovery state synchronization",
    ],
    challenge:
      "Traditional online testing software suffered from connectivity dropouts during peak exam start times, losing student inputs and risking exam integrity.",
    solution:
      "Architected an event-driven Node.js backend with MongoDB optimistic state saves and an intuitive, distraction-free React interface with local storage fallbacks.",
    outcome:
      "Successfully supported large batches of concurrent test-takers without data loss or test interruption.",
    year: "2024",
    featured: true,
  },
];