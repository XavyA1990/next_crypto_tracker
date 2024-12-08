"use client";

import useTheme from "@/hooks/useTheme";
import { useLabelsStore } from "@/store/globalStore";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ route }) => {
  const { theme, mounted } = useTheme();
  const pathname = usePathname();
  const { currentLanguage } = useLabelsStore();

  if (!mounted) {
    return null;
  }
  return (
    <Link
      href={route.href}
      className={`${
        pathname === route.href && "is-active"
      } nav-link-base nav-link ${theme}`}
    >
      {route.name[currentLanguage]}
    </Link>
  );
};

export default NavLink;
