"use client";

import useTheme from "@/hooks/useTheme";
import { DisclosureButton } from "@headlessui/react";
import Icons from "@/components/Icons/Icons";
import Labels from "@/components/Labels/Labels";

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
        <span className="sr-only"><Labels labelFamily={"navbar"} label={"openMainMenu"}/></span>
        <Icons type="bars3" className="h-6 w-6 group-data-[open]:hidden" aria-hidden="true"/>
        <Icons type="xMark" className="h-6 w-6 group-data-[open]:block hidden" aria-hidden="true"/>
      </DisclosureButton>
    </div>
  );
};

export default MobileMenuButton;
