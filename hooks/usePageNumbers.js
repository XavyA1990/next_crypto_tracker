const usePageNumbers = (currentPage, totalPages) => {
  const maxPageNumbersToShow = 5;
  const pageNumbers = [];

  if (totalPages <= maxPageNumbersToShow + 2) {
    // Mostrar todas las páginas si el total es pequeño
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Siempre mostrar la primera y última página
    pageNumbers.push(1);

    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (startPage <= 2) {
      startPage = 2;
      endPage = startPage + 2;
    } else if (endPage >= totalPages - 1) {
      endPage = totalPages - 1;
      startPage = endPage - 2;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};

export default usePageNumbers;
