"use client";

import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import MobileMenu from "./MobileMenu/MobileMenu";
import MobileMenuButton from "./MobileMenuButton/MobileMenuButton";
import NavLink from "./NavLink/NavLink";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import routes from "../../lib/routes/routes.json";
import useTheme from "@/hooks/useTheme";
import { getUser } from "@/services/auth";
import { useEffect } from "react";
import { useAuthStore, useLabelsStore, useMenuStore } from "@/store/globalStore";
import LoginModal from "./LoginModal/LoginModal";
import Container from "../Container/Container";
import Icons from "../Icons/Icons";
import Labels from "../Labels/Labels";

const Navbar = () => {
  const { toggleTheme, isDarkMode } = useTheme();
  const { user, setUser } = useAuthStore();
  const { toggleModalLogin } = useMenuStore();
  const { currentLanguage, setLanguage } = useLabelsStore();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    setLanguage(newLanguage);
  };

  useEffect(() => {
    getUser()
      .then((res) => {
        const user_data = {
          id: res.id,
          avatarUrl: res.avatar_url,
          email: res.email,
          fullName: res.full_name,
        };
        setUser(user_data);
      })
      .catch((err) => console.error(err));
  }, [setUser]);

  return (
    <Container type={"nav"} colorVariant={"primary"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <MobileMenuButton />
            <div className="flex flex-shrink-0 items-center">
              <Logo hasHref />
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
                    <Labels labelFamily={"commons"} label={"login"} />
                  </Button>
                </div>
                <div className="flex-shrink-0">
                  <Button
                    className="profile-menu-item w-full"
                    onClick={toggleTheme}
                  >
                    <Container
                      colorVariant={"none"}
                      customClasses={`flex gap-2 w-full items-center normal-text`}
                    >
                      <Icons
                        type={isDarkMode ? "sun" : "moon"}
                        className={"h-6 w-6"}
                      />
                      <span>
                        {" "}
                        {isDarkMode ? (
                          <Labels labelFamily={"navbar"} label={"lightMode"} />
                        ) : (
                          <Labels labelFamily={"navbar"} label={"darkMode"} />
                        )}
                      </span>
                    </Container>
                  </Button>
                </div>
                <div className="flex-shrink-0 hidden md:block">
                  <Button
                    className="profile-menu-item w-full"
                    onClick={toggleLanguage}
                  >
                    <Container
                      colorVariant={"none"}
                      customClasses={`flex gap-2 w-full items-center normal-text`}
                    >
                      <span><Labels labelFamily={"navbar"} label={"language"}/></span>
                    </Container>
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
    </Container>
  );
};

export default Navbar;
