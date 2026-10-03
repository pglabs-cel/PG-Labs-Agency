export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  highlights: string[];
  bestFor: string;
  popular?: boolean;
  ctaText: string;
  serviceSlug?: string;
}

export interface PricingCategory {
  id: string;
  title: string;
  pillar: "BUILD" | "GROW" | "MANAGE" | "BRAND" | "AUTOMATE";
  eyebrow: string;
  description: string;
  tiers: PricingTier[];
}

export interface PricingFAQ {
  question: string;
  answer: string;
}

export interface EngagementModel {
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
}

export const PRICING_DISCLAIMER =
  "Final pricing depends on scope, complexity, integrations, content requirements, and timeline. All figures represent starting estimates for typical projects.";

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    title: "Fixed-Scope Milestone Project",
    subtitle: "Clear scope, defined deliverables, transparent milestones",
    description:
      "Ideal for new websites, Shopify stores, custom software modules, and brand identity projects. We break the project into 3 to 4 clear deliverable stages with payment tied strictly to milestone sign-offs.",
    benefits: [
      "Zero surprise invoices or runaway hours",
      "Guaranteed delivery dates tied to agreed sprint scopes",
      "Comprehensive warranty & bug-fix stabilization window post-launch",
      "Full intellectual property and source code handoff",
    ],
  },
  {
    title: "Monthly Growth Retainer",
    subtitle: "Continuous optimization, marketing, and technical enhancements",
    description:
      "Ideal for ongoing SEO & Analytics, Performance Marketing ad management, Social Media Management, and continuous software maintenance. Predictable monthly investment with weekly performance reviews.",
    benefits: [
      "Dedicated bandwidth allocated to your business each month",
      "Weekly analytics reviews and sprint planning calls",
      "Continuous A/B testing of creatives, landing pages, and search rankings",
      "Cancel or pause with 30-day notice — zero long-term handcuffs",
    ],
  },
  {
    title: "Dedicated Engineering Sprints",
    subtitle: "Flexible engineering capacity for agile software development",
    description:
      "For companies with evolving technical roadmaps needing senior full-stack development, API engineering, or AI model training on a bi-weekly sprint cadence.",
    benefits: [
      "Direct communication with senior engineers (zero account managers)",
      "Daily asynchronous standups and continuous staging deployments",
      "Rapid pivoting based on live customer feedback and data",
      "Seamless integration with your internal technical leadership",
    ],
  },
];

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: "web-development",
    title: "Web & Digital Products",
    pillar: "BUILD",
    eyebrow: "CODED & CMS WEBSITES",
    description:
      "Production-ready websites and custom web applications engineered for speed, conversion, and scalability.",
    tiers: [
      {
        name: "Coded Website",
        price: "₹15,000+",
        description:
          "Fast, modern landing page or portfolio built with Next.js, React, and Tailwind CSS. Ideal for high speed and clean brand presence.",
        highlights: [
          "Next.js / React modern frontend",
          "Mobile-first responsive layout (320px to 1440px+)",
          "Sub-second loading times & Core Web Vitals optimization",
          "Interactive contact form with spam protection",
          "Baseline technical SEO & OpenGraph previews",
          "Deployment on Vercel or modern cloud host",
        ],
        bestFor: "Startups, modern service businesses, and high-conversion landing pages.",
        ctaText: "Start Coded Website",
        serviceSlug: "web-development",
      },
      {
        name: "Business Website",
        price: "₹30,000+",
        popular: true,
        description:
          "Multi-page corporate website with custom components, service pages, dynamic content handling, and administrative controls.",
        highlights: [
          "Complete multi-page information architecture (5-10 pages)",
          "Admin dashboard or CMS integration for easy content editing",
          "Custom UI animations & high-craft interactive cards",
          "Lead routing to email, CRM, and WhatsApp",
          "Comprehensive Schema.org structured data",
          "Analytics telemetry & Google Search Console setup",
        ],
        bestFor: "Established companies needing an authoritative, conversion-focused digital presence.",
        ctaText: "Start Business Website",
        serviceSlug: "web-development",
      },
      {
        name: "Custom Software & SaaS",
        price: "Let's Talk",
        description:
          "Full-stack web applications, internal tools, customer portals, or SaaS platforms with complex business logic.",
        highlights: [
          "Bespoke database architecture (MongoDB / PostgreSQL)",
          "Authentication, roles, and granular permission access",
          "Custom REST APIs and third-party webhook integrations",
          "Operational dashboards & real-time analytics",
          "Docker containerization & CI/CD deployment",
          "Dedicated technical architecture discovery",
        ],
        bestFor: "SaaS startups, internal operations portals, and complex operational tools.",
        ctaText: "Discuss Architecture",
        serviceSlug: "custom-software",
      },
    ],
  },
  {
    id: "cms-ecommerce",
    title: "CMS & E-Commerce",
    pillar: "BUILD",
    eyebrow: "WORDPRESS & SHOPIFY",
    description:
      "Manageable platforms that give your team editorial freedom or a frictionless retail checkout experience.",
    tiers: [
      {
        name: "WordPress Development",
        price: "₹10,000+",
        description:
          "Custom WordPress website without template bloat. Fast loading, clean theme code, and easy Gutenberg blocks.",
        highlights: [
          "Custom lightweight theme or child theme",
          "Branded Gutenberg block patterns for easy editing",
          "Zero heavy page builder bloat (fast loading speeds)",
          "Contact forms with spam protection & email notifications",
          "SEO plugin setup (Yoast / Rank Math) & security hardening",
          "Editor video training for your internal team",
        ],
        bestFor: "Companies needing blogs, service sites, and regular content publishing.",
        ctaText: "Start WordPress Project",
        serviceSlug: "wordpress-development",
      },
      {
        name: "Shopify Store",
        price: "₹20,000+",
        popular: true,
        description:
          "High-converting Shopify 2.0 storefront engineered for fast product discovery, trustworthy checkout, and sales.",
        highlights: [
          "Customized Shopify 2.0 theme aligned to your brand",
          "Product catalog, variant setup, and automated collections",
          "Domestic & international payment gateways (UPI, Cards, COD)",
          "Shipping rates and courier integration (Shiprocket / Delhivery)",
          "Conversion-focused product pages with trust badges",
          "Meta Pixel and GA4 E-commerce event tracking",
        ],
        bestFor: "D2C brands, retail stores, and businesses launching or upgrading online shops.",
        ctaText: "Launch Shopify Store",
        serviceSlug: "shopify-development",
      },
    ],
  },
  {
    id: "growth-marketing",
    title: "Growth & Visibility",
    pillar: "GROW",
    eyebrow: "SEO & PERFORMANCE ADS",
    description:
      "Data-driven organic search rankings and targeted paid advertising with transparent conversion tracking.",
    tiers: [
      {
        name: "SEO & Analytics",
        price: "₹5,000",
        period: "/month",
        description:
          "Continuous technical SEO, intent-driven keyword optimization, site architecture tuning, and ranking analytics.",
        highlights: [
          "Technical crawl audit and indexing health fixes",
          "Core Web Vitals performance maintenance",
          "Keyword mapping across primary business services",
          "On-page metadata, headings, and schema structured data",
          "Google Search Console & GA4 conversion tracking",
          "Monthly transparent ranking progress report",
        ],
        bestFor: "Businesses looking to build sustainable, compounding organic search traffic.",
        ctaText: "Start SEO Growth",
        serviceSlug: "seo",
      },
      {
        name: "Performance Marketing",
        price: "Custom",
        description:
          "Data-driven Google Ads and Meta Ads management focused on profitable customer acquisition and real lead quality.",
        highlights: [
          "Google Ads (Search, Performance Max, YouTube, Display)",
          "Meta Ads (Facebook & Instagram feed, reels, lead forms)",
          "Visual ad creative design & direct-response ad copy",
          "Google Tag Manager server-side event tracking & CAPI",
          "Weekly bid management, negative keywords, and A/B testing",
          "Transparent weekly performance review calls",
        ],
        bestFor: "Brands and service businesses ready to scale predictable paid acquisition.",
        ctaText: "Discuss Ad Strategy",
        serviceSlug: "performance-marketing",
      },
    ],
  },
  {
    id: "brand-creative",
    title: "Brand & Digital Presence",
    pillar: "BRAND",
    eyebrow: "IDENTITY & SOCIAL CONTENT",
    description:
      "Consistent, memorable visual identity systems, business collateral, and active digital presence.",
    tiers: [
      {
        name: "Logo & Brand Starter",
        price: "₹8,000+",
        description:
          "Complete brand identity system including logo design, color palette, typography guidelines, and vector source assets.",
        highlights: [
          "2 to 3 unique creative concept directions",
          "Primary logo, wordmark, and responsive icon mark variants",
          "Curated digital color palette & typography pairing scale",
          "Vector master files (.AI, .EPS, .SVG, .PDF, PNG)",
          "Brand style guide PDF outlining correct application",
          "Social media avatar & banner asset package",
        ],
        bestFor: "New businesses, startups, and companies rebranding for a modern image.",
        ctaText: "Start Brand Identity",
        serviceSlug: "branding",
      },
      {
        name: "Business Collateral",
        price: "₹6,000+",
        description:
          "High-craft brochures, company profile PDFs, business cards, and sales presentation decks.",
        highlights: [
          "A4 bi-fold / tri-fold corporate brochure design",
          "Executive company profile presentation deck (PDF)",
          "Premium business card layout with print specifications",
          "Print-ready CMYK 300 DPI files with crop & bleed marks",
          "Digital interactive PDF with clickable contact links",
          "Editable presentation templates",
        ],
        bestFor: "B2B companies pitching enterprise clients and attending trade conferences.",
        ctaText: "Design Collateral",
        serviceSlug: "business-collateral",
      },
      {
        name: "Social Media Management",
        price: "Custom",
        period: "/month",
        description:
          "Structured content planning, custom visual post designs, reels concepts, and multi-channel publishing.",
        highlights: [
          "Monthly content calendar with strategic themes and hooks",
          "12 to 20 bespoke visual posts & carousels per month",
          "Reels / Short video scripts and concept storyboards",
          "Research-backed hashtags & persuasive captions",
          "Scheduled publishing across Instagram, LinkedIn, and Facebook",
          "Monthly audience growth and engagement report",
        ],
        bestFor: "Businesses wanting a credible, active, and aesthetic social presence.",
        ctaText: "Discuss Social Presence",
        serviceSlug: "social-media-management",
      },
    ],
  },
  {
    id: "automation-ai",
    title: "Automation & Applied AI",
    pillar: "AUTOMATE",
    eyebrow: "WORKFLOWS & MACHINE LEARNING",
    description:
      "Pragmatic workflow automation and applied AI that eliminate repetitive manual friction from your operations.",
    tiers: [
      {
        name: "Business Automation",
        price: "₹12,000+",
        description:
          "Practical webhook and n8n integrations connecting website forms, CRMs, WhatsApp alerts, and spreadsheets.",
        highlights: [
          "Instant lead notifications to WhatsApp and email",
          "Form submissions auto-synced into CRM and Google Sheets",
          "Self-hosted n8n or serverless webhooks (zero per-task fees)",
          "Bidirectional data syncing between operational tools",
          "Error handling and automated failure warning alerts",
          "Operational handover walkthrough",
        ],
        bestFor: "Operations and sales teams wasting hours manually routing leads and data.",
        ctaText: "Automate Workflows",
        serviceSlug: "automation",
      },
      {
        name: "Applied AI Solutions",
        price: "₹40,000+",
        description:
          "Computer vision models, automated document extraction, and custom LLM integrations built for business utility.",
        highlights: [
          "Computer vision (YOLO / PyTorch) custom object detection",
          "Automated OCR and invoice/document JSON extraction",
          "Custom LLM API workflows with structured schema validation",
          "FastAPI high-throughput inference microservices",
          "Dataset cleaning, annotation, and model benchmarking",
          "Containerized Docker deployment on cloud infrastructure",
        ],
        bestFor: "Companies with visual inspection, parts identification, or document processing bottlenecks.",
        ctaText: "Discuss AI Solutions",
        serviceSlug: "ai-solutions",
      },
    ],
  },
];

