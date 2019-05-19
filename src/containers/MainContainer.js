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
      ownedStocks: [],
      filteredStocks: [],
      sortBy: null
    }
    this.getStocks = this.getStocks.bind(this)
    this.addStock = this.addStock.bind(this)
    this.sellStock = this.sellStock.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleCheck = this.handleCheck.bind(this)

    this.getStocks()
  }

  getStocks() {
    fetch(URL)
    .then(res => res.json())
    .then(stocks => this.setState({stocks, filteredStocks: stocks}))
  }

  addStock(stock) {
    if (!this.state.ownedStocks.includes(stock)) {
      let ownedCopy = [...this.state.ownedStocks]
      ownedCopy.push(stock)
      this.setState({
        ownedStocks: ownedCopy
      })
    }
  }

  sellStock(stock) {
    let ownedCopy = this.state.ownedStocks.filter(s => {
      if (s !== stock) return s
    })
    this.setState({
      ownedStocks: ownedCopy
    })
  }

  handleFilter(ev) {
    ev.preventDefault()
    let stocksCopy = [...this.state.stocks]

    if (ev.target.value !== 'None') {
      stocksCopy = this.state.stocks.filter(stock => {
        if (stock.type === ev.target.value) return stock
      })
    }

    this.setState({
      filteredStocks: stocksCopy
    })
  }

  handleCheck(ev) {
    let stocksCopy = [...this.state.filteredStocks]
    if (ev.target.value === 'Alphabetically') {
      stocksCopy = this.state.filteredStocks.sort((a,b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
      })
    } else if (ev.target.value === 'Price') {
      stocksCopy = this.state.filteredStocks.sort((a,b) => {
        if (a.price > b.price) return 1
        if (a.price < b.price) return -1
      })
    }

    this.setState({sortBy: ev.target.value, filteredStock: stocksCopy})
  }

  render() {
    return (
      <div>
        <SearchBar
          handleFilter={this.handleFilter}
          handleCheck={this.handleCheck}
          sortBy={this.state.sortBy}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer
                stocks={this.state.filteredStocks}
                handleClick={this.addStock}
                filter={this.state.filter}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
                ownedStocks={this.state.ownedStocks}
                handleClick={this.sellStock}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
