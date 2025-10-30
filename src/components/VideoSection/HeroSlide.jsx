import HeroVideoSlideMobile from "./HeroVideoSlideMobile";
import HeroVideoDesktop from "./HeroVideoDesktop";

const HeroVideoSlide = () => {
  return (
    <section className="bg-black w-full flex flex-col items-center justify-center text-center gap-10 py-15 lg:py-40 px-4">
      <h1 className="text-white text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-light text-center leading-10 lg:leading-15">
        Evolving the drive with <span className="font-bold">360-degree</span>
        <br className="hidden md:block"/> comprehensive solutions
      </h1>
      <HeroVideoDesktop />
      <HeroVideoSlideMobile />
    </section>
  );
};

export default HeroVideoSlide;
