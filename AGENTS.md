# PG LABS — PREMIUM SOFTWARE AGENCY WEBSITE
# MASTER IMPLEMENTATION PROMPT

You are the lead product designer, senior frontend engineer, backend engineer, SEO engineer, and QA engineer responsible for building the PG Labs website described below.

The goal is to create a production-quality premium software agency website that itself demonstrates PG Labs' ability to build polished digital products.

==================================================
0. IMPORTANT — EXECUTION RULES
==================================================

Before writing code:

1. Inspect the existing repository completely enough to understand:
   - Current structure
   - Existing dependencies
   - Existing components
   - Existing configuration
   - Existing functionality
   - Existing styling
   - Existing assets
   - Existing environment variables
   - Existing routes

2. Do NOT delete, replace, or break existing functionality unless explicitly required.

3. Inspect the installed UI/UX Pro Max skill and use it throughout the project for UI/UX decisions.

4. Before implementation, create a concise implementation plan based on this specification.

5. Work phase-by-phase.

6. Complete and verify each phase before moving to the next phase.

7. Make sensible implementation decisions without repeatedly asking for confirmation.

8. If something is unspecified, choose the simplest production-quality solution that is consistent with this specification.

9. Do not fabricate:
   - Clients
   - Testimonials
   - Business results
   - Revenue
   - User numbers
   - Performance metrics
   - Case-study outcomes
   - Company size
   - Awards
   - Partnerships
   - Technologies PG Labs does not actually use

10. Do not use lorem ipsum.

11. Do not use generic filler copy.

12. Do not create fake testimonials or fake logos.

13. Use realistic PG Labs content provided in this specification.

14. If an actual project screenshot/asset is unavailable, create a clearly isolated placeholder/mockup component that can easily be replaced later. Do not pretend the placeholder is a real client asset.

15. Keep content data-driven wherever practical.

16. Keep components modular.

17. Do not create one giant page.tsx.

18. Run:
   - TypeScript checks
   - ESLint
   - Build
   - Relevant tests
   after implementation.

19. Fix errors before considering a phase complete.

20. Do not mark the project complete until the final QA checklist has been verified.

CRITICAL PRIORITY ORDER:

1. This specification
2. Existing project requirements/functionality
3. UI/UX Pro Max skill
4. General implementation conventions

The UI/UX Pro Max skill is a design/implementation aid. Do not blindly follow generic trends if they conflict with this specification.

==================================================
1. PROJECT OVERVIEW
==================================================

Build a production-quality, modern agency website for:

PG Labs

PG Labs is a technology/software development studio.

PG Labs provides:

- Web application development
- SaaS development
- AI/ML solutions
- Custom business software
- Backend/API development
- UI/UX and frontend development
- Automation and integrations

Core positioning:

PG Labs builds modern digital products, web applications, AI-powered solutions, and custom software for businesses and startups.

The website must feel like a:

- Premium technology studio
- Modern digital product studio
- Technical software agency
- Product-focused engineering company

It must NOT feel like:

- A college portfolio
- A generic freelancer website
- A template website
- A traditional corporate IT company
- An overly flashy AI startup landing page

Design goals:

- Modern
- Premium
- Minimal
- Technical
- Confident
- Highly visual
- Fast
- Responsive
- SEO-friendly
- Conversion-focused

The website itself should act as a demonstration of PG Labs' engineering and design capabilities.

==================================================
2. CORE TECHNOLOGY STACK
==================================================

FRONTEND

Use:

- Next.js
- App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

Use Next.js correctly for:

- SEO
- Performance
- Server rendering
- Static rendering
- Metadata
- Routing
- Image optimization

Prefer:

- Server Components where appropriate
- Client Components only when interactivity genuinely requires them
- Static rendering for marketing content wherever possible
- Dynamic metadata for project pages
- Semantic HTML

Do not turn the entire application into a Client Component.

BACKEND

Use:

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

BACKEND RESPONSIBILITIES

Initially:

- Contact form submissions
- Contact inquiry storage
- Project data if required dynamically
- Services data if required dynamically
- Future blog/content data
- Future admin functionality

Do NOT implement RAG or chatbot functionality now.

However, the architecture should remain clean enough that an AI service can be introduced later without rewriting the application.

==================================================
3. ARCHITECTURE
==================================================

CRITICAL:

Frontend and backend must remain separate applications.

FRONTEND:

Next.js App Router
TypeScript
Tailwind CSS

BACKEND:

