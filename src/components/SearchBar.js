import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={(props.filter === "Alphabetically" ? true : false)} onChange={(ev) => props.grabSortFilter(ev)}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={(props.filter === "Price" ? true : false)} onChange={(ev) => props.grabSortFilter(ev)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(ev) => props.grabIndustryFilter(ev)}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
