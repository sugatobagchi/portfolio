import { about } from "@/data/about";

export default function AboutSection() {
  return (
    <section id="about" className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient font-montserrat font-mono">
        About Me
      </h2>
      <p className="text-lg mb-4 font-inter">{about.intro}</p>
      <ul className="list-disc list-inside text-muted-foreground space-y-1 font-inter">
        {about.details.map((detail, i) => (
          <li key={i}>{detail}</li>
        ))}
      </ul>
    </section>
  );
}