Node.js
Express.js
TypeScript

DATABASE:

MongoDB
Mongoose

COMMUNICATION:

Frontend communicates with backend through REST APIs.

Do NOT create an Express server inside the Next.js application.

Recommended structure:

project-root/
├── frontend/
│
└── server/

If the existing repository already uses a different clean structure, preserve it where practical instead of unnecessarily restructuring the project.

Use environment variables for:

- MongoDB URI
- API URL
- Allowed origins
- Any future API keys

Never commit secrets.

==================================================
4. UI/UX PRO MAX
==================================================

Use the installed UI/UX Pro Max skill throughout this project.

Before implementing the visual system:

- Establish the design system.
- Use systematic typography decisions.
- Establish spacing rules.
- Establish component patterns.
- Establish responsive behavior.
- Establish interaction patterns.
- Follow accessibility principles.
- Follow modern product-studio design principles.

Prioritize:

- Strong visual hierarchy
- Typography
- Spacing
- Layout
- Composition
- Content clarity
- Responsive behavior
- Subtle interactions

Do NOT blindly introduce:

- Excessive glassmorphism
- Neon UI
- Huge gradients
- Random blobs
- Excessive rounded cards
- Excessive shadows
- Excessive animations
- Generic AI imagery
- Generic SaaS templates

The website should look expensive because of:

- Layout
- Typography
- Spacing
- Composition
- Content
- Interaction quality

Not because of visual effects.

==================================================
5. DESIGN DIRECTION
==================================================

Visual inspiration:

Premium software studios and modern SaaS/product companies.

Characteristics:

- Dark-first
- Strong typography
- Large headlines
- Generous whitespace
- Subtle borders
- Subtle gradients
- Soft glow
- Editorial project layouts
- High-quality project presentation
- Smooth motion
- Minimal glassmorphism
- Subtle grid/noise textures

Maintain visual restraint.

The website should feel:

Technical
Sophisticated
Modern
Confident
Human

==================================================
6. COLOR PALETTE
==================================================

PRIMARY

Background:
#09090B

Secondary background:
#111113

Elevated surface:
#18181B

Primary text:
#FAFAFA

Secondary text:
#A1A1AA

Muted text:
#71717A

Borders:
#27272A

ACCENT

Primary accent:

Electric Violet:
#8B5CF6

Accent hover:

#A78BFA

Use accent primarily for:

- CTA buttons
- Links
- Small highlights
- Selected states
- Important visual details

Do NOT make every element purple.

==================================================
7. TYPOGRAPHY
==================================================

Preferred:

Geist Sans for UI/body
Geist Mono for technical labels/code-style elements

If Geist cannot be used cleanly, use Inter.

Hierarchy:

HERO:

Desktop:
approximately 72–96px

Tablet:
approximately 56–72px

Mobile:
approximately 42–52px

Section headings:

Approximately 48–64px desktop.

Body:

16–18px.

Small labels:

12–14px.

Use:

- Tight line-height for large headings
- Appropriate letter spacing
- Strong contrast
- Clear hierarchy

Typography should provide most of the visual hierarchy.

==================================================
8. GLOBAL UX PRINCIPLES
==================================================

The website must be mobile-first.

Mobile must NOT be treated as a scaled-down desktop.

Explicitly test:

- 320px
- 375px
- 390px
- 414px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

Mobile requirements:

- Proper reflow
- Reduced typography
- Reduced spacing
- Stacked cards
- Thumb-friendly buttons
- No horizontal overflow
- Preserved visual hierarchy
- Lightweight animations
- Easy navigation

Minimum touch target:

44px.

==================================================
9. GLOBAL NAVBAR
==================================================

DESKTOP:

Left:

PG Labs

Navigation:

- Services
- Work
- Process
- About

Primary CTA:

Start a Project →

Behavior:

- Sticky
- Transparent initially
- Slight blur/elevation after scroll
- Thin bottom border after scroll

MOBILE:

Left:

PG Labs

Right:

Menu button

Mobile menu:

Large/full-screen or appropriately sized animated menu.

Items:

- Services
- Work
- Process
- About
- Contact

CTA:

Start a Project

Use Framer Motion.

Ensure:

- Keyboard accessibility
- Escape-to-close
- Proper focus behavior
- Body scroll locking when necessary

==================================================
10. HERO
==================================================

This is the most important section.

Eyebrow:

PG LABS — DIGITAL PRODUCT STUDIO

Headline:

We Build Digital Products That Actually Work.

