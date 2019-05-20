import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'


const STOCKS_URL = 'http://localhost:3000/stocks'

class MainContainer extends Component {

  constructor() {
    super()

    this.state = {
      stocks: [],
      portfolio: [],
      filtered: []
    }

    fetch(STOCKS_URL)
    .then(resp => resp.json())
    .then(stocks => {
      this.setState({
        stocks: stocks,
        filtered: stocks
      })
    })
  }

  addStock = (stock) => {
    if (!this.state.portfolio.find(portStock => portStock.id === stock.id)) {
      const newPorfolio = [...this.state.portfolio, stock]
      this.setState({
        portfolio: newPorfolio
      })
    }
  }

  deleteStock = (stock) => {
    const newPorfolio = this.state.portfolio.filter(portStock => portStock.id !== stock.id)
    this.setState({
      portfolio: newPorfolio
    })
  }

  sortAlphabetically = () => {
    const alphaStocks = this.state.stocks.sort(this.compareNames)
    this.setState({
      stocks: alphaStocks
    })
  }


  compareNames = ( stock1, stock2 ) => {
   if ( stock1.name < stock2.name ){
     return -1;
   }
   if ( stock1.name > stock2.name ){
     return 1;
   }
   return 0;
  }

  sortPrice = () => {
    const priceStocks = this.state.stocks.sort(this.comparePrice)
    this.setState({
      stocks: priceStocks
    })
  }

  comparePrice = ( stock1, stock2 ) => {
   if ( stock1.price < stock2.price ){
     return -1;
   }
   if ( stock1.price > stock2.price ){
     return 1;
   }
   return 0;
  }


  filter = (ev) => {
    if (ev.target.value === 'all') {
      this.setState({
        filtered: this.state.stocks
      })
    } else {
      const filteredStocks = this.state.stocks.filter(stock => stock.type === ev.target.value)
      this.setState({
        filtered: filteredStocks
      })
    }
  }

  render() {
    return (
      <div>
        <SearchBar sortAlphabetically={this.sortAlphabetically} sortPrice={this.sortPrice} filter={this.filter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.filtered} onClick={this.addStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} onClick={this.deleteStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
