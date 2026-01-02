import { Building2, Eye, Film, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const ServicesSection = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Eye,
      title: t("services.archViz"),
      description: t("services.archVizDesc"),
    },
    {
      icon: Film,
      title: t("services.animation"),
      description: t("services.animationDesc"),
    },
    {
      icon: Sparkles,
      title: t("services.virtual"),
      description: t("services.virtualDesc"),
    },
    {
      icon: Building2,
      title: t("services.presentation"),
      description: t("services.presentationDesc"),
    },
  ];

  return (
    <section id="services" className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">{t("services.label")}</span>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mt-4 mb-6">
            {t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("services.description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-8 lg:p-10 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
