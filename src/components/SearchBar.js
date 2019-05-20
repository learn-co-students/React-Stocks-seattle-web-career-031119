import React from 'react';

const SearchBar = props => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" name="sortBy" value="Alphabetically" onChange={ev => props.onChange({sortBy: ev.target.value})}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" name="sortBy" value="Price" onChange={ev => props.onChange({sortBy: ev.target.value})}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={ev => props.onChange({stockType: ev.target.value})}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
