"use client";
import { memo } from "react";
import useTheme from "@/hooks/useTheme";
import labels from "@/lib/labels/labels.json";
import usePageNumbers from "@/hooks/usePageNumbers";
import Text from "../Text/Text";
import Container from "../Container/Container";
import Icons from "../Icons/Icons";

const { of, prev, next, showingPage } = labels.pagination;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { mounted, theme } = useTheme();
  const pageNumbers = usePageNumbers(currentPage, totalPages);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (!mounted) return null;

  return (
    <Container
      customClasses={
        "flex items-center justify-between border-t px-4 py-3 mt-3 sm:px-6 rounded-md shadow"
      }
      colorVariant={"pagination"}
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
          <Text colorType={"normal-text"} sizeVariant={"text-sm"}>
            {showingPage} <span className="font-medium">{currentPage}</span>{" "}
            {of} <span className="font-medium">{totalPages}</span>
          </Text>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset btn-with-border ${theme} focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">{prev}</span>
              <Icons type={"chevronLeft"} className="h-5 w-5" aria-hidden="true"/>
            </button>
            {pageNumbers.map((page, index) => {
              return (
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
              );
            })}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset btn-with-border ${theme} focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">{next}</span>
              <Icons type={"chevronRight"} className="h-5 w-5" aria-hidden="true"/>
            </button>
          </nav>
        </div>
      </div>
    </Container>
  );
};

export default memo(Pagination);
