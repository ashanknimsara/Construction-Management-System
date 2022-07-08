import React, { Component } from 'react'
import ExpenseService from '../services/ExpenseService';
import ReactToPrint from 'react-to-print';


class ExpensesReport extends Component{
    constructor(props) {
        super(props)

        this.state = {
            
                Expenses: []
        }
      

    }

    componentDidMount(){
        ExpenseService.viewExpenses().then((res) =>{
                this.setState({Expenses: res.data})
        });
    }


    render() {
        return (
            <div>
                <br></br>
                <div className="row">
                    <div className="col-lg-12">
                 <h2 className="text-center">Project Expenses Report</h2>
                    </div>
                 </div>
                 <br></br>
                 <div className = "row">
                     <div className="col-lg-10">

                     </div>
                     
                     
                    <div className='text-right mb-0 mr-5 mt-5'>

                        <ReactToPrint

                            trigger={()=>{

                            return <button className="btn btn-danger" > Download Report </button>

                            }}

                            content={()=>this.componentRef}

                            documentTitle = 'Project Expenses Report'

                            pageStyle= "print" />
                    </div>
                    
                 </div>
                 <br></br>
                 <div className = "row">
                     <div ref ={el=>(this.componentRef=el)}>
                         <div id='emprepo'>
                        <table className = "table table-striped table-bordered" id='Table'>

                            <thead>
                                <tr>
                                    <th> Expense ID</th>
                                    <th> Expense Details</th>
                                    <th> Amount</th>
                                    <th> Date</th>
                                    
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
                                             
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>                   
                 </div>

            </div>
        )
    }  
}
export default ExpensesReport;