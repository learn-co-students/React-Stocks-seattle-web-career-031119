import React from 'react'


const Stock = (props) => {

  // let handleClick = () => {
  //   props.buyStock(props.stock)
  // }

  return (
    <div onClick={() => {
        console.log("click")
        if(props.buyStock) {
          props.buyStock(props);
        }
        if(props.sellStock) {
          console.log("props", props)
          props.sellStock(props)
        }
      }} >
      { /* {console.log("A stock object:",props)} */ }

      <div className="card" >
        <div className="card-body" >
          <h5 className="card-title">
            {props.name}
            </h5>
          <p className="card-text">
            {props.type}{' - '}
            {props.ticker}{' - '}
            {props.price}
          </p>
        </div>
      </div>

    </div>
  )
};

export default Stock
