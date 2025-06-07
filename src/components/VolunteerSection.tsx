import { volunteer } from "@/data/volunteer";

export default function VolunteerSection() {
  return (
    <section id="volunteer" className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient font-montserrat font-mono">
        Volunteer Contribution
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {volunteer.map((item) => (
          <div
            key={item.organization}
            className="bg-muted rounded-lg p-4 shadow"
          >
            <h3 className="text-lg font-semibold mb-1 font-montserrat">
              {item.role} @ {item.organization}
            </h3>
            <p className="text-sm text-muted-foreground mb-1 font-inter">
              {item.period}
            </p>
            <p
              className="text-sm text-muted-foreground font-inter [&>strong]:text-primary [&>strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
