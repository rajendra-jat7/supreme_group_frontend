"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { carPartImages, truckPartImages } from "./Constants";

const VehicleSection = ({ title, subtitle, partImages }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className="lg:hidden w-full px-4 mt-6 flex flex-col items-center text-white gap-6">
      <div className="text-center mb-2">
        <h2 className="text-[#00b9ff] text-xl mb-1 font-semibold">{title}</h2>
        <p className="text-sm text-white/80">{subtitle}</p>
      </div>

      <div className="w-full max-h-[460px] rounded-md overflow-hidden cursor-grab">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          className="rounded-md"
        >
          {partImages.map((part, index) => (
            <SwiperSlide key={part.title}>
              <video
                className="w-full h-full object-contain rounded-md"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src={part.video} type="video/mp4" />
              </video>
              <p className="text-sm text-white mt-2 font-light text-center">
                {part.title}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-2 flex justify-center items-center gap-2">
        {partImages.map((part, index) => (
          <span
            key={part.title}
            onClick={() => {
              setActiveIndex(index);
              swiperRef.current?.slideTo(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              index === activeIndex ? "bg-[#00bfff] w-10" : "w-2 bg-[#003d53]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const HeroVideoSlideMobile = () => {
  return (
    <>
      <VehicleSection
        title="Passenger vehicles"
        subtitle="Revving up innovation from interior to exterior."
        partImages={carPartImages}
      />

      <VehicleSection
        title="Commercial vehicles"
        subtitle="Advancing engineering for heavy-duty vehicles."
        partImages={truckPartImages}
      />
    </>
  );
};

export default HeroVideoSlideMobile;
