import { experience } from "@/data/experience";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient font-montserrat font-mono">
        Experience
      </h2>
      <ol className="relative border-l border-muted-foreground/30 ml-4">
        {experience.map((exp, idx) => (
          <li key={exp.company} className="mb-10 ml-6">
            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-primary rounded-full ring-8 ring-background text-background font-bold">
              {idx + 1}
            </span>
            <h3 className="text-lg font-semibold font-montserrat">
              {exp.role} <span className="text-primary">@ {exp.company}</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-2 font-inter">
              {exp.period}
            </p>
            <ul className="list-disc list-inside text-muted-foreground text-sm font-inter">
              {exp.details.map((detail, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: detail }}
                  className="[&>strong]:text-primary [&>strong]:font-semibold"
                />
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
