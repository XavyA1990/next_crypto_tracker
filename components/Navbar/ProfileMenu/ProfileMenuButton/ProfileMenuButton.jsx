/* eslint-disable @next/next/no-img-element */
import { MenuButton } from "@headlessui/react";
import labels from "../../../../lib/labels/navbar";
import useTheme from "@/hooks/useTheme";
import { useAuthStore } from "@/store/globalStore";
import Image from "@/components/Image/Image";

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
        <Image alt="user profile picture" src={avatarUrl} className="h-8 w-8 rounded-full" width={32} height={32}/>
      </MenuButton>
    )
  );
};

export default ProfileMenuButton;
