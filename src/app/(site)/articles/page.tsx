import { ArticlesExplorer } from "@/components/articles/articles-explorer";
import { SectionHeading } from "@/components/motion/primitives";
import { getAllArticles, getArticleCategories } from "@/lib/articles";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "مقالات حقوقی",
  description: "مجموعه مقالات تخصصی موسسه حقوقی نیماد فراز پارس در حوزه حقوق کیفری و مدنی.",
  path: "/articles",
});

export default async function ArticlesPage() {
  const [articles, categories] = await Promise.all([getAllArticles(), getArticleCategories()]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "خانه", path: "/" },
              { name: "مقالات", path: "/articles" },
            ])
          ),
        }}
      />
      <section className="py-24">
        <div className="container">
          <SectionHeading
            eyebrow="دانش حقوقی"
            title="مقالات و مطالب تخصصی"
            description="مطالب تهیه‌شده توسط تیم حقوقی موسسه درباره موضوعات پرتکرار و مهم حقوقی."
          />
          <ArticlesExplorer articles={articles} categories={categories} />
        </div>
      </section>
    </>
  );
}
