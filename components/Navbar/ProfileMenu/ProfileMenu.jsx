"use client";

import { Button, Menu, MenuItem, MenuItems } from "@headlessui/react";
import privateRoutes from "../../../lib/routes/privateRoutes";
import ProfileMenuItem from "./ProfileMenuItem/ProfileMenuItem";
import ProfileMenuButton from "./ProfileMenuButton/ProfileMenuButton";
import useTheme from "@/hooks/useTheme";
import Icons from "@/components/Icons/Icons";
import Labels from "@/components/Labels/Labels";
import { useLabelsStore } from "@/store/globalStore";
const ProfileMenu = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const { currentLanguage, setLanguage } = useLabelsStore();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "es" ? "en" : "es";
    setLanguage(newLanguage);
  };

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
          <>
            <Button className="profile-menu-item w-full" onClick={toggleTheme}>
              <div className="flex gap-2 w-full items-center">
                <Icons
                  type={isDarkMode ? "sun" : "moon"}
                  className={"h-6 w-6"}
                />
                <span>
                  {isDarkMode ? (
                    <Labels labelFamily={"navbar"} label={"lightMode"} />
                  ) : (
                    <Labels labelFamily={"navbar"} label={"darkMode"} />
                  )}
                </span>
              </div>
            </Button>
            {process.env.NODE_ENV === "development" && (
              <Button className="profile-menu-item" onClick={toggleLanguage}>
                <Labels labelFamily={"navbar"} label={"language"} />
              </Button>
            )}
          </>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default ProfileMenu;
