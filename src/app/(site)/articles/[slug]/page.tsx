import Link from "next/link";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { getAllArticles, getArticleBySlug, getAdjacentArticles, getRelatedArticles } from "@/lib/articles";
import { ReadingProgressBar } from "@/components/articles/reading-progress";
import { ShareButtons, TableOfContents } from "@/components/articles/article-tools";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(decodeURIComponent(slug));
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/articles/${article.slug}`,
    type: "article",
  });
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const [article, allArticles] = await Promise.all([getArticleBySlug(slug), getAllArticles()]);
  if (!article) notFound();

  const { prev, next } = getAdjacentArticles(allArticles, slug);
  const related = getRelatedArticles(allArticles, article);
  const url = `${SITE_URL}/articles/${encodeURIComponent(article.slug)}`;

  return (
    <>
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "خانه", path: "/" },
              { name: "مقالات", path: "/articles" },
              { name: article.title, path: `/articles/${article.slug}` },
            ])
          ),
        }}
      />
      <article className="py-24">
        <div className="container grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Card>
              <CardContent className="p-5">
                <h2 className="mb-3 font-bold text-vanilla">فهرست مطالب</h2>
                <TableOfContents items={article.toc} />
              </CardContent>
            </Card>
          </aside>

          <div>
            <p className="text-sm font-semibold text-gold">{article.category}</p>
            <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">{article.title}</h1>
            <p className="mt-3 text-sm text-secondary">
              زمان مطالعه تقریبی: {article.readingTimeMinutes.toLocaleString("fa-IR")} دقیقه
            </p>
            <div className="mt-5">
              <ShareButtons title={article.title} url={url} />
            </div>
            <div
              className="prose-legal mt-10"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />

            <div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-6 text-sm">
              {prev ? (
                <Link href={`/articles/${encodeURIComponent(prev.slug)}`} className="text-gold hover:underline">
                  ← مقاله قبلی: {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={`/articles/${encodeURIComponent(next.slug)}`} className="text-gold hover:underline">
                  مقاله بعدی: {next.title} →
                </Link>
              ) : null}
            </div>

            {related.length ? (
              <section className="mt-12">
                <h2 className="mb-4 text-2xl font-bold text-vanilla">مقالات مرتبط</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {related.map((item) => (
                    <Link key={item.slug} href={`/articles/${encodeURIComponent(item.slug)}`}>
                      <Card className="h-full transition hover:border-gold/30">
                        <CardContent className="p-4">
                          <p className="font-bold text-vanilla">{item.title}</p>
                          <p className="mt-2 line-clamp-3 text-xs leading-6 text-secondary">{item.excerpt}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </article>
    </>
  );
}
