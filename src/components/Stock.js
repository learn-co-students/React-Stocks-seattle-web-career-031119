import React from 'react'

const Stock = ({stockAction, stock}) => (
  <div>

    <div onClick={() => stockAction(stock)} className="card">
      <div className="card-body">
        <h5 className="card-title">{
            stock.name
          }</h5>
        <p className="card-text">{
            stock.price
          }</p>
      </div>
    </div>


  </div>
);

export default Stock
