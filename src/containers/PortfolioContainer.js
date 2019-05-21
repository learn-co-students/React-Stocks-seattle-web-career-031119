import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.props.portfolio.map( (stock, index) => {
              return (

                  <Stock
                    key={index}
                    id={stock.id}
                    ticker={stock.ticker}
                    name={stock.name}
                    type={stock.type}
                    price={stock.price}
                    sellStock={this.props.sellStock}
                  />

              )
            })
          }
      </div>
    );
  }

}

export default PortfolioContainer;
