import Image from "next/image";
import { SectionHeading, Reveal } from "@/components/motion/primitives";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "درباره موسسه حقوقی نیماد فراز پارس",
  description:
    "آشنایی با تاریخچه، ماموریت، چشم‌انداز و ارزش‌های موسسه حقوقی نیماد فراز پارس؛ همراه شما در مسیر عدالت.",
  path: "/about",
});

export default async function AboutPage() {
  const data = await getSiteData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "خانه", path: "/" },
              { name: "درباره ما", path: "/about" },
            ])
          ),
        }}
      />
      <section className="py-24">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="درباره ما"
              title="موسسه حقوقی نیماد فراز پارس"
              description="ما با تکیه بر دانش حقوقی، تجربه قضایی و التزام به اخلاق حرفه‌ای، در کنار موکلین خود هستیم تا حقوقشان به بهترین شکل حفظ شود."
            />
            <p className="mt-6 leading-9 text-secondary">
              <strong className="text-gold">موسسه حقوقی نیماد فراز پارس</strong> با هدف ارائه خدمات حقوقی
              تخصصی، شفاف و قابل اتکا تشکیل شده است. تمرکز ما بر همراهی واقعی با موکل، از اولین جلسه مشاوره
              تا حصول نتیجه نهایی است.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <Image
                src={data.homepage.aboutImage}
                alt="محیط حرفه‌ای موسسه حقوقی"
                width={900}
                height={700}
                className="h-[360px] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="container mt-16 grid gap-5 md:grid-cols-2">
          {[
            {
              title: "تاریخچه",
              body: "این موسسه با گردهمایی وکلای پایه یک دادگستری و مشاوران حقوقی باتجربه شکل گرفت و طی سال‌ها فعالیت، در پرونده‌های گوناگون حقوقی و کیفری حضور فعال داشته است.",
            },
            {
              title: "ماموریت",
              body: "ماموریت ما حراست از حق موکل، ارائه مشاوره دقیق، وکالت مسئولانه و پیگیری مستمر پرونده‌ها با رعایت اصول اخلاق حرفه‌ای است.",
            },
            {
              title: "چشم‌انداز",
              body: "چشم‌انداز موسسه، تبدیل شدن به یکی از مراجع معتبر و مورداعتماد در ارائه خدمات حقوقی در سطح ملی با استانداردهای بین‌المللی است.",
            },
            {
              title: "ارزش‌ها",
              body: "تخصص، صداقت، شفافیت، احترام به موکل و تعهد به نتیجه‌گرایی، ارزش‌های بنیادین ما در تمامی مراحل همکاری هستند.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-vanilla">{item.title}</h2>
                  <p className="mt-3 leading-8 text-secondary">{item.body}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="container mt-16 rounded-3xl border border-gold/20 bg-card/60 p-8 md:p-10">
          <h2 className="text-2xl font-bold text-vanilla">معرفی حرفه‌ای</h2>
          <p className="mt-4 leading-9 text-secondary">
            تیم حقوقی موسسه در حوزه‌های مختلف از جمله{" "}
            <span className="font-semibold text-gold">دعاوی کیفری</span>،{" "}
            <span className="font-semibold text-gold">حقوق خانواده</span>،{" "}
            <span className="font-semibold text-gold">امور ملکی</span>،{" "}
            <span className="font-semibold text-gold">قراردادها</span> و{" "}
            <span className="font-semibold text-gold">حقوق شرکت‌ها</span> فعالیت دارد. ما باور داریم اعتماد
            موکل، ثمره شفافیت در ارتباط، دقت در تحلیل حقوقی و پیگیری جدی در مراجع قضایی است.
          </p>
        </div>
      </section>
    </>
  );
}
