"use client";

import { Button as HeadlessUIButton } from "@headlessui/react";
import useTheme from "@/hooks/useTheme";

const Button = ({ variant, children, onClick, className, options = false }) => {
  const { theme, mounted } = useTheme();
  const classes = `btn-${variant}-base btn-${variant} ${theme}`;

  if (!mounted) {
    return null;
  }

  const combinedClasses = `${!options.withOutDefaultClass ? classes : ""} ${className ? className : ""}`.trim();

  return (
    <HeadlessUIButton
      onClick={onClick}
      type="button"
      className={combinedClasses}
    >
      {children}
    </HeadlessUIButton>
  );
};

export default Button;
