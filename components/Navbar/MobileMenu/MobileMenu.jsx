import { Button, DisclosurePanel } from "@headlessui/react";
import routes from "../../../lib/routes/routes";
import MobileMenuItem from "./MobileMenuItem/MobileMenuItem";
import UserInfo from "./UserInfo/UserInfo";
import privateRoutes from "../../../lib/routes/privateRoutes";
import ProfileMobileItem from "./ProfileMobileItem/ProfileMobileItem";
import useTheme from "@/hooks/useTheme";
import { useAuthStore, useLabelsStore } from "@/store/globalStore";
import Icons from "@/components/Icons/Icons";
import Labels from "@/components/Labels/Labels";

const MobileMenu = () => {
  const { isDarkMode, toggleTheme, theme, mounted } = useTheme();
  const { user } = useAuthStore();
  const { currentLanguage, setLanguage } = useLabelsStore();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "es" ? "en" : "es";
    setLanguage(newLanguage);
  };

  if (!mounted) {
    return null;
  }
  return (
    <DisclosurePanel className="md:hidden pb-3">
      <div className="space-y-1 pt-2">
        {routes.map((route) => (
          <MobileMenuItem key={route.href} route={route} />
        ))}
      </div>
      {user && user.avatarUrl && (
        <UserInfo>
          <div className="mt-3 space-y-1">
            {privateRoutes.map((route) => (
              <ProfileMobileItem key={route.name} route={route} />
            ))}
            <Button
              className={`profile-mobile-button-base profile-mobile-button ${theme} w-full`}
              onClick={toggleTheme}
            >
              <div className="flex gap-2 w-full items-center">
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
              </div>
            </Button>
          </div>
        </UserInfo>
      )}
      <Button
        className={`profile-mobile-button-base profile-mobile-button ${theme} w-full`}
        onClick={toggleLanguage}
      >
        <div className="flex gap-2 w-full items-center">
          <Labels labelFamily={"navbar"} label={"language"} />
        </div>
      </Button>
    </DisclosurePanel>
  );
};

export default MobileMenu;
