import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  generateStocks = () => {
    return this.props.stocks.map(stock => <Stock key={stock.id} stock={stock} onClick={this.props.onClick}/>)
  }

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.generateStocks()}
      </div>
    );
  }

}

export default StockContainer;
