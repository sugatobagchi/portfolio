import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
}: ProjectCardProps) {
  return (
    <div className="card p-4 flex flex-col">
      <div className="relative w-full h-40 mb-3 rounded overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover rounded" />
      </div>
      <h3 className="text-lg font-bold mb-1 font-montserrat font-mono">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-2 flex-1 font-inter">
        {description}
      </p>
      <Link
        href={link}
        className="text-primary font-medium hover:underline mt-auto"
      >
        Explore
      </Link>
    </div>
  );
}
