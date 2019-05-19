import React, { Component } from 'react';

const SearchBar = (props) => {


  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={(props.sortBy === "Alphabetically") ? true : false} onChange={props.handleCheck}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={(props.sortBy === "Price") ? true : false} onChange={props.handleCheck}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={props.handleFilter}>
          <option value="None">None</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );

}


export default SearchBar;
