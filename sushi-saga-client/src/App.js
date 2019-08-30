import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

import SushiWallet from './components/SushiWallet';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor() {
    super()
    this.state = {
      sushis:[],
      remaining:300,
      plates:[],
      index:0

    }
  }
 
  isEaten=(id)=> {   
    this.setState(prev => {
      let newSushis = prev.sushis;
      let remain=prev.remaining 
      let newplates= prev.plates
      newSushis.map(sushi => {
        if(sushi.id === id) {
          if(remain>sushi.price) {
            sushi.isEaten =true
            remain= remain - sushi.price
            newplates.push(sushi)}
          }
        })
        return {sushis: newSushis,
          remaining: remain,
          plates: newplates}
      })
      
     
    }
  

  moreSushi=()=> {
    fetch(`${API}`)
    .then(res=>{
      return  res.json()
    })
    .then(data => {
      this.setState({
      index:this.state.index + 4,
      sushis:data
     })
  })
}


  componentDidMount(){
    fetch(`${API}`)
    .then(res=>{
      return res.json()
    })
    .then(data => {
      this.getEatenProperty(data)
      this.setState({ sushis:data}) 
    })  
  }


  getEatenProperty=(data)=>{
    data.map(sushi=> {
      return sushi.isEaten=false
    })
  }

  handleAddBalance= (e)=> {
       e.preventDefault();
       const value = e.target.add.value
       this.setState({
        remaining: this.state.remaining + parseInt(value)
      })
  }


  render() {
    return (
      <div className="app">
        <SushiContainer sushis={this.state.sushis.slice(
          this.state.index, this.state.index+4
        )} moreSushi={this.moreSushi}
        onEaten={this.isEaten}
        />
        <Table remain={this.state.remaining}
       plates={this.state.plates}  />

        <SushiWallet addBalance={this.handleAddBalance}/>
      </div>
    );
  }
}

export default App;