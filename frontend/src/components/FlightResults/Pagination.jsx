import React from 'react';
const Pagination = ({
  flightsPerPage,
  length,
  handlePagination,
  currentPage,
  scrollTargetRef,
}) => {
  const totalPages = Math.ceil(length / flightsPerPage);
  let paginationNumber = [];

  const addPage = (page) => {
    if (page > 0 && page <= totalPages && !paginationNumber.includes(page)) {
      paginationNumber.push(page);
    }
  };

  addPage(1);

  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    addPage(i);
  }

  addPage(totalPages);

  paginationNumber = [...new Set(paginationNumber)].sort((a, b) => a - b);

  const handlePageChange = (pageNumber) => {
    handlePagination(pageNumber);

    if (scrollTargetRef && scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {paginationNumber.map((data, index) => (
        <React.Fragment key={data}>
          {index > 0 && paginationNumber[index - 1] + 1 < data && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => handlePageChange(data)}
            className={`px-4 py-2 rounded-md border transition 
              ${
                currentPage === data
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
          >
            {data}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};
export default Pagination;
