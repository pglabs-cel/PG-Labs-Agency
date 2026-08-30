import React from "react";
import { SITE_CONFIG } from "@/lib/constants";

interface OrganizationJsonLdProps {
  url?: string;
}

export const OrganizationJsonLd: React.FC<OrganizationJsonLdProps> = ({
  url = SITE_CONFIG.url,
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: url,
    logo: SITE_CONFIG.logoMarkUrl,
    image: SITE_CONFIG.fullLogoUrl,
    description: SITE_CONFIG.description,
    sameAs: [
      SITE_CONFIG.links.twitter,
      SITE_CONFIG.links.github,
      SITE_CONFIG.links.linkedin,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.links.email,
      contactType: "customer support",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const WebSiteJsonLd: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

interface ProjectJsonLdProps {
  title: string;
  description: string;
  url: string;
  technologies: string[];
}

export const ProjectJsonLd: React.FC<ProjectJsonLdProps> = ({
  title,
  description,
  url,
  technologies,
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description: description,
    url: url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    creator: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
    keywords: technologies.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};