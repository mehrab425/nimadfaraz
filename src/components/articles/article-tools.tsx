"use client";

import { Link2, Share2 } from "lucide-react";
import type { ArticleTocItem } from "@/lib/articles";

export function ShareButtons({ title, url }: { title: string; url: string }) {
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-secondary">اشتراک‌گذاری:</span>
      <a
        href={`https://t.me/share/url?url=${encoded}&text=${text}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:border-gold hover:text-gold"
      >
        تلگرام
      </a>
      <a
        href={`https://wa.me/?text=${text}%20${encoded}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:border-gold hover:text-gold"
      >
        واتساپ
      </a>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(url)}
        className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs hover:border-gold hover:text-gold"
      >
        <Link2 className="h-3.5 w-3.5" />
        کپی لینک
      </button>
      <Share2 className="hidden" aria-hidden />
    </div>
  );
}

export function TableOfContents({ items }: { items: ArticleTocItem[] }) {
  if (!items.length) {
    return (
      <p className="text-sm text-secondary">
        فهرست مطالب به‌صورت خودکار از عناوین مقاله ساخته می‌شود.
      </p>
    );
  }

  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.id} style={{ paddingRight: item.level === 3 ? "1rem" : 0 }}>
          <a href={`#${item.id}`} className="text-secondary transition hover:text-gold">
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}
