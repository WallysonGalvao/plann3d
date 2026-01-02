import { useTranslation } from "react-i18next";
import aboutBg from "@/assets/about-bg.jpg";

const ProcessSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      number: "01",
      title: t("processSection.step1Title"),
      description: t("processSection.step1Desc"),
    },
    {
      number: "02",
      title: t("processSection.step2Title"),
      description: t("processSection.step2Desc"),
    },
    {
      number: "03",
      title: t("processSection.step3Title"),
      description: t("processSection.step3Desc"),
    },
    {
      number: "04",
      title: t("processSection.step4Title"),
      description: t("processSection.step4Desc"),
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={aboutBg}
          alt="Studio atmosphere"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/95 to-background/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="section-label">{t("processSection.label")}</span>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {t("processSection.title")}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
              {t("processSection.description")}
            </p>
          </div>

          {/* Right Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group flex gap-6 p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:bg-card transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-3xl font-bold text-primary/50 group-hover:text-primary transition-colors">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
