"use client";

import Link from "next/link";
import { ArrowUp, MessageCircle, PhoneCall, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type FloatingActionsProps = {
  phone: string;
  whatsapp: string;
};

export function FloatingActions({ phone, whatsapp }: FloatingActionsProps) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tel = phone.replace(/-/g, "");

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3" aria-label="دکمه‌های شناور">
      <Link
        href="/contact#consult"
        className="group inline-flex items-center gap-2 rounded-full bg-gold px-4 py-3 text-sm font-bold text-cosmic shadow-[0_16px_36px_rgba(201,164,77,0.3)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(201,164,77,0.42)]"
      >
        <Sparkles className="h-4 w-4" />
        مشاوره رایگان
      </Link>
      <a
        href={`tel:${tel}`}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-card/90 px-4 py-3 text-sm text-white backdrop-blur transition hover:-translate-y-1 hover:border-gold hover:text-gold"
        aria-label="تماس"
      >
        <PhoneCall className="h-4 w-4" />
        تماس
      </a>
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-300"
        aria-label="واتساپ"
      >
        <MessageCircle className="h-4 w-4" />
        واتساپ
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-card/90 text-white backdrop-blur transition hover:-translate-y-1 hover:border-gold hover:text-gold",
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-label="بازگشت به بالا"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  );
}
