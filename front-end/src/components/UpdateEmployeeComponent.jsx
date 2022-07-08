import React, { Component } from 'react';
import EmployeeService from '../Services/EmployeeService';
import '../assets/css/Employee.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            id: this.props.match.params.id,
            empName: '',
            address:'',
            contactNo: '',
            nic: '',
            empType: ''
        }  
        this.changeempNameHandler = this.changeempNameHandler.bind(this);
        this.changeaddressHandler = this.changeaddressHandler.bind(this);
        this.changecontactNoHandler = this.changecontactNoHandler.bind(this);
        this.changenicHandler = this.changenicHandler.bind(this);
        this.changeempTypeHandler = this.changeempTypeHandler.bind(this);
        this.UpdateEmployee = this.UpdateEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
    
    }

    notify(){
        toast.success('Employee Details Updated Successfully', {position: toast.POSITION.TOP_CENTER, autoClose: 2000})
    }

    componentDidMount(){
        EmployeeService.getEmployeeById(this.state.id).then((res)=>{
            let employee= res.data;
            this.setState({
                empName: employee.empName,
                address: employee.address,
                contactNo:employee.contactNo,
                nic: employee.nic,
                empType: employee.empType,

                contactvError:''
            });
        });
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

    UpdateEmployee=(e) =>{
        e.preventDefault();
        let employee = {empName: this.state.empName, address: this.state.address, contactNo: this.state.contactNo,
        nic: this.state.nic, empType: this.state.empType};
        //console.log('employee => '+ JSON.stringify(employee));
         
            const isValid = this.contactNumberValidation();

        if(isValid){
            console.log('employee => '+ JSON.stringify(employee));

        EmployeeService.UpdateEmployee(employee, this.state.id).then((res) =>{
            this.props.history.push('/employee')
            this.notify();
        });}
    }

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
    cancel(){
        this.props.history.push('/employee');
    }
    
    render() {
        return (
            <div className='update'>
                
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'id='updateform'>
                            <h3 className='text-center'>Update Employee</h3>
                        
                        <div className='card-body' >
                        <form>
                                <div className='form-group'>
                                    <label>Employee Name</label>
                                    <input placeholder='Employee Name' name="empName" className='form-control' disabled="true"
                                    value= {this.state.empName} onChange={this.changeempNameHandler} />
                                </div>
                                <div className='form-group'>
                                    <label>Address</label>
                                    <input placeholder='Address' name="address" className='form-control'
                                    value= {this.state.address} onChange={this.changeaddressHandler}/>
                                </div>
                                <div className='form-group'>
                                    <label>Contact Number</label>
                                    <input placeholder='Contact Number' name="contactNo" className='form-control'
                                    value= {this.state.contactNo} onChange={this.changecontactNoHandler}/>
                                    <div style={{ fontSize: 14, color: "green" }}>{this.state.contactvError}</div>
                                </div>
                                <div className='form-group'>
                                    <label>NIC</label>
                                    <input placeholder='NIC' name="nic" className='form-control' disabled="true"
                                    value= {this.state.nic} onChange={this.changenicHandler} />
                                </div>
                                <div className='form-group'>
                                    <label>Employee Type</label>
                                    <input placeholder='Employee Type' name="empType" className='form-control' disabled="true"
                                    value= {this.state.empType} onChange={this.changeempTypeHandler} />
                                </div>
                                <div className='updatebtn'>
                                <button className='btn btn-success' onClick={this.UpdateEmployee}>Update</button>
                                <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
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

export default UpdateEmployeeComponent;