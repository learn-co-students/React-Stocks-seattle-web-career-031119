import React, { Component } from 'react';
import Stock from '../components/Stock'


class PortfolioContainer extends Component {
  constructor(props){
    super(props)
    this.state ={}
  }



  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
          this.props.portfolio.map(stock => {
            return < Stock key={stock.id} stock={stock} handleStock={this.props.removeStock} />
          } )
          }
      </div>
    );
  }

}

export default PortfolioContainer;
