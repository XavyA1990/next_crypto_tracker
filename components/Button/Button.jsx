"use client";

import clsx from "clsx";
import { Button as HeadlessUIButton } from "@headlessui/react";
import useTheme from "@/hooks/useTheme";

const Button = ({ variant, children, onClick, className, options = false }) => {
  const { theme, mounted } = useTheme();
  const classes = `btn-${variant}-base btn-${variant} ${theme}`;

  if (!mounted) {
    return null;
  }

  return (
    <HeadlessUIButton
      onClick={onClick}
      type="button"
      className={clsx(
        !options.withOutDefaultClass && classes,
        className && className
      )}
    >
      {children}
    </HeadlessUIButton>
  );
};

export default Button;
