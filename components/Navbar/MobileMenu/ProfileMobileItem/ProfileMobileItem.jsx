"use client";

import useTheme from "@/hooks/useTheme";
import { DisclosureButton } from "@headlessui/react";

const ProfileMobileItem = ({ route }) => {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }
  
  return (
    <DisclosureButton
      as="a"
      href={route.href}
      className={`profile-mobile-button-base profile-mobile-button ${theme}`}
    >
      {route.name}
    </DisclosureButton>
  );
};


export default ProfileMobileItem;
