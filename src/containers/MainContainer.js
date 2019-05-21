import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const API = 'http://localhost:3000/stocks'

class MainContainer extends Component {

  constructor() {
    super()
    this.state = {
      stocks: [],
      ownedStocks: [],
      filteredStocks: [],
      filter: "Price",
      type: "Tech"
    }

    this.fetchStocks = this.fetchStocks.bind(this)
    this.addStock = this.addStock.bind(this)
    this.sellStock = this.sellStock.bind(this)
    this.typeFilter = this.typeFilter.bind(this)
    this.grabIndustryFilter = this.grabIndustryFilter.bind(this)
    this.grabSortFilter = this.grabSortFilter.bind(this)

    this.fetchStocks()
  }

  fetchStocks() {
    fetch(API)
    .then(res => res.json())
    .then(stocks => {
      this.setState({
        stocks: stocks,
        filteredStocks: stocks
      })
      this.typeFilter()
    })
  }

  addStock(stock) {
    if (!this.state.ownedStocks.includes(stock)) {
      let ownedList = this.state.ownedStocks
      ownedList.push(stock)
      this.setState({
        ownedStocks: ownedList
      })
    }
  }

  sellStock(stock) {
    let index = this.state.ownedStocks.indexOf(stock)
    this.state.ownedStocks.splice(index, 1)
    this.setState({ownedStocks: this.state.ownedStocks})
  }

  grabIndustryFilter(ev) {
    this.setState({type: ev.target.value}, () => this.typeFilter())
  }

  grabSortFilter(ev) {
    this.setState({filter: ev.target.value}, () => this.typeFilter())
  }

  typeFilter() {
    let filtered = this.state.stocks.filter(stock => stock.type === this.state.type)
    if (this.state.filter === "Price") {
      filtered = filtered.sort((a,b) => a.price - b.price)
    }
    else {
      filtered = filtered.sort((a,b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
      })
    }
    this.setState({filteredStocks: filtered})
  }

  render() {
    return (
      <div>
        <SearchBar grabIndustryFilter={this.grabIndustryFilter} grabSortFilter={this.grabSortFilter} filter={this.state.filter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer
                stocks={this.state.filteredStocks}
                handleClick={this.addStock}
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
