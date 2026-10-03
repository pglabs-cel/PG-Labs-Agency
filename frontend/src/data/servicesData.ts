export type ServicePillar = "BUILD" | "GROW" | "MANAGE" | "BRAND" | "AUTOMATE";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceComparison {
  title: string;
  description: string;
  optionA: {
    name: string;
    points: string[];
    bestFor: string;
  };
  optionB: {
    name: string;
    points: string[];
    bestFor: string;
  };
}

export interface ServiceData {
  slug: string;
  pillar: ServicePillar;
  pillarLabel: string;
  number: string;
  title: string;
  navTitle: string;
  shortDescription: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  eyebrow: string;
  intro: string;
  whoIsItFor: string[];
  problemsSolved: Array<{
    problem: string;
    solution: string;
  }>;
  whatWeProvide: string[];
  deliverables: string[];
  technologies: Array<{
    name: string;
    category: string;
  }>;
  serviceProcess: ServiceProcessStep[];
  comparison?: ServiceComparison;
  disclaimer?: string;
  relatedCaseStudies?: Array<{
    slug: string;
    title: string;
    category: string;
    summary: string;
  }>;
  relatedServices: Array<{
    slug: string;
    title: string;
    pillar: ServicePillar;
  }>;
  faqs: ServiceFAQ[];
  startingPrice: string;
  ctaText: string;
  ctaSubtext: string;
}

export const PILLARS_CONFIG: Record<
  ServicePillar,
  {
    name: string;
    tagline: string;
    description: string;
    color: string;
    services: string[];
  }
> = {
  BUILD: {
    name: "BUILD",
    tagline: "Digital Products & Technology",
    description: "High-performance websites, custom web apps, SaaS platforms, and enterprise software engineered to scale.",
    color: "from-violet-500/20 to-purple-500/5",
    services: [
      "web-development",
      "wordpress-development",
      "shopify-development",
      "custom-software",
      "ui-ux-design",
      "backend-api-development",
    ],
  },
  GROW: {
    name: "GROW",
    tagline: "SEO & Performance Marketing",
    description: "Organic search visibility and targeted paid advertising backed by rigorous conversion and analytics tracking.",
    color: "from-emerald-500/20 to-teal-500/5",
    services: ["seo", "performance-marketing"],
  },
  MANAGE: {
    name: "MANAGE",
    tagline: "Social Media & Digital Presence",
    description: "Consistent content planning, visual post creatives, and digital engagement to keep your business top of mind.",
    color: "from-blue-500/20 to-indigo-500/5",
    services: ["social-media-management"],
  },
  BRAND: {
    name: "BRAND",
    tagline: "Identity & Creative",
    description: "Distinctive logo design, typography systems, brand guidelines, and print-ready business collateral.",
    color: "from-pink-500/20 to-rose-500/5",
    services: ["branding", "business-collateral"],
  },
  AUTOMATE: {
    name: "AUTOMATE",
    tagline: "Workflows & Practical AI",
    description: "Pragmatic workflow automation, data connectors, and applied AI that eliminate repetitive manual tasks.",
    color: "from-amber-500/20 to-orange-500/5",
    services: ["automation", "ai-solutions"],
  },
};

