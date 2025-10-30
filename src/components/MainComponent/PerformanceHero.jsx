"use client";
import React from "react";

const PerformanceHero = () => {
  return (
    <section className="relative min-h-[450px] lg:h-screen">
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/automotive.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 w-11/12 mx-auto grid place-content-center text-center gap-2 pt-16 md:pt-20 lg:pt-28">
        <p className="text-lg lg:text-2xl text-white font-light">
          Driven By Performance
        </p>

        <h1 className="text-white text-[28px] lg:text-5xl font-semibold">
          Soft trims and <span className="text-[#00befe]">NVH solutions</span>
        </h1>

        <p className="text-white text-[20px] lg:text-5xl font-light">
          for seamless rides
        </p>
      </div>
    </section>
  );
};

export default PerformanceHero;
