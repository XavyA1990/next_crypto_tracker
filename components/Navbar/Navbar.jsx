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
import { getUser, signIn } from "@/services/signIn";

const { login } = labels;

const Navbar = () => {
  const { theme, mounted } = useTheme();

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
              <Logo />
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {routes.map((route) => (
                <NavLink key={route.href} route={route} />
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Button
                variant="primary"
                onClick={() => signIn("facebook")}
              >
                {login}
              </Button>
            </div>
            <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
              <ProfileMenu />
            </div>
          </div>
        </div>
      </div>

      <MobileMenu />
    </Disclosure>
  );
};

export default Navbar;
