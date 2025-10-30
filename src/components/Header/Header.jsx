"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="bg-[#F9FBFF] h-[80px] py-5 flex justify-between px-6 md:px-35 shadow-[0_0_94px_rgba(0,0,0,0.2)]">
        <Image
          src="/assets/logo.svg"
          height={41}
          alt="Supreme_Group_Img"
          width={146}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-blue-400"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="hidden md:flex gap-10">
          <button className="bg-[#5CD6FF] rounded-4xl text-black border-[#00BFFF] border-[1px] w-[145px]">
            Contact us
          </button>
          <Link
            href="https://www.linkedin.com/company/supreme-group-company/"
            target="_blank"
            className="py-2.5"
          >
            <Image
              src="/assets/linkedIn.png"
              alt="LinkedIn_Img"
              height={24}
              width={24}
            />
          </Link>
          <div className="py-2.5">
            <Image
              src="/assets/Language.png"
              height={22}
              width={52}
              alt="Language_Image"
            />
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden flex gap-8 sm:gap-30 space-y-2 bg-[#F9FBFF] p-4">
          <button className="bg-[#5CD6FF] rounded-4xl text-black border-[#00BFFF] border-[1px] w-[145px]">
            Contact us
          </button>
          <Link
            href="https://www.linkedin.com/company/supreme-group-company/"
            target="_blank"
          >
            <Image
              src="/assets/linkedIn.png"
              alt="LinkedIn_Img"
              height={24}
              width={24}
            />
          </Link>
          <div className="py-2.5">
            <Image
              src="/assets/Language.png"
              height={22}
              width={52}
              alt="Language_Image"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