export const PRICING_FAQS: PricingFAQ[] = [
  {
    question: "Why do you show 'starting prices' instead of fixed package rates?",
    answer:
      "Because no two businesses have identical requirements. A 3-page portfolio has completely different technical demands than a 20-page web application with authentication and payment gateways. We provide transparent starting rates so you have an honest baseline, then provide an itemized quote after technical discovery.",
  },
  {
    question: "How do milestone payments work for project builds?",
    answer:
      "We typically structure projects into transparent milestone phases: 40% upfront deposit to kick off architecture and design, 30% upon interactive staging build approval, and 30% upon final quality assurance and live production deployment.",
  },
  {
    question: "Are there any hidden recurring fees paid to PG Labs?",
    answer:
      "None. You own all code, repositories, and assets 100%. Any ongoing costs are third-party subscriptions that you pay directly to providers (e.g. your domain registrar, hosting like Vercel or cloud servers, or Shopify/Google Ads directly). We never hold your assets hostage.",
  },
  {
    question: "Do you offer post-launch maintenance or warranties?",
    answer:
      "Yes. Every software project includes a complimentary 14 to 30 day warranty window to ensure bug-free operation and smooth adoption. After that, we offer flexible monthly maintenance retainers for continuous updates and security monitoring.",
  },
];
