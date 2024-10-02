import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchTableData, setKeywords } from "../redux/slices/tableDataSlice";

const Select = ({ options }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false); 
  const inputRef = useRef(null); 
  const { pagination }  = useSelector((state) => state.tableData);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  
  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      const updatedOptions = [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
      dispatch(setKeywords(updatedOptions));
      const updatedPagination = {
        ...pagination, 
        keywords: updatedOptions,
      };
      // console.log("Updated Pagination:", updatedPagination);
      dispatch(fetchTableData(updatedPagination)); 
    }
    setSearchTerm(""); 
    setShowOptions(false); 
  };

  const handleRemoveOption = (option) => {
    const updatedOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedOptions); 
    dispatch(setKeywords(updatedOptions));
    const updatedPagination = {
      ...pagination,
      keywords: updatedOptions, 
    };
    // console.log("Updated Pagination after removal:", updatedPagination); 
    dispatch(fetchTableData(updatedPagination)); 
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg" ref={inputRef}>
        {/* Searchable Select Input */}
        <div className={`${!showOptions && ' border-white'} border rounded p-2 relative`}>
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </div>

          <input
            type="text"
            placeholder="Add keywords"
            value={searchTerm}
            onFocus={() => setShowOptions(true)} 
            onChange={handleSearchChange}
            className="w-full py-2 px-9 border border-gray-200 rounded active:outline-none focus:outline-none"
          />

          {/* Dropdown options: shown only when input is clicked */}
          {showOptions && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 max-h-40 overflow-y-auto mt-1 z-10 rounded-sm">
              {options
                .filter((option) =>
                  option.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((option, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-cyan-200 cursor-pointer"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Display Selected Options */}
        <div className="flex mt-4 flex-wrap gap-2">
          {selectedOptions.map((option, index) => (
            <div
              key={index}
              className="flex items-center bg-cyan-300 p-2 rounded"
            >
              <span className="">{option}</span>
              <button
                onClick={() => handleRemoveOption(option)}
                className="ml-2 text-red-600 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;
