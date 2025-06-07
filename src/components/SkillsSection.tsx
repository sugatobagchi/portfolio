import { skills } from "@/data/skills";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient font-montserrat font-mono">
        Skills
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="rounded-lg bg-muted p-4">
          <h3 className="text-lg font-bold font-montserrat">Languages</h3>
          <ul className="mt-2 space-y-1 text-muted-foreground font-inter">
            {skills.languages.map((lang) => (
              <li
                key={lang}
                dangerouslySetInnerHTML={{ __html: lang }}
                className="[&>strong]:text-primary [&>strong]:font-semibold"
              />
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-muted p-4">
          <h3 className="text-lg font-bold font-montserrat">Frameworks</h3>
          <ul className="mt-2 space-y-1 text-muted-foreground font-inter">
            {skills.frameworks.map((fw) => (
              <li
                key={fw}
                dangerouslySetInnerHTML={{ __html: fw }}
                className="[&>strong]:text-primary [&>strong]:font-semibold"
              />
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-muted p-4">
          <h3 className="text-lg font-bold font-montserrat">Databases</h3>
          <ul className="mt-2 space-y-1 text-muted-foreground font-inter">
            {skills.databases.map((db) => (
              <li
                key={db}
                dangerouslySetInnerHTML={{ __html: db }}
                className="[&>strong]:text-primary [&>strong]:font-semibold"
              />
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-muted p-4">
          <h3 className="text-lg font-bold font-montserrat">Platforms</h3>
          <ul className="mt-2 space-y-1 text-muted-foreground font-inter">
            {skills.platforms.map((plat) => (
              <li
                key={plat}
                dangerouslySetInnerHTML={{ __html: plat }}
                className="[&>strong]:text-primary [&>strong]:font-semibold"
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
