"use client";
import { memo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import useTheme from "@/hooks/useTheme";
import labels from "@/lib/labels/pagination";

const { of, prev, next, showingPage } = labels;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { mounted, theme } = useTheme();
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

  if (endPage - startPage < maxPageNumbersToShow - 1) {
    startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  if (!mounted) return null;

  return (
    <div
      className={`flex items-center justify-between border-t background background-border ${theme} px-4 py-3 mt-3 sm:px-6 rounded-md shadow`}
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`relative ml-3 inline-flex items-center rounded-md border btn-with-border ${theme} px-4 py-2 text-sm font-medium`}
        >
          {prev}
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`relative ml-3 inline-flex items-center rounded-md border btn-with-border ${theme} px-4 py-2 text-sm font-medium`}
        >
          {next}
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className={`text-sm normal-text ${theme}`}>
            {showingPage} <span className="font-medium">{currentPage}</span>{" "}
            {of} <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav
            aria-label="Paginación"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset btn-with-border ${theme} focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">{prev}</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  page === currentPage
                    ? `z-10 btn-primary ${theme} `
                    : `ring-1 ring-inset btn-with-border ${theme}`
                } focus:z-20 focus:outline-offset-0`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset btn-with-border ${theme} focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">{next}</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default memo(Pagination);
