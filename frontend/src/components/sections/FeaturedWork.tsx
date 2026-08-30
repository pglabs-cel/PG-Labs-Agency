import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { fetchPublicProjects } from "@/lib/projects.api";

export const FeaturedWork: React.FC = async () => {
  const featured = await fetchPublicProjects(true);

  return (
    <section id="work" className="py-20 md:py-32 border-t border-border/60 bg-background-secondary/30">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <FadeUp>
            <SectionHeading
              eyebrow="SELECTED WORK"
              title="Things we’ve built."
              description="A selection of products, platforms and experiments built across web development, business software and AI."
              className="mb-0"
            />
          </FadeUp>
          <FadeUp delay={0.1}>
            <Button href="/work" variant="outline" showArrow>
              View All Projects
            </Button>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {featured.map((project, idx) => (
            <FadeUp key={project.slug} delay={idx * 0.1} className="h-full flex flex-col">
              <ProjectCard
                slug={project.slug}
                title={project.title}
                category={project.category}
                description={project.shortDescription}
                technologies={project.technologies}
                year={project.year}
                thumbnail={project.thumbnail}
                liveUrl={project.liveUrl}
              />
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
};