import React, { useContext, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchTableData, setPage } from "../redux/slices/tableDataSlice";

const Table = ({ tableData, pagination }) => {
  const dispatch = useDispatch();
  const currentPage = pagination.page || 1;
  const entriesPerPage = pagination.size;

  if (!tableData || tableData.length === 0) 
    return <h1 className="text-center text-2xl my-5 font-semibold">No Data Found</h1>;

  const { data = [], total = 0 } = tableData; 
  const totalPages = Math.ceil(total / entriesPerPage) || 1; 

  // Function to handle page change
  const handlePageChange =  (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page numbers
    dispatch(setPage(page))
    const updatedPagination = {
      ...pagination,
      page: page,
    };
    dispatch(fetchTableData(updatedPagination));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mx-10 px-10 py-3">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b bg-gray-100">ID</th>
              <th className="py-2 px-4 border-b bg-gray-100">Title</th>
              <th className="py-2 px-4 border-b bg-gray-100">Rating</th>
              <th className="py-2 px-4 border-b bg-gray-100">Calories</th>
              <th className="py-2 px-4 border-b bg-gray-100">Fat</th>
              <th className="py-2 px-4 border-b bg-gray-100">Protein</th>
              <th className="py-2 px-4 border-b bg-gray-100">Sodium</th>
              <th className="py-2 px-4 border-b bg-gray-100">Tags</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b text-center">
                  {index + 1 + (currentPage - 1) * entriesPerPage}
                </td>
                <td className="py-2 px-4 border-b text-left">{value?.title}</td>
                <td className="py-2 px-4 border-b text-center">
                  {value?.rating === 0 ? '--' : value?.rating}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {value?.calories == 0 ? '--' : value?.calories}
                </td>
                <td className="py-2 px-4 border-b text-center">{value?.fat === 0 ? '--' : value.fat}</td>
                <td className="py-2 px-4 border-b text-center">
                  {value?.protein == 0 ? '--' : value?.protein}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {value?.sodium == 0 ? '--' : value?.sodium}
                </td>
                <td className="py-2 px-4 border-b text-left flex flex-wrap gap-2">
                  {value?.keywords?.map((key) => (
                    <div
                      key={key}
                      className="max-h-fit bg-cyan-200 px-2 py-1 rounded-md"
                    >
                      {key}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Control */}
        <div className="flex items-center justify-between border border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * entriesPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * entriesPerPage, total)}
                </span>{" "}
                of <span className="font-medium">{total}</span> results
              </p>
            </div>
            <div>
              <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              >
                <a
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset 
                  ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 && "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={currentPage === 1}
                >
                  <span className="sr-only">Previous</span>
                  <FaChevronLeft aria-hidden="true" className="h-5 w-5" />
                </a>
                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNum = index + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <a
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold cursor-pointer ${
                          pageNum === currentPage
                            ? "bg-blue-500 hover:bg-blue-400 text-white"
                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        } focus:z-20 focus:outline-offset-0`}
                      >
                        {pageNum}
                      </a>
                    );
                  }
                  if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return (
                      <span
                        key={pageNum}
                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
                <a
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                    currentPage === totalPages &&
                    "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={currentPage === totalPages}
                >
                  <span className="sr-only">Next</span>
                  <FaChevronRight aria-hidden="true" className="h-5 w-5" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
