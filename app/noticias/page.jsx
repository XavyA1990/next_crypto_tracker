"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import Page from "@/components/Page/Page";
import { useCallback, useEffect, useState } from "react";
import NewsCardLayout from "@/components/CardLayout/NewsCardLayout";
import Spinner from "@/components/Spinner/Spinner";
import labels from "@/lib/labels/news";
import { useNewsPaginationStore } from "@/store/globalStore";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNews } from "@/services/news";
import PageTitle from "@/components/PageTitle/PageTitle";

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
  const onPageChange = useCallback(
    (page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  useEffect(() => {
    fetchNews(currentPage, setNews, setError, setLoading);
  }, [currentPage]);

  return (
    <Page>
      <PageTitle title={newsPageTitle} />
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
