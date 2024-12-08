import { useThemeStore } from "@/store/globalStore";
import { useState, useEffect } from "react";

const useTheme = () => {
  const {isDarkMode, toggleTheme} = useThemeStore();
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
