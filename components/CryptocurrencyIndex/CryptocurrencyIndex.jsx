"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import CryptoCardLayout from "../CardLayout/CryptoCardLayout";
import { useCryptoStore } from "@/store/globalStore";
import { fetchCryptoCurrencies } from "@/services/crypto";
import Input from "../Input/Input";

const CryptocurrencyIndex = () => {
  const [loading, setLoading] = useState(true);
  const {
    setCryptocurrencies,
    totalPages,
    currentPage,
    setCurrentPage,
    paginatedCryptocurrencies,
    searchQuery,
    setSearchQuery,
  } = useCryptoStore();

  useEffect(() => {
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

  return (
    <>
      <Input
        type={"text"}
        placeholder={"Buscar..."}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <CryptoCardLayout cryptocurrencies={paginatedCryptocurrencies} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default CryptocurrencyIndex;
