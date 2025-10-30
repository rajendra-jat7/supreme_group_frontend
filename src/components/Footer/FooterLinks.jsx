"use client";
import React from "react";
import Link from "next/link";

function FooterLinks({ footerLinks }) {
  const handleRedirect = (category, linkItem) => {
    const slug = linkItem.toLowerCase().split(" ").join("-");

    if (category.title === "APPLICATIONS") {
      return `/applications/${slug}`;
    }

    if (linkItem === "LinkedIn") {
      return "https://www.linkedin.com/company/supreme-group-company/";
    }

    return `/${slug}`;
  };

  return (
    <>
      {footerLinks.map((category) => (
        <div
          key={category.title}
          className="p-2 flex flex-col gap-2 lg:gap-5 w-auto"
        >
          <div className="text-[16px] text-[#000000] font-bold w-max">
            {category.title}
          </div>

          {category.link.map((linkItem) => {
            const href = handleRedirect(category, linkItem);
            const isExternal = href.startsWith("http") || href === "#";

            return isExternal ? (
              <a
                key={linkItem}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-medium w-max cursor-pointer hover:underline transition-colors"
              >
                {linkItem}
              </a>
            ) : (
              <Link
                key={linkItem}
                href={href}
                className="text-[14px] font-medium w-max cursor-pointer hover:underline transition-colors"
              >
                {linkItem}
              </Link>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default FooterLinks;
