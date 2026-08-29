"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SERVICES } from "@/data/services";
import { FadeUp } from "@/components/animations/FadeUp";


export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-32">
      <Container>
        <FadeUp>
          <SectionHeading
            eyebrow="WHAT WE DO"
            title="Technology built around your business."
            description="From high-performance websites to AI-powered platforms, we design and build digital products that solve real problems."
          />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service, idx) => (
            <FadeUp key={service.number} delay={idx * 0.08}>
              <ServiceCard
                number={service.number}
                title={service.title}
                description={service.description}
                features={service.features}
                icon={service.icon}
              />
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
};