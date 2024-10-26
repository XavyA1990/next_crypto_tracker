import { MenuItem } from "@headlessui/react";
import Link from "next/link";
import PropTypes from "prop-types";

const ProfileMenuItem = ({ route }) => {
  return (
    <MenuItem>
      <Link
        href={route.href}
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
