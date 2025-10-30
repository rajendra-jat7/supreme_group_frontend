import ContactForm from "@/components/Form/ContactForm";
import HeroSlide from "@/components/VideoSection/HeroSlide";
import PerformanceHero from "@/components/MainComponent/PerformanceHero";

export default function Home() {
  return (
    <>
      <PerformanceHero />
      <HeroSlide />
      <ContactForm />
    </>
  );
}