Supporting text:

Modern web applications, AI-powered solutions, and custom software built around real business problems.

Primary CTA:

Start a Project →

Secondary CTA:

View Our Work ↓

VISUAL:

Create a sophisticated abstract technology visual around/behind the hero.

Possible elements:

- Abstract product interface
- Floating UI cards
- Subtle grid
- Code fragments
- Project thumbnails
- Soft accent glow

Do NOT make it generic AI art.

Hero animation sequence:

1. Eyebrow fades upward
2. Headline reveals subtly
3. Description fades upward
4. CTA buttons appear
5. Visual elements move subtly into position

Duration:

Approximately 500–800ms.

Do not create excessive loading delays.

==================================================
11. CAPABILITIES STRIP
==================================================

Immediately below hero.

Statement:

From idea to production — we build the technology behind ambitious products.

Technology/category labels:

- React
- Next.js
- Node.js
- Python
- FastAPI
- MongoDB
- PostgreSQL
- Docker
- AI/ML

Keep subtle.

Do NOT make logos huge.

==================================================
12. SERVICES
==================================================

Section label:

WHAT WE DO

Heading:

Technology built around your business.

Description:

From high-performance websites to AI-powered platforms, we design and build digital products that solve real problems.

Create six service cards.

SERVICE 01

Web Development

High-performance websites and web applications designed for speed, scalability and conversion.

Features:

- Business websites
- SaaS platforms
- E-commerce
- Admin dashboards
- Customer portals

SERVICE 02

AI & Machine Learning

Practical AI solutions that automate workflows, understand data and create new product capabilities.

Features:

- AI integrations
- Computer vision
- Image recognition
- Recommendation systems
- Intelligent automation

SERVICE 03

Custom Software

Software designed around the way your business actually operates.

Features:

- Inventory systems
- Internal tools
- Business management systems
- Workflow platforms
- Custom dashboards

SERVICE 04

UI/UX & Frontend

Clean, responsive interfaces that make complex products feel simple.

Features:

- Product interfaces
- Responsive design
- Design systems
- Interactive dashboards
- Motion design

SERVICE 05

Backend & APIs

Reliable backend systems that power secure, scalable applications.

Features:

- REST APIs
- Authentication
- Database architecture
- Integrations
- Cloud-ready infrastructure

SERVICE 06

Automation

Connect systems, remove repetitive work and build smarter business workflows.

Features:

- Workflow automation
- API integrations
- Data processing
- AI automation
- Third-party integrations

==================================================
13. SERVICE INTERACTIONS
==================================================

Desktop hover:

- Border becomes slightly brighter
- Icon moves slightly
- Arrow moves
- Very subtle background glow

Do NOT make cards jump.

Mobile:

Disable complex hover interactions.

Use tap/active states where appropriate.

==================================================
14. FEATURED WORK
==================================================

Section label:

SELECTED WORK

Heading:

Things we’ve built.

Description:

A selection of products, platforms and experiments built across web development, business software and AI.

Display 4–6 strongest projects.

Project cards should be visually large.

Structure:

- Image/mockup
- Category
- Project name
- Short description
- Technology tags
- View Case Study →

PROJECT:

Gaba Traders Inventory

Category:

AI / Business Software

Description:

AI-powered inventory management designed to help identify and manage truck spare parts faster.

Tech:

- YOLO
- FastAPI
- MongoDB
- Next.js

PROJECT:

HireMeet

Category:

SaaS / EdTech

Description:

A full-stack interview preparation platform combining coding challenges, automated evaluation, video interviews and real-time communication.

Tech:

- React
- Node.js
- MongoDB
- Docker

PROJECT:

CKB Examination Platform

Category:

Web Application

Description:

A scalable online examination platform with real-time monitoring and proctoring capabilities.

Tech:

- React
- Node.js
- MongoDB

Use actual project screenshots/mockups where available.

Never fabricate metrics.

==================================================
15. PROJECT DATA
==================================================

Projects must be data-driven.

Support:

title
slug
shortDescription
description
category
technologies[]
thumbnail
images[]
features[]
challenge
solution
outcome
year
featured

Do not hardcode project content across multiple components.

==================================================
16. PROJECT FILTERING
==================================================

/work

Filters:

- All
- Web
- SaaS
- AI
- Business Software

Filtering should animate smoothly.

Use accessible filter controls.

Do not over-animate.

==================================================
17. PROJECT CARD ANIMATION
==================================================

Viewport entry:

