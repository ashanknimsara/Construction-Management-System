import React, { Component } from 'react';

class MachineryRentHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
        this.manageMachines = this.manageMachines.bind(this);
        this.machineryRent = this.machineryRent.bind(this);
    } 
    
    manageMachines() {
        this.props.history.push('/machines');
      }
         
    render() {
        return (
            
            <div style={{ marginLeft: '30%',marginRight: '30%' }}>
                 <button className="btn btn-success " onClick={this.manageMachines}style={{ marginRight: '10px' }}>Manage Machines</button>
            </div>
            
        );
    }
}

export default MachineryRentHome;