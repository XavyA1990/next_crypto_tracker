"use client";

import useTheme from "@/hooks/useTheme";
import { useLabelsStore } from "@/store/globalStore";
import { DisclosureButton } from "@headlessui/react";
import { usePathname } from "next/navigation";

const MobileMenuItem = ({ route }) => {
  const { theme, mounted } = useTheme();
  const { currentLanguage } = useLabelsStore();
  const pathname = usePathname();
  if (!mounted) {
    return null;
  }
  return (
    <DisclosureButton
      as="a"
      href={route.href}
      className={`${
        pathname === route.href && "is-active"
      } mobile-nav-link mobile-nav-link-base ${theme}`}
    >
      {route.name[currentLanguage]}
    </DisclosureButton>
  );
};

export default MobileMenuItem;
