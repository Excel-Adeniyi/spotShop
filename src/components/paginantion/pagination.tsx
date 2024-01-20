import React, { useState } from "react";

interface PaginationProps {
  items: any[]; // Replace 'any[]' with the actual type of your items
  itemsPerPage: number;
  onPageChange?: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  items,
  itemsPerPage,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from(
    { length: Math.ceil(items.length / itemsPerPage) },
    (_, index) => index + 1
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (onPageChange) {
      onPageChange(pageNumber);
    }
  };

  return (
    <React.Fragment>
      {/* Display current page items */}
      {currentItems.map((item: any, index: any) => (
        <div key={index}>{item}</div>
      ))}

      {/* Pagination buttons */}
      <div>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => handlePageChange(number)}>
            {number}
          </button>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Pagination;
