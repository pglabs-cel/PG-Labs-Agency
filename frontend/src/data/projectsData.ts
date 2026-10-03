export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  categories: string[];
  shortDescription: string;
  description: string;
  technologies: string[];
  features: string[];
  challenge: string;
  solution: string;
  outcome?: string;
  year: string;
  featured: boolean;
  order: number;
  thumbnail?: string;
  images?: string[];
  liveUrl?: string;
  videoUrl?: string;
}

export const CANONICAL_PROJECTS: ProjectData[] = [
  {
    slug: "part-track",
    title: "PartTrack (Gaba Traders)",
    category: "AI / Business Software",
    categories: ["AI", "Business Software", "Custom Software", "Computer Vision"],
    shortDescription:
      "AI-powered inventory management designed to help identify and manage truck spare parts faster using computer vision.",
    description:
      "A tailored computer vision and inventory management system engineered for industrial spare parts distribution. PartTrack enables warehouse operators to point a mobile camera at an unlabelled mechanical part and instantly retrieve its part SKU, current stock levels, compatible vehicle models, and warehouse bin location.",
    technologies: ["YOLOv8", "FastAPI", "Python", "MongoDB", "Next.js", "OpenCV"],
    features: [
      "Sub-second computer vision model inference from mobile smartphone photos",
      "Dynamic warehouse catalog with thousands of mechanical truck spare part SKUs",
      "Real-time stock level updates, reorder thresholds, and bin location tracking",
      "Offline-friendly scanning cache for warehouse basements with poor connectivity",
      "Admin portal for adding training imagery and refining model accuracy over time",
    ],
    challenge:
      "Gaba Traders manages thousands of industrial truck parts, many with obscure manufacturer codes, surface grime, or missing tags. Relying on veteran staff memory created operational bottlenecks during busy dispatch hours, leading to misidentified parts and dispatch delays.",
    solution:
      "We collected and augmented hundreds of high-resolution part images, trained a specialized YOLO object detection and classification model, and wrapped it in a lightweight FastAPI inference service. A mobile-first Next.js web application allows floor staff to photograph any part and receive instant verification in under 500ms.",
    outcome:
      "Reduced parts identification time from multiple minutes of catalogue searching down to sub-second computer vision lookups, eliminating warehouse mispicks and enabling junior warehouse staff to pick orders accurately.",
    year: "2024",
    featured: true,
    order: 1,
    thumbnail: "https://res.cloudinary.com/y20gw7iu/image/upload/v1791031791/pglabs/projects/parttrack_thumb.jpg",
    images: [
      "https://res.cloudinary.com/y20gw7iu/image/upload/v1791031791/pglabs/projects/parttrack_thumb.jpg",
      "https://res.cloudinary.com/y20gw7iu/image/upload/v1791031792/pglabs/projects/parttrack_warehouse.jpg",
    ],
  },
  {
    slug: "hiremeet",
    title: "HireMeet",
    category: "SaaS / EdTech",
    categories: ["SaaS", "Web", "EdTech", "Real-Time"],
    shortDescription:
      "A full-stack interview preparation platform combining coding challenges, automated code evaluation, video interviews and real-time communication.",
    description:
      "An end-to-end technical interviewing and assessment platform built for universities and engineering hiring teams. HireMeet unifies sandboxed multi-language compilation, real-time collaborative code editing, peer-to-peer WebRTC video conferencing, and automated evaluation metrics inside one browser tab.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Docker", "WebRTC", "Socket.io"],
    features: [
      "Sandboxed isolated code execution containerized with Docker across C++, Python, Java, and JS",
      "Low-latency collaborative Monaco code editor with simultaneous cursor synchronization",
      "Direct peer-to-peer WebRTC video and audio channels with screen sharing",
      "Automated test case runner evaluating runtime speed, memory consumption, and edge cases",
      "Recruiter dashboard with timeline replay of candidate keystrokes and code changes",
    ],
    challenge:
      "Technical interviews traditionally force candidates and interviewers to juggle three separate tools: an IDE, a video call app, and a communication channel. This creates friction, slows down evaluations, and introduces technical setup failures.",
    solution:
      "We engineered an integrated full-stack platform using Node.js and WebSockets for real-time state synchronization, coupled with isolated Docker worker containers that safely execute arbitrary candidate code with strict CPU, memory, and timeout constraints.",
    outcome:
      "A seamless browser-based assessment environment capable of evaluating complex algorithmic submissions in sub-second execution windows without impacting server host stability.",
    year: "2024",
    featured: true,
    order: 2,
    thumbnail: "https://res.cloudinary.com/y20gw7iu/image/upload/v1791031792/pglabs/projects/hiremeet_thumb.jpg",
    images: [
      "https://res.cloudinary.com/y20gw7iu/image/upload/v1791031792/pglabs/projects/hiremeet_thumb.jpg",
      "https://res.cloudinary.com/y20gw7iu/image/upload/v1791031793/pglabs/projects/hiremeet_editor.jpg",
    ],
  },
  {
    slug: "ckb-examination-platform",
    title: "CKB Examination Platform",
    category: "Web Application",
    categories: ["Web", "Business Software", "Custom Software", "Assessment"],
    shortDescription:
      "A scalable online examination platform with real-time test monitoring, automated answer persistence, and proctoring capabilities.",
    description:
      "A high-concurrency online examination and student assessment platform designed for educational institutions. The platform handles synchronized exam scheduling, automated question scrambling, resilient offline-tolerant answer caching, and real-time invigilator monitoring.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "WebSockets", "Tailwind CSS"],
    features: [
      "Dynamic question bank with multiple question types, negative marking, and timer controls",
      "Persistent auto-saving: student answers continuously synchronized to prevent data loss on disconnect",
      "Live proctoring monitor alerting invigilators to tab switching or window defocus events",
      "Automated instant grading for objective sections with detailed statistical score breakdowns",
      "Role-based access controls for institutional admins, question authors, and student candidates",
    ],
    challenge:
      "Administering synchronous online tests to hundreds of concurrent students often results in lost answers during momentary Wi-Fi drops, server crashes under burst load, and academic integrity risks.",
    solution:
      "We built a robust architecture utilizing optimistic local browser caching alongside persistent WebSocket synchronization, ensuring that every selected radio button or typed response is buffered locally and dispatched to MongoDB without blocking the user interface.",
    outcome:
      "Successfully delivered reliable concurrent exam sessions with zero reported data loss incidents, providing instructors with comprehensive performance analytics immediately upon exam submission.",
    year: "2023",
    featured: true,
    order: 3,
    thumbnail: "https://res.cloudinary.com/y20gw7iu/image/upload/v1791031794/pglabs/projects/ckb_thumb.jpg",
    images: [
      "https://res.cloudinary.com/y20gw7iu/image/upload/v1791031794/pglabs/projects/ckb_thumb.jpg",
      "https://res.cloudinary.com/y20gw7iu/image/upload/v1791031795/pglabs/projects/ckb_proctoring.jpg",
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return CANONICAL_PROJECTS.find((p) => p.slug === slug);
}
