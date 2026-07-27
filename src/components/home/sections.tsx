import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverTooltip } from "@/components/ui/hover-tooltip";
import { Reveal } from "@/components/motion/primitives";

type HeroProps = {
  brandName: string;
  slogan: string;
  logo: string;
  heroImage: string;
  heroGallery?: string[];
};

const defaultHeroGallery = [
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
];

export function HeroSection({ brandName, slogan, logo, heroImage, heroGallery }: HeroProps) {
  const previewImages = (heroGallery?.length ? heroGallery : defaultHeroGallery).slice(0, 3);

  return (
    <section className="relative overflow-hidden pb-20 pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,164,77,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(241,254,200,0.08),transparent_35%)]" />
      <div className="container grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center rounded-2xl border border-gold/20 bg-white/5 p-3 shadow-[0_16px_34px_rgba(0,0,0,0.22)]">
              <Image src={logo} alt={brandName} width={72} height={72} className="rounded-2xl" priority />
            </div>
            <p className="text-sm font-semibold text-gold">موسسه حقوقی معتبر — تهران</p>
            <h1 className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">{brandName}</h1>
            <p className="max-w-xl text-lg leading-9 text-secondary md:text-xl">{slogan}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contact#consult">مشاوره رایگان</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact">تماس با ما</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="luxury-card relative overflow-hidden rounded-[2rem] p-3 shadow-[0_35px_90px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(201,164,77,0.18),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.12),transparent_45%),linear-gradient(320deg,rgba(0,0,0,0.18),transparent_60%)]" />
            <div className="absolute left-5 top-5 z-20 h-20 w-20 rounded-full border border-gold/20 bg-white/10 blur-3xl" />
            <div className="absolute bottom-5 right-5 z-20 h-24 w-24 rotate-12 rounded-[1.8rem] border border-gold/20 bg-gradient-to-br from-gold/30 via-transparent to-cosmic shadow-[0_20px_40px_rgba(0,0,0,0.28)]" />
            <Image
              src={heroImage}
              alt="ترازوی عدالت — نماد حقوق و انصاف"
              width={900}
              height={1100}
              priority
              className="relative z-0 h-[420px] w-full rounded-[1.4rem] object-cover md:h-[560px]"
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {previewImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="luxury-card group relative overflow-hidden rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.2)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,164,77,0.18),transparent_45%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_70%)]" />
                <Image
                  src={image}
                  alt="تصویر مرتبط با حقوق و مطالعه"
                  width={400}
                  height={260}
                  className="relative h-28 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-gold/30 bg-card/90 px-5 py-4 backdrop-blur md:block">
            <p className="text-sm text-secondary">بیش از</p>
            <p className="text-2xl font-bold text-gold">۱۵+ سال</p>
            <p className="text-sm text-vanilla">تجربه حقوقی</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesPreview({
  services,
}: {
  services: { id: string; title: string; description: string; icon: string }[];
}) {
  return (
    <section id="services" className="py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gold">خدمات حقوقی</p>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">راهکار حقوقی برای هر نیاز</h2>
          </div>
          <Link href="/services" className="inline-flex items-center gap-1 text-sm text-gold hover:underline">
            مشاهده همه
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service, index) => {
            const insightPoints = [
              service.description,
              service.title === "دعاوی حقوقی"
                ? "تدوین راهکار دفاعی، تحلیل مستندات و پیگیری مراحل قضایی با دقت حرفه‌ای"
                : service.title === "دعاوی کیفری"
                  ? "بررسی ادله، برنامه‌ریزی دفاع و مدیریت ریسک در پرونده‌های حساس"
                  : service.title === "امور ملکی"
                    ? "رفع تعارض سندی، پیگیری حقوق مالکان و حفاظت از منافع ملکی"
                    : service.title === "امور ثبتی"
                      ? "تنظیم و پیگیری امور ثبتی با دقت در جزئیات اداری و حقوقی"
                      : service.title === "تنظیم قراردادها"
                        ? "نویسندگی دقیق قرارداد، پیشگیری از تعارض و حفاظت از منافع تجاری"
                        : "مشاوره تخصصی برای اتخاذ تصمیم‌های حقوقی دقیق و آگاهانه",
            ];

            return (
              <Reveal key={service.id} delay={index * 0.05}>
                <HoverTooltip title={service.title} points={insightPoints}>
                  <article className="luxury-card group h-full rounded-2xl p-6 transition hover:-translate-y-1 hover:border-gold/40">
                    <h3 className="text-xl font-bold text-vanilla">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-secondary">{service.description}</p>
                    <Link href="/services" className="mt-5 inline-flex text-sm font-semibold text-gold">
                      جزئیات بیشتر
                    </Link>
                  </article>
                </HoverTooltip>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
