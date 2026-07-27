import { Camera, Mail, MapPin, Phone, Send } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { SectionHeading } from "@/components/motion/primitives";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "تماس با ما",
  description: "راه‌های ارتباطی با موسسه حقوقی نیماد فراز پارس — تلفن، واتساپ، تلگرام، ایمیل و فرم مشاوره رایگان.",
  path: "/contact",
});

export default async function ContactPage() {
  const data = await getSiteData();
  const { contact } = data;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "خانه", path: "/" },
              { name: "تماس با ما", path: "/contact" },
            ])
          ),
        }}
      />
      <section className="py-24">
        <div className="container">
          <SectionHeading
            eyebrow="تماس"
            title="با ما در ارتباط باشید"
            description="برای دریافت مشاوره حقوقی رایگان یا پیگیری پرونده، از راه‌های زیر استفاده کنید."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="space-y-5 p-6">
                <h2 className="text-xl font-bold text-vanilla">اطلاعات تماس</h2>
                {contact.phones.map((phone) => (
                  <p key={phone} className="flex items-center gap-2 text-secondary">
                    <Phone className="h-4 w-4 text-gold" />
                    <a href={`tel:${phone.replace(/-/g, "")}`} className="hover:text-gold">{phone}</a>
                  </p>
                ))}
                <p className="flex items-center gap-2 text-secondary">
                  <Mail className="h-4 w-4 text-gold" />
                  <a href={`mailto:${contact.email}`} className="hover:text-gold">{contact.email}</a>
                </p>
                <p className="flex items-start gap-2 text-secondary">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  {contact.address}
                </p>
                <div className="flex gap-3 pt-2">
                  <a href={`https://wa.me/${contact.whatsapp}`} className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:border-gold">واتساپ</a>
                  <a href={`https://t.me/${contact.telegram}`} className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-sm hover:border-gold">
                    <Send className="h-4 w-4" /> تلگرام
                  </a>
                  <a href={`https://instagram.com/${contact.instagram}`} className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-sm hover:border-gold">
                    <Camera className="h-4 w-4" /> اینستاگرام
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-bold text-vanilla">فرم مشاوره رایگان</h2>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
          <div className="mt-10 overflow-hidden rounded-3xl border border-white/10">
            <iframe
              title="نقشه"
              src={contact.mapEmbedUrl}
              className="h-[380px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
