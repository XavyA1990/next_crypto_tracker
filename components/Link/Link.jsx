"use client";

import React from "react";
import NextLink from "next/link";
import useTheme from "@/hooks/useTheme";

const Link = ({ children, href, className, target, variant }) => {
  const { theme, mounted } = useTheme();

  let classes = "";

  switch (variant) {
    case "primary":
      classes = `btn-primary ${theme}  inline-flex items-center px-3 py-2 rounded-md font-bold`;
      break;
    case "no-fill":
        classes = `text-sm/6 font-semibold text-title ${theme}`;
        break;
    case "no-styles":
        classes = ""
        break;
    case "white-fill":
        classes = `rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`;
        break;
    default:
      classes = `btn-primary ${theme}  inline-flex items-center px-3 py-2 rounded-md font-bold`;
      break;
  }

  if (!mounted) return null;
  
  return (
    <NextLink
      target={target}
      href={href}
      className={`${classes} ${className}`}
    >
      {children}
    </NextLink>
  );
};

export default Link;