- Fade in
- Slight upward movement
- Image scale 0.97 → 1

Hover:

- Image approximately 1.02
- Arrow moves
- Slight border change

Keep subtle.

==================================================
18. CASE STUDY SECTION
==================================================

Heading:

Good software starts with the right problem.

Explain:

PG Labs focuses on solving business problems rather than simply building features.

Three highlights:

01 — Understand

Understand the business, users and problem.

02 — Build

Design and engineer the right solution.

03 — Improve

Measure, refine and scale.

CTA:

Explore Our Work →

Do not invent measurable outcomes.

==================================================
19. HOW WE WORK
==================================================

Section label:

OUR PROCESS

Heading:

From idea to launch.

Five steps:

01 — Discover

Understand your goals, users and business requirements.

02 — Plan

Define the product architecture, features and technical approach.

03 — Design

Create intuitive interfaces and experiences before development.

04 — Build

Develop, integrate and test the product.

05 — Launch

Deploy the product and help you improve it over time.

DESKTOP:

Horizontal process timeline.

MOBILE:

Vertical timeline.

Do NOT force horizontal scrolling on mobile.

==================================================
20. WHY PG LABS
==================================================

Section label:

WHY PG LABS

Heading:

Technology should solve problems, not create more of them.

Four points:

Business First

We start with the problem, not the technology.

Modern Stack

We use modern tools to build maintainable and scalable products.

AI When It Matters

We use AI where it creates measurable value — not simply because it’s trending.

Built for Growth

Products are designed with future users, features and scale in mind.

==================================================
21. ABOUT
==================================================

Section label:

ABOUT

Heading:

A small studio with a builder mindset.

Copy:

PG Labs is a technology studio focused on building modern web applications, AI-powered products and custom software for businesses and startups.

We combine product thinking, modern engineering and practical AI to turn ideas into working digital products.

If PG Labs is currently founder-led/small-team, position this honestly:

Small team. Direct communication. No unnecessary layers.

Do not exaggerate company size.

==================================================
22. TECHNOLOGY
==================================================

Heading:

Built with modern technology.

Clean technology grid.

FRONTEND

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

BACKEND

- Node.js
- Express
- Python
- FastAPI

DATA

- MongoDB
- PostgreSQL

INFRASTRUCTURE

- Docker
- Cloud platforms
- CI/CD

AI

- Python
- Computer Vision
- Machine Learning
- LLM APIs

Keep clean and restrained.

==================================================
23. CTA
==================================================

Large full-width section.

Heading:

Have an idea worth building?

Supporting text:

Tell us what you’re working on. We’ll help you figure out what to build, how to build it and what it could take.

Primary:

Start a Project →

Secondary:

Talk to Us

Visual:

Subtle accent gradient/glow.

No excessive animation.

==================================================
24. CONTACT
==================================================

Heading:

Let’s build something useful.

Subheading:

Have a project, idea or problem you’d like to solve? Tell us about it.

FORM:

Name
Email
Company (optional)
Project type
Budget range (optional)
Message

PROJECT TYPE:

- Website
- Web Application
- SaaS
- AI/ML
- Custom Software
- Automation
- Other

CTA:

Send Project Inquiry →

API:

POST /api/contact

Backend:

Node.js + Express

Store inquiries in MongoDB.

Validation:

- Required fields
- Valid email
- Minimum message length
- Rate limiting
- Sanitization

Frontend states:

- Idle
- Loading
- Success
- Error

Use toast notifications.

Never expose internal backend errors.

==================================================
25. CONTACT MODEL
==================================================

MongoDB document:

name
email
company
projectType
budget
message
createdAt
status

Status:

- new
- contacted
- in-progress
- completed
- archived

==================================================
26. BACKEND STRUCTURE
==================================================

Recommended:

server/
├── src/
│   ├── config/
│   │   └── db.ts
│   │
│   ├── controllers/
│   │   └── contact.controller.ts
│   │
│   ├── models/
│   │   └── contact.model.ts
│   │
│   ├── routes/
│   │   └── contact.routes.ts
│   │
│   ├── middleware/
│   │   ├── error.middleware.ts
│   │   └── rateLimit.middleware.ts
│   │
│   ├── services/
│   │   └── contact.service.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── package.json
└── tsconfig.json

Use:

- Controllers
- Services
- Routes
- Models
- Middleware

Keep responsibilities separated.

==================================================
27. SECURITY
==================================================

Implement:

