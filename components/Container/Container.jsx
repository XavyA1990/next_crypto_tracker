"use client";

import useTheme from "@/hooks/useTheme";
import { DialogPanel, Disclosure } from "@headlessui/react";

const Container = ({ customClasses, children, type, colorVariant }) => {
  const { theme, mounted } = useTheme();

  let color = "";

  switch (colorVariant) {
    case "primary":
      color = "background";
      break;
    case "secondary":
      color = "background-secondary";
      break;
    case "pagination":
      color = "background background-border";
      break;
    case "none":
      color = "";
      break;
    default:
      color = "container-background";
      break;
  }

  const classes = `${color} ${theme} ${customClasses}`;

  if (!mounted) return null;

  switch (type) {
    case "footer":
      return <footer className={classes}>{children}</footer>;
    case "dialog":
      return (
        <DialogPanel transition className={classes}>
          {children}
        </DialogPanel>
      );
    case "nav":
      return (
        <Disclosure as="nav" className={classes}>
          {children}
        </Disclosure>
      );
    default:
      return (
        <div className={classes}>{children}</div>
      );
  }
};

export default Container;
