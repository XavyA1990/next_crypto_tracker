"use client";

import useTheme from "@/hooks/useTheme";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ route }) => {
  const { theme, mounted } = useTheme();
  const pathname = usePathname();

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
      {route.name}
    </Link>
  );
};

export default NavLink;
