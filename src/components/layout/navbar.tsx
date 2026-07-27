"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره ما" },
  { href: "/services", label: "خدمات" },
  { href: "/articles", label: "مقالات" },
  { href: "/#steps", label: "مراحل همکاری" },
  { href: "/#testimonials", label: "رضایت موکلین" },
  { href: "/contact", label: "تماس با ما" },
];

type NavbarProps = {
  brandName: string;
  logo: string;
};

export function Navbar({ brandName, logo }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-all duration-300",
        scrolled
          ? "bg-cosmic/80 shadow-[0_16px_46px_rgba(0,0,0,0.36)] backdrop-blur-2xl"
          : "bg-transparent backdrop-blur-none"
      )}
    >
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label={brandName}>
          <Image src={logo} alt={brandName} width={48} height={48} priority className="rounded-xl" />
          <span className="hidden text-sm font-bold text-vanilla sm:block md:text-base">{brandName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="منوی اصلی">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm text-secondary transition hover:bg-white/5 hover:text-gold hover:shadow-[0_8px_20px_rgba(201,164,77,0.14)]"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="mr-2">
            <Link href="/contact#consult">مشاوره رایگان</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white shadow-[0_10px_24px_rgba(0,0,0,0.2)] lg:hidden"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-cosmic/95 backdrop-blur-xl lg:hidden">
          <nav className="container flex flex-col gap-1 py-4" aria-label="منوی موبایل">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-secondary transition hover:bg-white/5 hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href="/contact#consult" onClick={() => setOpen(false)}>
                مشاوره رایگان
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
