import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor(props){
    super(props)
    this.state={
      stocks: [],
      portfolio: [],
      filtered: []
    }

    fetch("http://localhost:3000/stocks")
      .then(res => res.json())
      .then(stocks => {
        this.setState({ stocks })
      })
  }
  // handleClick = (stock) => {
  //   console.log('here')
  //   if(!this.state.portfolio.find(boughtStock => boughtStock.id === stock.id)) {
  //   console.log('hitting')
  //   const newPort= [...this.state.portfolio, stock]
  //     this.setState({
  //       portfolio: newPort
  //       },()=>console.log(this.state.portfolio))
  //     } else {
  //       console.log("removing")
  //         const newPort = this.state.portfolio.filter(boughtStock => boughtStock.id !== stock.id)
  //         this.setState({
  //           portfolio: newPort
  //           })
  //     }
  //   }
  addStock = (stock) => {
    console.log('here')
      if(!this.state.portfolio.find(boughtStock => boughtStock.id === stock.id)) {
        console.log('hitting')
        const newPort= [...this.state.portfolio, stock]
        this.setState({
          portfolio: newPort
        },()=>console.log(this.state.portfolio))
      }
    }

    removeStock = (stock) => {
      console.log("removing")
      const newPort = this.state.portfolio.filter(boughtStock => boughtStock.id !== stock.id)
      this.setState({
        portfolio: newPort
        })
      }

    filterByType =(ev) => {
      if (ev.target.value === 'all'){
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

    sortbyPrice =()=> {
    const stockPrice = this.state.stocks.sort(this.priceSortMethod)
      this.setState({
        stocks: stockPrice
      })
    }

    priceSortMethod= (s1, s2) => {
      if(s1.price < s2.price){
        return -1
      }
      if(s1.price > s2.price){
        return 1
      }
      return 0.
    }
    sortAlphabetically=() => {
    const azSorted = this.state.stocks.sort(this.stockSortMethod)
      this.setState({
        stocks: azSorted
      })
    }
    stockSortMethod =(s1, s2) =>{
      if(s1.name < s2.name){
        return -1;
      }
      if (s1.name > s2.name){
        return 1;
      }
      return 0
    }
  render() {
    return (
      <div>
        <SearchBar
          sortbyPrice={this.sortbyPrice}
          sortAlphabetically={this.sortAlphabetically}
          filtered={this.filtered}
        />
          {this.state.stocks.length}
          <div className="row">
            <div className="col-8">
              <StockContainer
              stocks={this.state.stocks}
              addStock={this.addStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer
              portfolio={this.state.portfolio}
              removeStock={this.removeStock}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
