import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
const URL = 'http://localhost:3000/stocks'

class MainContainer extends Component {
  constructor() {
    super()
    this.state = {
      stocks: [],
      filteredStocks: [],
      portfolio: [],
      sortType: "Alphabetically"
    }
    this.getStocks()
  }

  sort = (ev) => {
    console.log(ev.target.value)
    if (ev.target.value === "Alphabetically") {
      this.sortByAlpha()
    } else if (ev.target.value === "Price") {
      this.sortByPrice()
    }
    this.setState({
      sortType: ev.target.value
    })
  }

  sortByAlpha = () => {
    console.log("Alpha test")
    let array = this.state.stocks
    array.sort((item1, item2) => {
      console.log("item1:", item1);
      console.log("item2:", item2);
      if (item1.name === item2.name) {
        return 0
      } else if (item1.name < item2.name) {
        return -1
      } else {return 1
    }})
  }

  sortByPrice = () => {
    console.log("Price test")
    let array = this.state.stocks
    array.sort((item1, item2) => {
      console.log("item1:", item1);
      console.log("item2:", item2);
      if (item1.price === item2.price) {
        return 0
      } else if (item1.price < item2.price) {
        return -1
      } else {return 1
    }})
  }

  // tradeStock = (stock) => {
  //   this.state.portfolio.includes(stock) ? this.sellStock(stock) : this.buyStock(stock)
  // }

  buyStock = (stock) => {
    console.log("Bought Stock", stock)
    this.setState({
      portfolio: [...this.state.portfolio, stock]
    })
  }

  sellStock = (newStock) => {
    console.log("array1", array)
    let array = this.state.portfolio.filter(stock => stock.id !== newStock.id)
    console.log("array2", array)
    this.setState({
      portfolio: array
    });
  }

  filterStocks = (ev) => {
    let array = this.state.stocks.filter(stock => stock.type.includes(ev.target.value))
    console.log("array", array)
    this.setState({
      filteredStocks: array
    });
  }

  getStocks() {
    fetch(URL)
    .then(res => res.json())
    .then(stocks => {
      this.setState({
        stocks: stocks,
        filteredStocks: stocks
      })
    })
  }

  render() {
    return (
      <div>
        <SearchBar sortType={this.state.sortType} sort={this.sort} filterStocks={this.filterStocks} />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.filteredStocks} buyStock={this.buyStock} />

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} sellStock={this.sellStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
