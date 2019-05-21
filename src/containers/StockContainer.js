import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.props.stocks.map( (stock, index) => {
            return (

                <Stock
                  key={index}
                  id={stock.id}
                  ticker={stock.ticker}
                  name={stock.name}
                  type={stock.type}
                  price={stock.price}
                  buyStock={this.props.buyStock}
                />

            )
          })
        }
      </div>
    );
  }

}

export default StockContainer;
