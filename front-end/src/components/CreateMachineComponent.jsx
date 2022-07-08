import React, { Component } from 'react';
import MachineService from '../services/MachineService';

class CreateMachineComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            machineCode:'',
            machineName:'',
            quantity:'',
            rentalFee:'',
            availableCount:''

        }
        this.changeMachineCodeHandler =this.changeMachineCodeHandler.bind(this); 
        this.changeMachineNameHandler =this.changeMachineNameHandler.bind(this); 
        this.changequantityHandler =this.changequantityHandler.bind(this); 
        this.changerentalFeeHandler =this.changerentalFeeHandler.bind(this);
        this.changeavailableCountHandler =this.changequantityHandler.bind(this); 
        this.saveMachine =this.saveMachine.bind(this); 
    }

    saveMachine = (e)=> {
        e.preventDefault();
        let machine ={machineCode:this.state.machineCode, machineName:this.state.machineName, quantity:this.state.quantity, rentalFee:this.state.rentalFee,availableCount:this.state.quantity};
        console.log('machine =>' + JSON.stringify(machine));

        MachineService.createMachine(machine).then(res =>{
            this.props.history.push('/machines'); 
        });
    }
    
    changeMachineCodeHandler = (event)=> {
        this.setState({machineCode: event.target.value});
    }

    changeMachineNameHandler = (event)=> {
        this.setState({machineName: event.target.value});
    }

    changequantityHandler = (event)=> {
        this.setState({quantity: event.target.value});
    }

    changerentalFeeHandler = (event)=> {
        this.setState({rentalFee: event.target.value});
    }
    changeavailableCountHandler = (event)=> {
        this.setState({availableCount: event.target.value});
    }

    cancel(){
        this.props.history.push('/machines'); 
    }

    render() {
        return (
            
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3" > 
                           <h3 className="text-center">Add Machine</h3> 
                           <div className="card-body">
                               <form>
                                  <div className="form-group">
                                      <label>Machine Code</label>
                                      <input placeholder="Machine Code" name="machineCode" className="form-control"
                                        value={this.state.machineCode} onChange={this.changeMachineCodeHandler}/>
                                  </div>

                                  <div className="form-group">
                                      <label>Machine Name</label>
                                      <input placeholder="Machine Name" name="machineName" className="form-control"
                                        value={this.state.machineName} onChange={this.changeMachineNameHandler}/>
                                  </div>

                                  <div className="form-group">
                                      <label>Quantity</label>
                                      <input placeholder="Quantity" name="quantity" className="form-control"
                                        value={this.state.quantity} onChange={this.changequantityHandler}/>
                                  </div> 

                                  <div className="form-group">
                                      <label>Rental Fee</label>
                                      <input placeholder="Rental Fee" name="rentalFee" className="form-control"
                                        value={this.state.rentalFee} onChange={this.changerentalFeeHandler}/>
                                  </div> 

                                  <div className="btnpanel">
                                  <button className="btn btn-success " onClick={this.saveMachine}>Save</button>
                                  <button className="btn btn-danger " onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                  </div>
                               </form>
                              
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateMachineComponent;