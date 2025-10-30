"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { tabs, carPartImages, truckPartImages } from "./Constants";

const HeroVideoDesktop = () => {
  const passengerVideoRef = useRef(null);
  const commercialVideoRef = useRef(null);
  const containerRef = useRef(null);

  const [activeTab, setActiveTab] = useState("passenger");
  const [selectedPart, setSelectedPart] = useState(carPartImages[0].title);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const partImages = useMemo(
    () => (activeTab === "passenger" ? carPartImages : truckPartImages),
    [activeTab]
  );

  const selectedVideo = useMemo(
    () => partImages.find((p) => p.title === selectedPart)?.video || "",
    [partImages, selectedPart]
  );

  const radius = 23;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    setSelectedPart(partImages[0].title);
  }, [partImages]);

  useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  let ticking = false;
  let lastScrollY = 0;
  let lockScroll = false;

  const handleWheel = (e) => {
    if (lockScroll) return;

    const deltaY = e.deltaY;
    lockScroll = true;

    setTimeout(() => {
      lockScroll = false;
    }, 1000); // Prevent flickering

    if (deltaY > 0 && activeTab === "passenger") {
      setActiveTab("commercial");
    } else if (deltaY < 0 && activeTab === "commercial") {
      setActiveTab("passenger");
    }
  };

  container.addEventListener("wheel", handleWheel, { passive: true });

  return () => container.removeEventListener("wheel", handleWheel);
}, [activeTab]);

  useEffect(() => {
    const video =
      activeTab === "passenger"
        ? passengerVideoRef.current
        : commercialVideoRef.current;
    if (!video) return;

    video.load();
    setProgress(0);
    video
      .play()
      .then(() => setIsPaused(false))
      .catch(() => setIsPaused(true));
  }, [selectedVideo, activeTab]);

  useEffect(() => {
    const video =
      activeTab === "passenger"
        ? passengerVideoRef.current
        : commercialVideoRef.current;

    if (!video) return;

    const updateProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(video.ended ? 100 : percent || 0);
      if (video.ended) setIsPaused(true);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [activeTab]);

  const togglePlayPause = () => {
    const video =
      activeTab === "passenger"
        ? passengerVideoRef.current
        : commercialVideoRef.current;

    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  const tabHeight = 125;

  return (
    <div
      ref={containerRef}
      className="hidden lg:grid grid-cols-[35%_65%] w-full max-w-[1536px] mx-auto relative py-20 h-screen overflow-hidden"
    >

      <div className="relative ml-40">
        <motion.div
          className="absolute left-0 w-[2px] bg-white"
          animate={{
            top: activeTab === "passenger" ? 0 : tabHeight,
          }}
          transition={{ duration: 0.5 }}
          style={{ height: `${tabHeight}px` }}
        />

        <div className="flex flex-col gap-10 border-l-2 border-white/30 pl-14 py-5 relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-left transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-white font-semibold"
                  : "text-white/30"
              }`}
            >
              <div className="text-[28px] font-medium ">{tab.title}</div>
              <div className="text-[18px] font-light">{tab.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-center h-[40vh]">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[580px] xl:w-[750px] 2xl:w-[900px] flex flex-col items-center justify-center gap-8"
          animate={{
            opacity: activeTab === "passenger" ? 1 : 0,
            pointerEvents: activeTab === "passenger" ? "auto" : "none",
          }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <video
            ref={passengerVideoRef}
            className="w-auto max-h-[360px] min-h-[230px] 2xl:h-[40vh]"
            autoPlay
            playsInline
            muted
          >
            <source
              src={
                activeTab === "passenger"
                  ? selectedVideo
                  : carPartImages[0].video
              }
              type="video/mp4"
            />
          </video>

          <div className="flex gap-30 items-center justify-center w-[640px] xl:w-[720px] 2xl:w-[900px]">
            <div className="flex gap-6">
              {partImages.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPart(item.title)}
                  className={`flex flex-col items-center hover:opacity-100 transition-opacity duration-200 cursor-pointer ${
                    selectedPart === item.title ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <div className="relative w-[80px] h-[80px]">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="mt-1 text-[12px] text-white font-light">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative inline-block z-50">
              <button
                type="button"
                onClick={togglePlayPause}
                className="p-3 2xl:p-4 rounded-full z-10 relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                >
                  {isPaused ? (
                    <path fill="white" d="M8 5v14l11-7z" />
                  ) : (
                    <path
                      fill="white"
                      d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2m6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2"
                    />
                  )}
                </svg>
              </button>

              <svg
                className="absolute top-0 left-0 z-0"
                width="100%"
                height="100%"
                viewBox="0 0 48 48"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2.5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  style={{ transition: "stroke-dashoffset 0.3s linear" }}
                />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[580px] xl:w-[750px] 2xl:w-[900px] flex flex-col items-center justify-center gap-8"
          animate={{
            opacity: activeTab === "commercial" ? 1 : 0,
            pointerEvents: activeTab === "commercial" ? "auto" : "none",
          }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <video
            ref={commercialVideoRef}
            className="w-auto max-h-[360px] min-h-[230px] 2xl:h-[40vh]"
            autoPlay
            playsInline
            muted
          >
            <source
              src={
                activeTab === "commercial"
                  ? selectedVideo
                  : truckPartImages[0].video
              }
              type="video/mp4"
            />
          </video>

          <div className="flex gap-30 items-center justify-center w-[640px] xl:w-[720px] 2xl:w-[900px]">
            <div className="flex gap-6">
              {partImages.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPart(item.title)}
                  className={`flex flex-col items-center hover:opacity-100 transition-opacity duration-200 cursor-pointer ${
                    selectedPart === item.title ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={80}
                    height={80}
                  />
                  <span className="mt-1 text-[12px] text-white font-light">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative inline-block z-50">
              <button
                type="button"
                onClick={togglePlayPause}
                className="p-3 2xl:p-4 rounded-full z-10 relative"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                >
                  {isPaused ? (
                    <path fill="white" d="M8 5v14l11-7z" />
                  ) : (
                    <path
                      fill="white"
                      d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2m6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2"
                    />
                  )}
                </svg>
              </button>

              <svg
                className="absolute top-0 left-0 z-0"
                width="100%"
                height="100%"
                viewBox="0 0 48 48"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2.5"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  style={{ transition: "stroke-dashoffset 0.3s linear" }}
                />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroVideoDesktop;
