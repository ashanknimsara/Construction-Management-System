import React, { Component } from 'react'
import ExpenseService from '../services/ExpenseService';
//import '../assets/css/Budget.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class ListExpenseComponent extends Component{
    constructor(props) {
        super(props)

        this.state = {
            
                Expenses: []
        }
       this.addExpenses = this.addExpenses.bind(this);
       this.editExpenses = this.editExpenses.bind(this);
       this.deleteExpenses = this.deleteExpenses.bind(this);
       this.viewreport  = this.viewreport.bind(this);
    }

    notify(){
        toast.warn('Expense Details Deleted', {position: toast.POSITION.TOP_CENTER, autoClose: 2000})
    }


    deleteExpenses(expenseId){
        ExpenseService.deleteExpenses(expenseId).then( res=> {
            this.notify();
            this.setState({Expenses: this.state.Expenses.filter(Expenses => Expenses.expenseId !== expenseId)});
        });
    }

    editExpenses(expenseId){
        console.log(expenseId)
        this.props.history.push(`/UpdateExpenseComponent/${expenseId}`);
    }

    componentDidMount(){
        ExpenseService.viewExpenses().then((res) =>{
                this.setState({Expenses: res.data})
        });
    }

    addExpenses(){
        this.props.history.push('/CreateExpenseComponent');
    }

    viewreport(){
        this.props.history.push('/ExpensesReport');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className="row">
                
                    <div className="col-lg-12">
                    <br></br>
                <br></br>
                 <h2 className="text-center">Project Expenses Management</h2>
                    </div>
                 </div>
               
                 <div className = "row">
                     <div className="col-lg-10">

                     </div>
                     <div className="col-lg-2">  

                    <button className="btn btn-outline-success mt-3" onClick={this.addExpenses}> Add New Expense</button>
                    </div>
                    <div className='text-right mb-2 mr-5 '>
                        <button className="btn btn-outline-success " onClick={this.viewreport}> View Report</button> 
                    </div>
                 </div>
                 
                 <div className = "row">
                         <div id='emprepo'>
                        <table className = "table table-striped table-bordered" id='Table'>

                            <thead>
                                <tr>
                                    <th> Expense ID</th>
                                    <th> Expense Details</th>
                                    <th> Amount</th>
                                    <th> Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Expenses.map(
                                        expenses => 
                                        <tr key = {expenses.expenseId}>

                                             <td> {expenses.expenseId} </td>
                                             <td> {expenses.expenseName} </td>   
                                             <td> {expenses.expensePrice}</td>
                                             <td> {expenses.expenseDate}</td>
                                             <td>
                                                <button onClick={ () => this.editExpenses(expenses.expenseId)} className="btn btn-info">Update </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteExpenses(expenses.expenseId)} className="btn btn-danger">Delete </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>                   
                 </div>

            
        )
    }  
}
export default ListExpenseComponent;