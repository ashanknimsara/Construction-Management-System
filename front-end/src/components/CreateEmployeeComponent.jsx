import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeService from '../Services/EmployeeService';


class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            empName: '',
            address:'',
            contactNo: '',
            nic: '',
            empType: '',

            //error variables
            empNameError:'',
            addressError:'',
            contactNoError: '',
            nicError: '',
            empTypeError: '',
            contactvError: '',
            NICError:''
        }  
        this.changeempNameHandler = this.changeempNameHandler.bind(this);
        this.changeaddressHandler = this.changeaddressHandler.bind(this);
        this.changecontactNoHandler = this.changecontactNoHandler.bind(this);
        this.changenicHandler = this.changenicHandler.bind(this);
        this.changeempTypeHandler = this.changeempTypeHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.cancel = this.cancel.bind(this);    
    }

    notify(){
        toast.success('Employee Details Added Successfully', {position: toast.POSITION.TOP_CENTER, autoClose: 2000})
    }
    validate = () =>{
        let empNameError='';
        let addressError='';
        let contactNoError='';
        let nicError='';
        let empTypeError='';
                
        if(!this.state.empName){
            empNameError = "Please fill out this field"; 
        }
        if(!this.state.address)
        {
            addressError = "Please fill out this field";
        }
        if(!this.state.contactNo){
            contactNoError = "Please fill out this field"; 
        } 
        else if(this.state.contactNo.length>10 || this.state.contactNo.length<10){
            contactNoError = "Enter valid phone number"; 
        }
        if(!this.state.nic)
        {
            nicError = "Please fill out this field";
        }
        if(!this.state.empType){
            empTypeError = "Please fill out this field"; 
        }
        if(empNameError||addressError||contactNoError || nicError|| empTypeError){
            this.setState({empNameError,addressError ,contactNoError, nicError,empTypeError });
            return false; 
        }
        return true;
    }

    contactNumberValidation(){
        const regex = /^[0-9]+$/i;  
        if (!this.state.contactNo || regex.test(this.state.contactNo) === false) {   
            this.setState({
                contactvError: "You cannot Enter characters!" 
            });     
        return false;
    }
        return true;
    }

    NicValidation(){
        const regex = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/i;  
        if (!this.state.nic || regex.test(this.state.nic) === false) {   
            this.setState({
                NICError: "Enter valid NIC!" 
            });     
        return false;
    }
        return true;
    } 

    saveEmployee=(e) =>{
        e.preventDefault();
        let employee = {empName: this.state.empName, address: this.state.address, contactNo: this.state.contactNo,
        nic: this.state.nic, empType: this.state.empType};
        //console.log('employee => '+ JSON.stringify(employee));
        let employees = {empName: this.state.empName, 
            address: this.state.address, 
            contactNo: this.state.contactNo,
            nic: this.state.nic, 
            empType: this.state.empType};
        const isValid = this.validate() && this.contactNumberValidation() && this.NicValidation();

        if(isValid){
            console.log('employee => '+ JSON.stringify(employee));

        EmployeeService.createEmployee(employee).then(res =>{
            this.notify();
            this.props.history.push(`/employee`)
        });
    }}

    changeempNameHandler=(event) =>{
        this.setState({empName: event.target.value});
    }
    changeaddressHandler=(event) =>{
        this.setState({address: event.target.value});
    }
    changecontactNoHandler=(event) =>{
        this.setState({contactNo: event.target.value});
    }
    changenicHandler=(event) =>{
        this.setState({nic: event.target.value});
    }
    changeempTypeHandler=(event) =>{
        this.setState({empType: event.target.value});
    }
    cancel=() =>{
        this.props.history.push('/employee');
    }
    
    render() {
        return (
            <div  className='container'>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Add Employee</h3>                  
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>Employee Name</label>
                                    <input placeholder='Employee Name' name="empName" className='form-control'
                                    value= {this.state.empName} onChange={this.changeempNameHandler} />
                                     <div style={{ fontSize: 14, color: "red" }}>{this.state.empNameError}</div>
                                </div>
                                <div className='form-group'>
                                    <label>Address</label>
                                    <input placeholder='Address' name="address" className='form-control'
                                    value= {this.state.address} onChange={this.changeaddressHandler}/>
                                     <div style={{ fontSize: 14, color: "red" }}>{this.state.addressError}</div>
                                </div>
                                <div className='form-group'>
                                    <label>Contact Number</label>
                                    <input placeholder='Contact Number' name="contactNo" className='form-control'
                                    value= {this.state.contactNo} onChange={this.changecontactNoHandler}/>
                                     <div style={{ fontSize: 14, color: "red" }}>{this.state.contactNoError}</div>
                                     <div style={{ fontSize: 14, color: "green" }}>{this.state.contactvError}</div>
                                </div>
                                <div className='form-group'>
                                    <label>NIC</label>
                                    <input placeholder='NIC' name="nic" className='form-control'
                                    value= {this.state.nic} onChange={this.changenicHandler} />
                                     <div style={{ fontSize: 14, color: "red" }}>{this.state.nicError}</div>
                                     <div style={{ fontSize: 14, color: "green" }}>{this.state.NICError}</div>
                                </div>
                                <div className='form-group'>
                                    <label>Employee Type</label>
                                    <select placeholder='Employee Type' name="empType" className='form-control'
                                    value= {this.state.empType} onChange={this.changeempTypeHandler}>
                                        <option value="">Select Employee Type</option>
                                        <option value="Painter">Painter</option>
                                        <option value="Velvder">Velvder</option>
                                        <option value="Electritian">Electritian</option>
                                    </select>
                                    <div style={{ fontSize: 14, color: "red" }}>{this.state.empTypeError}</div>
                                </div>
                                <button className='btn btn-success' onClick={this.saveEmployee}>Save</button>
                                <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CreateEmployeeComponent;
