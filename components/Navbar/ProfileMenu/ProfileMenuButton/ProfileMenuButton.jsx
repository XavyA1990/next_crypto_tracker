/* eslint-disable @next/next/no-img-element */
import { MenuButton } from "@headlessui/react";
import labels from "../../../../lib/labels/navbar";
import useTheme from "@/hooks/useTheme";
import { useAuthStore } from "@/store/globalStore";

const { openUserMenu } = labels;

const ProfileMenuButton = () => {
  const { theme, mounted } = useTheme();

  const user = useAuthStore((state) => state.user);
  const { avatarUrl } = user;

  if (!mounted) {
    return null;
  }

  return (
    avatarUrl && (
      <MenuButton
        className={`profile-menu-button-base profile-menu-button ${theme}`}
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">{openUserMenu}</span>
        <img alt="" src={avatarUrl} className="h-8 w-8 rounded-full" />
      </MenuButton>
    )
  );
};

export default ProfileMenuButton;
