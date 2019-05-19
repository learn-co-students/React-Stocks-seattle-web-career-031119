import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const URL = "http://localhost:3000/stocks"

class MainContainer extends Component {

  constructor(){
    super()
    this.state = {
      stocks: [],
      myStocks: [],
      displayStocks: []
    }
  }

  componentDidMount(){
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        stocks: data,
        displayStocks: data
      })
    })
  }

  addStock = (stock) => {
    if(!this.state.myStocks.includes(stock)) {
      this.setState({
        myStocks: [...this.state.myStocks, stock]
      })
    }
  }

  removeStock = (stock) => {
    let newStocks = this.state.myStocks.filter((ss)=>{
      return ss !== stock
    })
    this.setState({
      myStocks: newStocks
    })
  }

  sortType = (event) => {
    let sortedStocks = this.state.displayStocks.filter((ss)=>{
      return event.target.value === ss.type
    })
    this.setState({
      stocks: sortedStocks
    })
  }

  sortAlphabet = () => {
    let sortedStocks = this.state.displayStocks
    sortedStocks.sort((stock1, stock2)=>{
      if(stock1.name === stock2.name) {
        return 0
      } else if (stock1.name < stock2.name) {
        return -1
      } else {
        return 0
      }
    })
    this.setState({
      stocks: sortedStocks
    })
  }

  sortPrice = () => {
    let sortedStocks = this.state.displayStocks
    sortedStocks.sort((stock1, stock2)=>{
      if(stock1.price === stock2.price) {
        return 0
      } else if (stock1.price < stock2.price) {
        return -1
      } else {
        return 0
      }
    })
    this.setState({
      stocks: sortedStocks
    })
  }

  render() {

const {stocks, myStocks} = this.state

    return (
      <div>
        <SearchBar
          sortType={this.sortType}
          sortAlphabet={this.sortAlphabet}
          sortPrice={this.sortPrice}
          />

          <div className="row">
            <div className="col-8">

              <StockContainer
                stocks={stocks}
                addStock={this.addStock}
                />

            </div>
            <div className="col-4">

              <PortfolioContainer
                myStocks={myStocks}
                removeStock={this.removeStock}
                />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
