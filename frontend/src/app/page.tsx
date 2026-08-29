import { Hero } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { CaseStudyHighlight } from "@/components/sections/CaseStudyHighlight";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyUs } from "@/components/sections/WhyUs";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* 2. Hero */}
      <Hero />

      {/* 3. Capabilities Strip */}
      <Capabilities />

      {/* 4. Services */}
      <ServicesSection />

      {/* 5. Featured Work */}
      <FeaturedWork />

      {/* 6. Case Study / Problem-solving section */}
      <CaseStudyHighlight />

      {/* 7. Process */}
      <ProcessSection />

      {/* 8. Why PG Labs */}
      <WhyUs />

      {/* 9. About */}
      <AboutSection />

      {/* 10. Technology */}
      <TechnologySection />

      {/* 11. CTA */}
      <CtaSection />

      {/* 12. Contact Form */}
      <ContactSection />
    </main>
  );
}