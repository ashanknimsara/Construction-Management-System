import React, { Component } from 'react'
import BudgetService from '../services/BudgetService';
import ExpenseService from '../services/ExpenseService';
import '../assets/css/Budget.css'; 


class ListBudgetComponent extends Component{
    constructor(props) {
        super(props)

        this.state = {
                Budget: []
        }
       this.addBudget = this.addBudget.bind(this);
       this.editbudget = this.editbudget.bind(this);
       this.deleteBudget = this.deleteBudget.bind(this);
       this.viewExpenses = this.viewExpenses.bind(this);

    }

    deleteBudget(pid){
        BudgetService.deleteBudget(pid).then( res=> {
            this.setState({Budget: this.state.Budget.filter(budget => budget.pid !== pid)});
        });
    }

    editbudget(pid){
        console.log(pid)
        this.props.history.push(`/update-budget/${pid}`);
    }

    componentDidMount(){
        BudgetService.getBudget().then((res) =>{
                this.setState({Budget: res.data})
        });
    }

    addBudget(){
        this.props.history.push('/add-budget');
    }

    viewExpenses(){
        
        this.props.history.push('/ListExpenseComponent');
    }

   //Filter data Function to filter Searched Item

   filterData(budgets,searchKey){

    console.log(searchKey);

    console.log(budgets);

        const result = budgets.filter((Budget) =>

        Budget.pname.toLowerCase().includes(searchKey.toLowerCase()) ||

        Budget.status.toLowerCase().includes(searchKey.toLowerCase()) ||

        Budget.pname.toUpperCase().includes(searchKey.toUpperCase()) ||

        Budget.status.toUpperCase().includes(searchKey.toUpperCase()))

        this.setState({Budget:result})

}



//Handle Searcher to get User input and send to Filter Function

handleSearchArea =(e) =>{

  const searchKey = e.target.value;

  BudgetService.getBudget().then((res) => {

    this.filterData(res.data,searchKey)

});

}

    render() {
        return (
            <div>
                <br></br>
                <div className="row">
                    <div className="col-lg-3">
                 <h2 className="text-center" id='heading'>Manage Budget</h2>
                    </div>
                 </div>
                 <br></br>
                 <div className = "row">
                     <div className="col-lg-10">
                     <div id="repGSearch" className='col-lg-3 mt-2 mb-2'><br></br>
                    <input className='form-control' type='search' placeholder='Search' name='searchQuery' onChange={this.handleSearchArea}>
                    </input>
                </div>
                     </div>
                     <div className="col-lg-2" > <br></br>
                    <button className="btn btn-outline-primary mt-3" onClick={this.addBudget}> Create New Budget</button>
                    </div>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered" id='Table'>

                            <thead>
                                <tr>
                                    <th> Budget ID</th>
                                    <th> Project Name</th>
                                    <th> Quatation</th>
                                    <th> Status</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.Budget.map(
                                        budget => 
                                        <tr key = {budget.pid}>
                                             <td> {budget.pid} </td>
                                             <td> {budget.pname} </td>   
                                             <td> {budget.budget}</td>
                                             <td> {budget.status}</td>
                                             <td>
                                                <button onClick={ () => this.editbudget(budget.pid)} className="btn btn-info">Update </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBudget(budget.pid)} className="btn btn-danger">Delete </button>
                                                <button style={{marginLeft: "10px"}} onClick={()=> this.viewExpenses(budget.pid)} className="btn btn-success">View Expenses</button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }    
}

export default ListBudgetComponent;