import React, { Component } from 'react';
import MachineService from '../services/MachineService';
import RentService from '../services/RentService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class CreateRentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            date:'',
            customerName:'',
            nic:'',
            machineName:'',
            rentalFee:'',
            quantity:'',
            noOfDays:'',
            machines:[],

            dateError:'',
            customerNameError:'',
            nicError:'',
            machineNameError:'',
            rentalFeeError:'',
            quantityError:'',
            noOfDaysError:'',

            rentalFeeVError:'',

        }
        this.changeDateHandler =this.changeDateHandler.bind(this); 
        this.changeCustomerNameHandler =this.changeCustomerNameHandler.bind(this); 
        this.changeNicHandler =this.changeNicHandler.bind(this);
        this.changeMachineNameHandler =this.changeMachineNameHandler.bind(this); 
        this.changerentalFeeHandler =this.changerentalFeeHandler.bind(this);
        this.changeQuantityHandler =this.changeQuantityHandler.bind(this); 
        this.changeNoOfDaysHandler =this.changeNoOfDaysHandler.bind(this); 
        this.processRent =this.processRent.bind(this);
        
    }

    notify(){

        toast.success('Rent Details Added Successfully', {position: toast.POSITION.TOP_CENTER, autoClose: 2000})

    }

    validate = () =>{

        let dateError='';
        let customerNameError='';
        let nicError='';
        let machineNameError='';
        let rentalFeeError='';
        let quantityError='';
        let noOfDaysError='';

    if(!this.state.date){            
            dateError = "Please fill out this field";      
     }

     if(!this.state.customerName){            
        customerNameError = "Please fill out this field";
     }
     if(!this.state.nic){            
        nicError = "Please fill out this field";      
     }
     if(!this.state.machineName){            
        machineNameError = "Please fill out this field";      
    }

    if(!this.state.rentalFeeError){            
        rentalFeeError = "Please fill out this field";
    }
    if(!this.state.quantity){            
        quantityError = "Please fill out this field";      
    }
    if(!this.state.noOfDays){            
        noOfDaysError = "Please fill out this field";      
        }
     if(dateError||customerNameError||nicError||machineNameError||rentalFeeError||quantityError||noOfDaysError ){            

        this.setState({

            dateError, customerNameError , nicError,machineNameError,rentalFeeError,quantityError,noOfDaysError

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



    processRent = (e)=> {
        e.preventDefault();
        let rent ={date:this.state.date, customerName:this.state.customerName, nic:this.state.nic, 
            machineName:this.state.machineName, rentalFee:this.state.rentalFee,
            quantity:this.state.quantity, noOfDays:this.state.noOfDays, total:this.state.total};
        // console.log('rent =>' + JSON.stringify(rent));
        let rents = {date:this.state.date, customerName:this.state.customerName, nic:this.state.nic, 
            machineName:this.state.machineName, rentalFee:this.state.rentalFee,
            quantity:this.state.quantity, noOfDays:this.state.noOfDays, total:this.state.total};
        const isValid = this.validate() && this.FeeValidation();



        if(isValid){

            console.log('rent =>'+JSON.stringify(rent));

        RentService.createRent(rent).then(res =>{
            this.props.history.push('/rent-dashbord'); 
        });

    }
}
    
    changeDateHandler = (event)=> {
        this.setState({date: event.target.value});
    }

    changeCustomerNameHandler = (event)=> {
        this.setState({customerName: event.target.value});
    }

    changeNicHandler = (event)=> {
        this.setState({nic: event.target.value});
    }

    changeMachineNameHandler = (event)=> {
        this.setState({machineName: event.target.value});
    }

    changerentalFeeHandler = (event)=> {
        this.setState({rentalFee: event.target.value});
    }
    changeQuantityHandler = (event)=> {
        this.setState({quantity: event.target.value});
    }

    changeNoOfDaysHandler = (event)=> {
        this.setState({noOfDays: event.target.value});
    }


    cancel(){
        this.props.history.push('/rent-dashbord'); 
    }

    componentDidMount(){
        MachineService.getMachines().then((res)=>{
            this.setState({machines:res.data})
        });
        console.log(this.state.machines)
    }

    render() {
        return (
            
            <div>
                <div class="container">
                    <div class='p-4'></div>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-2" > 
                           <h3 className="text-center">New Rent</h3> 
                           <div className="card-body">
                               <form >
                                  <div className="form-group">
                                      <label>Date</label>
                                      <input type="date" placeholder="Date" name="date" className="form-control"
                                        value={this.state.date} onChange={this.changeDateHandler}/>

                                        <div style={{ fontSize: 14, color: "red" }}>{this.state.dateError}</div>
                                  </div>

                                  <div className="form-group">
                                  <label>Customer Name</label>
                                      <input placeholder="Customer Name" name="customerName" className="form-control"
                                        value={this.state.customerName} onChange={this.changeCustomerNameHandler}/>
                                         <div style={{ fontSize: 14, color: "red" }}>{this.state.customerNameError}</div>
                                       
                                  </div>

                                  <div className="form-group">
                                      <label>NIC</label>
                                      <input placeholder="NIC" name="nic" className="form-control"
                                        value={this.state.nic} onChange={this.changeNicHandler}/>
                                        <div style={{ fontSize: 14, color: "red" }}>{this.state.nicError}</div>
                                  </div> 

                                  <div className="form-group">
                                        <label>Select Machine</label>
                                        <select placeholder="Select Machine" id ="machineName" name="machineName"  value={this.state.machineName} className="form-control" onChange={this.changeMachineNameHandler}required>
                                            {this.state.machines.map((mach)=>{
                                                return <option value={mach.machineName}>{mach.machineName}</option>
                                            })}
                                        </select>
                                    </div>


                                  {/* <div className="form-group">
                                      <label>Select Machine</label>
                                      <input placeholder="Select Machine" name="machineName" className="form-control"
                                        value={this.state.machineName} onChange={this.changeMachineNameHandler}/>
                                  </div> */}

                                  <div className="form-group">
                                      <label>Rental Fee(Per Day)</label>
                                      <input placeholder="Rental Fee" name="rentalFee" className="form-control"
                                        value={this.state.rentalFee} onChange={this.changerentalFeeHandler}/>
                                         <div style={{ fontSize: 14, color: "red" }}>{this.state.rentalFeeError}</div>
                                  </div> 

                                  <div className="form-group">
                                      <label>Quantity</label>
                                      <input placeholder="Quantity" name="quantity" className="form-control"
                                        value={this.state.quantity} onChange={this.changeQuantityHandler}/>
                                         <div style={{ fontSize: 14, color: "red" }}>{this.state.quantityError}</div>
                                  </div>

                                  <div className="form-group">
                                      <label>No of Days</label>
                                      <input placeholder="No of Days" name="noOfDays" className="form-control"
                                        value={this.state.noOfDays} onChange={this.changeNoOfDaysHandler}/>
                                        <div style={{ fontSize: 14, color: "red" }}>{this.state.noOfDaysError}</div>
                                  </div>

            

                                  <div className="btnpanel">
                                  <button className="btn btn-success " onClick={this.processRent}>Process Rent</button>
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

export default CreateRentComponent;