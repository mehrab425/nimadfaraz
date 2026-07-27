import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: "موسسه حقوقی نیماد فراز پارس",
  description:
    "موسسه حقوقی نیماد فراز پارس — ارائه خدمات حقوقی تخصصی، مشاوره رایگان، وکالت در دعاوی مدنی و کیفری. حراست از حق، رسالت ماست.",
  path: "/",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
