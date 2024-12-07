"use client";

import { Button, Menu, MenuItem, MenuItems } from "@headlessui/react";
import privateRoutes from "../../../lib/routes/privateRoutes";
import ProfileMenuItem from "./ProfileMenuItem/ProfileMenuItem";
import ProfileMenuButton from "./ProfileMenuButton/ProfileMenuButton";
import labels from "@/lib/labels/labels.json";
import useTheme from "@/hooks/useTheme";
import Icons from "@/components/Icons/Icons";

const { darkMode, lightMode } = labels.navbar;

const ProfileMenu = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <ProfileMenuButton isDarkMode={isDarkMode} />
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {privateRoutes.map((route) => (
          <ProfileMenuItem key={route.name} route={route} />
        ))}
        <MenuItem>
          <Button className="profile-menu-item w-full" onClick={toggleTheme}>
            <div className="flex gap-2 w-full items-center">
              <Icons type={isDarkMode ? "sun" : "moon"} className={"h-6 w-6"} />
              <span>{isDarkMode ? lightMode : darkMode}</span>
            </div>
          </Button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileMenu;
