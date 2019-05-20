import React, { Component } from 'react';
import Header from './components/Header'
import MainContainer from './containers/MainContainer'
const STOCKS = 'http://localhost:3000/stocks'

class App extends Component {
  constructor() {
    super()
    this.state={
      stocks: [],
      origStocks: [],
      portfolio: [],
      sortMethod: "none",
      filterValue: "none"
    }
  this.getStocks()
  }

  getStocks = () => {
    fetch(STOCKS)
      .then( res => res.json() )
      .then( stocks => {
        this.setState({stocks}) 
        this.setState({origStocks: stocks})
      })
  }

  buyStock = (stock) => {
    let stocks = this.state.stocks.filter( s => s.id !== stock.id)
    let portfolio = [...this.state.portfolio, stock]
    this.setState({stocks, portfolio})
  }

  sellStock = (stock) => {
    let portfolio = this.state.portfolio.filter( s => s.id !== stock.id)
    let stocks = [...this.state.stocks, stock]
    this.setState({stocks, portfolio})
  }

  sortStocks = (sortMethod) => {
    let stocks = this.state.stocks
    switch (sortMethod) {
      case 'alpha': stocks = stocks.sort( (a,b) => a.name.localeCompare(b.name) )
        break
      case 'price': stocks = stocks.sort( (a,b) => a.price - b.price )
        break
      case 'none': stocks = this.state.origStocks.filter( s => !this.state.portfolio.includes(s));
        break
      default: null
    }
    this.setState( {stocks, sortMethod} )
  }

  filterStocks = (ev) => {    
    let stocks = this.state.origStocks
    let filterValue = ev.target.value;
    filterValue !== 'None'
      ? stocks = stocks.filter( stock => stock.type === filterValue)
      : stocks = this.state.origStocks.filter( s => !this.state.portfolio.includes(s));
    this.setState({stocks, filterValue})
  }

  render() {
    return (
      <div>
        <Header/>
        <MainContainer 
          stocks={this.state.stocks}
          portfolio={this.state.portfolio}
          buyStock={this.buyStock}
          sellStock={this.sellStock}
          sortMethod={this.state.sortMethod}
          sortStocks={this.sortStocks}
          filterStocks={this.filterStocks}
        />
      </div>
    );
  }
}

export default App;
