import React from "react";

const Search = ({handleSearch}) => {
  return (
    <div className="search-div">
      <input
        type="text"
        placeholder={"Search Workout"}
        onChange={(e) => {handleSearch(e.target.value)}}
      />
      <i className="search-icon"></i>
    </div>
  );
};

export default Search;
