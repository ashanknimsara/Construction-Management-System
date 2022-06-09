import React, { Component } from 'react';
import BudgetService from '../services/BudgetService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/Budget.css';

toast.configure();
class UpdateBudgetComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            pid: this.props.match.params.pid,
            pname: '',
            budget:'',
            status: ''
            
        }  
        
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        
        this.updateBudget = this.updateBudget.bind(this);
        this.cancel = this.cancel.bind(this);
    
    }

    notify(){
        toast.success('Budget Details Updated Successfully', {position: toast.POSITION.TOP_CENTER, autoClose: 2000})
    }

    componentDidMount(){
        BudgetService.getBudgetById(this.state.pid).then((res)=>{
            let budget= res.data;
            this.setState({
                pname: budget.pname,
                budget: budget.budget,
                status:budget.status
            });
        });
    }

    updateBudget=(e) =>{
        e.preventDefault();
        let budget = {pname: this.state.pname, budget: this.state.budget, status: this.state.status};
        console.log('budget => '+ JSON.stringify(budget));

        BudgetService.updateBudget(budget, this.state.pid).then(res =>{
            this.notify();
            this.props.history.push('/Budget')
        });
    }

    changeStatusHandler=(event) =>{
        this.setState({status: event.target.value});
    }
   
    cancel(){
        this.props.history.push('/Budget');
    }
    
    render() {
        return (
            <div className='update'>
            
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <br></br>
                            <br></br>
                            <h3 className='text-center'>Update Budget Status</h3>
                        
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>Project Name</label>
                                    <input placeholder='Project Name' name="pname" className='form-control'
                                    value= {this.state.pname} />
                                </div>
                                <div className='form-group'>
                                    <label>Quatation</label>
                                    <input placeholder='Quatation' name="budget" className='form-control'
                                    value= {this.state.budget} />
                                </div>
                                <div className='form-group'>
                                    <label>Status</label>
                                    <input placeholder='Status' name="status" className='form-control'
                                    value= {this.state.status} onChange={this.changeStatusHandler}/>
                                </div>
                               <div className='btn'>
                                    <button className='btn btn-success' onClick={this.updateBudget}>Update</button>
                                    <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                               </div>
                               
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default UpdateBudgetComponent