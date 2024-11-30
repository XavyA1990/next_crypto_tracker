"use client";

import useTheme from "@/hooks/useTheme";
import React from "react";

const Page = ({ children }) => {
  const { mounted, theme } = useTheme();
  return (
    <div className={`background-page ${theme} flex-1`}>
      <div
        className={`mx-auto max-w-7xl md:px-6 py-3 md:flex-col md:items-center md:justify-between lg:px-8 gap-8`}
      >
        {children}
      </div>
    </div>
  );
};

export default Page;
