"use client";

import useTheme from "@/hooks/useTheme";
import { DisclosureButton } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import labels from "@/lib/labels/navbar";

const { openMainMenu } = labels;

const MobileMenuButton = () => {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }
  return (
    <div className="-ml-2 mr-2 flex items-center md:hidden">
      <DisclosureButton
        className={`group mobile-menu-button-base mobile-menu-button ${theme}`}
      >
        <span className="absolute -inset-0.5" />
        <span className="sr-only">{openMainMenu}</span>
        <Bars3Icon
          aria-hidden="true"
          className="block h-6 w-6 group-data-[open]:hidden"
        />
        <XMarkIcon
          aria-hidden="true"
          className="hidden h-6 w-6 group-data-[open]:block"
        />
      </DisclosureButton>
    </div>
  );
};

export default MobileMenuButton;
