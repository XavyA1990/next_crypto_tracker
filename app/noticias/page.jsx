"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import Page from "@/components/Page/Page";
import { useCallback, useEffect, useState } from "react";
import NewsCardLayout from "@/components/NewsCardLayout/NewsCardLayout";
import Spinner from "@/components/Spinner/Spinner";
import labels from "@/lib/labels/news";
import { useNewsPaginationStore } from "@/store/globalStore";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNews } from "@/services/news";
import useTheme from "@/hooks/useTheme";

const { newsPageTitle } = labels;

const Noticias = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentPage = useNewsPaginationStore((state) => state.currentPage);
  const totalPages = useNewsPaginationStore((state) => state.totalPages);
  const setCurrentPage = useNewsPaginationStore(
    (state) => state.setCurrentPage
  );
  const { mounted, theme } = useTheme();
  const onPageChange = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  useEffect(() => {
    fetchNews(currentPage, setNews, setError, setLoading);
  }, [currentPage]);

  if (!mounted) return null;

  return (
    <Page>
      <h1 className={`text-7xl text-title ${theme} py-5 font-bold pb-10`}>
        {newsPageTitle}
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <NewsCardLayout data={news} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      )}
    </Page>
  );
};

export default Noticias;
