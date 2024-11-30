"use client";

import useTheme from "@/hooks/useTheme";
import { DialogTitle } from "@headlessui/react";

const Text = ({
  variant,
  children,
  colorType,
  sizeVariant,
  customClasses,
  weight = "font-bold",
  dialogTitleVariant,
}) => {
  const { mounted, theme } = useTheme();

  if (!mounted) return null;

  switch (variant) {
    case "h1":
      return (
        <h1
          className={`${
            sizeVariant ? sizeVariant : "text-6xl md:text-7xl"
          }  ${colorType} py-5 ${weight} pb-10 ${theme} ${customClasses}`}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`${
            sizeVariant ? sizeVariant : "text-5xl"
          } ${weight} ${colorType} ${theme} ${customClasses}`}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`${
            sizeVariant ? sizeVariant : "text-4xl"
          } ${weight} ${colorType} ${theme} ${customClasses}`}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4
          className={`${
            sizeVariant ? sizeVariant : "text-3xl"
          } ${weight} ${colorType} ${theme} ${customClasses}`}
        >
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5
          className={`${
            sizeVariant ? sizeVariant : "text-2xl"
          } ${weight} ${colorType} ${theme} ${customClasses}`}
        >
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6
          className={`${
            sizeVariant ? sizeVariant : "text-xl"
          } ${weight} ${colorType} ${theme}`}
        >
          {children}
        </h6>
      );
    case "p":
      return (
        <p
          className={`${colorType} ${theme} ${
            sizeVariant ? sizeVariant : ""
          } ${customClasses} ${weight}`}
        >
          {children}
        </p>
      );
    case "dialogTitle":
      return (
        <DialogTitle
          as={dialogTitleVariant}
          className={`${
            sizeVariant ? sizeVariant : ""
          } ${colorType} ${theme} ${customClasses} ${weight}`}
        >
          {children}
        </DialogTitle>
      );
    case "span":
      return (
        <span
          className={`${colorType} ${theme} ${
            sizeVariant ? sizeVariant : ""
          } ${customClasses}`}
        >
          {children}
        </span>
      );
    default:
      return (
        <p
          className={`${colorType} ${theme} ${
            sizeVariant ? sizeVariant : ""
          } ${customClasses}`}
        >
          {children}
        </p>
      );
  }
};

export default Text;
