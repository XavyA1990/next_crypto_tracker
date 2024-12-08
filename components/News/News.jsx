"use client";

import { useCallback, useEffect, useState } from "react";
import NewsCardLayout from "../CardLayout/NewsCardLayout";
import Pagination from "../Pagination/Pagination";
import { useNewsPaginationStore } from "@/store/globalStore";
import { fetchNews } from "@/services/news";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {currentPage, totalPages, setCurrentPage } = useNewsPaginationStore();
  
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
    <>
      <NewsCardLayout data={news} loadingCount={10} finalCardDifferent/>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default News;
