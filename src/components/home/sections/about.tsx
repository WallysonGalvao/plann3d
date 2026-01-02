import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="section-label">{t("about.label")}</span>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {t("about.title")}
              </h2>
            </div>

            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                {t("about.desc1")}
              </p>
              <p className="leading-relaxed">
                {t("about.desc2")}
              </p>
              <p className="leading-relaxed">
                {t("about.desc3")}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div>
                <p className="text-3xl font-bold text-primary">2024</p>
                <p className="text-sm text-muted-foreground mt-1">{t("about.founded")}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground mt-1">{t("about.teamMembers")}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">1000+</p>
                <p className="text-sm text-muted-foreground mt-1">{t("about.countries")}</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="aspect-square rounded-lg bg-linear-to-br from-secondary via-card to-secondary/50 border border-border/50 flex items-center justify-center overflow-hidden">
              {/* Abstract geometric pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/30 rotate-45" />
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 border border-primary/20 rotate-12" />
                <div className="absolute top-1/2 left-1/2 w-64 h-64 border border-primary/10 -translate-x-1/2 -translate-y-1/2 rounded-full" />
              </div>

              {/* Central logo mark */}
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto rounded-full border-2 border-foreground/20 flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-foreground/80">F</span>
                </div>
                <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
                  {t("about.visualStudio")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
