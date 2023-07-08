import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

function SearchBar() {
  return (
    <div className="bg-search-input-container-background flex items-center justify-center py-3 pl-5">
      <div className="bg-panel-header-background flex items-center  gap-5 px-3 py-1 rounded-lg flex-grow">
        <div>
          <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
        </div>
        <div>
          <input
            type="text"
            placeholder="Search or Start a new chat"
            className="bg-transparent text-sm focus:outline-none text-white w-full"
          />
        </div>
      </div>
      <div className="pr-5 pl-3">
        <BsFilter
          className="text-panel-header-icon cursor-pointer text-lg"
          ssss
        />
      </div>
    </div>
  );
}

export default SearchBar;
