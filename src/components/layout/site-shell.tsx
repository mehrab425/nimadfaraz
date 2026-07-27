import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { getSiteData } from "@/lib/site-data";
import { organizationJsonLd } from "@/lib/seo";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const data = await getSiteData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <Navbar brandName={data.brand.name} logo={data.brand.logo} />
      <main className="flex-1">{children}</main>
      <Footer
        brandName={data.brand.name}
        slogan={data.brand.slogan}
        logo={data.brand.logo}
        email={data.contact.email}
        phones={data.contact.phones}
        instagram={data.contact.instagram}
        telegram={data.contact.telegram}
      />
      <FloatingActions phone={data.contact.phones[0]} whatsapp={data.contact.whatsapp} />
    </>
  );
}
