import { signOut } from "@/services/auth";
import { MenuItem } from "@headlessui/react";
import Link from "next/link";
import PropTypes from "prop-types";
import { useAuthStore } from "@/store/globalStore";

const ProfileMenuItem = ({ route }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const handleSignOut = async () => {
    setUser(null);
    await signOut();
  };
  return (
    <MenuItem>
      <Link
        onClick={route.href !== "/cerrar-sesión" ? () => {} : () => handleSignOut()}
        href={route.href !== "/cerrar-sesión" ? route.href : "#"}
        className="profile-menu-item"
      >
        {route.name}
      </Link>
    </MenuItem>
  );
};

ProfileMenuItem.propTypes = {
  route: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }),
};

export default ProfileMenuItem;