- Helmet
- CORS
- Rate limiting
- Input validation
- Sanitization
- Environment variables
- Secure headers
- Request size limits

Contact form must be protected against spam.

Never trust frontend validation alone.

Use appropriate validation libraries where useful.

==================================================
28. ERROR HANDLING
==================================================

Frontend:

Clean user-friendly errors.

Backend:

Centralized error middleware.

Never expose internal errors.

Bad:

MongoServerError: E11000...

Good:

Something went wrong. Please try again.

Log actual technical errors server-side.

==================================================
29. ADMIN PREPARATION
==================================================

Do NOT build a large admin panel in V1.

However, architecture should allow future functionality:

- Add project
- Edit project
- Delete project
- Manage services
- Manage blog
- View contact inquiries

Do not spend V1 development time implementing these unless already present in the existing repository.

==================================================
30. ROUTES
==================================================

Create:

/

Homepage

/services

Detailed services

/work

Portfolio

/work/[slug]

Case study

/about

About PG Labs

/contact

Dedicated contact page

/blog

Do NOT build a full blog CMS in V1.

Only prepare the architecture for future blog functionality.

==================================================
31. HOMEPAGE ORDER
==================================================

Homepage sections:

1. Navbar
2. Hero
3. Capabilities
4. Services
5. Featured Work
6. Case Study / Problem-solving section
7. Process
8. Why PG Labs
9. About
10. Technology
11. CTA
12. Contact
13. Footer

==================================================
32. SERVICES PAGE
==================================================

/services

Sections:

- Hero
- Services overview
- Detailed services
- Technology
- Process
- CTA

Use the same service data as homepage.

Avoid duplicating service data.

==================================================
33. WORK PAGE
==================================================

/work

Display all projects.

Filters:

- All
- Web
- SaaS
- AI
- Business Software

Use data-driven projects.

Smooth but restrained transitions.

==================================================
34. CASE STUDY PAGE
==================================================

/work/[slug]

Structure:

- Project hero
- Overview
- Problem
- Solution
- Features
- Technology
- Screenshots
- Architecture if appropriate
- Outcome
- Next project
- CTA

Do not fabricate outcomes.

If outcome data is unavailable, present a qualitative outcome or omit the section rather than inventing metrics.

Use dynamic metadata.

Use generateStaticParams where appropriate.

==================================================
35. ABOUT PAGE
==================================================

/about

Include:

- Mission
- Approach
- Capabilities
- Technology
- Founder/team section
- CTA

Keep claims factual.

==================================================
36. CONTACT PAGE
==================================================

/contact

Heading:

Let’s build something useful.

Include:

- Contact form
- Contact information
- FAQ
- CTA

FAQ should contain useful real questions, not generic filler.

==================================================
37. BLOG PREPARATION
==================================================

Prepare architecture for:

/blog

Potential categories:

- Web Development
- AI
- Software Engineering
- Product Development
- Case Studies

Do NOT overbuild.

No full CMS in V1.

The architecture should make future SEO-focused content easy to add.

==================================================
38. SEO
==================================================

SEO is extremely important.

Every page must have:

- Unique title
- Unique meta description
- Canonical URL
- Open Graph metadata
- Twitter/X metadata
- Proper heading hierarchy
- Semantic HTML
- Descriptive alt text

HOMEPAGE TITLE:

PG Labs — Web Development, AI & Custom Software Studio

HOMEPAGE DESCRIPTION:

PG Labs builds modern web applications, AI-powered solutions and custom software for businesses and startups.

Naturally target relevant keywords:

- software development agency
- web development
- Next.js development
- AI development
- custom software development
- SaaS development
- business software
- AI solutions
- web application development

Do NOT keyword stuff.

==================================================
39. STRUCTURED DATA
==================================================

Implement JSON-LD where appropriate.

Organization schema:

PG Labs

Website schema.

Project/case study:

Use CreativeWork or SoftwareApplication where appropriate.

Do not add fake information to structured data.

Only include factual information.

==================================================
40. SITEMAP AND ROBOTS
==================================================

Generate:

/sitemap.xml

/robots.txt

Use Next.js metadata APIs:

sitemap.ts
robots.ts

Ensure important public routes are included.

Do not include private/admin routes.

==================================================
41. CANONICAL URLS
==================================================

Implement canonical URLs correctly.

Use a centralized site URL configuration.

Do not hardcode different domains throughout the application.

Use environment configuration where appropriate.

==================================================
42. PERFORMANCE
==================================================

