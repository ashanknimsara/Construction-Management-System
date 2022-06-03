import React, { Component } from 'react';
import BudgetService from '../services/BudgetService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/Budget.css';
import { Dropdown } from 'react-bootstrap';

toast.configure();
class CreateBudgetComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            pname: '',
            budget:'',
            status: '',

            pnameError: '',
            budgetError: '',
            statusError: '',
            budgetvError:''
            
        }  
        this.changeProjectHandler = this.changeProjectHandler.bind(this);
        this.changeBudgetHandler = this.changeBudgetHandler.bind(this);
        this.changeStatusHandler = this.changeStatusHandler.bind(this);
        
        this.saveBudget = this.saveBudget.bind(this);
        this.cancel = this.cancel.bind(this);


    
    }

    notify(){
        toast.success('Budget Details Added Successfully', {position: toast.POSITION.TOP_CENTER, autoClose: 2000})
    }

    validate = () =>{
        let pnameError='';
        let budgetError='';
        let statusError='';
        
        if(!this.state.pname){            
            pnameError = "Please fill out this field";       
     }
     
     if(!this.state.budget){            
        budgetError = "Please fill out this field";
     }
     
     if(!this.state.status){            
        statusError = "Please fill out this field";       
     }

     if(pnameError||budgetError||statusError ){            
        this.setState({pnameError,budgetError ,statusError });           
         return false;        
    }        
        return true;  
    }

    budgetValidation(){

        const regex = /^[0-9]+$/i;
        
        if (!this.state.budget || regex.test(this.state.budget) === false) {
        
        this.setState({
        
            budgetvError: "You cannot Enter characters!"
        
        });
        
        return false;
        
        }
        
        return true;
    }    
        




    saveBudget=(e) =>{
        e.preventDefault();
        let budget = {pname: this.state.pname, budget: this.state.budget, status: this.state.status};
        //console.log('budget => '+ JSON.stringify(budget));

        let budgets = {pname: this.state.pname, 
            budget: this.state.budget, 
            status: this.state.status};
        const isValid = this.validate() && this.budgetValidation();

        if(isValid){
            console.log('budget =>'+JSON.stringify(budget));
    
        BudgetService.createBudget(budget).then(res =>{
            this.notify();
            this.props.history.push('/Budget')
        });
    }
}

    changeProjectHandler=(event) =>{
        this.setState({pname: event.target.value});
    }
    changeBudgetHandler=(event) =>{
        this.setState({budget: event.target.value});
    }
    changeStatusHandler=(event) =>{
        this.setState({status: event.target.value});
    }
   
    cancel(){
        this.props.history.push('/Budget');
    }
    
    render() {
        return (
            <div className='create'>
                <br></br>

            
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3 shadow'>
                            <br></br>
                            <br></br>

                            <h3 className='text-center'>Create New Budget</h3>
                        
                        <div className='card-body'>
                            <form className='was-validated'>
                                <div className='form-group'>
                                    <label>Project Name</label>
                                    <input placeholder='Project Name' name="pname" className='form-control'
                                    value= {this.state.pname} onChange={this.changeProjectHandler}
                                    required />
                                    <div style={{ fontSize: 14, color: "red" }}>{this.state.pnameError}</div>

                                </div>
                                <br></br>
                                <div className='form-group'>
                                    <label>Quatation</label>
                                    <input placeholder='Quatation' name="budget" className='form-control'
                                    value= {this.state.budget}  onChange={this.changeBudgetHandler}
                                    required
                                    pattern="^[0-9]+$"/>
                                     <div style={{ fontSize: 14, color: "red" }}>{this.state.budgetError}</div>
                                     <div style={{ fontSize: 14, color: "green" }}>{this.state.budgetvError}</div>

                                </div>
                                <br></br>
                                <div className='form-group'>
                                    <label>Status</label>
                                    <select placeholder='Status' name="status" className='form-control'
                                    value= {this.state.status} onChange={this.changeStatusHandler} > 
                                       
                                        <option value="in progress">in progress</option>
                                        <option value="completed">completed</option>
                                    </select>
                                     

                                </div>
                                <br></br>
                                <div className='btn'>
                                    <button className='btn btn-success' onClick={this.saveBudget}>Save</button>
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


export default CreateBudgetComponent