/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CryptoCardLayout from "@/components/CardLayout/CryptoCardLayout";
import Page from "@/components/Page/Page";
import PageTitle from "@/components/PageTitle/PageTitle";
import Pagination from "@/components/Pagination/Pagination";
import Spinner from "@/components/Spinner/Spinner";
import useTheme from "@/hooks/useTheme";
import { fetchCryptoCurrencies } from "@/services/crypto";
import { useCryptoStore } from "@/store/globalStore";
import { useCallback, useEffect, useState } from "react";

const Criptomonedas = () => {
  const [loading, setLoading] = useState();
  const setCryptocurrencies = useCryptoStore(
    (state) => state.setCryptocurrencies
  );
  const totalPages = useCryptoStore((state) => state.totalPages);
  const currentPage = useCryptoStore((state) => state.currentPage);
  const setCurrentPage = useCryptoStore((state) => state.setCurrentPage);
  const paginatedCryptocurrencies = useCryptoStore(
    (state) => state.paginatedCryptocurrencies
  );
  const setSearchQuery = useCryptoStore((state) => state.setSearchQuery);
  const searchQuery = useCryptoStore((state) => state.searchQuery);
  const { mounted, theme } = useTheme();

  useEffect(() => {
    setLoading(true);
    fetchCryptoCurrencies()
      .then((data) => {
        setCryptocurrencies(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onPageChange = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (!mounted) return null;

  return (
    <Page>
      <PageTitle title="Listado de Cryptos" />
      {!loading ? (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={`md:w-1/2 w-full p-2 border rounded-md text-input ${theme}`}
            />
          </div>
          <CryptoCardLayout cryptocurrencies={paginatedCryptocurrencies} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <Spinner />
      )}
    </Page>
  );
};

export default Criptomonedas;
