import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import PropTypes from 'prop-types'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


export default class App extends Component {

  static defaultProps={
    pageItems : 5,
    country : "in",
    category : "general"
  }

  static propTypes={
    pageItems : PropTypes.number.isRequired,
    country : PropTypes.string.isRequired,
    category : PropTypes.string.isRequired
  }

  constructor(){
    super();
    this.state={
      category: "general",
      country: "in",
      activeButton: null
    }
    console.log(this.state.category);
  }

  changeCategory=(newcategory)=>{
    console.log(newcategory);
    this.setState({
      category:newcategory,
      activeButton:newcategory
    })
    console.log(newcategory);
  }

  changeCountry=(newcountry)=>{
    console.log(newcountry);
    this.setState({
      country:newcountry
    })
    this.forceUpdate();
  }

  styleChange=(category)=>{
    console.log(this.state.activeButton);
    console.log(this.state.category);
    if(this.state.activeButton===category){
      return {backgroundColor: "#6c757d", borderRadius: "5px"}
    }
    else{
      return null;
    }
  }

  render() {
    return (
      <Router>
          <Navbar styleChange={this.styleChange} category={this.state.category} selectedCategory={this.changeCategory} changeCountry={this.changeCountry}/>
          <Routes>
            <Route exact path="/" element={<News key="home" pageItems={8} country={this.state.country} category="general"/>} />
            <Route exact path={`/${this.state.category}`} element={<News key={`${this.state.category}-${this.state.country}`} pageItems={8} country={this.state.country} category={this.state.category}/> }/>
          </Routes>
      </Router>
    )
  }
}

