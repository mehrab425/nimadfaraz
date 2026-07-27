"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Article } from "@/lib/articles";
import { Reveal } from "@/components/motion/primitives";

type Props = {
  articles: Article[];
  categories: string[];
};

export function ArticlesExplorer({ articles, categories }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = category === "all" || article.category === category;
      const q = query.trim();
      const matchesQuery =
        !q ||
        article.title.includes(q) ||
        article.excerpt.includes(q) ||
        article.category.includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [articles, category, query]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div className="relative">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در مقالات..."
            aria-label="جستجو در مقالات"
            className="pr-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full px-4 py-2 text-sm ${category === "all" ? "bg-gold text-cosmic" : "border border-white/10 text-secondary"}`}
          >
            همه
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm ${category === cat ? "bg-gold text-cosmic" : "border border-white/10 text-secondary"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((article, index) => (
          <Reveal key={article.slug} delay={index * 0.03}>
            <Link href={`/articles/${encodeURIComponent(article.slug)}`} className="block h-full">
              <Card className="h-full transition hover:border-gold/35">
                <CardContent className="p-6">
                  <p className="text-xs font-semibold text-gold">{article.category}</p>
                  <h2 className="mt-2 text-xl font-bold text-vanilla">{article.title}</h2>
                  <p className="mt-3 line-clamp-4 text-sm leading-7">{article.excerpt}</p>
                  <p className="mt-4 text-xs text-secondary">
                    {article.readingTimeMinutes.toLocaleString("fa-IR")} دقیقه مطالعه
                  </p>
                </CardContent>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-secondary">مقاله‌ای با این فیلتر یافت نشد.</p>
      ) : null}
    </div>
  );
}
