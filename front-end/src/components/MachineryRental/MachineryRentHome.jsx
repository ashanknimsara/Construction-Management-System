import React, { Component } from 'react';

class MachineryRentHome extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }    
    render() {
        return (
            <div>
                 <button className="btn btn-success " onClick={this.saveMachine}>Save</button>
            </div>
        );
    }
}

export default MachineryRentHome;