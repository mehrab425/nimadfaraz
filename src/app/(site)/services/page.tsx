import Link from "next/link";
import {
  Briefcase,
  Building2,
  FileSignature,
  FileStack,
  Gavel,
  Handshake,
  HeartHandshake,
  MessagesSquare,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading, Reveal } from "@/components/motion/primitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

const iconMap: Record<string, LucideIcon> = {
  Scale,
  Gavel,
  Building2,
  FileStack,
  FileSignature,
  MessagesSquare,
  Handshake,
  HeartHandshake,
  Briefcase,
};

export const metadata = buildMetadata({
  title: "خدمات حقوقی",
  description: "خدمات تخصصی موسسه حقوقی نیماد فراز پارس شامل وکالت مدنی، کیفری، ملکی، خانواده، شرکت‌ها و مشاوره.",
  path: "/services",
});

export default async function ServicesPage() {
  const data = await getSiteData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "خانه", path: "/" },
              { name: "خدمات", path: "/services" },
            ])
          ),
        }}
      />
      <section className="py-24">
        <div className="container">
          <SectionHeading
            eyebrow="خدمات"
            title="خدمات حقوقی جامع و تخصصی"
            description="از مشاوره اولیه تا پیگیری قضایی، خدمات موسسه متناسب با نیاز اشخاص حقیقی و حقوقی طراحی شده است."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.services.map((service, index) => {
              const Icon = iconMap[service.icon] ?? Scale;
              return (
                <Reveal key={service.id} delay={index * 0.04}>
                  <Card className="h-full transition hover:border-gold/35 hover:shadow-[0_0_24px_rgba(201,164,77,0.12)]">
                    <CardContent className="p-6">
                      <Icon className="mb-4 h-8 w-8 text-gold" />
                      <h2 className="text-xl font-bold text-vanilla">{service.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-secondary">{service.description}</p>
                      <Button asChild variant="secondary" className="mt-5">
                        <Link href="/contact#consult">درخواست مشاوره</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