Performance is a priority.

Targets:

Lighthouse Performance:
90+

Accessibility:
90+

Best Practices:
90+

SEO:
95+

Use:

- Next/Image
- Image optimization
- Lazy loading
- Proper font loading
- Code splitting
- Minimal client-side JavaScript
- Server Components
- Dynamic imports when appropriate

Do not load huge animation libraries unnecessarily.

Avoid unnecessary hydration.

Avoid layout shifts.

==================================================
43. ANIMATION SYSTEM
==================================================

Use Framer Motion.

Create reusable animation utilities/components.

Examples:

Fade Up

opacity:
0 → 1

Y:
20 → 0

Scale In

scale:
0.97 → 1

opacity:
0 → 1

Stagger

Children appear sequentially.

Duration:

Approximately 0.4–0.8 seconds.

Use smooth premium easing.

Do not animate every element.

Animation must communicate hierarchy.

==================================================
44. SCROLL ANIMATIONS
==================================================

Use viewport-triggered animations.

Sections may reveal while scrolling.

However:

DO NOT animate everything.

Static elements should remain static.

Avoid excessive parallax.

Avoid animation that makes content difficult to read.

==================================================
45. REDUCED MOTION
==================================================

Respect:

prefers-reduced-motion

When enabled:

- Disable large movement
- Reduce transitions
- Remove parallax
- Reduce decorative motion
- Keep simple fades or no animation

==================================================
46. MOBILE EXPERIENCE
==================================================

Mobile is a major requirement.

Design mobile deliberately.

NAVBAR:

Compact sticky navbar.

Logo left.

Menu right.

HERO:

Centered or slightly left aligned.

Headline:

42–52px approximately.

Buttons:

Full width or stacked when appropriate.

SERVICES:

Single-column.

PROJECTS:

Single-column.

Large images.

PROCESS:

Vertical timeline.

TECHNOLOGY:

2-column grid.

CTA:

Stack content vertically.

CONTACT:

Single-column form.

Inputs:

At least 44px high.

Avoid tiny text.

==================================================
47. MOBILE VISUAL PRIORITY
==================================================

Prioritize:

1. Headline
2. Value proposition
3. CTA
4. Services
5. Projects
6. Process
7. About
8. Contact

Decorative visuals must never push important content excessively far down.

==================================================
48. ACCESSIBILITY
==================================================

Implement:

- Keyboard navigation
- Visible focus states
- Semantic buttons
- Proper form labels
- Alt text
- Accessible form errors
- Good contrast
- Reduced motion
- Logical tab order

Use ARIA only when necessary.

Never use:

<div>

when a semantic:

<button>
<a>
<nav>
<section>
<header>
<footer>
<form>

is appropriate.

==================================================
49. COMPONENT ARCHITECTURE
==================================================

Use reusable components.

Suggested:

src/
├── app/
│   ├── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── work/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── blog/
│   │   └── page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── FeaturedWork.tsx
│   │   ├── Process.tsx
│   │   ├── WhyUs.tsx
│   │   ├── About.tsx
│   │   ├── Technology.tsx
│   │   ├── CTA.tsx
│   │   └── Contact.tsx
│   │
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── Badge.tsx
│   │   └── SectionHeading.tsx
│   │
│   └── animations/
│       ├── FadeUp.tsx
│       ├── Stagger.tsx
│       └── Reveal.tsx
│
├── lib/
│   ├── api.ts
│   ├── constants.ts
│   └── utils.ts
│
└── data/
    ├── projects.ts
    ├── services.ts
    └── technologies.ts

Do not blindly follow this structure if the existing repository has a better established architecture.

Maintain consistency.

==================================================
50. CONTENT DATA
==================================================

Keep:

- Projects
- Services
- Technologies
- Navigation
- Metadata

data-driven wherever practical.

Avoid duplicate content.

==================================================
51. FOOTER
==================================================

Premium and minimal.

Large logo:

PG Labs

Description:

Digital products, AI solutions and custom software.

Navigation:

Explore

- Services
- Work
- Process
- About

Connect

- Email
- LinkedIn
- WhatsApp

Bottom:

© 2026 PG Labs. All rights reserved.

Links:

Privacy Policy
Terms

Do not invent contact URLs.

Use actual values/configuration when available.

==================================================
52. UX DETAILS
==================================================

Buttons:

Subtle interaction.

Example:

Start a Project →

Hover:

Arrow moves slightly right.

Links:

Underline or subtle accent transition.

