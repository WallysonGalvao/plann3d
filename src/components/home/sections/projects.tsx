import { Link } from '@tanstack/react-router'
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const ProjectsSection = () => {
  const { t } = useTranslation();

  const projects = [
    {
      id: 1,
      title: t("projects.nordicRetreat"),
      location: "Oslo, Norway",
      image: project1,
      number: "01",
    },
    {
      id: 2,
      title: t("projects.voidMuseum"),
      location: "Berlin, Germany",
      image: project2,
      number: "02",
    },
    {
      id: 3,
      title: t("projects.vertexTower"),
      location: "New York, USA",
      image: project3,
      number: "03",
    },
  ];

  return (
    <section id="projects" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            {t("projects.title")}
          </h2>
          <Link
            to="/projects"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("projects.viewAll")}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="project-card-overlay" />

                {/* Project Number */}
                <span className="absolute top-4 right-4 text-sm font-medium text-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.number}
                </span>
              </div>

              {/* Project Info */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {project.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
