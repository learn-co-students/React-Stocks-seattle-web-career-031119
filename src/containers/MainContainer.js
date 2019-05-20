import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  constructor(props){
    super(props)

    this.state = {
      stocks: [],
      filteredStocks: [],
      stockType: 'Tech',
      sortBy: 'Alphabetically',
      portfolio: []
    }

    fetch("http://localhost:3000/stocks")
    .then(res => res.json())
    .then(stocks => this.setState({stocks, filteredStocks: stocks}, this.filterStocks))

    this.buyStock = this.buyStock.bind(this)
    this.sellStock = this.sellStock.bind(this)
    this.changeFilter = this.changeFilter.bind(this)
    this.filterStocks = this.filterStocks.bind(this)
  }

  buyStock(stock){
    if(this.state.portfolio.indexOf(stock) >= 0){
      return
    }
    this.setState({
      portfolio: [...this.state.portfolio, stock]
    })
  }

  sellStock(stock){
    const stockIndex = this.state.portfolio.indexOf(stock)
    if(stockIndex >= 0){
      this.state.portfolio.splice(stockIndex, 1)
      this.setState({portfolio: this.state.portfolio})
    }
  }

  changeFilter(stateChange){
    this.setState(stateChange, this.filterStocks)
  }

  filterStocks(){
    let filteredStocks = this.state.stocks.filter(stock => stock.type === this.state.stockType)
    if(this.state.sortBy === 'Price'){
      filteredStocks = filteredStocks.sort((a,b) => a.price - b.price)
    } else {
      filteredStocks = filteredStocks.sort((a, b) => {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      })
    }
    window.fs= filteredStocks;
    console.log(filteredStocks)
    this.setState({filteredStocks})
  }

  render() {
    return (
      <div>
        <SearchBar onChange={this.changeFilter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer buyStock={this.buyStock} stocks={this.state.filteredStocks}/>

            </div>
            <div className="col-4">

              <PortfolioContainer sellStock={this.sellStock} stocks={this.state.portfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