Cards:

Border and background transition.

Everything should feel deliberate.

Avoid exaggerated motion.

==================================================
53. CURSOR EFFECT
==================================================

Desktop-only optional enhancement.

A very subtle custom cursor/spotlight may be implemented.

ONLY implement if:

- Performance remains strong
- Accessibility remains good
- It does not interfere with interaction

Never use custom cursor on mobile.

If there is any doubt, skip it.

==================================================
54. BACKGROUND
==================================================

Use subtle background texture.

Possible:

- CSS radial gradients
- Fine grid
- Extremely subtle noise

Opacity must remain very low.

Background must stay clean.

Do not create visual clutter.

==================================================
55. IMAGERY
==================================================

Do NOT use random stock photos.

Prefer:

- Real project screenshots
- Product mockups
- UI screenshots
- Custom generated abstract visuals
- Device mockups

Project visuals should demonstrate actual work.

If real screenshots are unavailable:

Create neutral product mockups that clearly function as presentation visuals.

Do not imply they are client screenshots if they are not.

==================================================
56. COPYWRITING
==================================================

Tone:

- Confident
- Clear
- Technical but understandable
- Professional
- Short
- Human

Avoid:

"We are passionate about providing innovative solutions."

Prefer:

"We build software that removes manual work."

"We turn business problems into working digital products."

"From idea to production."

Do not use empty buzzwords.

==================================================
57. DESIGN QUALITY BAR
==================================================

The final site should feel like a premium digital product studio.

It should NOT look like:

- AI-generated template UI
- Bootstrap-style corporate site
- Generic freelancer portfolio
- College project
- Generic SaaS landing page

Quality should come from:

- Excellent typography
- Spacing
- Grid
- Content hierarchy
- Consistent components
- Strong project presentation
- Responsive design
- Micro-interactions
- Performance

==================================================
58. DEVELOPMENT PHASES
==================================================

PHASE 1 — REPOSITORY + FOUNDATION

Inspect repository.

Set up/verify:

- Next.js
- TypeScript
- Tailwind
- Framer Motion
- Lucide
- ESLint

Do not unnecessarily reinstall dependencies that already exist.

Establish:

- Fonts
- Colors
- Typography
- Spacing
- Global styles
- Container widths
- Breakpoints

Create base UI components.

Verify:

- TypeScript
- ESLint
- Build

==================================================

PHASE 2 — DESIGN SYSTEM

Create:

- Button
- Badge
- Card
- SectionHeading
- Container
- Navigation
- Footer
- Animation utilities

Establish consistent:

- Border radius
- Border treatment
- Shadows
- Typography
- Spacing
- Motion

Do not create dozens of unnecessary components.

==================================================

PHASE 3 — NAVBAR + FOOTER

Build:

- Desktop navbar
- Mobile navbar
- Mobile menu
- Footer

Verify:

- Keyboard navigation
- Mobile behavior
- Scroll behavior
- Links
- Accessibility

==================================================

PHASE 4 — HOMEPAGE

Build:

- Hero
- Capabilities
- Services
- Featured Work
- Case Study section
- Process
- Why PG Labs
- About
- Technology
- CTA
- Contact
- Footer

Verify responsive behavior.

==================================================

PHASE 5 — OTHER PAGES

Build:

/services

/work

/work/[slug]

/about

/contact

Prepare:

/blog

Ensure visual consistency across routes.

==================================================

PHASE 6 — BACKEND

Create separate Express backend.

Implement:

- MongoDB connection
- Contact model
- Contact controller
- Contact service
- Contact route
- Validation
- Rate limiting
- Sanitization
- Error middleware
- CORS
- Helmet

Test:

POST /api/contact

==================================================

PHASE 7 — FRONTEND/BACKEND INTEGRATION

Connect contact form.

Implement:

- Loading
- Success
- Error
- Validation
- Toasts

Ensure frontend does not expose internal errors.

==================================================

PHASE 8 — SEO

Implement:

- Page metadata
- Dynamic project metadata
- Canonicals
- Open Graph
- Twitter/X metadata
- JSON-LD
- Sitemap
- Robots
- Semantic headings

Verify every public route.

==================================================

PHASE 9 — PERFORMANCE

Optimize:

- Images
- Fonts
- Client components
- JavaScript
- Animations
- Layout shifts

Use Lighthouse or equivalent checks where available.

==================================================

PHASE 10 — ACCESSIBILITY

Verify:

