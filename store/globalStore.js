import { create } from "zustand";
import { persist } from "zustand/middleware";
import labels from "@/lib/labels/labels.json";

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

export const useCryptoStore = create((set, get) => ({
  currentPage: 1,
  cryptocurrencies: [],
  filteredCryptocurrencies: [],
  paginatedCryptocurrencies: [],
  totalPages: 1,
  searchQuery: '',
  setCryptocurrencies: (cryptocurrencies) => {
    const { searchQuery } = get();
    const filteredCryptocurrencies = cryptocurrencies.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredCryptocurrencies.length / 10);
    const paginatedCryptocurrencies = filteredCryptocurrencies.slice(0, 10);

    set({
      cryptocurrencies,
      filteredCryptocurrencies,
      totalPages,
      currentPage: 1,
      paginatedCryptocurrencies,
    });
  },

  setSearchQuery: (searchQuery) => {
    const { cryptocurrencies } = get();
    const filteredCryptocurrencies = cryptocurrencies.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalPages = Math.ceil(filteredCryptocurrencies.length / 10);
    const paginatedCryptocurrencies = filteredCryptocurrencies.slice(0, 10);

    set({
      searchQuery,
      filteredCryptocurrencies,
      totalPages,
      currentPage: 1,
      paginatedCryptocurrencies,
    });
  },
  
  setCurrentPage: (currentPage) => {
    const { filteredCryptocurrencies, totalPages } = get();
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * 10;
    const paginatedCryptocurrencies = filteredCryptocurrencies.slice(
      startIndex,
      startIndex + 10
    );

    set({ currentPage, paginatedCryptocurrencies });
  },
}));

export const useFavoritesStore = create()(
  persist(
    (set) => ({
      favoritesLength: 0,
      setFavoritesLength: (length) => set({ favoritesLength: length }),
    }),
    {
      name: "favorites-storage",
    }
  )
);

export const useLabelsStore = create(
  persist(
    (set) => ({
      currentLanguage: 'en',
      labels: labels['en'],
      setLanguage: (lang) =>
        set({
          currentLanguage: lang,
          labels: labels[lang],
        }),
    }),
    {
      name: 'language-preference',
    }
  )
);