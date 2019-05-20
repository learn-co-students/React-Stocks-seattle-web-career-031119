import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" name='radioSort' value="Alphabetically" checked={null} onChange={props.sortAlphabetically}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" name='radioSort' value="Price" checked={null} onChange={props.sortPrice}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={props.filter}>
          <option value="all">Select:</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
