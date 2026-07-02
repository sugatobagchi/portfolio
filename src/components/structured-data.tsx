import { profileImageUrl, siteContent } from "@/content";

interface StructuredDataProps {
  type?: "website" | "person" | "both";
}

export function StructuredData({ type = "both" }: StructuredDataProps) {
  const { name, title, tagline, siteUrl, seo } = siteContent;

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: name,
    description: seo.description,
    publisher: {
      "@id": `${siteUrl}/#person`,
    },
  };

  const personSchema = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: name,
    url: siteUrl,
    image: profileImageUrl,
    jobTitle: title,
    description: tagline,
    sameAs: [
      "https://github.com/sugatobagchi",
      "https://linkedin.com/in/sugatobagchi",
    ],
  };

  const graph = [];
  if (type === "website" || type === "both") graph.push(websiteSchema);
  if (type === "person" || type === "both") graph.push(personSchema);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
