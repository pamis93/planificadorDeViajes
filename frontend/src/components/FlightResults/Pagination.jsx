const Pagination = ({
  flightsPerPage,
  length,
  handlePagination,
  currentPage,
}) => {
  let paginationNumber = [];
  for (let i = 1; i <= Math.ceil(length / flightsPerPage); i++) {
    paginationNumber.push(i);
  }

  return (
    <div className="flex space-x-2">
      {paginationNumber.map((data) => (
        <button
          key={data}
          onClick={() => handlePagination(data)}
          className={`px-4 py-2 rounded-md border transition 
                        ${
                          currentPage === data
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }`}
        >
          {data}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
