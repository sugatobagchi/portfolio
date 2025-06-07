import { achievements } from "@/data/achievements";

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient font-montserrat font-mono">
        Achievements
      </h2>
      <ul className="list-disc list-inside text-muted-foreground font-inter">
        {achievements.map((ach, i) => (
          <li
            key={i}
            dangerouslySetInnerHTML={{ __html: ach }}
            className="[&>strong]:text-primary [&>strong]:font-semibold"
          />
        ))}
      </ul>
    </section>
  );
}
