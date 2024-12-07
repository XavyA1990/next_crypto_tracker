"use client";

import { useCallback, useEffect, useState } from "react";
import NewsCardLayout from "../CardLayout/NewsCardLayout";
import Pagination from "../Pagination/Pagination";
import { useNewsPaginationStore } from "@/store/globalStore";
import Spinner from "../Spinner/Spinner";
import { fetchNews } from "@/services/news";

const News = () => {
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

  if (loading) return <Spinner />;

  return (
    <>
      <NewsCardLayout data={news} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default News;
