/* eslint-disable @next/next/no-img-element */
import { MenuButton } from "@headlessui/react";
import labels from "../../../../lib/labels/navbar";
import useTheme from "@/hooks/useTheme";

const { openUserMenu } = labels;

const ProfileMenuButton = () => {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return null;
  }
  
  return (
    <MenuButton
      className={`profile-menu-button-base profile-menu-button ${theme}`}
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">{openUserMenu}</span>
      <img
        alt=""
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        className="h-8 w-8 rounded-full"
      />
    </MenuButton>
  );
};

export default ProfileMenuButton;
