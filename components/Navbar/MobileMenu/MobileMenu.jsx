import { Button, DisclosurePanel } from "@headlessui/react";
import routes from "../../../lib/routes/routes";
import MobileMenuItem from "./MobileMenuItem/MobileMenuItem";
import UserInfo from "./UserInfo/UserInfo";
import privateRoutes from "../../../lib/routes/privateRoutes";
import ProfileMobileItem from "./ProfileMobileItem/ProfileMobileItem";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import useTheme from "@/hooks/useTheme";
import labels from "@/lib/labels/navbar";
import { useAuthStore } from "@/store/globalStore";

const { darkMode, lightMode } = labels;

const MobileMenu = () => {
  const { isDarkMode, toggleTheme, theme, mounted } = useTheme();
  const user = useAuthStore((state) => state.user);

  if (!mounted) {
    return null;
  }
  return (
    <DisclosurePanel className="md:hidden">
      <div className="space-y-1 pb-3 pt-2">
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
                {isDarkMode ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
                <span>{isDarkMode ? lightMode : darkMode}</span>
              </div>
            </Button>
          </div>
        </UserInfo>
      )}
    </DisclosurePanel>
  );
};

export default MobileMenu;
