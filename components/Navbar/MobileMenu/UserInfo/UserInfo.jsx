/* eslint-disable @next/next/no-img-element */
"use client";

import useTheme from "@/hooks/useTheme";
import { useAuthStore } from "@/store/globalStore";

const UserInfo = ({ children }) => {
  const { theme, mounted } = useTheme();
  const user = useAuthStore((state) => state.user);
  if (!mounted) {
    return null;
  }
  return (
    <div className={`user-info-container-base user-info-container ${theme}`}>
      <div className="flex items-center px-4 sm:px-6">
        <div className="flex-shrink-0">
          <img
            alt={`${user.fullName} profile picture`}
            src={user.avatarUrl}
            className="h-10 w-10 rounded-full"
          />
        </div>
        <div className="ml-3">
          <div className={`user-name user-name-base ${theme}`}>
            {user.fullName}
          </div>
          <div className={`user-email user-email-base ${theme}`}>
            {user.email}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default UserInfo;
