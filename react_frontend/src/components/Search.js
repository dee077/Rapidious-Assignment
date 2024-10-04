import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchTableData, setTitle } from "../redux/slices/tableDataSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const { pagination } = useSelector((state) => state.tableData);

  const handleSearchChange = (e) => {
    const updatedTitle = e.target.value;
    setSearchTerm(e.target.value);
    dispatch(setTitle(updatedTitle));
    const updatedPagination = {
      ...pagination,
      title: updatedTitle,
    };
    dispatch(fetchTableData(updatedPagination));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setTitle(searchTerm));
      const updatedPagination = {
        ...pagination,
        title: searchTerm,
      };
      dispatch(fetchTableData(updatedPagination));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch, pagination]);

  return (
    <div className="flex justify-center w-1/2">
      <div className="w-full max-w-lg" ref={inputRef}>
        {/* Searchable Select Input */}
        <div className="rounded p-2 relative">
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Sreach Title"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full py-2 px-9 border border-gray-200 rounded active:outline-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
