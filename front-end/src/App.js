import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListMachineComponent from './components/ListMachineComponent';
import CreateMachineComponent from './components/CreateMachineComponent';
import UpdateMachineComponent from './components/UpdateMachineComponent';

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
            <Route path='/machine-home' component={MachineryRentHome}></Route>
            
            <Route path='/' component={MachineryRentHome}></Route>

            
          </Switch>
          
          
        </div>
       
      </Router>
    </div>
  );
}

export default App;
