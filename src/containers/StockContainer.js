import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {
  constructor (props){
    super(props)
    this.state={ }
  }
  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.props.stocks.map(stock => {
            return < Stock key={stock.id} stock={stock} handleStock={this.props.addStock}  />
          })
        }
      </div>
    );
  }

}

export default StockContainer;
