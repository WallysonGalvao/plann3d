import { useTranslation } from "react-i18next";
import { Link } from '@tanstack/react-router';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 lg:py-32 bg-secondary/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <span className="section-label">{t("contactSection.label")}</span>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mt-4 mb-6">
            {t("contactSection.title")}
            <span className="block text-gradient">{t("contactSection.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            {t("contactSection.description")}
          </p>

          {/* CTA */}
          <Button variant="hero" size="xl" asChild className="mb-16">
            <Link to="/contact" className="flex items-center gap-2">
              {t("contactSection.startProject")}
              <ArrowRight size={20} />
            </Link>
          </Button>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-8 pt-12">
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Mail size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">{t("contactSection.email")}</p>
                <a
                  href="mailto:studio@plann3d.com"
                  className="font-medium hover:text-primary transition-colors"
                >
                  studio@plann3d.com
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <MapPin size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">{t("contactSection.location")}</p>
                <p className="font-medium">Brasília, Distrito Federal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
