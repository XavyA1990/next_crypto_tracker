import { useThemeStore } from "@/store/globalStore";
import { useState, useEffect } from "react";

const useTheme = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    isDarkMode,
    toggleTheme,
    theme: isDarkMode ? "dark" : "light",
    mounted,
  };
};

export default useTheme;
