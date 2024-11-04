"use client";

import { Disclosure } from "@headlessui/react";
import Button from "../Button/Button";
import labels from "../../lib/labels/navbar";
import Logo from "../Logo/Logo";
import MobileMenu from "./MobileMenu/MobileMenu";
import MobileMenuButton from "./MobileMenuButton/MobileMenuButton";
import NavLink from "./NavLink/NavLink";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import routes from "../../lib/routes/routes.json";
import useTheme from "@/hooks/useTheme";
import { getUser } from "@/services/auth";
import { useEffect } from "react";
import { useAuthStore, useMenuStore } from "@/store/globalStore";
import LoginModal from "./LoginModal/LoginModal";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const { login, lightMode, darkMode } = labels;

const Navbar = () => {
  const { theme, mounted, toggleTheme, isDarkMode } = useTheme();

  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const toggleModalLogin = useMenuStore((state) => state.toggleModalLogin);

  useEffect(() => {
    getUser()
      .then((res) => {
        const user_data = {
          avatarUrl: res.avatar_url,
          email: res.email,
          fullName: res.full_name,
        };
        setUser(user_data);
      })
      .catch((err) => console.error(err));
  }, [setUser]);

  if (!mounted) {
    return null;
  }

  return (
    <Disclosure as="nav" className={`navbar-container ${theme}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <MobileMenuButton />
            <div className="flex flex-shrink-0 items-center">
              <Logo hasHref/>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {routes.map((route) => (
                <NavLink key={route.href} route={route} />
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {!user || !user.fullName ? (
              <>
                <div className="flex-shrink-0">
                  <Button variant="primary" onClick={() => toggleModalLogin()}>
                    {login}
                  </Button>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    className="profile-menu-item w-full"
                    onClick={toggleTheme}
                  >
                    <div className={`flex gap-2 w-full items-center normal-text ${theme}`}>
                      {isDarkMode ? (
                        <SunIcon className="h-6 w-6" />
                      ) : (
                        <MoonIcon className="h-6 w-6" />
                      )}
                      <span>{isDarkMode ? lightMode : darkMode}</span>
                    </div>
                  </Button>
                </div>
              </>
            ) : (
              <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                <ProfileMenu />
              </div>
            )}
          </div>
        </div>
      </div>

      {(!user || !user.fullName) && <LoginModal />}
      <MobileMenu />
    </Disclosure>
  );
};

export default Navbar;
