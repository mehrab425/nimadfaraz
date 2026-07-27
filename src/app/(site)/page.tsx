import { HeroSection, ServicesPreview } from "@/components/home/sections";
import {
  ContactCtaSection,
  CooperationStepsSection,
  LatestArticlesSection,
  MapSection,
  StatsSection,
  TestimonialsSection,
  WhyChooseUsSection,
} from "@/components/home/home-blocks";
import { getAllArticles } from "@/lib/articles";
import { getSiteData } from "@/lib/site-data";

export default async function HomePage() {
  const [data, articles] = await Promise.all([getSiteData(), getAllArticles()]);

  return (
    <>
      <HeroSection
        brandName={data.brand.name}
        slogan={data.brand.slogan}
        logo={data.brand.logo}
        heroImage={data.homepage.heroImage}
        heroGallery={data.homepage.heroGallery}
      />
      <ServicesPreview services={data.services} />
      <WhyChooseUsSection items={data.whyChooseUs} />
      <StatsSection statistics={data.statistics} />
      <CooperationStepsSection steps={data.cooperationSteps} />
      <LatestArticlesSection articles={articles} />
      <TestimonialsSection testimonials={data.testimonials} />
      <ContactCtaSection />
      <MapSection mapEmbedUrl={data.contact.mapEmbedUrl} />
    </>
  );
}
