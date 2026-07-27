import Link from "next/link";
import Image from "next/image";
import { Camera, Mail, Phone, Send } from "lucide-react";

type FooterProps = {
  brandName: string;
  slogan: string;
  logo: string;
  email: string;
  phones: string[];
  instagram: string;
  telegram: string;
};

export function Footer({ brandName, slogan, logo, email, phones, instagram, telegram }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[#1c1a24]">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image src={logo} alt={brandName} width={44} height={44} className="rounded-xl" />
            <div>
              <p className="font-bold text-vanilla">{brandName}</p>
              <p className="text-sm text-gold">{slogan}</p>
            </div>
          </div>
          <p className="text-sm leading-7 text-secondary">
            ارائه خدمات حقوقی تخصصی با تکیه بر تجربه، اخلاق حرفه‌ای و تعهد به منافع موکل.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-vanilla">دسترسی سریع</h3>
          <ul className="space-y-2 text-sm text-secondary">
            <li><Link href="/about" className="hover:text-gold">درباره ما</Link></li>
            <li><Link href="/services" className="hover:text-gold">خدمات</Link></li>
            <li><Link href="/articles" className="hover:text-gold">مقالات</Link></li>
            <li><Link href="/contact" className="hover:text-gold">تماس با ما</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-vanilla">خدمات</h3>
          <ul className="space-y-2 text-sm text-secondary">
            <li>دعاوی حقوقی و کیفری</li>
            <li>امور ملکی و ثبتی</li>
            <li>تنظیم قراردادها</li>
            <li>مشاوره حقوقی</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-vanilla">ارتباط با ما</h3>
          <ul className="space-y-3 text-sm text-secondary">
            {phones.map((phone) => (
              <li key={phone} className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <a href={`tel:${phone.replace(/-/g, "")}`} className="hover:text-gold">{phone}</a>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" />
              <a href={`mailto:${email}`} className="hover:text-gold">{email}</a>
            </li>
            <li className="flex items-center gap-3 pt-2">
              <a href={`https://instagram.com/${instagram}`} aria-label="اینستاگرام" className="rounded-lg border border-white/10 p-2 hover:border-gold hover:text-gold">
                <Camera className="h-4 w-4" />
              </a>
              <a href={`https://t.me/${telegram}`} aria-label="تلگرام" className="rounded-lg border border-white/10 p-2 hover:border-gold hover:text-gold">
                <Send className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-secondary">
        © {new Date().getFullYear()} {brandName}. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
}
