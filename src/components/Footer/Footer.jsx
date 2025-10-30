import Image from "next/image";
import React from "react";
import FooterLinks from "./FooterLinks";
import Link from "next/link";
import GroupImg from "../../../public/assets/logo.svg";

const footerLinks = [
  {
    title: "APPLICATIONS",
    link: ["Apparel", "Automotive", "Filtration", "Customised Solution"],
  },
  {
    title: "COMPANY",
    link: ["Innovation", "Global Competency", "About Us", "Contact Us"],
  },
  {
    title: "MORE",
    link: ["Careers", "Privacy Policy", "Terms and Conditions"],
  },
  {
    title: "FOLLOW US",
    link: ["Twitter", "LinkedIn", "Instagram", "Medium"],
  },
];

function Footer() {
  return (
    <footer className='bg-[url("/assets/footer.jpg")] bg-cover bg-right-bottom lg:py-28 py-10 px-5'>
      <div className="max-w-[982px] mx-auto px-2">
        <Link href="/">
          <Image
            src={GroupImg}
            alt="Supreme Group Logo"
            className="h-10 md:h-12 w-auto cursor-pointer"
          />
        </Link>

        <div className="text-[#000000B2] gap-5 lg:gap-40 my-5 lg:my-20 grid grid-cols-2 md:grid-cols-4">
          <FooterLinks footerLinks={footerLinks} />
        </div>

        <div className="flex flex-col lg:flex-row text-[#000000B2] text-sm justify-between items-center gap-2">
          <p className="text-center">@2025 All Rights Reserved.</p>
          <p className="text-center">
            Supreme House: 110, 16th Road, Chembur, Mumbai – 400071.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
