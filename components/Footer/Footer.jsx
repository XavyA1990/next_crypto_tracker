"use client";

import useTheme from "@/hooks/useTheme";
import labels from "@/lib/labels/footer";

const { disclaimer, trademark } = labels;

const YEAR = new Date().getFullYear();

const TRADEMARK_WITH_YEAR = trademark.replace('"year"', YEAR);

const Footer = () => {

  const { mounted, theme } = useTheme();

  if (!mounted) return null;
  return (
    <footer className={`background ${theme}`}>
      <div className="mx-auto max-w-7xl px-6 py-3 md:flex-col md:items-center md:justify-between lg:px-8">
        <p className={`${theme} mt-8 text-sm/6 normal-text md:order-1 md:mt-0`}>
          {disclaimer}
        </p>
        <p className={`${theme} mt-8 text-sm/6 normal-text md:order-1 md:mt-0`}>
          {TRADEMARK_WITH_YEAR}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
