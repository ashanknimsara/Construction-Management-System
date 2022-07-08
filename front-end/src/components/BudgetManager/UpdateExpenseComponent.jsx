import React, { Component } from 'react';
import ExpenseService from '../services/ExpenseService';
import '../assets/css/Budget.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class UpdateExpenseComponent extends Component{

        constructor(props) {
            super(props)
            this.state ={
                expenseId: this.props.match.params.expenseId,
                expenseName: '',
                expenseDate:'',
                expensePrice: ''
         
            }  
            this.changeExpenseNameHandler = this.changeExpenseNameHandler.bind(this);
            this.changeExpenseDateHandler = this.changeExpenseDateHandler.bind(this);
            this.changeAmountHandler = this.changeAmountHandler.bind(this);
            
            this.updateExpense = this.updateExpense.bind(this);
            this.cancel = this.cancel.bind(this);
     
        }
        notify(){
            toast.success('Expense Details Updated Successfully', {position: toast.POSITION.TOP_CENTER, autoClose: 2000})
        }
        
        componentDidMount(){
            ExpenseService.getExpenseById(this.state.expenseId).then((res)=>{
                let expenses= res.data;
                this.setState({
                    expenseName: expenses.expenseName,
                    expenseDate: expenses.expenseDate,
                    expensePrice:expenses.expensePrice
                });
            });
        }
       
        updateExpense=(e) =>{
            e.preventDefault();
            let expenses = {expenseName: this.state.expenseName, expenseDate: this.state.expenseDate, expensePrice: this.state.expensePrice};
            //console.log('expenses => '+ JSON.stringify(expenses));
    
            ExpenseService.updateExpense(expenses,this.state.expenseId).then(res =>{
                this.notify();
                this.props.history.push('/ListExpenseComponent')
            });
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
            this.props.history.push('/ListExpenseComponent');
        }
    
        render() {
            return (
                <div>
                    <br></br>
                    <br></br>
                    <br></br>
                
                    <div className='container'>
                        <div className='row'>
                            <div className='card col-md-6 offset-md-3 offset-md-3 shadow'>
                                <br></br>
                                <br></br>
    
                                <h3 className='text-center'>Update Expense Details</h3>
                            
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Expense Details</label>
                                        <input placeholder='Expense Details' name="expenseName" className='form-control'
                                        value= {this.state.expenseName} onChange={this.changeExpenseNameHandler} />
                                       
    
                                    </div>
                                    <br></br>
                                    <div className='form-group'>
                                        <label>Date</label>
                                        <input placeholder='DD/MM/YYYY' name="expenseDate" className='form-control' type="date"
                                        value= {this.state.expenseDate} onChange={this.changeExpenseDateHandler}/>
                                         
    
                                    </div>
                                    <br></br>
                                    <div className='form-group'>
                                        <label>Amount</label>
                                        <input placeholder='Rs.' name="expensePrice" className='form-control'
                                        value= {this.state.expensePrice} onChange={this.changeAmountHandler}/>  
                                        
                                    </div>
                                    <br></br>
                                    
                                    <button className='btn btn-success' onClick={this.updateExpense}>Save</button>
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

export default UpdateExpenseComponent