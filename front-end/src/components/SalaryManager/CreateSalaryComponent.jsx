import React, { Component } from 'react';
import Swal from "sweetalert2";
import SalaryService from '../services/SalaryService';
import PropTypes from 'prop-types';



class CreateSalaryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
            empId: '',
            date: '',
            empName: '', 
            othours: '',   
            otpayment: '',
            totPay: ''   
        }
        this.changeempIdHandler = this.changeempIdHandler.bind(this);
        this.changedateHandler = this.changedateHandler.bind(this);
        this.changeempNameHandler = this.changeempNameHandler.bind(this);
        this.changeothoursHandler = this.changeothoursHandler.bind(this);
        this.changeotpaymentHandler = this.changeotpaymentHandler.bind(this);
        this.changetotPayHandler = this.changetotPayHandler.bind(this);

        this.saveSalaryHandler = this.saveSalaryHandler.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    validate = () =>{

        let empIdError='';
        let dateError='';
        let empNameError='';
        let othoursError='';
        let otpaymentError='';
        let totPayError='';

        if(!this.state.empId){
            empIdError = "Please fill out this field";
        }
        if(!this.state.date)
        {
            dateError = "Please fill out this field";
        }

        if(!this.state.empName){
            empNameError = "Please fill out this field";
        }

        if(!this.state.othours)
        {
            othoursError = "Please fill out this field";
        }

        if(!this.state.otpayment){
            otpaymentError = "Please fill out this field";
        }

        if(!this.state.totPay){
            totPayError = "Please fill out this field";
        }

        if(empIdError||dateError||empNameError || othoursError|| totPayError || otpaymentError ){
            this.setState({empIdError,dateError,empNameError , othoursError, totPayError , otpaymentError });
            return false;
        }
        return true;
    }

   

    saveSalaryHandler = (e) => {
        // let name = document.getElementById("emp_id").value 
        // let date=document.getElementById("date").value
        // let othours=document.getElementById("othours").value

        // if (name == "") {   
        //   alert("Name must be filled out");
        //   return false;
        // }else if(date==""){
        //     alert("Date must be filled out");
        //     return false;
        // }else if(othours==""){
        //     alert("Date must be filled out");
            
        //     return false;
        // }else{
            e.preventDefault();
            let salary = {empId: this.state.empId, date: this.state.date, empName: this.state.empName,othours: this.state.othours,
                otpayment: this.state.otpayment,totPay: this.state.totPay};
                
                const isValid = this.validate();

                Swal.fire({
                   
                    icon: 'success',
                    title: 'Salery Details Added Successfully',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1500
                  })

                if (isValid){
                    console.log('salary => ' + JSON.stringify(salary));
    
                    SalaryService.createSalary(salary).then(res => {
                        this.props.history.push('/salaries');
                    });   
                }
        // }
    }

    cancel(){
        this.props.history.push('/salaries');
    }

    changeempIdHandler=(event) => {
        this.setState({empId: event.target.value});
    }

    changedateHandler=(event) => {
        this.setState({date: event.target.value});
    }

    changeempNameHandler=(event) => {
        this.setState({empName: event.target.value});
    }

    changeothoursHandler=(event) => {
        this.setState({othours: event.target.value});
    }

    changeotpaymentHandler=(event) => {
        this.setState({otpayment: event.target.value});
    }

    changetotPayHandler=(event) => {
        this.setState({totPay: event.target.value});
    }


    render() {
        return (
            <div> 
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Daily Salary Report</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Employee ID</label>
                                        <input placeholder="Employee Id" id="emp_id" name="empId" className="form-control" 
                                        value={this.state.empId} onChange={this.changeempIdHandler}/>
                                        <div style={{ fontSize: 14, color: "red" }}>{this.state.empIdError}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input type="Date" placeholder="date" id="date" name="date" className="form-control"
                                        value={this.state.date} onChange={this.changedateHandler}/>
                                        <div style={{ fontSize: 14, color: "red" }}>{this.state.dateError}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>Employee Name</label>
                                        <input placeholder="Employee Name" id ="empName" name="empName" className="form-control"
                                        value={this.state.empName} onChange={this.changeempNameHandler}/>
                                        <div style={{ fontSize: 14, color: "red" }}>{this.state.empNameError}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>OT Hours</label>
                                        <input  id="otHours" name="otHours" placeholder="OT Hours" pattern="[1-9]+" className="form-control"
                                        value={this.state.othours} onChange={this.changeothoursHandler}/>
                                        <div style={{ fontSize: 14, color: "red" }}>{this.state.othoursError}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>OT Payment</label>
                                        <input placeholder="OT Payment" name="otpayment" className="form-control"
                                        value={this.state.otpayment} onChange={this.changeotpaymentHandler}/>
                                        <div style={{ fontSize: 14, color: "red" }}>{this.state.otpaymentError}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>Total Pay(Rs.)</label>
                                        <input placeholder="Total Pay" name="totPay" className="form-control"
                                        value={this.state.totPay} onChange={this.changetotPayHandler}/>
                                        <div style={{ fontSize: 14, color: "red" }}>{this.state.totPayError}</div>
                                     <br></br>   
                                    </div>
                                    <div>
                                    <button className="btn btn-success" onClick={this.saveSalaryHandler}>Save Salary</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
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

export default CreateSalaryComponent