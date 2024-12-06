"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import CryptoCardLayout from "../CardLayout/CryptoCardLayout";
import { useCryptoStore } from "@/store/globalStore";
import { fetchCryptoCurrencies } from "@/services/crypto";
import Spinner from "../Spinner/Spinner";
import Input from "../Input/Input";

const CryptocurrencyIndex = () => {
  const [loading, setLoading] = useState(true);
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

  if (loading) return <Spinner />;

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