export const SERVICES_DATA: ServiceData[] = [
  // ── 01. Web Development ──────────────────────────────────────────
  {
    slug: "web-development",
    pillar: "BUILD",
    pillarLabel: "Digital Products & Technology",
    number: "01",
    title: "Web Development",
    navTitle: "Web Development",
    shortDescription: "High-performance websites and web applications built with custom code or headless frameworks.",
    seoTitle: "Web Development Company & Custom Website Development Services | PG Labs",
    metaDescription: "PG Labs builds modern websites and web applications using React, Next.js, TypeScript, Node.js or CMS platforms. Coded or no-code based on your business need.",
    keywords: [
      "Web Development Company",
      "Website Development Services",
      "Custom Website Development",
      "Web Development Agency",
      "Next.js Development Agency",
      "React Web Development",
    ],
    h1: "Websites Built Around Your Business.",
    eyebrow: "CODED & CMS WEB ENGINEERING",
    intro: "We build websites end-to-end using either custom code or established platforms depending on what your business actually requires. Whether you need a lightning-fast marketing website, an interactive client portal, or a scalable SaaS platform, we engineer for speed, conversion, and long-term maintainability.",
    whoIsItFor: [
      "Growing businesses needing a fast, professional digital presence that converts visitors.",
      "Startups and SaaS companies building bespoke customer dashboards or web applications.",
      "Companies wanting clean code and fast Core Web Vitals instead of bloated website builders.",
      "Teams that need an administrative backend to manage content, leads, or users easily.",
    ],
    problemsSolved: [
      {
        problem: "Slow page loads and terrible mobile scores causing high bounce rates.",
        solution: "Engineered on modern Next.js/React with static prerendering, image optimization, and sub-second response times.",
      },
      {
        problem: "Fragile templates that break every time an update is installed.",
        solution: "Modular component architecture with type safety, clean separation of concerns, and robust version control.",
      },
      {
        problem: "Agencies forcing complex codebases when a manageable CMS was all that was needed.",
        solution: "Honest technology recommendations: we build custom code when you need bespoke logic, and CMS when you need editorial autonomy.",
      },
    ],
    whatWeProvide: [
      "End-to-end architecture from wireframe to production deployment.",
      "Responsive, mobile-first design tested across all modern viewport sizes.",
      "Search-engine-ready semantic markup, OpenGraph metadata, and structured data.",
      "Custom API integrations, webhook handling, and secure database connections.",
      "Admin panels and client dashboards for internal operations.",
    ],
    deliverables: [
      "Business websites & company landing pages",
      "Custom web applications & SaaS frontend platforms",
      "Admin dashboards & internal customer portals",
      "E-commerce storefronts & checkout flows",
      "Clean source code repository with CI/CD setup",
      "Post-launch warranty and handoff documentation",
    ],
    technologies: [
      { name: "Next.js", category: "Frontend Framework" },
      { name: "React", category: "UI Library" },
      { name: "TypeScript", category: "Language" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Node.js", category: "Runtime" },
      { name: "PostgreSQL / MongoDB", category: "Database" },
      { name: "REST / GraphQL", category: "APIs" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "Technical Discovery & Stack Decision",
        description: "We analyze your business goals, content velocity, and feature scope to decide whether custom Next.js code or CMS architecture is optimal.",
      },
      {
        step: "02",
        title: "Interface Architecture & Component Design",
        description: "We define typography, responsive layout structures, and user flow wireframes before writing production code.",
      },
      {
        step: "03",
        title: "Modular Engineering & Staging Builds",
        description: "We implement type-safe components, hook up databases or APIs, and provide continuous staging links for your review.",
      },
      {
        step: "04",
        title: "Performance Audit, SEO & Launch",
        description: "We audit Core Web Vitals, configure domain DNS, set up search console indexing, and hand over the codebase.",
      },
    ],
    comparison: {
      title: "Coded Web Development vs. No-Code / CMS",
      description: "We don't believe one size fits all. Here is how we choose the right path for your project:",
      optionA: {
        name: "Custom Code (Next.js / React)",
        points: [
          "Maximum speed, sub-second TTFB, and zero bloat.",
          "Unlimited flexibility for custom user logic, auth, and dashboards.",
          "High security with serverless APIs and isolated databases.",
          "Ideal for SaaS, web apps, portals, and high-traffic brands.",
        ],
        bestFor: "Complex web applications, SaaS platforms, and businesses wanting custom interactive features.",
      },
      optionB: {
        name: "Managed CMS (WordPress / Shopify)",
        points: [
          "Non-technical team can update blogs, products, and copy easily.",
          "Massive ecosystem for quick plugin extensions and catalog management.",
          "Faster time-to-market for standard e-commerce and editorial content.",
          "Lower initial development investment.",
        ],
        bestFor: "Content-heavy marketing blogs, standard service sites, and retail e-commerce stores.",
      },
    },
    relatedCaseStudies: [
      {
        slug: "hiremeet",
        title: "HireMeet",
        category: "SaaS / EdTech",
        summary: "Full-stack technical interview preparation platform with live coding challenges and video conferencing.",
      },
      {
        slug: "ckb-examination-platform",
        title: "CKB Examination Platform",
        category: "Web Application",
        summary: "High-concurrency proctored testing platform with real-time test verification and student management.",
      },
    ],
    relatedServices: [
      { slug: "ui-ux-design", title: "UI/UX Design", pillar: "BUILD" },
      { slug: "seo", title: "SEO & Analytics", pillar: "GROW" },
      { slug: "automation", title: "Business Automation", pillar: "AUTOMATE" },
    ],
    faqs: [
      {
        question: "How do you decide between custom code and a CMS like WordPress?",
        answer: "We assess your update frequency and technical complexity. If you need dynamic user authentication, custom data pipelines, or bespoke business logic, custom code (Next.js) is required. If your team primarily publishes blogs and service pages, WordPress offers easier day-to-day autonomy.",
      },
      {
        question: "Will our website be mobile friendly and responsive?",
        answer: "Yes, every interface is designed mobile-first and tested rigorously on 320px, 375px, 768px, 1024px, and 1440px+ screens to ensure zero horizontal overflow and comfortable touch targets.",
      },
      {
        question: "Who owns the code and hosting after completion?",
        answer: "You own 100% of the intellectual property and code repository. We hand over all GitHub repositories, environment configs, and deployment access upon final milestone completion.",
      },
      {
        question: "Do you include SEO setup with website development?",
        answer: "Yes, every website includes technical SEO baseline: semantic HTML5, descriptive meta tags, OpenGraph previews, XML sitemaps, robots.txt, and fast Core Web Vitals optimization.",
      },
    ],
    startingPrice: "₹15,000+",
    ctaText: "Start Your Website Project →",
    ctaSubtext: "Tell us about your project requirements and target timeline.",
  },

  // ── 02. WordPress Development ─────────────────────────────────────
  {
    slug: "wordpress-development",
    pillar: "BUILD",
    pillarLabel: "Digital Products & Technology",
    number: "02",
    title: "WordPress Development",
    navTitle: "WordPress Development",
    shortDescription: "Custom WordPress websites without the bloated template feel, built for speed and effortless editing.",
    seoTitle: "WordPress Development Services & Custom WordPress Website Design | PG Labs",
    metaDescription: "Custom WordPress website development services by PG Labs. Fast loading, clean theme code, custom plugin integration, and effortless client management.",
    keywords: [
      "WordPress Development Services",
      "WordPress Website Development",
      "WordPress Website Design",
      "Custom WordPress Themes",
      "WordPress Agency India",
    ],
    h1: "WordPress Websites Without the Template Feel.",
    eyebrow: "CUSTOM THEMES & ROBUST CMS",
    intro: "WordPress powers over 40% of the web for a reason: it gives business teams complete editorial freedom. But off-the-shelf theme marketplace templates often ship with 50+ plugins, sluggish page speeds, and brittle layouts. PG Labs builds custom WordPress sites with clean code, minimal dependencies, and lightning-fast loading speeds.",
    whoIsItFor: [
      "Businesses that want their marketing team to edit pages, publish blogs, and update case studies without touching code.",
      "Companies moving away from brittle, slow site builders (Wix, Elementor bloat) to a streamlined, fast setup.",
      "Service businesses, consultants, and B2B companies needing an authoritative corporate website.",
    ],
    problemsSolved: [
      {
        problem: "Bloated themes loaded with 30+ unnecessary plugins that crash upon update.",
        solution: "Clean, bespoke theme development utilizing native WordPress block architecture with minimal plugin overhead.",
      },
      {
        problem: "Sluggish mobile page speeds scoring under 40 on Google PageSpeed Insights.",
        solution: "Server-side caching configuration, modern image optimization, and clean CSS/JS bundling.",
      },
      {
        problem: "Difficult admin panels that require developer intervention for basic text changes.",
        solution: "Intuitive Customizer and Block Editor setups tailored to your exact brand layout.",
      },
    ],
    whatWeProvide: [
      "Custom WordPress theme development and tailored design implementation.",
      "Custom post types for portfolios, services, testimonials, and team members.",
      "Secure contact form setup with spam protection (Turnstile / reCAPTCHA).",
      "Comprehensive on-page and technical SEO plugin configuration (Yoast / Rank Math).",
      "Managed migration from existing hosts or staging to production with zero downtime.",
    ],
    deliverables: [
      "Custom responsive WordPress theme",
      "Bespoke Gutenberg block patterns matching your brand",
      "Form handling with email notifications and CRM hooks",
      "Google Analytics & Search Console integration",
      "Security hardening (login limits, security headers, automated backups)",
      "Editor training walkthrough for your team",
    ],
    technologies: [
      { name: "WordPress", category: "CMS Core" },
      { name: "PHP", category: "Backend" },
      { name: "MySQL", category: "Database" },
      { name: "Tailwind / SCSS", category: "Styling" },
      { name: "Gutenberg Blocks", category: "Editor" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "Information Architecture & Content Plan",
        description: "We map your site structure, page hierarchy, and required custom fields for easy long-term editing.",
      },
      {
        step: "02",
        title: "Clean Theme Development",
        description: "We translate approved Figma designs into clean, modular templates without relying on heavy page builder bloat.",
      },
      {
        step: "03",
        title: "Content Population & Plugin Hardening",
        description: "We configure security, caching, forms, and SEO plugins, then populate initial pages and media.",
      },
      {
        step: "04",
        title: "Testing, Launch & Client Training",
        description: "We test across browsers and devices, configure SSL and DNS, and provide a video guide on how to update content.",
      },
    ],
    relatedServices: [
      { slug: "web-development", title: "Web Development", pillar: "BUILD" },
      { slug: "seo", title: "SEO & Analytics", pillar: "GROW" },
      { slug: "branding", title: "Brand Identity", pillar: "BRAND" },
    ],
    faqs: [
      {
        question: "Can our internal team easily update text and photos after launch?",
        answer: "Absolutely. We build with modern WordPress blocks designed specifically for non-technical team members. You can edit text, swap images, and create new pages without touching a line of code.",
      },
      {
        question: "Will our WordPress site be secure from attacks?",
        answer: "Yes. We implement two-factor authentication, non-standard login paths, strict file permissions, bot protection on forms, automated offsite backups, and SSL enforcement.",
      },
      {
        question: "Do you use pre-made ThemeForest themes or build custom?",
        answer: "We avoid slow, generic marketplace themes. We build custom, lightweight themes or selectively customize lean frameworks so your website never feels like an off-the-shelf template.",
      },
    ],
    startingPrice: "₹10,000+",
    ctaText: "Start Your WordPress Project →",
    ctaSubtext: "Clean, fast, and easy for your team to manage.",
  },

  // ── 03. Shopify Development ───────────────────────────────────────
  {
    slug: "shopify-development",
    pillar: "BUILD",
    pillarLabel: "Digital Products & Technology",
    number: "03",
    title: "Shopify Development",
    navTitle: "Shopify Development",
    shortDescription: "High-converting Shopify storefronts engineered for fast checkout, seamless payments, and store growth.",
    seoTitle: "Shopify Development Services & E-commerce Store Design | PG Labs",
    metaDescription: "Launch a high-converting Shopify store built to sell. PG Labs handles custom theme setup, product architecture, payment gateways, and conversion optimization.",
    keywords: [
      "Shopify Development Services",
      "Shopify Store Development",
      "Shopify Website Design",
      "E-commerce Website Agency",
      "Shopify Store Setup India",
    ],
    h1: "Launch an E-commerce Store Built to Sell.",
    eyebrow: "E-COMMERCE STORE ENGINEERING",
    intro: "A successful online store is not just a digital catalog; it is a conversion engine. We design and launch Shopify stores built around buyer trust, friction-free checkout, lightning-fast product pages, and seamless payment and shipping integrations.",
    whoIsItFor: [
      "D2C brands launching their first online store with modern visual identity.",
      "Established retailers migrating from legacy platforms or outdated WooCommerce stores.",
      "Brands needing conversion-focused product pages, bundles, and upsell configurations.",
    ],
    problemsSolved: [
      {
        problem: "Cluttered product pages with slow image loading and high checkout abandonment.",
        solution: "High-speed theme configuration, clear call-to-action hierarchy, sticky buy buttons, and streamlined 1-page checkout.",
      },
      {
        problem: "Confusing shipping, tax, and payment gateway setups that cause failed customer orders.",
        solution: "Battle-tested gateway integration (Razorpay, Stripe, Cashfree, UPI) and regional shipping rule configuration.",
      },
      {
        problem: "Stores that look like every other generic dropshipping site on the internet.",
        solution: "Bespoke typography, branded micro-interactions, custom collection layouts, and premium product storytelling.",
      },
    ],
    whatWeProvide: [
      "End-to-end Shopify store configuration from account setup to domain launch.",
      "Theme customization (Liquid / Online Store 2.0 architecture).",
      "Product taxonomy, automated collections, tags, and intuitive navigation.",
      "Domestic and international payment gateway integration (UPI, Cards, NetBanking, COD).",
      "Inventory tracking, tax compliance, and automated notification emails.",
    ],
    deliverables: [
      "Fully configured Shopify store with responsive theme",
      "Product catalog setup with high-resolution media and variant matrix",
      "Custom cart drawer with upsell recommendations",
      "Payment gateway & shipping rate integration",
      "E-commerce analytics tracking (GA4 E-commerce, Meta Pixel)",
      "Store owner training on inventory and order processing",
    ],
    technologies: [
      { name: "Shopify", category: "E-commerce Platform" },
      { name: "Liquid", category: "Templating Engine" },
      { name: "JavaScript / Alpine", category: "Storefront Logic" },
      { name: "Razorpay / Stripe", category: "Payment Infrastructure" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "Product Architecture & Customer Flow",
        description: "We review your product catalog, categories, pricing, shipping tiers, and target customer journey.",
      },
      {
        step: "02",
        title: "Storefront Design & Customization",
        description: "We tailor a premium Shopify 2.0 theme to your brand guidelines, focusing on product discovery and trust badges.",
      },
      {
        step: "03",
        title: "Payments, Shipping & App Integration",
        description: "We connect payment gateways, shipping providers (Shiprocket / Delhivery), email marketing, and analytics.",
      },
      {
        step: "04",
        title: "Test Orders, Security & Launch",
        description: "We run end-to-end sandbox test orders across payment methods before pointing your custom domain live.",
      },
    ],
    comparison: {
      title: "Shopify vs. Custom Coded E-Commerce",
      description: "How to know whether Shopify or a custom e-commerce solution is best for your business:",
      optionA: {
        name: "Shopify (Recommended for most retail)",
        points: [
          "Rock-solid hosting infrastructure that handles Black Friday traffic spikes.",
          "Pre-certified PCI-DSS Level 1 payment security.",
          "Huge app ecosystem for reviews, inventory, and logistics.",
          "Fast setup time (2-4 weeks) with lower upfront cost.",
        ],
        bestFor: "D2C brands, apparel, retail goods, and stores with standard physical or digital products.",
      },
      optionB: {
        name: "Custom E-Commerce (Next.js + Medusa/Custom API)",
        points: [
          "Zero recurring percentage transaction fees from the platform.",
          "Infinite flexibility for unusual business models (dynamic pricing, complex subscriptions).",
          "Complete control over database architecture and checkout data.",
          "Requires dedicated engineering support and higher initial investment.",
        ],
        bestFor: "High-volume enterprises with custom manufacturing logic, bespoke multi-vendor marketplaces, or unique product configurators.",
      },
    },
    relatedServices: [
      { slug: "performance-marketing", title: "Performance Marketing", pillar: "GROW" },
      { slug: "branding", title: "Brand Identity", pillar: "BRAND" },
      { slug: "automation", title: "Business Automation", pillar: "AUTOMATE" },
    ],
    faqs: [
      {
        question: "Can I accept Indian payment methods like UPI and RuPay?",
        answer: "Yes. We configure gateways such as Razorpay, Cashfree, or PhonePe that natively support Google Pay, PhonePe, Paytm, UPI QR, Credit/Debit cards, and Cash on Delivery (COD).",
      },
      {
        question: "Will I need to pay monthly fees to Shopify?",
        answer: "Yes, Shopify charges a standard monthly software subscription directly (Basic Shopify plan is typically around ₹1,999/month). Our service covers the complete store engineering, design, and setup.",
      },
      {
        question: "Can you help migrate products from another platform?",
        answer: "Yes, we regularly migrate catalogs, customer data, and order history from WooCommerce, Magento, or custom spreadsheets into Shopify without losing SEO link equity.",
      },
    ],
    startingPrice: "₹20,000+",
    ctaText: "Launch Your Shopify Store →",
    ctaSubtext: "Engineered for speed, trust, and frictionless checkout.",
  },

  // ── 04. Custom Software ───────────────────────────────────────────
  {
    slug: "custom-software",
    pillar: "BUILD",
    pillarLabel: "Digital Products & Technology",
    number: "04",
    title: "Custom Software",
    navTitle: "Custom Software",
    shortDescription: "Software designed around the exact way your business operates, replacing manual friction with automated systems.",
    seoTitle: "Custom Software Development & Business Management Software | PG Labs",
    metaDescription: "Instead of forcing your workflow into generic tools, build software around your workflow. Inventory systems, operational dashboards, and custom business management platforms.",
    keywords: [
      "Custom Software Development",
      "Business Software Development",
      "Custom Business Management Software",
      "Internal Tools Development",
      "Custom Inventory Software",
    ],
    h1: "Software Built Around How Your Business Works.",
    eyebrow: "BESPOKE OPERATIONAL PLATFORMS",
    intro: "Off-the-shelf software forces your team to bend its operational procedures around rigid software limitations. We take the reverse approach: we study your actual workflow, bottlenecks, and data flows, then engineer tailored web platforms, internal tools, and operational systems that fit your business like a glove.",
    whoIsItFor: [
      "Companies that have outgrown Excel sheets, messy WhatsApp threads, and generic SaaS tools.",
      "Businesses with specialized industry workflows (manufacturing, logistics, spare parts, education, trade).",
      "Organizations needing secure, permission-controlled internal platforms for their distributed team.",
    ],
    problemsSolved: [
      {
        problem: "Critical business data scattered across disjointed spreadsheets leading to costly errors.",
        solution: "Centralized relational databases with role-based access, audit logging, and single-source-of-truth accuracy.",
      },
      {
        problem: "Paying high per-seat subscriptions for generic software that only uses 20% of its features.",
        solution: "One custom asset owned outright by your company with zero per-user licensing fees.",
      },
      {
        problem: "Staff wasting hours daily manually copy-pasting numbers between systems.",
        solution: "Automated business logic that connects inventory, invoices, orders, and customer communication seamlessly.",
      },
    ],
    whatWeProvide: [
      "Complete system discovery, process mapping, and database architecture.",
      "Custom web-based management portals accessible on desktop, tablet, and mobile.",
      "Role-based access control (Admin, Manager, Staff, Viewer permissions).",
      "Real-time analytics dashboards with data visualization and export capabilities.",
      "Seamless integration with existing accounting, inventory, or communication tools.",
    ],
    deliverables: [
      "Custom business management web portal",
      "Relational or document database architecture",
      "Role-based authentication & activity audit logs",
      "Operational dashboards & reporting modules",
      "RESTful API endpoints for internal integrations",
      "Deployment on secure cloud infrastructure with automated backups",
    ],
    technologies: [
      { name: "React / Next.js", category: "Frontend" },
      { name: "Node.js / Express", category: "Backend" },
      { name: "Python / FastAPI", category: "Backend" },
      { name: "MongoDB / PostgreSQL", category: "Database" },
      { name: "Docker", category: "Containerization" },
      { name: "Redis", category: "Cache / Queue" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "Workflow Mapping & Bottleneck Audit",
        description: "We shadow your current operational process, identify manual failure points, and document required data relationships.",
      },
      {
        step: "02",
        title: "Architecture & Interactive Prototype",
        description: "We architect the database schema, API contracts, and user interface wireframes to validate usability before development.",
      },
      {
        step: "03",
        title: "Sprint-Based Modular Development",
        description: "We build core modules (inventory, users, invoicing, reporting) in verifiable 2-week milestones with live staging demos.",
      },
      {
        step: "04",
        title: "Data Migration, Training & Deployment",
        description: "We safely migrate existing legacy data, train key team members, and deploy the system on redundant cloud servers.",
      },
    ],
    relatedCaseStudies: [
      {
        slug: "part-track",
        title: "PartTrack (Gaba Traders Inventory)",
        category: "AI / Business Software",
        summary: "Bespoke AI-powered inventory and parts identification system engineered for rapid truck spare parts tracking.",
      },
      {
        slug: "hiremeet",
        title: "HireMeet",
        category: "SaaS / EdTech",
        summary: "Custom real-time platform combining coding problem evaluation, live video interviews, and candidate benchmarking.",
      },
      {
        slug: "ckb-examination-platform",
        title: "CKB Examination Platform",
        category: "Web Application",
        summary: "Scalable online test assessment and proctoring platform managing concurrent student examinations.",
      },
    ],
    relatedServices: [
      { slug: "backend-api-development", title: "Backend & API Development", pillar: "BUILD" },
      { slug: "automation", title: "Business Automation", pillar: "AUTOMATE" },
      { slug: "ai-solutions", title: "AI Solutions", pillar: "AUTOMATE" },
    ],
    faqs: [
      {
        question: "How long does a custom software build usually take?",
        answer: "A focused internal tool or management portal typically takes 4 to 8 weeks depending on the number of modules and integrations. We deliver in continuous milestone stages so your team tests features progressively.",
      },
      {
        question: "Can custom software connect to our existing systems or accounting software?",
        answer: "Yes. We engineer REST APIs and webhooks that connect seamlessly to accounting tools (Tally, Zoho, QuickBooks), payment gateways, WhatsApp, and email providers.",
      },
      {
        question: "Who owns the code and intellectual property?",
        answer: "You own 100% of the code, database schema, and intellectual property. There are no vendor lock-ins or recurring per-user licensing fees paid to us.",
      },
    ],
    startingPrice: "₹35,000+",
    ctaText: "Discuss Your Custom Software →",
    ctaSubtext: "Build software that fits your exact workflow.",
  },

  // ── 05. UI/UX Design ──────────────────────────────────────────────
  {
    slug: "ui-ux-design",
    pillar: "BUILD",
    pillarLabel: "Digital Products & Technology",
    number: "05",
    title: "UI/UX Design",
    navTitle: "UI/UX Design",
    shortDescription: "Clean, responsive product interfaces and design systems that make complex software feel simple.",
    seoTitle: "UI UX Design Services & Product Design Agency | PG Labs",
    metaDescription: "Interfaces designed to make complex products simple. PG Labs provides UI/UX research, wireframing, high-fidelity prototypes, and developer-ready design systems.",
    keywords: [
      "UI UX Design Services",
      "Website UI UX Design",
      "Product Design Services",
      "Figma UI UX Agency",
      "Dashboard Design Agency",
    ],
    h1: "Interfaces Designed to Make Complex Products Simple.",
    eyebrow: "PRODUCT EXPERIENCE & DESIGN SYSTEMS",
    intro: "Great digital product design is not about superficial decoration or trendy gradients. It is about cognitive clarity: understanding what the user needs to accomplish and removing every unnecessary obstacle. We design functional, elegant interfaces that turn first-time visitors into active users and streamline complex workflows into intuitive interactions.",
    whoIsItFor: [
      "Founders turning a software concept into a validated, high-fidelity interactive prototype.",
      "Companies with powerful backend functionality that suffers from clunky, confusing interfaces.",
      "Teams needing a unified, scalable design system before scaling their engineering team.",
    ],
    problemsSolved: [
      {
        problem: "Users dropping off because navigation and onboarding are confusing.",
        solution: "Rigorous information architecture, intuitive visual hierarchy, and progressive disclosure patterns.",
      },
      {
        problem: "Developers guessing spacing, colors, and responsive behavior during implementation.",
        solution: "Pixel-perfect Figma files with design tokens, responsive auto-layout, interactive states, and component variants.",
      },
      {
        problem: "Interfaces that look pretty on Dribbble but fail accessibility and real-world data constraints.",
        solution: "Design grounded in real content, WCAG 2.1 contrast standards, clear typography scales, and keyboard accessibility.",
      },
    ],
    whatWeProvide: [
      "User research, persona definition, and user journey mapping.",
      "Information architecture, user flow diagrams, and low-fidelity wireframing.",
      "High-fidelity UI design in Figma with dark and light surface exploration.",
      "Interactive clickable prototypes for user testing and stakeholder presentations.",
      "Scalable design systems with tokens (colors, typography, spacing, components).",
    ],
    deliverables: [
      "Complete Figma project file with structured pages and auto-layout",
      "Interactive clickable prototype for testing and demos",
      "Design system component library with hover, active, and disabled states",
      "Exportable SVG icon assets and optimized media guidelines",
      "Developer handoff documentation with spacing specs and micro-interaction notes",
    ],
    technologies: [
      { name: "Figma", category: "Design Tool" },
      { name: "Design Tokens", category: "Architecture" },
      { name: "Tailwind UI Tokens", category: "System" },
      { name: "WCAG 2.1", category: "Accessibility" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "User Journey & Architecture Mapping",
        description: "We map out core user flows, primary actions, and information hierarchies before creating visual screens.",
      },
      {
        step: "02",
        title: "Low-Fidelity Wireframes",
        description: "We test layout compositions, content density, and user pathways rapidly in black-and-white wireframes.",
      },
      {
        step: "03",
        title: "High-Fidelity Visual Design",
        description: "We apply typography, color palettes, elevation surfaces, and micro-interactions to create polished, tactile UI.",
      },
      {
        step: "04",
        title: "Design System & Developer Specs",
        description: "We document reusable components, responsive breakpoints, and interaction rules so engineers build without friction.",
      },
    ],
    relatedServices: [
      { slug: "web-development", title: "Web Development", pillar: "BUILD" },
      { slug: "custom-software", title: "Custom Software", pillar: "BUILD" },
      { slug: "branding", title: "Brand Identity", pillar: "BRAND" },
    ],
    faqs: [
      {
        question: "Can you redesign our existing application without rebuilding it from scratch?",
        answer: "Yes. We frequently conduct UI/UX audits and redesign specific flows (e.g. checkout, onboarding, dashboard navigation) so your developers can improve the interface incrementally.",
      },
      {
        question: "Do you design for both mobile and desktop?",
        answer: "Always. Every screen is designed with responsive auto-layout specifications for 375px mobile, tablet, and 1440px desktop screens.",
      },
      {
        question: "What files do we receive at the end?",
        answer: "You receive the complete, organized Figma file with component libraries, variables/tokens, assets, and prototype links ready for handoff to any development team.",
      },
    ],
    startingPrice: "₹18,000+",
    ctaText: "Start UI/UX Design Project →",
    ctaSubtext: "Make complex products feel effortless and intuitive.",
  },

  // ── 06. SEO & Analytics ───────────────────────────────────────────
  {
    slug: "seo",
    pillar: "GROW",
    pillarLabel: "SEO & Performance Marketing",
    number: "06",
    title: "SEO & Analytics",
    navTitle: "SEO & Analytics",
    shortDescription: "Turn your website into a searchable organic growth channel with technical SEO and clean tracking.",
    seoTitle: "SEO Services & Search Engine Optimization Agency | PG Labs",
    metaDescription: "Turn your website into a searchable organic growth channel. PG Labs provides technical SEO, on-page optimization, Core Web Vitals, and Google Analytics tracking.",
    keywords: [
      "SEO Services",
      "SEO Agency",
      "Website SEO Services",
      "SEO Services in India",
      "Technical SEO Agency",
      "Core Web Vitals Optimization",
    ],
    h1: "Turn Your Website Into a Searchable Growth Channel.",
    eyebrow: "ORGANIC SEARCH & TECHNICAL DISCOVERY",
    intro: "A beautiful website produces zero business value if nobody can find it. We help businesses earn sustainable organic search traffic by fixing deep technical SEO issues, structuring pages around buyer intent, optimizing Core Web Vitals, and establishing transparent analytics reporting.",
    whoIsItFor: [
      "Businesses whose websites currently receive little to no organic search traffic.",
      "Companies launching a new site who want to build search authority correctly from day one.",
      "Teams that need accurate tracking in Google Analytics 4 to understand where leads come from.",
    ],
    problemsSolved: [
      {
        problem: "Search engines failing to index key pages due to bad crawl architecture or broken sitemaps.",
        solution: "Comprehensive technical audit fixing robots.txt, canonical loops, sitemap hierarchies, and server response codes.",
      },
      {
        problem: "Keyword-stuffed content that reads unnaturally and fails to rank or convert.",
        solution: "Intent-focused keyword mapping, semantic HTML headings, and authoritative problem-solving content structure.",
      },
      {
        problem: "Zero visibility into which pages or search queries actually generate inquiries.",
        solution: "Custom Google Analytics 4 and Search Console setup with form submission event tracking.",
      },
    ],
    whatWeProvide: [
      "Technical SEO audit and crawling optimization (sitemaps, robots.txt, canonicals).",
      "Core Web Vitals performance tuning (LCP, FID/INP, CLS).",
      "On-page keyword mapping, heading hierarchies, meta titles, and descriptions.",
      "Schema structured data implementation (Organization, Service, BreadcrumbList, FAQ).",
      "Google Search Console & Google Analytics 4 configuration with conversion events.",
    ],
    deliverables: [
      "Technical SEO audit report with prioritised action items",
      "Implementation of all technical fixes directly in code or CMS",
      "Custom JSON-LD schema markup integration",
      "Google Analytics 4 & Search Console configuration",
      "Keyword mapping spreadsheet matching pages to search intent",
      "Monthly performance baseline and rank monitoring guidance",
    ],
    technologies: [
      { name: "Google Search Console", category: "Indexing" },
      { name: "Google Analytics 4", category: "Telemetry" },
      { name: "Schema.org / JSON-LD", category: "Structured Data" },
      { name: "Core Web Vitals", category: "Speed" },
      { name: "Screaming Frog", category: "Auditing" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "Deep Technical & Crawl Audit",
        description: "We inspect your website with professional crawlers to identify indexing blocks, 404 errors, redirect chains, and speed bottlenecks.",
      },
      {
        step: "02",
        title: "Architecture & Schema Implementation",
        description: "We correct page hierarchy, inject JSON-LD schema markup, optimize canonicals, and implement fast Core Web Vitals fixes.",
      },
      {
        step: "03",
        title: "On-Page Content & Intent Optimization",
        description: "We optimize title tags, meta descriptions, image alt attributes, and content structure based on high-intent search queries.",
      },
      {
        step: "04",
        title: "Telemetry & Performance Tracking",
        description: "We configure GA4 conversion events, connect Search Console, and verify that all key user actions are being tracked.",
      },
    ],
    disclaimer:
      "SEO results depend on competition, website quality, content, domain authority, and time. We do not make false guarantees of instant #1 rankings. We build sound technical foundations and search strategy that compounds over time.",
    relatedServices: [
      { slug: "web-development", title: "Web Development", pillar: "BUILD" },
      { slug: "performance-marketing", title: "Performance Marketing", pillar: "GROW" },
      { slug: "social-media-management", title: "Social Media", pillar: "MANAGE" },
    ],
    faqs: [
      {
        question: "How long does it take to see SEO results?",
        answer: "Technical fixes and indexing improvements typically register within 2 to 4 weeks. Meaningful organic traffic growth and keyword ranking improvements usually compound over 3 to 6 months depending on market competition and domain age.",
      },
      {
        question: "Do you guarantee first-page Google rankings?",
        answer: "No reputable agency can guarantee #1 rankings because Google's algorithm evaluates hundreds of dynamic factors. What we guarantee is rigorous technical execution, clean schema, fast loading speeds, and intent-focused optimization.",
      },
      {
        question: "Is SEO included when you build our website?",
        answer: "Every website we build includes foundational technical SEO (clean markup, metadata, sitemaps, fast speeds). Our dedicated SEO service provides continuous keyword expansion, competitive audits, and backlink strategy.",
      },
    ],
    startingPrice: "₹5,000/month",
    ctaText: "Audit Your Website SEO →",
    ctaSubtext: "Discover what is holding your website back from ranking.",
  },

  // ── 07. Performance Marketing ─────────────────────────────────────
  {
    slug: "performance-marketing",
    pillar: "GROW",
    pillarLabel: "SEO & Performance Marketing",
    number: "07",
    title: "Performance Marketing",
    navTitle: "Performance Marketing",
    shortDescription: "Turn ad spend into measurable growth with targeted Google Ads and Meta Ads campaigns.",
    seoTitle: "Performance Marketing Agency & Paid Advertising Services | PG Labs",
    metaDescription: "Turn ad spend into measurable business growth. PG Labs manages Google Ads and Meta Ads with conversion tracking, rigorous testing, and transparent analytics.",
    keywords: [
      "Performance Marketing Agency",
      "Google Ads Management",
      "Meta Ads Management",
      "Paid Advertising Services",
      "PPC Agency India",
      "Lead Generation Ads",
    ],
    h1: "Turn Ad Spend Into Measurable Growth.",
    eyebrow: "PAID ACQUISITION & CONVERSION FUNNELS",
    intro: "Paid advertising should never be a lottery. We engineer data-driven paid advertising campaigns across Google and Meta (Facebook & Instagram) anchored in clear conversion tracking, compelling creative messaging, and continuous optimization.",
    whoIsItFor: [
      "Businesses ready to scale beyond organic word-of-mouth with predictable paid acquisition.",
      "B2B and service companies needing qualified inbound phone calls, WhatsApp leads, and form inquiries.",
      "E-commerce stores wanting profitable return on ad spend through targeted shopping and retargeting ads.",
    ],
    problemsSolved: [
      {
        problem: "Burning ad budget on broad keywords that attract clicks but zero paying customers.",
        solution: "High-intent search keyword selection with negative keyword lists and tight match-type controls.",
      },
      {
        problem: "Not knowing which ad campaigns or creatives actually generated real revenue.",
        solution: "End-to-end conversion tracking using Google Tag Manager, GA4, Meta Conversions API, and offline lead tracking.",
      },
      {
        problem: "Sending expensive paid traffic to slow, generic homepages that don't convert.",
        solution: "Dedicated high-converting landing page recommendations with clear, single-goal call-to-actions.",
      },
    ],
    whatWeProvide: [
      "Google Ads campaign setup (Search, Performance Max, YouTube, Display, Remarketing).",
      "Meta Ads management (Facebook & Instagram feed, stories, reels, lead forms).",
      "Ad creative design, visual graphics, and persuasive direct-response ad copy.",
      "Google Tag Manager (GTM) container setup with server-side / pixel event tracking.",
      "Weekly budget management, bid optimization, and transparent performance reporting.",
    ],
    deliverables: [
      "Full account audit and strategic campaign structure",
      "Audience targeting matrices (in-market, lookalike, retargeting)",
      "High-converting ad creatives and multiple copywriting variations",
      "Verified conversion tracking (form submissions, calls, purchases)",
      "Continuous A/B testing of headlines, creatives, and landing pages",
      "Bi-weekly transparent performance reports with key business metrics",
    ],
    technologies: [
      { name: "Google Ads", category: "Search & PMax" },
      { name: "Meta Ads Manager", category: "Social Ads" },
      { name: "Google Tag Manager", category: "Event Tracking" },
      { name: "Meta Pixel & CAPI", category: "Attribution" },
      { name: "Google Analytics 4", category: "Conversion Data" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "Strategy & Offer Audit",
        description: "We analyze your margins, target cost per acquisition (CPA), customer avatar, and competitive positioning.",
      },
      {
        step: "02",
        title: "Tracking & Technical Foundation",
        description: "We configure GTM tags, verify conversion pixels, and test test triggers before spending a single rupee on ads.",
      },
      {
        step: "03",
        title: "Creative Production & Campaign Setup",
        description: "We write persuasive ad copy, design visual creatives, and build targeted campaign structures.",
      },
      {
        step: "04",
        title: "Launch, Measure & Continuous Optimization",
        description: "We monitor lead quality daily, pause underperforming variants, scale winning ad sets, and report findings transparently.",
      },
    ],
    disclaimer:
      "Advertising performance depends on market product-market fit, pricing, offer attractiveness, and ad budget. We do not make unsupported promises of guaranteed ROAS or revenue. We use disciplined testing to find profitable acquisition channels.",
    relatedServices: [
      { slug: "seo", title: "SEO & Analytics", pillar: "GROW" },
      { slug: "social-media-management", title: "Social Media", pillar: "MANAGE" },
      { slug: "web-development", title: "Web Development", pillar: "BUILD" },
    ],
    faqs: [
      {
        question: "What is the recommended minimum ad budget to start?",
        answer: "We recommend a minimum monthly media budget of ₹15,000 to ₹30,000 paid directly to the ad platforms (Google/Meta) to allow algorithmic machine learning to gather sufficient statistical conversion data.",
      },
      {
        question: "Do you provide the graphic creatives and ad copy?",
        answer: "Yes, our team creates the ad visuals, banners, carousel images, and persuasive copywriting variations tailored to each platform format.",
      },
      {
        question: "Who owns the advertising accounts?",
        answer: "You own all ad accounts directly. We work as managers inside your Google Ads and Meta Business Manager accounts so you maintain complete ownership of all data and billing.",
      },
    ],
    startingPrice: "Custom",
    ctaText: "Discuss Performance Marketing →",
    ctaSubtext: "Scale customer acquisition with disciplined paid ads.",
  },

  // ── 08. Social Media Management ───────────────────────────────────
  {
    slug: "social-media-management",
    pillar: "MANAGE",
    pillarLabel: "Social Media & Digital Presence",
    number: "08",
    title: "Social Media Management",
    navTitle: "Social Media",
    shortDescription: "Build a consistent, professional digital presence that keeps your brand top of mind.",
    seoTitle: "Social Media Management Services & Brand Content Strategy | PG Labs",
    metaDescription: "Build a digital presence people remember. PG Labs manages content calendars, post design, reels concepts, and multi-platform presence across Instagram, LinkedIn, and Facebook.",
    keywords: [
      "Social Media Management Services",
      "Social Media Marketing",
      "Instagram Management Services",
      "LinkedIn Brand Management",
      "Social Media Agency India",
    ],
    h1: "Build a Digital Presence People Remember.",
    eyebrow: "BRAND CONTENT & COMMUNITY PRESENCE",
    intro: "Modern customers research your social media profiles before they ever contact your sales team. An inactive or amateurish profile erodes credibility. We manage your social media presence with structured content planning, high-craft graphic design, engaging copywriting, and consistent publishing across Instagram, LinkedIn, and Facebook.",
    whoIsItFor: [
      "Businesses whose social media profiles haven't posted in weeks or months.",
      "Founders and B2B companies looking to build organic credibility on LinkedIn.",
      "Consumer brands wanting aesthetic, consistent visual design on Instagram.",
    ],
    problemsSolved: [
      {
        problem: "Inconsistent posting schedules leaving potential customers wondering if the business is active.",
        solution: "Organized monthly content calendars scheduled in advance with scheduled approval checkpoints.",
      },
      {
        problem: "Low-quality Canva templates that make professional businesses look amateur.",
        solution: "Bespoke design creatives crafted around your brand's unique colors, typography, and visual language.",
      },
      {
        problem: "Posting random memes or fluff that generates zero business inquiries.",
        solution: "Content pillars designed around educating your audience, showcasing proof, and solving client problems.",
      },
    ],
    whatWeProvide: [
      "Monthly content calendar with strategic themes, hooks, and publishing dates.",
      "High-resolution post design (carousels, single-image graphics, infographics).",
      "Short-form video concepts and storyboard guidance (Instagram Reels / YouTube Shorts).",
      "Engaging captions with targeted, research-backed hashtag strategies.",
      "Scheduled automated publishing and community inbox monitoring.",
    ],
    deliverables: [
      "Monthly approved content calendar",
      "12 to 20 custom branded visual posts & carousels per month",
      "Reel / Short video concept outlines and hook scripts",
      "Optimized profile bios, highlight covers, and link-in-bio setup",
      "Monthly growth and audience engagement report",
    ],
    technologies: [
      { name: "Instagram", category: "Platform" },
      { name: "LinkedIn", category: "B2B Platform" },
      { name: "Facebook", category: "Platform" },
      { name: "Figma", category: "Creative Design" },
      { name: "Buffer / Metricool", category: "Scheduling" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "Brand Voice & Visual Pillars",
        description: "We define your 3-4 primary content pillars, visual template guidelines, and brand tone of voice.",
      },
      {
        step: "02",
        title: "Content Planning & Scheduling",
        description: "We map out the upcoming month's calendar of topics, educational posts, and promotional announcements for your approval.",
      },
      {
        step: "03",
        title: "Graphic Design & Copywriting",
        description: "Our designers and writers craft on-brand graphics, carousels, and high-converting captions.",
      },
      {
        step: "04",
        title: "Publishing & Monthly Review",
        description: "We schedule the posts, engage with initial responses, and analyze monthly reach metrics to refine next month's strategy.",
      },
    ],
    disclaimer:
      "We focus on brand credibility, consistency, and professional presentation. We do not use fake bot engagement, follow-unfollow schemes, or promise vanity viral metrics.",
    relatedServices: [
      { slug: "branding", title: "Brand Identity", pillar: "BRAND" },
      { slug: "business-collateral", title: "Business Collateral", pillar: "BRAND" },
      { slug: "performance-marketing", title: "Performance Marketing", pillar: "GROW" },
    ],
    faqs: [
      {
        question: "Do we get to approve the posts before they go live?",
        answer: "Yes, always. We share the complete monthly content calendar with all graphics, captions, and dates for your review and approval before scheduling anything.",
      },
      {
        question: "Can you manage our LinkedIn personal or company page?",
        answer: "Yes, we manage both company pages and founder personal profiles, focusing on thought leadership, case study breakdowns, and industry insights.",
      },
      {
        question: "Do you shoot photography or video on location?",
        answer: "We work with assets provided by your team, high-quality curated media, and digital graphic design. If on-location production is needed, we coordinate specialized requirements.",
      },
    ],
    startingPrice: "Custom",
    ctaText: "Build Your Digital Presence →",
    ctaSubtext: "Consistent, polished content that builds brand authority.",
  },

  // ── 09. Brand Identity ────────────────────────────────────────────
  {
    slug: "branding",
    pillar: "BRAND",
    pillarLabel: "Identity & Creative",
    number: "09",
    title: "Logo & Brand Identity",
    navTitle: "Logo & Branding",
    shortDescription: "Distinctive logo design, typography scales, and brand identity systems for ambitious businesses.",
    seoTitle: "Logo Design Services & Brand Identity Design | PG Labs",
    metaDescription: "Give your business a consistent, memorable identity. PG Labs crafts modern logo design, typography systems, color palettes, and starter brand guidelines.",
    keywords: [
      "Logo Design Services",
      "Brand Identity Design",
      "Business Branding Services",
      "Corporate Identity Design",
      "Brand Identity Agency India",
    ],
    h1: "Give Your Business a Consistent Identity.",
    eyebrow: "VISUAL IDENTITY & LOGO SYSTEMS",
    intro: "A logo alone is not a brand. A brand is the cohesive visual system—your typography, color palette, spacing, and iconography—that makes your business instantly recognizable. We build clean, modern visual identity systems that give startups and established businesses an authentic, professional voice.",
    whoIsItFor: [
      "New businesses and startups launching without an established visual identity.",
      "Companies with outdated, low-resolution logos that look fuzzy and unprofessional.",
      "Brands wanting consistent presentation across web, mobile, social, and print.",
    ],
    problemsSolved: [
      {
        problem: "Inconsistent colors and mismatched fonts across the website, presentations, and social media.",
        solution: "A unified brand book defining primary and secondary palettes, font pairings, and application rules.",
      },
      {
        problem: "Logos designed as flat JPEGs that cannot be scaled for large signs or dark interfaces.",
        solution: "Vector-first master assets (SVG, EPS, PDF, PNG) with responsive horizontal, stacked, and icon mark variants.",
      },
      {
        problem: "Generic clip-art logos that blend in with every competitor.",
        solution: "Concept-driven, memorable brand marks designed specifically around your industry and values.",
      },
    ],
    whatWeProvide: [
      "Primary brand logo mark and wordmark design.",
      "Logo responsive variations (horizontal lockup, stacked, sub-mark, app icon, favicon).",
      "Curated color palette with primary, surface, background, and accent hex codes.",
      "Typography system with heading, body, and technical mono font pairings.",
      "Brand style guide PDF outlining correct usage, spacing, and anti-patterns.",
    ],
    deliverables: [
      "Vector master files (.AI, .EPS, .SVG, .PDF)",
      "High-resolution transparent PNG and JPEG exports",
      "Social media profile assets (avatar circles, banners)",
      "Comprehensive Brand Style Guide PDF document",
      "Digital stationery kit (business card template & letterhead header)",
    ],
    technologies: [
      { name: "Adobe Illustrator", category: "Vector Design" },
      { name: "Figma", category: "Digital Tokens" },
      { name: "Vector SVG", category: "Standard" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "Discovery & Moodboarding",
        description: "We analyze your industry positioning, target demographic, and visual aspirations to establish a clear aesthetic direction.",
      },
      {
        step: "02",
        title: "Concept Exploration",
        description: "We present 2 to 3 distinct visual identity directions showing how each logo lives in real contexts (web, business cards, signage).",
      },
      {
        step: "03",
        title: "Refinement & Polish",
        description: "We take your chosen concept, fine-tune proportions, kerning, color harmony, and finalize responsive variants.",
      },
      {
        step: "04",
        title: "Asset Package & Style Guide",
        description: "We package all production vector formats and generate the brand guidelines documentation for your team.",
      },
    ],
    relatedServices: [
      { slug: "business-collateral", title: "Business Collateral", pillar: "BRAND" },
      { slug: "web-development", title: "Web Development", pillar: "BUILD" },
      { slug: "social-media-management", title: "Social Media", pillar: "MANAGE" },
    ],
    faqs: [
      {
        question: "What files will we receive upon completion?",
        answer: "You receive industry-standard vector source files (.AI, .EPS, .SVG, .PDF) which scale infinitely without loss of quality, plus high-resolution transparent PNGs and JPEGs for light and dark backgrounds.",
      },
      {
        question: "Can we trademark the logo designed by PG Labs?",
        answer: "Yes. Every logo we create is 100% custom and original. Upon full payment, you own complete copyright ownership allowing trademark registration.",
      },
      {
        question: "How many logo concepts do you provide?",
        answer: "We provide 2 to 3 unique, thoughtfully developed creative directions, each presented in practical mockups so you can see how the identity works in the real world.",
      },
    ],
    startingPrice: "₹8,000+",
    ctaText: "Start Brand Identity Project →",
    ctaSubtext: "Give your business an authentic, enduring identity.",
  },

  // ── 10. Business Collateral ───────────────────────────────────────
  {
    slug: "business-collateral",
    pillar: "BRAND",
    pillarLabel: "Identity & Creative",
    number: "10",
    title: "Business Collateral",
    navTitle: "Business Collateral",
    shortDescription: "Turn your brand into professional brochures, company profiles, and presentation materials.",
    seoTitle: "Brochure Design & Business Card Design Services | PG Labs",
    metaDescription: "Turn your brand into professional business materials. PG Labs designs A4 brochures, company profiles, business cards, pitch presentations, and marketing PDFs.",
    keywords: [
      "Brochure Design",
      "Business Card Design",
      "Marketing Collateral Design",
      "Company Profile Design",
      "Corporate Deck Design",
    ],
    h1: "Turn Your Brand Into Professional Business Materials.",
    eyebrow: "PRINT & DIGITAL MARKETING MATERIALS",
    intro: "Whether presenting to high-value enterprise clients, attending an industry trade show, or emailing an executive proposal, the quality of your business collateral reflects the quality of your work. We design clean, editorial marketing materials that make your business look established, credible, and impressive.",
    whoIsItFor: [
      "B2B companies pitching enterprise clients who require an authoritative PDF company profile.",
      "Businesses attending trade expos, conferences, or customer meetings needing print brochures.",
      "Founders pitching investors who need clean, modern pitch deck presentations.",
    ],
    problemsSolved: [
      {
        problem: "Cluttered, text-heavy PDFs that look like outdated corporate Word documents.",
        solution: "Editorial layout design with generous whitespace, clear typographic hierarchy, and visual data callouts.",
      },
      {
        problem: "Print materials returning blurry or with cropped edges due to incorrect color profiles.",
        solution: "Professional prepress print preparation with CMYK color profiles, bleeds, and vector typography.",
      },
      {
        problem: "Marketing materials that don't match the company's modern website.",
        solution: "Seamless extension of your digital brand tokens into physical and PDF formats.",
      },
    ],
    whatWeProvide: [
      "A4 bi-fold and tri-fold corporate brochure design.",
      "Executive company profile decks and capability statements (PDF).",
      "Luxury business card design (spot UV, foil, matte finish specifications).",
      "Sales presentation decks (Google Slides / PowerPoint templates).",
      "Digital catalogs, menus, and marketing one-pagers.",
    ],
    deliverables: [
      "Print-ready high-resolution PDF files with bleed and crop marks",
      "Interactive digital PDF files with clickable website and email links",
      "Editable presentation deck templates",
      "Vector source files (.AI / .INDD / Figma)",
    ],
    technologies: [
      { name: "Adobe InDesign", category: "Editorial" },
      { name: "Adobe Illustrator", category: "Vector Prep" },
      { name: "Figma", category: "Digital Collateral" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "Content Structure & Outline",
        description: "We review your text content, product details, and required imagery to organize a clear reading hierarchy.",
      },
      {
        step: "02",
        title: "Grid & Typography Layout",
        description: "We design a clean multi-column grid, apply brand fonts, and create visual callouts for key metrics.",
      },
      {
        step: "03",
        title: "Review & Revisions",
        description: "We refine layouts based on your feedback, ensuring messaging is punchy and visual flow is seamless.",
      },
      {
        step: "04",
        title: "Print & Digital Prepress Delivery",
        description: "We generate both ultra-crisp print-ready CMYK files with bleed marks and optimized RGB digital PDFs for email sharing.",
      },
    ],
    relatedServices: [
      { slug: "branding", title: "Brand Identity", pillar: "BRAND" },
      { slug: "web-development", title: "Web Development", pillar: "BUILD" },
      { slug: "social-media-management", title: "Social Media", pillar: "MANAGE" },
    ],
    faqs: [
      {
        question: "Do you handle the actual physical printing?",
        answer: "We deliver exact, certified print-ready files (CMYK, 300 DPI, crop marks, and bleed) tailored for your commercial printer, and we can advise on paper stock and finish recommendations.",
      },
      {
        question: "Can we get digital PDFs with clickable links?",
        answer: "Yes! In addition to print files, we generate lightweight, optimized digital PDFs where emails, phone numbers, and website links are fully clickable.",
      },
      {
        question: "Do you write the copy or do we need to supply it?",
        answer: "We can work with your existing draft copy and edit it for clarity and punch, or we can assist in structuring the copywriting from scratch.",
      },
    ],
    startingPrice: "₹6,000+",
    ctaText: "Design Business Collateral →",
    ctaSubtext: "Make every client touchpoint look professional and credible.",
  },

  // ── 11. Business Automation ───────────────────────────────────────
  {
    slug: "automation",
    pillar: "AUTOMATE",
    pillarLabel: "Workflows & Practical AI",
    number: "11",
    title: "Business Automation",
    navTitle: "Business Automation",
    shortDescription: "Practical workflow automation connecting your forms, CRMs, WhatsApp notifications, and tools.",
    seoTitle: "Business Automation Services & Workflow Integrations | PG Labs",
    metaDescription: "Automate the work that shouldn't be manual. Practical workflow automation: lead notifications, form-to-CRM syncing, WhatsApp alerts, n8n workflows, and API connections.",
    keywords: [
      "Business Automation Services",
      "Workflow Automation",
      "AI Automation Services",
      "Business Process Automation",
      "n8n Automation Agency",
      "WhatsApp Lead Automation",
    ],
    h1: "Automate the Work That Shouldn't Be Manual.",
    eyebrow: "WORKFLOWS, APIS & DATA PIPELINES",
    intro: "Small inefficiencies compound into hundreds of wasted hours each month. If your team is manually copying customer form inquiries into spreadsheets, hand-typing WhatsApp alerts, or re-entering data between tools, that is friction holding back your growth. We build practical, reliable automations that quietly do the heavy lifting in the background.",
    whoIsItFor: [
      "Businesses losing leads because nobody followed up within the critical first 15 minutes.",
      "Operations teams spending hours weekly copying numbers between software tools.",
      "Companies wanting instant WhatsApp and email notifications when a high-value action occurs.",
    ],
    problemsSolved: [
      {
        problem: "Inbound website leads sitting unread in email inboxes for hours before anyone notices.",
        solution: "Instant automated routing: website submit → instant WhatsApp alert to sales rep + instant CRM record creation.",
      },
      {
        problem: "Customer data entered in one tool getting forgotten in another tool.",
        solution: "Bi-directional webhook syncing connecting your website, CRM, invoicing, and Google Sheets.",
      },
      {
        problem: "Paying high recurring monthly fees for brittle Zapier setups that break silently.",
        solution: "Self-hosted, cost-effective n8n or custom serverless webhooks with failure retries and alert notifications.",
      },
    ],
    whatWeProvide: [
      "Trigger → Process → Action workflow mapping and architecture.",
      "Lead generation automation (Form → CRM → WhatsApp → Email alert).",
      "WhatsApp Business API notifications for order confirmations and team alerts.",
      "Spreadsheet and database automated synchronization.",
      "n8n and custom webhook integration with error handling and fallback alerts.",
    ],
    deliverables: [
      "Documented workflow pipeline diagram",
      "Configured automation workflows (n8n, Make, or custom Node.js webhooks)",
      "WhatsApp & Email notification templates",
      "CRM & Spreadsheet bidirectional sync connections",
      "Failure alerting system that warns your team if an external API fails",
      "System testing and operational handover walkthrough",
    ],
    technologies: [
      { name: "n8n", category: "Workflow Engine" },
      { name: "WhatsApp Cloud API", category: "Messaging" },
      { name: "REST Webhooks", category: "Connectivity" },
      { name: "Node.js", category: "Custom Logic" },
      { name: "Google Sheets / Airtable", category: "Datastores" },
      { name: "CRMs (HubSpot, Zoho)", category: "Sales" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "Bottleneck Identification",
        description: "We audit your repetitive daily tasks: what data is being copied manually, where are leads stalling, and what tools need connecting?",
      },
      {
        step: "02",
        title: "Workflow Blueprint (Trigger → Process → Action)",
        description: "We map the exact path each data point takes: what event triggers the action, how it transforms, and where it lands.",
      },
      {
        step: "03",
        title: "Integration & Edge Case Testing",
        description: "We connect the APIs, configure authentication, and test edge cases (missing phone numbers, special characters, server downtime).",
      },
      {
        step: "04",
        title: "Deployment & Monitoring Alerts",
        description: "We switch the workflows live and configure automatic failure alerts so you never wonder if a webhook failed silently.",
      },
    ],
    disclaimer:
      "We focus on practical, dependable automation that solves immediate operational friction. We avoid brittle, over-engineered gimmicks that break the moment a third-party tool changes a button.",
    relatedServices: [
      { slug: "custom-software", title: "Custom Software", pillar: "BUILD" },
      { slug: "backend-api-development", title: "Backend & API Development", pillar: "BUILD" },
      { slug: "ai-solutions", title: "AI Solutions", pillar: "AUTOMATE" },
    ],
    faqs: [
      {
        question: "Can we get WhatsApp notifications when someone fills our website form?",
        answer: "Yes! We can configure instant WhatsApp messages sent directly to your phone or your sales team with the customer's name, phone, project type, and message the moment they click Submit.",
      },
      {
        question: "Do you use Zapier or self-hosted tools?",
        answer: "We support both. For simple tasks, tools like Make or Zapier work well. For complex, high-volume, or cost-sensitive workflows, we deploy self-hosted n8n or custom Node.js serverless functions with zero recurring task fees.",
      },
      {
        question: "What happens if a tool goes offline or an API fails?",
        answer: "We engineer automations with automatic retry policies and error hooks that immediately notify our team or your admin if an external provider's service experiences downtime.",
      },
    ],
    startingPrice: "₹12,000+",
    ctaText: "Automate Your Workflows →",
    ctaSubtext: "Stop wasting hours on manual tasks that software does better.",
  },

  // ── 12. Backend & API Development ─────────────────────────────────
  {
    slug: "backend-api-development",
    pillar: "BUILD",
    pillarLabel: "Digital Products & Technology",
    number: "12",
    title: "Backend & API Development",
    navTitle: "Backend & APIs",
    shortDescription: "Secure, scalable backend systems, database architectures, and RESTful APIs powering modern applications.",
    seoTitle: "Backend Development Services & Custom API Development | PG Labs",
    metaDescription: "The systems behind the interface. PG Labs builds secure REST APIs, scalable database architectures, authentication systems, and cloud infrastructure using Node.js, Express, and Python.",
    keywords: [
      "Backend Development Services",
      "API Development",
      "Custom API Development",
      "Node.js Backend Agency",
      "FastAPI Development Services",
      "Database Architecture Services",
    ],
    h1: "The Systems Behind the Interface.",
    eyebrow: "API ARCHITECTURE & DATABASE SYSTEMS",
    intro: "A sleek frontend is only as reliable as the backend engines driving it. We engineer robust, secure server architectures, high-throughput REST APIs, and scalable database schemas that process data with low latency, rock-solid security, and zero downtime.",
    whoIsItFor: [
      "Frontend teams needing a reliable, well-documented backend to power their mobile or web application.",
      "Companies modernizing legacy monolithic servers into modular microservices or clean serverless functions.",
      "Businesses needing custom third-party integrations, webhook processors, or secure data pipelines.",
    ],
    problemsSolved: [
      {
        problem: "Unoptimized database queries slowing down application response times to multiple seconds.",
        solution: "Indexed, normalized database design (PostgreSQL / MongoDB) with query optimization and caching layers.",
      },
      {
        problem: "Insecure endpoints vulnerable to data leaks, unauthorized access, and rate abuse.",
        solution: "JWT / OAuth2 authentication, role-based authorization, rate limiting, and strict input sanitization.",
      },
      {
        problem: "Poorly documented APIs that make frontend integration frustrating and error-prone.",
        solution: "Strict TypeScript types, automated OpenAPI / Swagger documentation, and predictable JSON response structures.",
      },
    ],
    whatWeProvide: [
      "Custom RESTful API engineering with clean separation of controllers, services, and models.",
      "Authentication and authorization systems (JWT, session tokens, OAuth, role permissions).",
      "Relational and document database modeling (PostgreSQL, MongoDB, Redis).",
      "Third-party API integrations (Payment gateways, CRMs, Cloudinary, AWS S3).",
      "Server deployment, Docker containerization, and automated environment configuration.",
    ],
    deliverables: [
      "Complete backend codebase with TypeScript / Python type safety",
      "Comprehensive OpenAPI / Swagger interactive API documentation",
      "Database migration scripts and seed datasets",
      "Automated unit and integration test suites",
      "Dockerized container setup with CI/CD deployment pipeline",
      "Logging and health-check monitoring endpoints",
    ],
    technologies: [
      { name: "Node.js / Express", category: "Runtime" },
      { name: "Python / FastAPI", category: "High-Perf API" },
      { name: "TypeScript", category: "Type System" },
      { name: "PostgreSQL", category: "Relational DB" },
      { name: "MongoDB / Mongoose", category: "Document DB" },
      { name: "Docker", category: "Infrastructure" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "Data Modeling & Contract Definition",
        description: "We map out database entity relationships, query patterns, and define strict API request/response contracts.",
      },
      {
        step: "02",
        title: "Secure Business Logic Implementation",
        description: "We engineer modular controllers and services, enforcing input validation, rate limits, and encryption.",
      },
      {
        step: "03",
        title: "Database Indexing & Performance Tuning",
        description: "We audit slow queries, configure connection pooling, and establish Redis caching where appropriate.",
      },
      {
        step: "04",
        title: "Testing, Containerization & Cloud Deploy",
        description: "We run integration test suites, bundle Docker containers, and deploy to production cloud infrastructure.",
      },
    ],
    relatedServices: [
      { slug: "custom-software", title: "Custom Software", pillar: "BUILD" },
      { slug: "web-development", title: "Web Development", pillar: "BUILD" },
      { slug: "automation", title: "Business Automation", pillar: "AUTOMATE" },
    ],
    faqs: [
      {
        question: "Do you use Node.js or Python for backend development?",
        answer: "We choose the best tool for your workload: Node.js (Express / Nest) is ideal for I/O-heavy real-time applications and JavaScript full-stack parity; Python (FastAPI) is optimal for high-performance data processing and AI/ML pipelines.",
      },
      {
        question: "How do you protect endpoints against spam or DDoS?",
        answer: "We implement Helmet security headers, IP-based rate limiting middleware, CORS strict whitelisting, payload size limits, and cryptographic input sanitization.",
      },
      {
        question: "Do you provide API documentation for frontend teams?",
        answer: "Always. We provide interactive OpenAPI/Swagger documentation with request samples, query parameters, error response formats, and status codes.",
      },
    ],
    startingPrice: "₹25,000+",
    ctaText: "Engineer Your Backend Systems →",
    ctaSubtext: "Reliable, secure APIs built for scalability.",
  },

  // ── 13. AI & Machine Learning ─────────────────────────────────────
  {
    slug: "ai-solutions",
    pillar: "AUTOMATE",
    pillarLabel: "Workflows & Practical AI",
    number: "13",
    title: "AI & Machine Learning",
    navTitle: "AI & ML",
    shortDescription: "Practical AI for real business problems: computer vision, data extraction, and custom LLM workflows.",
    seoTitle: "AI Development Services & Machine Learning Solutions | PG Labs",
    metaDescription: "Practical AI for real business problems. PG Labs deploys computer vision, document extraction, custom LLM integrations, and intelligent automation built for business utility.",
    keywords: [
      "AI Development Services",
      "AI Solutions",
      "Machine Learning Development",
      "Computer Vision Agency",
      "Custom LLM Integration",
      "Applied AI Solutions India",
    ],
    h1: "Practical AI for Real Business Problems.",
    eyebrow: "APPLIED MACHINE LEARNING & COMPUTER VISION",
    intro: "We do not chase AI hype, nor do we build generic chatbot wrappers that hallucinate. We apply machine learning and computer vision to solved business bottlenecks: automated part identification, document data extraction, optical character recognition (OCR), and intelligent workflow decision-making.",
    whoIsItFor: [
      "Companies with visual inspection or physical inventory identification bottlenecks.",
      "Businesses processing hundreds of physical invoices, bills, or PDFs daily that need automated extraction.",
      "Products that need smart recommendation systems or natural language classification.",
    ],
    problemsSolved: [
      {
        problem: "Warehouse workers taking minutes to identify obscure mechanical parts from thousands of SKUs.",
        solution: "Custom computer vision model (YOLO) trained on specific product catalogs to identify parts from phone photos in under 500ms.",
      },
      {
        problem: "Staff manually keying invoice numbers, dates, and amounts from paper documents.",
        solution: "Automated OCR and structured extraction pipelines converting document scans directly into clean JSON database records.",
      },
      {
        problem: "Generic chat interfaces that give incorrect answers without business context.",
        solution: "Grounded semantic retrieval systems that query verified company documentation with strict citation boundaries.",
      },
    ],
    whatWeProvide: [
      "Computer vision model training and inference deployment (object detection, classification).",
      "Automated document processing and optical character recognition (OCR).",
      "Custom LLM API integrations (OpenAI, Gemini, Anthropic) with structured output validation.",
      "Data pipeline preprocessing, cleaning, and model evaluation.",
      "Low-latency cloud inference deployment with FastAPI backends.",
    ],
    deliverables: [
      "Trained model weights or fine-tuned inference endpoints",
      "FastAPI inference microservice with low-latency response times",
      "Web interface or mobile scanning camera integration",
      "Model evaluation benchmarks (precision, recall, mAP metrics)",
      "Continuous dataset retraining pipeline documentation",
    ],
    technologies: [
      { name: "Python", category: "Language" },
      { name: "PyTorch / YOLO", category: "Computer Vision" },
      { name: "FastAPI", category: "Inference API" },
      { name: "OpenCV", category: "Image Processing" },
      { name: "Gemini / OpenAI API", category: "Language Models" },
      { name: "Docker", category: "Containerization" },
    ],
    serviceProcess: [
      {
        step: "01",
        title: "Feasibility Assessment & Data Audit",
        description: "We evaluate whether your problem is genuinely suited for machine learning, reviewing data availability, sample diversity, and accuracy thresholds.",
      },
      {
        step: "02",
        title: "Dataset Preparation & Model Training",
        description: "We clean, augment, and annotate datasets, training specialized architectures (such as YOLO for detection) or fine-tuning extraction pipelines.",
      },
      {
        step: "03",
        title: "Inference Optimization & API Packaging",
        description: "We optimize model weights for fast CPU or GPU inference and package them inside high-throughput FastAPI microservices.",
      },
      {
        step: "04",
        title: "Application Integration & Live Benchmarking",
        description: "We connect the inference endpoint to your web frontend or mobile app and monitor real-world accuracy under diverse conditions.",
      },
    ],
    disclaimer:
      "We build practical AI systems that deliver verifiable business utility. We do not claim to operate an academic AI research lab, nor do we oversell artificial intelligence where simple algorithmic logic or databases do the job better.",
    relatedCaseStudies: [
      {
        slug: "part-track",
        title: "PartTrack (Gaba Traders Inventory)",
        category: "AI / Business Software",
        summary: "Custom YOLO computer vision model identifying truck spare parts directly from warehouse phone camera photos.",
      },
    ],
    relatedServices: [
      { slug: "custom-software", title: "Custom Software", pillar: "BUILD" },
      { slug: "automation", title: "Business Automation", pillar: "AUTOMATE" },
      { slug: "backend-api-development", title: "Backend & API Development", pillar: "BUILD" },
    ],
    faqs: [
      {
        question: "How much data is required to train a computer vision model?",
        answer: "With modern transfer learning, we can achieve high accuracy with a few hundred well-annotated photos per class rather than tens of thousands, depending on object distinctiveness.",
      },
      {
        question: "Can the AI run on standard servers without expensive GPUs?",
        answer: "Yes, for many inference workloads, we optimize models using ONNX or quantized weights so they run quickly and cost-effectively on standard CPU cloud instances.",
      },
      {
        question: "What is your approach to AI hallucinations?",
        answer: "We avoid open-ended ungrounded chat interfaces. We use AI for deterministic tasks: classification, object detection, and schema-constrained data extraction with rigorous validation schemas.",
      },
    ],
    startingPrice: "₹40,000+",
    ctaText: "Discuss Your AI Project →",
    ctaSubtext: "Practical machine learning that solves genuine business friction.",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}

export function getServicesByPillar(pillar: ServicePillar): ServiceData[] {
  return SERVICES_DATA.filter((s) => s.pillar === pillar);
}

export const ALL_SERVICES = SERVICES_DATA;
