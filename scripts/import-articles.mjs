import fs from "fs/promises";
import path from "path";
import mammoth from "mammoth";

const MAGHALAT_DIR = path.join(process.cwd(), "..", "maghalat");
const OUT_DIR = path.join(process.cwd(), "content", "articles");

function slugify(title) {
  return title
    .trim()
    .replace(/\s+\(\d+\)$/, "")
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "")
    .toLowerCase();
}

function categoryFromTitle(title) {
  const criminal = [
    "سرقت",
    "قتل",
    "ضرب",
    "خیانت",
    "تصرف",
    "رابطه",
  ];
  if (criminal.some((k) => title.includes(k))) return "حقوق کیفری";
  return "حقوق مدنی";
}

function estimateReadingTime(html) {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function extractHeadings(html) {
  const headings = [];
  const re = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const level = Number(m[1]);
    const text = m[2].replace(/<[^>]+>/g, "").trim();
    if (!text) continue;
    const id = text.replace(/\s+/g, "-").replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "");
    headings.push({ level, text, id });
  }
  return headings;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const files = (await fs.readdir(MAGHALAT_DIR)).filter((f) => f.endsWith(".docx"));
  const articles = [];
  const usedSlugs = new Set();

  for (const file of files) {
    const rawTitle = file.replace(/\.docx$/i, "");
    const title = rawTitle.replace(/\s+\(\d+\)$/, "");
    const fullPath = path.join(MAGHALAT_DIR, file);
    const { value: html } = await mammoth.convertToHtml({ path: fullPath });
    let slug = slugify(rawTitle);
    if (usedSlugs.has(slug)) {
      slug = `${slug}-${usedSlugs.size}`;
    }
    usedSlugs.add(slug);
    const category = categoryFromTitle(title);
    const readingTime = estimateReadingTime(html);
    const excerpt = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 220);
    const toc = extractHeadings(html);

    const article = {
      slug,
      title,
      category,
      excerpt: excerpt + (excerpt.length >= 220 ? "…" : ""),
      contentHtml: html,
      toc,
      readingTimeMinutes: readingTime,
      publishedAt: "2025-01-15",
      updatedAt: new Date().toISOString().slice(0, 10),
      sourceFile: file,
    };

    await fs.writeFile(
      path.join(OUT_DIR, `${slug}.json`),
      JSON.stringify(article, null, 2),
      "utf8"
    );
    articles.push({ slug, title, category });
  }

  await fs.writeFile(
    path.join(OUT_DIR, "index.json"),
    JSON.stringify(articles, null, 2),
    "utf8"
  );

  console.log(`Imported ${articles.length} articles.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
