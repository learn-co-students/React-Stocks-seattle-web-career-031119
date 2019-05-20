import React from 'react';


const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      {'    '}
      <label>
        <input type="radio" value="None" checked={props.sortMethod === 'none'} onChange={_ => props.sortStocks('none')} />
        None
      </label>
      {'    '}
      <label>
        <input type="radio" value="Alphabetically" checked={props.sortMethod === 'alpha'} onChange={_ => props.sortStocks('alpha')} />
        Alphabetically
      </label>
      {'    '}
      <label>
        <input type="radio" value="Price" checked={props.sortMethod === 'price'} onChange={_ => props.sortStocks('price')} />
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={props.filterStocks} value={props.filterValue}>
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
