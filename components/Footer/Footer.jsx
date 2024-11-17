"use client";

import useTheme from "@/hooks/useTheme";
import labels from "@/lib/labels/footer";
import Text from "../Text/Text";

const { disclaimer, trademark } = labels;

const YEAR = new Date().getFullYear();

const TRADEMARK_WITH_YEAR = trademark.replace('"year"', YEAR);

const Footer = () => {
  const { mounted, theme } = useTheme();

  if (!mounted) return null;
  return (
    <footer className={`background ${theme}`}>
      <div className="mx-auto max-w-7xl px-6 py-3 md:flex-col md:items-center md:justify-between lg:px-8">
        <Text
          variant="p"
          colorType="text-white"
          customClasses="mt-8 normal-text md:order-1 md:mt-0"
          sizeVariant={"text-sm/6"}
        >
          {disclaimer}
        </Text>
        <Text
          variant="p"
          colorType="text-white"
          customClasses="mt-8 normal-text md:order-1 md:mt-0"
          sizeVariant={"text-sm/6"}
        >
          {TRADEMARK_WITH_YEAR}
        </Text>
      </div>
    </footer>
  );
};

export default Footer;
