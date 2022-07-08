import logo from './logo.svg';
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch}from 'react-router-dom'
import ListBudgetComponent from './components/ListBudgetComponent';
import CreateBudgetComponent from './components/CreateBudgetComponent';
import UpdateBudgetComponent from './components/UpdateBudgetComponent';

function App() {
  return (
    <Router>
      <div className="container">
       <switch> 
          <Route path ="/" exact component = {ListBudgetComponent}></Route>
          <Route path ="/Budget"  component = {ListBudgetComponent}></Route>                        
          <Route path ="/add-budget"  component = {CreateBudgetComponent}></Route> 
          <Route path ="/update-budget/:pid"  component = {UpdateBudgetComponent}></Route>                       

       </switch> 
      
      </div>
    </Router>
    
  );
}

export default App;
