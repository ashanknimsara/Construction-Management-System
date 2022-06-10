import React, { Component } from 'react';
import JsPDF from 'jspdf';
import ReactToPrint from 'react-to-print';
import EmployeeService from '../services/EmployeeService';

class EmployeeReport extends Component {
    constructor(props){
        super(props)
        this.state={
                employee: []
        }

        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) =>{
            this.setState({employee: res.data})
        });
    }

    cancel=() =>{
        this.props.history.push('/employee');
    }
    
    render() {
        return (
            <div>
            <div ref ={el=>(this.componentRef=el)}>
                <h1 className='text-center' id='heading'>Vihanga Elecrticals and Constructions</h1>
                <h5 className='text-center'>Electrical installations, plumbing, steel fabricators {"&"} all civil constructions</h5>
                <h3 className='text-center'>Employee Details</h3>
                <div>
                <div id='emprepo' className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                            <th>Employee Name</th>
                            <th>NIC</th>
                            <th>Employee Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employee.map(
                                    employee =>
                                    <tr key={employee.empID}>
                                        <td>{employee.empName}</td>
                                        <td>{employee.nic}</td>
                                        <td>{employee.empType}</td>                                        
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    </div>
                </div> 
            </div>
            <div className='text-right mb-2 mr-5'>
                    <ReactToPrint
                        trigger={()=>{
                        return <button className="btn btn-success">Download Report</button>
                        }}
                        content={()=>this.componentRef}
                        documentTitle = 'Employee Report'
                        pageStyle= "print"/>
            <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
            </div>   
            </div>    
        );
    }
}

export default EmployeeReport;