import Link from "next/link";
import {
  Award,
  Briefcase,
  CheckCircle2,
  FileSearch,
  Handshake,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { AnimatedCounter, Reveal, SectionHeading } from "@/components/motion/primitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverTooltip } from "@/components/ui/hover-tooltip";
import type { Article } from "@/lib/articles";

const statIcons = [Briefcase, Users, Award, CheckCircle2];

export function StatsSection({
  statistics,
}: {
  statistics: { value: number; suffix?: string; label: string }[];
}) {
  return (
    <section className="py-16">
      <div className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statistics.map((item, index) => {
          const Icon = statIcons[index] ?? Scale;
          const insightPoints = [
            item.label === "پرونده موفق"
              ? "تجربه موفق در مدیریت پرونده‌های پیچیده و متنوع"
              : item.label === "وکیل متخصص"
                ? "تیم حقوقی با تخصص در حوزه‌های مدنی، کیفری و تجاری"
                : item.label === "سال تجربه"
                  ? "پشتیبانی حرفه‌ای بر اساس سال‌ها شناخت از رویه‌های حقوقی"
                  : "تمرکز بر رضایت موکل و نتیجه‌محوری در مسیر پرونده",
          ];
          return (
            <Reveal key={item.label} delay={index * 0.05}>
              <HoverTooltip title={item.label} points={insightPoints}>
                <div className="luxury-card rounded-2xl p-6 text-center shadow-[0_0_30px_rgba(201,164,77,0.08)]">
                  <Icon className="mx-auto mb-3 h-8 w-8 text-gold" />
                  <p className="text-3xl font-black text-vanilla md:text-4xl">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-secondary">{item.label}</p>
                </div>
              </HoverTooltip>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function WhyChooseUsSection({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <section className="py-20">
      <div className="container">
        <SectionHeading
          eyebrow="چرا نیماد فراز پارس؟"
          title="ترکیبی از تخصص، تعهد و اعتماد"
          description="ما با رویکردی حرفه‌ای و شفاف، در کنار موکلین خود هستیم تا بهترین نتیجه حقوقی حاصل شود."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const insightPoints = [
              item.title === "تخصص"
                ? "ارائه راهکار حقوقی دقیق با تکیه بر تحلیل تخصصی و شناخت عمیق موضوع"
                : item.title === "تجربه"
                  ? "پشتیبانی از پرونده‌های پیچیده با سابقه حرفه‌ای در مراجع مختلف"
                  : item.title === "تعهد"
                    ? "حفظ منافع موکل با اخلاق حرفه‌ای و پیگیری مستمر"
                    : item.title === "شفافیت"
                      ? "ارسال گزارش روشن از وضعیت پرونده، هزینه‌ها و مسیر اقدام"
                      : item.title === "پیگیری مستمر"
                        ? "هماهنگی مداوم با ادارات و مراجع قضایی تا نتیجه نهایی"
                        : "دستیابی به نتیجه مطلوب با رویکرد دقیق، هدفمند و استراتژیک",
            ];

            return (
              <Reveal key={item.title} delay={index * 0.04}>
                <HoverTooltip title={item.title} points={insightPoints}>
                  <Card className="luxury-card h-full transition hover:border-gold/30">
                    <CardContent className="p-6">
                      <ShieldCheck className="mb-4 h-7 w-7 text-gold" />
                      <h3 className="text-xl font-bold text-vanilla">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7">{item.description}</p>
                    </CardContent>
                  </Card>
                </HoverTooltip>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const stepIcons = [Sparkles, FileSearch, Handshake, Scale, CheckCircle2];

export function CooperationStepsSection({
  steps,
}: {
  steps: { title: string; description: string }[];
}) {
  return (
    <section id="steps" className="py-20">
      <div className="container">
        <SectionHeading
          eyebrow="مراحل همکاری"
          title="مسیر شفاف از مشاوره تا نتیجه"
          description="فرآیند همکاری با موسسه به‌صورت مرحله‌به‌مرحله و با گزارش‌دهی منظم طراحی شده است."
        />
        <div className="grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = stepIcons[index] ?? Scale;
            const insightPoints = [
              step.title === "مشاوره اولیه رایگان"
                ? "ارزیابی اولیه موضوع و شناسایی مسیر حقوقی مناسب"
                : step.title === "بررسی مدارک"
                  ? "تحلیل دقیق اسناد، مستندات و ابعاد حقوقی پرونده"
                  : step.title === "قبول وکالت و تنظیم قرارداد"
                    ? "تنظیم قرارداد وکالت با شفافیت کامل در تعهدات و حدود اختیارات"
                    : step.title === "پیگیری مستمر"
                      ? "حفظ ارتباط مستمر با مراجع مربوطه و مدیریت پرونده تا نتیجه"
                      : "ارائه نتیجه نهایی با راهنمایی‌های تخصصی برای اقدامات بعدی",
            ];
            return (
              <Reveal key={step.title} delay={index * 0.06}>
                <HoverTooltip title={step.title} points={insightPoints}>
                  <article className="luxury-card group relative h-full rounded-2xl p-5 transition hover:-translate-y-1 hover:border-gold/40">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm font-bold text-gold">{index + 1}.</span>
                      <Icon className="h-5 w-5 text-gold/80 transition group-hover:scale-110" />
                    </div>
                    <h3 className="font-bold text-vanilla">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-secondary">{step.description}</p>
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

export function LatestArticlesSection({ articles }: { articles: Article[] }) {
  return (
    <section className="py-20">
      <div className="container">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gold">دانش حقوقی</p>
            <h2 className="mt-2 text-3xl font-bold text-white">آخرین مقالات</h2>
          </div>
          <Link href="/articles" className="text-sm text-gold hover:underline">
            آرشیو مقالات
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {articles.slice(0, 3).map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.05}>
              <HoverTooltip
                title={article.title}
                points={[
                  article.excerpt,
                  "تحلیل حقوقی به‌روز با رویکرد کاربردی برای درک بهتر موضوع",
                  "پیشنهاد برای برنامه‌ریزی و اتخاذ تصمیم‌های دقیق‌تر",
                ]}
              >
                <Link href={`/articles/${article.slug}`} className="block h-full">
                  <Card className="luxury-card h-full transition hover:border-gold/35">
                    <CardContent className="p-6">
                      <p className="text-xs font-semibold text-gold">{article.category}</p>
                      <h3 className="mt-2 text-lg font-bold text-vanilla">{article.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7">{article.excerpt}</p>
                      <p className="mt-4 text-xs text-secondary">
                        زمان مطالعه: {article.readingTimeMinutes.toLocaleString("fa-IR")} دقیقه
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </HoverTooltip>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({
  testimonials,
}: {
  testimonials: { id: string; name: string; role: string; quote: string; rating: number }[];
}) {
  return (
    <section id="testimonials" className="py-20">
      <div className="container">
        <SectionHeading
          eyebrow="رضایت موکلین"
          title="اعتمادی که با عمل ساخته می‌شود"
          description="بخشی از بازخورد موکلین گرامی که در مسیر پرونده‌هایشان همراهشان بوده‌ایم."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <HoverTooltip
                title={item.name}
                points={[
                  "بازخوردی از تجربه مشتری در مسیر پرونده و همکاری حقوقی",
                  "تأکید بر شفافیت، سرعت پاسخ‌دهی و پشتیبانی حرفه‌ای",
                  "نشان‌دهنده سطح رضایت و اعتماد به کیفیت خدمات",
                ]}
              >
                <Card className="luxury-card h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-sm font-bold text-gold">
                        {item.name.slice(0, 1)}
                      </div>
                      <div>
                        <p className="font-bold text-vanilla">{item.name}</p>
                        <p className="text-xs text-secondary">{item.role}</p>
                      </div>
                    </div>
                    <div className="mb-3 flex gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-sm leading-8 text-secondary">«{item.quote}»</p>
                  </CardContent>
                </Card>
              </HoverTooltip>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactCtaSection() {
  return (
    <section className="py-16">
      <div className="container">
        <Reveal>
          <div className="luxury-card rounded-3xl p-8 text-center md:p-12">
            <h2 className="text-3xl font-bold text-white">آماده دریافت مشاوره حقوقی هستید؟</h2>
            <p className="mx-auto mt-4 max-w-2xl text-secondary">
              همین امروز برای بررسی اولیه پرونده خود با وکلای مجرب موسسه تماس بگیرید. مشاوره اولیه رایگان است.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact#consult">مشاوره رایگان</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact">تماس با ما</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function MapSection({ mapEmbedUrl }: { mapEmbedUrl: string }) {
  return (
    <section className="pb-20">
      <div className="container">
        <SectionHeading title="موقعیت موسسه روی نقشه" />
        <div className="luxury-card overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <iframe
            title="نقشه گوگل — موسسه حقوقی نیماد فراز پارس"
            src={mapEmbedUrl}
            className="h-[360px] w-full md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
