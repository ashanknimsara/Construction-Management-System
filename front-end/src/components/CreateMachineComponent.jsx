import React, { Component } from 'react';
import MachineService from '../services/MachineService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class CreateMachineComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            machineCode:'',
            machineName:'',
            rentalFee:'',

            machineCodeError:'',
            machineNameError:'',
            rentalFeeError:'',

            rentalFeeVError:'',

        }
        this.changeMachineCodeHandler =this.changeMachineCodeHandler.bind(this); 
        this.changeMachineNameHandler =this.changeMachineNameHandler.bind(this); 
        this.changerentalFeeHandler =this.changerentalFeeHandler.bind(this);
        this.saveMachine =this.saveMachine.bind(this); 
    }

    notify(){

        toast.success('Machine Added Successfully', {position: toast.POSITION.TOP_CENTER, autoClose: 2000})

    }

    validate = () =>{

        let machineCodeError='';
        let machineNameError='';
        let rentalFeeError='';

        if(!this.state.machineCode){            
            machineCodeError = "Please fill out this field";      
     }

     if(!this.state.machineName){            
        machineNameError = "Please fill out this field";
     }
     if(!this.state.rentalFee){            
        rentalFeeError = "Please fill out this field";      
     }
     if(machineCodeError||machineNameError||rentalFeeError ){            

        this.setState({

            machineCodeError, machineNameError , rentalFeeError

        });          
      return false;        
    }        
        return true;  
    }
    FeeValidation(){
        const regex = /^[0-9]+$/i;
       if (!this.state.rentalFee || regex.test(this.state.rentalFee) === false) {
        this.setState({
            rentalFeeVError: "You cannot Enter characters!"
        });
        return false;
        }
        return true;

    }



    saveMachine = (e)=> {
        e.preventDefault();
        let machine ={machineCode:this.state.machineCode, machineName:this.state.machineName, rentalFee:this.state.rentalFee};
        // console.log('machine =>' + JSON.stringify(machine));
        let machines = {machineCode:this.state.machineCode, machineName:this.state.machineName, rentalFee:this.state.rentalFee};
        const isValid = this.validate() && this.FeeValidation();

        if(isValid){

            console.log('machine =>'+JSON.stringify(machine));

        MachineService.createMachine(machine).then(res =>{
            this.props.history.push('/machines'); 
        });
    }

}
    
    changeMachineCodeHandler = (event)=> {
        this.setState({machineCode: event.target.value});
    }

    changeMachineNameHandler = (event)=> {
        this.setState({machineName: event.target.value});
    }

    changerentalFeeHandler = (event)=> {
        this.setState({rentalFee: event.target.value});
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
                                         <div style={{ fontSize: 14, color: "red" }}>{this.state.machineCodeError}</div>
                                  </div>

                                  <div className="form-group">
                                      <label>Machine Name</label>
                                      <input placeholder="Machine Name" name="machineName" className="form-control"
                                        value={this.state.machineName} onChange={this.changeMachineNameHandler}/>
                                        <div style={{ fontSize: 14, color: "red" }}>{this.state.machineNameError}</div>
                                  </div>

                                  <div className="form-group">
                                      <label>Rental Fee</label>
                                      <input placeholder="Rental Fee" name="rentalFee" className="form-control"
                                        value={this.state.rentalFee} onChange={this.changerentalFeeHandler}/>
                                        <div style={{ fontSize: 14, color: "red" }}>{this.state.rentalFeeError}</div>
                                        <div style={{ fontSize: 14, color: "red" }}>{this.state.rentalFeeVError}</div>
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