- Keyboard navigation
- Focus states
- Form labels
- Error messaging
- Contrast
- Reduced motion
- Touch targets
- Semantic HTML

==================================================

PHASE 11 — MOBILE QA

Explicitly inspect:

320px
375px
390px
414px

Check:

- No horizontal overflow
- No clipped content
- No oversized typography
- Buttons usable
- Menu works
- Forms usable
- Cards stack correctly
- Timeline becomes vertical
- Decorative elements do not dominate

==================================================

PHASE 12 — FINAL QA

Run:

- TypeScript
- ESLint
- Production build
- Tests where available

Verify:

- All routes
- All links
- Buttons
- Mobile menu
- Project filters
- Contact form
- Loading state
- Error state
- Success state
- SEO
- Accessibility
- Performance

==================================================
59. FINAL QA CHECKLIST
==================================================

DESKTOP:

1280px
1440px
1920px

MOBILE:

320px
375px
390px
414px

FUNCTIONAL:

- Navbar works
- Mobile menu works
- All links work
- Project filtering works
- Contact form works
- Loading state works
- Error state works
- Success state works
- API handles invalid input
- API rate limiting works

SEO:

- Unique titles
- Unique descriptions
- Canonicals
- OG metadata
- Twitter/X metadata
- Sitemap
- Robots
- Structured data
- Correct H1 hierarchy
- Descriptive alt text

PERFORMANCE:

- Images optimized
- No unnecessary client components
- No huge JS bundles
- Animations optimized
- No major layout shifts
- No horizontal overflow

ACCESSIBILITY:

- Keyboard navigation
- Focus states
- Form labels
- Alt text
- Contrast
- Reduced motion
- Touch targets

SECURITY:

- Helmet
- CORS
- Rate limiting
- Input validation
- Sanitization
- Request limits
- Environment variables
- No secrets committed

==================================================
60. IMPORTANT NON-NEGOTIABLE RULES
==================================================

1. Do not use lorem ipsum.
2. Do not invent clients.
3. Do not invent testimonials.
4. Do not invent business results.
5. Do not invent metrics.
6. Do not claim technologies PG Labs does not actually use.
7. Keep content editable/data-driven.
8. Do not overuse animations.
9. Mobile responsiveness is mandatory.
10. Test for horizontal overflow.
11. Test all buttons and links.
12. Contact form must have loading/success/error states.
13. Use accessible semantic HTML.
14. Optimize images.
15. Every public route must have SEO metadata.
16. Sitemap must exist.
17. Robots must exist.
18. Structured data must contain factual information only.
19. Keep frontend and backend cleanly separated.
20. Do not implement chatbot/RAG in V1.
21. Keep architecture extensible for future AI functionality.
22. Do not break existing functionality.
23. Do not create unnecessary dependencies.
24. Do not create unnecessary Client Components.
25. Do not create a giant page component.
26. Do not over-engineer the blog.
27. Do not build a full admin panel in V1.
28. Do not sacrifice performance for decorative effects.
29. Do not sacrifice mobile usability for desktop visuals.
30. Do not sacrifice accessibility for aesthetics.

==================================================
61. FINAL GOAL
==================================================

The final PG Labs website should look like a company capable of confidently taking a ₹50,000–₹5,00,000+ software project.

The website should immediately communicate:

WHAT IS PG LABS?

A software/product development studio.

WHAT DO THEY DO?

Web development
AI
Custom software
SaaS
Automation
Backend/API development
UI/UX

CAN THEY ACTUALLY BUILD THINGS?

Yes.

Demonstrate this through real project work and polished product presentation.

HOW DO THEY WORK?

Clear five-step process.

HOW CAN SOMEONE CONTACT THEM?

Very clear CTAs and contact form.

The final experience should communicate:

PG Labs doesn't just make websites.

We build digital products.

==================================================
62. FINAL INSTRUCTION TO THE AGENT
==================================================

Start by inspecting the existing repository.

Do not immediately generate the entire application blindly.

First:

1. Inspect the repository.
2. Inspect the installed UI/UX Pro Max skill.
3. Identify the current architecture.
4. Identify what already exists.
5. Identify conflicts with this specification.
6. Create the implementation plan.
7. Begin Phase 1.
8. Verify each phase before proceeding.
9. Keep the implementation production-quality.
10. Perform the complete final QA before declaring completion.

Do not stop after creating the visual homepage.

The objective is a complete, polished, responsive, SEO-friendly, production-quality PG Labs website with a clean frontend/backend architecture.