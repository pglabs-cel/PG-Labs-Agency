# PG LABS — DESIGN SYSTEM, TYPOGRAPHY & AI CONTENT STYLE GUIDE
> **Master Reference Document for Design, Frontend Development, and AI Content Generation**  
> *Version: 1.0.0 | Single Source of Truth for PG Labs Web Presence*

---

## TABLE OF CONTENTS
1. [Brand Core & Positioning](#1-brand-core--positioning)
2. [Tone of Voice & Editorial Guidelines](#2-tone-of-voice--editorial-guidelines)
3. [Complete Color Palette & Token System](#3-complete-color-palette--token-system)
4. [Typography System & Hierarchy](#4-typography-system--hierarchy)
5. [Component Design Standards & Tokens](#5-component-design-standards--tokens)
6. [Visual Restraint & Anti-Patterns ("What NOT to do")](#6-visual-restraint--anti-patterns-what-not-to-do)
7. [Master AI Prompts for Content Generation](#7-master-ai-prompts-for-content-generation)
8. [Copywriting Templates by Component / Section](#8-copywriting-templates-by-component--section)
9. [Tailwind CSS Quick Reference Cheat-Sheet](#9-tailwind-css-quick-reference-cheat-sheet)
10. [Pre-Publishing QA Checklist](#10-summary-checklist-before-publishing-or-committing)

---

## 1. BRAND CORE & POSITIONING

### What PG Labs Is:
- **A Premium Digital Product Studio & Technical Software Agency.**
- We build high-performance web applications, scalable SaaS platforms, practical AI/ML solutions, and bespoke business software.
- We focus on solving genuine business bottlenecks through pragmatic engineering, clean architecture, and restrained, high-craft interfaces.

### What PG Labs Is NOT:
- **NOT** a generic freelancer or student portfolio.
- **NOT** an outdated corporate IT outsourcing firm with bureaucratic jargon.
- **NOT** a template-reliant WordPress/Wix agency.
- **NOT** a flashy "AI hype" project built on gimmicks, neon gradients, or hollow promises.

### Core Brand Pillars:
1. **Business-First Engineering**: We begin with the real-world operational problem, not trend chasing.
2. **Technical Mastery & Modern Stack**: Next.js, TypeScript, Node.js, Python, Tailwind, Docker, MongoDB/PostgreSQL.
3. **Restrained Craft**: Luxury and credibility come from typography, generous whitespace, and responsive precision—not flashy visual clutter.
4. **Authenticity & Integrity**: Transparent communication, honest claims, zero fabricated testimonials, zero fake metrics.

---

## 2. TONE OF VOICE & EDITORIAL GUIDELINES

When writing any copy for PG Labs (whether by human or generated via LLM), adhere strictly to these voice characteristics:

### Voice Attributes
| Trait | How it Sounds | What it Avoids |
|---|---|---|
| **Confident** | Direct, definitive, clear statements about what we build and why. | Hesitant language ("We try to", "We believe we can maybe..."). |
| **Technical** | Precise terminology (APIs, latency, state machines, computer vision, data architecture). | Buzzword soup ("revolutionary disruptive paradigm-shifting magic"). |
| **Pragmatic** | Grounded in business ROI, workflow automation, and maintainability. | Overpromising ("10x your sales overnight with AI"). |
| **Minimalist** | Short, punchy sentences. High signal-to-noise ratio. | Long, rambling paragraphs or filler fluff. |
| **Human & Direct** | Speaks builder-to-builder, founder-to-founder. | Stiff corporate bureaucracy or cringe marketing slang. |

### Prohibited Words & Phrases (Blacklist)
Do **NOT** use these generic AI clichés:
- ❌ *"In today's fast-paced digital landscape / fast-paced world"*
- ❌ *"Unlock the power of / Unleash the potential"*
- ❌ *"Revolutionize / Game-changer / Disruptive"*
- ❌ *"Cutting-edge / Next-gen / State-of-the-art"* (use specific technical names instead)
- ❌ *"Seamlessly integrate / Seamless experience"*
- ❌ *"Delve into / Dive deep into"*
- ❌ *"Synergy / Holistic / Paradigm"*
- ❌ *"Look no further / We've got you covered"*
- ❌ Fabricated client counts (e.g., "500+ happy clients"), fake review stars, or fake revenue figures.

### Preferred Phrasing Examples
- ✅ *"We build digital products that actually work."*
- ✅ *"Software designed around the way your business actually operates."*
- ✅ *"Practical AI solutions that automate workflows, understand data, and deliver measurable utility."*
- ✅ *"Small team. Direct communication. No unnecessary layers."*

---

## 3. COMPLETE COLOR PALETTE & TOKEN SYSTEM

PG Labs uses a strictly **dark-first palette** with high visual restraint. Violet is reserved as an intentional focal accent.

### Color Tokens & Specifications

```
+---------------------------------------------------------------------------------+
| BACKGROUND LAYERS (Dark-First)                                                  |
|  • Deep Background:       #09090B  (Tailwind: bg-background)                    |
|  • Secondary Background:  #111113  (Tailwind: bg-background-secondary)          |
|  • Elevated Card Surface: #18181B  (Tailwind: bg-background-surface)            |
+---------------------------------------------------------------------------------+
| FOREGROUND / TEXT                                                               |
|  • Primary Text:          #FAFAFA  (Tailwind: text-foreground)                  |
|  • Secondary Text:        #A1A1AA  (Tailwind: text-foreground-secondary)        |
|  • Muted / Tertiary:      #71717A  (Tailwind: text-foreground-muted)            |
+---------------------------------------------------------------------------------+
| ACCENT / INTERACTION                                                            |
|  • Electric Violet:       #8B5CF6  (Tailwind: bg-accent / text-accent)          |
|  • Accent Hover:          #A78BFA  (Tailwind: hover:bg-accent-hover)            |
|  • Glow Accent:           rgba(139, 92, 246, 0.15)                              |
+---------------------------------------------------------------------------------+
| BORDERS & DIVIDERS                                                              |
|  • Default Border:        #27272A  (Tailwind: border-border)                    |
|  • Muted Border:          #18181B  (Tailwind: border-border-muted)              |
|  • Accent Border:         rgba(139, 92, 246, 0.3)                               |
+---------------------------------------------------------------------------------+
```

### The 80 / 15 / 5 Color Budget Rule
- **80% Dominant Base**: Deep blacks and dark zinc (`#09090B`, `#111113`, `#18181B`). Provides calm focus and premium editorial depth.
- **15% Neutral Structural**: Crisp whites and cool grays (`#FAFAFA`, `#A1A1AA`, `#27272A`) for typography, dividers, and structural outlines.
- **5% Focal Accent**: Electric Violet (`#8B5CF6`). Used **strictly** for:
  - Primary CTA buttons
  - Active navigation indicators or small pill badges
  - Delicate border highlights or subtle ambient glow behind key elements
  - *Never paint whole cards, large banners, or background walls violet.*

---

## 4. TYPOGRAPHY SYSTEM & HIERARCHY

PG Labs employs two distinct type families to balance modern editorial elegance with technical precision.

### Font Families
1. **Primary Interface & Body**: `Geist Sans` (Fallback: `Inter`, `system-ui`, `sans-serif`)
2. **Technical Eyebrows & Code Labels**: `Geist Mono` (Fallback: `JetBrains Mono`, `monospace`)

### Typographic Scale & Usage Matrix

| Level | Desktop Size / Leading | Mobile Size / Leading | Weight | Font Family | Tracking | Purpose & Example |
|---|---|---|---|---|---|---|
| **Hero Display** | `72px–96px` / `1.05` | `42px–52px` / `1.1` | Bold (700) | Geist Sans | `-0.03em` | Main homepage hero headline (*"We Build Digital Products That Actually Work."*) |
| **Section H1 / H2** | `48px–64px` / `1.1` | `32px–40px` / `1.15` | Semibold (600) | Geist Sans | `-0.025em` | Major section titles (*"Technology built around your business."*) |
| **Card Heading (H3)**| `22px–28px` / `1.2` | `20px–24px` / `1.25` | Semibold (600) | Geist Sans | `-0.015em` | Service names, case study titles (*"AI & Machine Learning"*) |
| **Subheading / Lead**| `18px–20px` / `1.5` | `16px–18px` / `1.5` | Regular (400) | Geist Sans | Normal | Hero intro paragraphs, section summaries |
| **Body Text** | `16px` / `1.6` | `15px–16px` / `1.6` | Regular (400) | Geist Sans | Normal | Paragraph copy, feature descriptions |
| **Eyebrows / Badges**| `12px–13px` / `1` | `11px–12px` / `1` | Medium (500) | Geist Mono | `+0.05em` | Uppercase section tags (*"SELECTED WORK"*, *"OUR PROCESS"*) |
| **Caption / Meta** | `12px–14px` / `1.4` | `12px` / `1.4` | Regular (400) | Geist Mono / Sans | Normal | Tech tags (`FastAPI`, `MongoDB`), timestamps, footnotes |

### Typographic Rules
- **Line Length (Measure)**: Max width for prose paragraphs must stay between `55ch` and `70ch` (`max-w-xl` to `max-w-2xl`).
- **Heading Line Breaks**: Use `<span className="block">` or proper word balancing to prevent lonely orphan words.
- **Eyebrow Prependers**: Every major section must begin with a mono-spaced uppercase eyebrow (e.g., `// 01. SERVICES` or `WHAT WE DO`).

---

## 5. COMPONENT DESIGN STANDARDS & TOKENS

### 1. Cards (Services, Projects, Process)
- **Background**: `#18181B` (`bg-background-surface`)
- **Border**: `1px solid #27272A` (`border border-border`)
- **Border Radius**: `12px` to `16px` (`rounded-xl` or `rounded-2xl`)
- **Hover Interaction (Desktop)**:
  - Border transitions to `border-zinc-700` or subtle `rgba(139, 92, 246, 0.4)`
  - Card does **NOT** jump or aggressively tilt.
  - Subtle shadow elevation: `box-shadow: 0 20px 50px rgba(0,0,0,0.6)`
  - Internal arrow icon shifts `translateX(4px)` with smooth transition (`transition-transform duration-300`).

### 2. Buttons & Calls to Action
- **Primary Button**:
  - `bg-accent text-white font-medium px-6 py-3 rounded-lg shadow-sm hover:bg-accent-hover transition-all duration-200`
  - Includes right arrow icon: `Start a Project →`
  - Minimum touch target: `44px` height on all devices.
- **Secondary / Outlined Button**:
  - `border border-border bg-transparent text-foreground hover:bg-background-surface hover:border-zinc-600 px-6 py-3 rounded-lg transition-all duration-200`
  - Example: `View Our Work ↓` or `Talk to Us`
- **Ghost Button / Link**:
  - `text-foreground-secondary hover:text-foreground text-sm font-medium inline-flex items-center gap-1.5 transition-colors`

### 3. Tech Stack & Category Pills (Badges)
- **Style**:
  - `inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-border text-foreground-secondary`
  - When active/selected: `border-accent text-white bg-accent/10`

### 4. Spacing & Container Scale
- **Max Container Width**: `1280px` (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`)
- **Section Vertical Padding**:
  - Desktop: `py-24` or `py-32` (`96px` – `128px`)
  - Mobile: `py-16` or `py-20` (`64px` – `80px`)
- **Card Grid Gap**: `gap-6` to `gap-8` (`24px` – `32px`)

---

## 6. VISUAL RESTRAINT & ANTI-PATTERNS ("WHAT NOT TO DO")

To preserve the expensive, engineering-grade aesthetic, avoid these common web design traps:

1. **No Rainbow Gradients**: Do not use multi-color gradient text (pink-to-yellow-to-cyan). Headings should be crisp solid `#FAFAFA`, or at most a subtle, tasteful white-to-zinc gradient (`from-white via-zinc-200 to-zinc-400`).
2. **No Neon Outlines**: Avoid loud, thick neon glowing borders that look like a gaming portal.
3. **No Heavy Glassmorphism**: Do not abuse `backdrop-blur-xl` with thick white translucent borders. Subtle blur is reserved for the sticky navbar and delicate floating tags only.
4. **No Random 3D Blobs / Fluff**: Avoid generic AI floating spheres, distorted chrome shapes, or meaningless decorative clutter. Every visual element must look like software, architecture, code, or data.
5. **No Mobile Overflow**: Never let code snippets, cards, or tables introduce horizontal body scroll on small screens (`w-full overflow-hidden`).

---

## 7. MASTER AI PROMPTS FOR CONTENT GENERATION

When you ask ChatGPT, Claude, Gemini, or any AI assistant to generate copy, pages, or components for PG Labs, **copy and paste this Master System Prompt first**:

```markdown
You are the Lead Technical Copywriter and Product Designer for PG Labs (https://pglabs.in).

ABOUT PG LABS:
PG Labs is a premier digital product studio and technical software agency. We engineer custom web applications, high-performance SaaS platforms, production-grade AI/ML systems, and bespoke business software.

BRAND VOICE & EDITORIAL RULES:
1. Tone: Technical, confident, pragmatic, concise, and builder-to-builder.
2. No Fluff or Clichés: Never use words like "revolutionary", "disruptive", "cutting-edge", "seamless", "unlock", "delve", or "game-changer".
3. No Fabrications: Do not invent fake client testimonials, fake metrics ("500% ROI"), or false claims. Focus on engineering challenges, architecture, and practical operational value.
4. Formatting: Keep paragraphs short (2-3 sentences max). Use clear hierarchical headings and bullet points.
5. Technical Grounding: Mention real-world tech stack components (Next.js, TypeScript, FastAPI, MongoDB, Docker, Python, Computer Vision, REST APIs).

AESTHETIC & THEME CONTEXT:
- Theme: Dark-first, minimalist, high contrast (#09090B background, #FAFAFA text, Electric Violet #8B5CF6 accent).
- Typography: Clean sans-serif (Geist Sans) for headers/body, monospace (Geist Mono) for technical eyebrows, tags, and metrics.

TASK:
[INSERT YOUR SPECIFIC REQUEST HERE - e.g., Write a service description for Cloud Migration, write a case study overview, write 3 hero headline variations, etc.]
```

---

## 8. COPYWRITING TEMPLATES BY COMPONENT / SECTION

Use these structured formulas whenever drafting or prompting for new sections:

### Template A: Section Header Block
```markdown
[EYEBROW] (Geist Mono, Uppercase, 12px)
// [SECTION NUMBER]. [TOPIC NAME]  (e.g., // 02. WHAT WE DO)

[HEADLINE] (Geist Sans, Bold, 48-64px desktop)
[Problem Statement or Direct Value Proposition in 4-8 words]
Example: "Technology built around your business."

[SUBHEAD / DESCRIPTION] (Geist Sans, Regular, 16-18px, text-foreground-secondary)
[1-2 sentences explaining what we do, the technical approach, and the tangible outcome. Max 35 words.]
Example: "From high-performance websites to AI-powered platforms, we design and build digital products that solve real operational bottlenecks."
```

### Template B: Service Card Block (6-Pack Grid)
```markdown
[SERVICE TITLE]: [Name of Service] (e.g., "Custom Software & Internal Tools")

[ONE-LINE SUMMARY]: [High-impact summary focusing on utility and scale. Max 20 words.]
Example: "Software designed around the exact way your business operates, eliminating spreadsheet chaos."

[KEY CAPABILITIES / FEATURES] (Bulleted list of 4-5 concrete items):
• [Capability 1] (e.g., "Custom ERP and inventory systems")
• [Capability 2] (e.g., "Internal operational dashboards")
• [Capability 3] (e.g., "Role-based access control & audits")
• [Capability 4] (e.g., "Automated reporting & data pipelines")
• [Capability 5] (e.g., "Legacy database migration")

[TECH STACK TAGS]: [3-5 realistic technologies] (e.g., React, Node.js, PostgreSQL, Docker)
```

### Template C: Case Study Card (Selected Work)
```markdown
[PROJECT NAME]: [Real Project Name] (e.g., "Gaba Traders Inventory")
[CATEGORY]: [Category] (e.g., "AI / Business Software")
[SUMMARY]: [What problem did the client have and what did PG Labs engineer to solve it? 2-3 sentences.]
Example: "AI-powered inventory management designed to identify, categorize, and track heavy truck spare parts using computer vision, reducing catalog lookup times from minutes to seconds."

[TECHNICAL STACK]:
- YOLO (Computer Vision)
- FastAPI (Backend API)
- Next.js (Admin Dashboard)
- MongoDB (Inventory Store)

[CTA]: "View Case Study →"
```

### Template D: Why PG Labs / Value Proposition Card
```markdown
[PILLAR TITLE]: [2-3 words] (e.g., "Business First")
[DESCRIPTION]: [Direct, no-nonsense explanation of our philosophy in 2 sentences.]
Example: "We start with the problem, not the technology. Every architecture decision is evaluated against your business model and operational speed."
```

---

## 9. TAILWIND CSS QUICK REFERENCE CHEAT-SHEET

For frontend developers and code-generating AIs, use these standard class strings to maintain 100% fidelity with the PG Labs design system:

### Page & Layout Containers
```html
<!-- Full page wrapper -->
<main className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-white">

<!-- Standard Section Wrapper -->
<section className="py-20 md:py-28 lg:py-32 relative border-b border-border">
  <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Content goes here -->
  </div>
</section>
```

### Typography Elements
```html
<!-- Eyebrow Tag -->
<span className="font-mono text-xs md:text-sm uppercase tracking-widest text-accent font-medium">
  // SELECTED WORK
</span>

<!-- Section Heading -->
<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-3 mb-4">
  Things we've built.
</h2>

<!-- Section Lead Subtext -->
<p className="text-base sm:text-lg text-foreground-secondary max-w-2xl leading-relaxed">
  A selection of products, platforms, and experiments built across web development, business software, and AI.
</p>
```

### Cards & Surfaces
```html
<!-- Elevated Interactive Feature Card -->
<div className="group relative rounded-xl border border-border bg-background-surface p-6 md:p-8 transition-all duration-300 hover:border-zinc-600 hover:shadow-card-elevated">
  <div className="flex items-center justify-between mb-4">
    <div className="p-2.5 rounded-lg bg-zinc-900 border border-border text-accent group-hover:scale-105 transition-transform duration-300">
      <!-- Icon -->
    </div>
    <span className="font-mono text-xs text-foreground-muted">01</span>
  </div>
  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-white transition-colors">
    Web Development
  </h3>
  <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
    High-performance web applications designed for speed, scalability, and conversion.
  </p>
  <div className="flex flex-wrap gap-2 pt-4 border-t border-border-muted">
    <span className="text-xs font-mono px-2 py-1 rounded bg-zinc-900 text-zinc-400 border border-border">Next.js</span>
    <span className="text-xs font-mono px-2 py-1 rounded bg-zinc-900 text-zinc-400 border border-border">TypeScript</span>
  </div>
</div>
```

### Action Buttons
```html
<!-- Primary CTA Button -->
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-medium text-sm hover:bg-accent-hover active:scale-[0.98] transition-all duration-200 shadow-glow-accent">
  <span>Start a Project</span>
  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
</button>

<!-- Secondary Outlined Button -->
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border bg-transparent text-foreground hover:bg-background-surface hover:border-zinc-600 text-sm font-medium transition-all duration-200">
  <span>View Our Work</span>
  <span>↓</span>
</button>
```

---

## 10. SUMMARY CHECKLIST (BEFORE PUBLISHING OR COMMITTING)

- [ ] Does the copy sound like a modern engineering studio (and NOT a corporate agency or generic freelancer)?
- [ ] Are all metrics and project descriptions honest and un-fabricated?
- [ ] Are all headings in Geist Sans with tight tracking and proper contrast?
- [ ] Are technical tags, timestamps, and eyebrows using Geist Mono?
- [ ] Is the primary accent (#8B5CF6 Electric Violet) used sparingly (<= 5% of viewport)?
- [ ] Does the layout look clean on mobile (no horizontal scrollbar, touch targets >= 44px)?
- [ ] Are Tailwind classes mapped to `bg-background`, `text-foreground`, `border-border`, and `bg-accent`?
