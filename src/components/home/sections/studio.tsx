import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";


const StudioSection = () => {
  const { t } = useTranslation();

  const processSteps = [
    { number: "01", title: t("processSection.step1Title") },
    { number: "02", title: t("processSection.step2Title") },
    { number: "03", title: t("processSection.step3Title") },
    { number: "04", title: t("processSection.step4Title") },
  ];

  return (
    <section id="studio" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="section-label">{t("about.label")}</span>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {t("about.title")}
              </h2>
            </div>

            {/* Single focused paragraph */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("about.desc1")}
            </p>

            {/* CTA to full studio page */}
            <Button variant="outline" size="lg" asChild>
              <Link to="/studio" className="flex items-center gap-2">
                {t("studioSection.learnMore")}
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>

          {/* Right: Process Steps (simplified) */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
              {t("processSection.label")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="p-5 rounded-lg border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
                >
                  <span className="text-2xl font-bold text-primary/60 block mb-2">
                    {step.number}
                  </span>
                  <h4 className="text-sm font-medium leading-tight">
                    {step.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioSection;
