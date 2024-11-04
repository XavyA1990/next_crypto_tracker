import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        })),
    }),
    {
      name: "theme-storage",
    }
  )
);

export const useMenuStore = create((set) => ({
  isModalLoginOpen: false,
  toggleModalLogin: () =>
    set((state) => ({
      isModalLoginOpen: !state.isModalLoginOpen,
    })),
}));

export const useNewsPaginationStore = create((set) => ({
  currentPage: 1,
  totalPages: 5,
  setCurrentPage: (currentPage) => set({ currentPage }),
  setTotalPages: (totalPages) => set({ totalPages }),
}));
  

export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
    }
  )
);
