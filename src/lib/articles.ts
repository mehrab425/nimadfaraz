import fs from "fs/promises";
import path from "path";

export type ArticleTocItem = {
  level: number;
  text: string;
  id: string;
};

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  contentHtml: string;
  toc: ArticleTocItem[];
  readingTimeMinutes: number;
  publishedAt: string;
  updatedAt: string;
  sourceFile?: string;
};

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export async function getAllArticles(): Promise<Article[]> {
  const files = await fs.readdir(ARTICLES_DIR);
  const jsonFiles = files.filter((f) => f.endsWith(".json") && f !== "index.json");
  const articles = await Promise.all(
    jsonFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(ARTICLES_DIR, file), "utf8");
      return JSON.parse(raw) as Article;
    })
  );
  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const raw = await fs.readFile(path.join(ARTICLES_DIR, `${slug}.json`), "utf8");
    return JSON.parse(raw) as Article;
  } catch {
    return null;
  }
}

export async function getArticleCategories(): Promise<string[]> {
  const articles = await getAllArticles();
  return [...new Set(articles.map((a) => a.category))].sort();
}

export function getAdjacentArticles(
  articles: Article[],
  slug: string
): { prev: Article | null; next: Article | null } {
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? articles[index - 1] : null,
    next: index < articles.length - 1 ? articles[index + 1] : null,
  };
}

export function getRelatedArticles(articles: Article[], current: Article, limit = 3): Article[] {
  return articles
    .filter((a) => a.slug !== current.slug && a.category === current.category)
    .slice(0, limit);
}
