export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Web Development",
    description:
      "High-performance websites and web applications designed for speed, scalability and conversion.",
    features: [
      "Business websites",
      "SaaS platforms",
      "E-commerce",
      "Admin dashboards",
      "Customer portals",
    ],
    icon: "globe",
  },
  {
    number: "02",
    title: "AI & Machine Learning",
    description:
      "Practical AI solutions that automate workflows, understand data and create new product capabilities.",
    features: [
      "AI integrations",
      "Computer vision",
      "Image recognition",
      "Recommendation systems",
      "Intelligent automation",
    ],
    icon: "brain",
  },
  {
    number: "03",
    title: "Custom Software",
    description:
      "Software designed around the way your business actually operates.",
    features: [
      "Inventory systems",
      "Internal tools",
      "Business management systems",
      "Workflow platforms",
      "Custom dashboards",
    ],
    icon: "layers",
  },
  {
    number: "04",
    title: "UI/UX & Frontend",
    description:
      "Clean, responsive interfaces that make complex products feel simple.",
    features: [
      "Product interfaces",
      "Responsive design",
      "Design systems",
      "Interactive dashboards",
      "Motion design",
    ],
    icon: "layout",
  },
  {
    number: "05",
    title: "Backend & APIs",
    description:
      "Reliable backend systems that power secure, scalable applications.",
    features: [
      "REST APIs",
      "Authentication",
      "Database architecture",
      "Integrations",
      "Cloud-ready infrastructure",
    ],
    icon: "server",
  },
  {
    number: "06",
    title: "Automation",
    description:
      "Connect systems, remove repetitive work and build smarter business workflows.",
    features: [
      "Workflow automation",
      "API integrations",
      "Data processing",
      "AI automation",
      "Third-party integrations",
    ],
    icon: "workflow",
  },
];