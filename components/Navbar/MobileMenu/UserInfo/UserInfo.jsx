/* eslint-disable @next/next/no-img-element */
"use client";

import useTheme from "@/hooks/useTheme";

const UserInfo = ({ children }) => {
  const { theme, mounted } = useTheme();
  if (!mounted) {
    return null;
  }
  return (
    <div
      className={`user-info-container-base user-info-container ${theme}`}
    >
      <div className="flex items-center px-4 sm:px-6">
        <div className="flex-shrink-0">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="h-10 w-10 rounded-full"
          />
        </div>
        <div className="ml-3">
          <div
            className={`user-name user-name-base ${theme}`}
          >
            Tom Cook
          </div>
          <div
            className={`user-email user-email-base ${theme}`}
          >
            tom@example.com
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default UserInfo;
