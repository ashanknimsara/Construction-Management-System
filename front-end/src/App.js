import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListMachineComponent from './components/ListMachineComponent';
import CreateMachineComponent from './components/CreateMachineComponent';
import UpdateMachineComponent from './components/UpdateMachineComponent';
import MachineryRentHome from './components/MachineryRentHome';
import CreateRentComponent from './components/CreateRentComponent';
import ListRentComponent from './components/ListRentComponent';
import RentalReport from './components/RentalReport';
import ListBudgetComponent from './components/ListBudgetComponent';
import CreateBudgetComponent from './components/CreateBudgetComponent';
import UpdateBudgetComponent from './components/UpdateBudgetComponent';

function App() {
  return (
    <div>
      <Router>
       
        <div className='container'>
        <Switch>
            {/* <Route path="/" exact component ={ListMachineComponent}></Route> */}
            <Route path='/machines' component={ListMachineComponent}></Route>
            <Route path='/add-Machine' component={CreateMachineComponent}></Route>
            <Route path='/update-Machine/:id' component={UpdateMachineComponent}></Route>
            <Route path='/rent-dashbord' component={ListRentComponent}></Route>
            <Route path='/rent-Report' component={RentalReport}></Route>
            <Route path='/machine-home' component={MachineryRentHome}></Route>
            <Route path='/rent-Machine' component={CreateRentComponent}></Route>

            <Route path ="/Budget"  component = {ListBudgetComponent}></Route>                        
            <Route path ="/add-budget"  component = {CreateBudgetComponent}></Route> 
            <Route path ="/update-budget/:pid"  component = {UpdateBudgetComponent}></Route> 
            
            <Route path='/' component={MachineryRentHome}></Route>

            
          </Switch>
          
          
        </div>
       
      </Router>
    </div>
  );
}

export default App;
