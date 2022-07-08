import React, { Component } from 'react';
import ExpenseService from '../services/ExpenseService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class CreateExpenseComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            expenseName: '',
            expenseDate:'',
            expensePrice: '',
            pid:'',

            expenseNameError: '',
            expenseDateError: '',
            expensePriceError: '',
            expensePricevError: ''

        }  
        this.changeExpenseNameHandler = this.changeExpenseNameHandler.bind(this);
        this.changeExpenseDateHandler = this.changeExpenseDateHandler.bind(this);
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
        this.changePIDHandler = this.changePIDHandler.bind(this);
        
        this.saveExpense = this.saveExpense.bind(this);
        this.cancel = this.cancel.bind(this);
 
    }

    notify(){
        toast.success('Expense Details Added Successfully', {position: toast.POSITION.TOP_CENTER, autoClose: 2000})
    }

    validate = () =>{
        let expenseNameError='';
        let expenseDateError='';
        let expensePriceError='';
        
        if(!this.state.expenseName){            
            expenseNameError = "Please fill out this field";       
     }
     
     if(!this.state.expenseDate){            
        expenseDateError = "Please fill out this field";
     }
     
     if(!this.state.expensePrice){            
        expensePriceError = "Please fill out this field";       
     }

     if(expenseNameError||expenseDateError||expensePriceError ){            
        this.setState({
            expenseNameError, expenseDateError , expensePriceError 
        });           
         return false;        
    }        
        return true;  
    }

    AmountValidation(){

        const regex = /^[0-9]+$/i;
        
        if (!this.state.expensePrice || regex.test(this.state.expensePrice) === false) {
        
        this.setState({
        
            expensePricevError: "You cannot Enter characters!"
        
        });
        
        return false;
        
        }
        
        return true;
    }   
    


    saveExpense=(e) =>{
        e.preventDefault();
        let expenses = {pid:this.state.pid, expenseName: this.state.expenseName, expenseDate: this.state.expenseDate, expensePrice: this.state.expensePrice};
        //console.log('expenses => '+ JSON.stringify(expenses));

        let expense = {expenseName: this.state.expenseName, 
            expenseDate: this.state.expenseDate, 
            expensePrice: this.state.expensePrice};
        const isValid = this.validate() && this.AmountValidation();

        if(isValid){
            console.log('expense =>'+JSON.stringify(expenses));

        ExpenseService.createExpense(expenses).then(res =>{
            this.notify();
            this.props.history.push('/ListExpenseComponent')
        });
    }
}
    changePIDHandler=(event) =>{
        this.setState({pid: event.target.value});
    }

    changeExpenseNameHandler=(event) =>{
        this.setState({expenseName: event.target.value});
    }
    changeExpenseDateHandler=(event) =>{
        this.setState({expenseDate: event.target.value});
    }
    changeAmountHandler=(event) =>{
        this.setState({expensePrice: event.target.value});
    }

    cancel(){
        this.props.history.push('/Expenses');
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3 shadow' id='expenseform'>
                            <br></br>
                            <br></br>

                            <h3 className='text-center'>Add New Expense</h3>
                        
                        <div className='card-body'>
                            <form className='was-validated '>
                                <div className='form-group'>
                                    <label>Budget ID</label>
                                    <select placeholder='Budget ID' name="pid" className='form-control'
                                    value= {this.state.pid} onChange={this.changePIDHandler}>
                                        <option></option>
                                        <option value="27">27</option>
                                    </select>

                                    <label>Expense Details</label>
                                    <input placeholder='Expense Details' name="expenseName" className='form-control'
                                    value= {this.state.expenseName} onChange={this.changeExpenseNameHandler} 
                                    required />
                                    <div style={{ fontSize: 14, color: "red" }}>{this.state.expenseNameError}</div>
                                    

                                </div>
                                <br></br>
                                <div className='form-group'>
                                    <label>Date</label>
                                    <input type='Date' placeholder='date' name="expenseDate" className='form-control'
                                    value= {this.state.expenseDate} onChange={this.changeExpenseDateHandler}
                                    required />
                                    <div style={{ fontSize: 14, color: "red" }}>{this.state.expenseDateError}</div>
                                    

                                </div>
                                <br></br>
                                <div className='form-group'>
                                    <label>Amount</label>
                                    <input placeholder='Rs.' name="expensePrice" className='form-control'
                                    value= {this.state.expensePrice} onChange={this.changeAmountHandler}
                                    required pattern="^[0-9]+$"/>  
                                     <div style={{ fontSize: 14, color: "red" }}>{this.state.expensePriceError}</div>
                                     <div style={{ fontSize: 14, color: "green" }}>{this.state.expensePricevError}</div>
                                    
                                </div>
                                <br></br>
                                
                                <button className='btn btn-success' onClick={this.saveExpense}>Save</button>
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

export default CreateExpenseComponent