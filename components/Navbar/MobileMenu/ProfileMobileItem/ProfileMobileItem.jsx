"use client";

import useTheme from "@/hooks/useTheme";
import { signOut } from "@/services/auth";
import { useAuthStore } from "@/store/globalStore";
import { DisclosureButton } from "@headlessui/react";

const ProfileMobileItem = ({ route }) => {
  const { theme, mounted } = useTheme();

  const { setUser } = useAuthStore();

  if (!mounted) {
    return null;
  }

  const handleSignOut = async () => {
    setUser(null);
    await signOut();
  };

  return (
    <DisclosureButton
      as="a"
      onClick={
        route.href !== "/cerrar-sesión" ? () => {} : () => handleSignOut()
      }
      href={route.href !== "/cerrar-sesión" ? route.href : "#"}
      className={`profile-mobile-button-base profile-mobile-button ${theme}`}
    >
      {route.name}
    </DisclosureButton>
  );
};

export default ProfileMobileItem;
