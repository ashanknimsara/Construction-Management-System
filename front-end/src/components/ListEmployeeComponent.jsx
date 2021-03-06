import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmployeeService from '../Services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)
        this.state={
                employee: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    generatePDF(){
        this.props.history.push(`/employee-report`)
    }

    notify(){
        toast.success('Deleted Employee record', {position: toast.POSITION.TOP_CENTER, autoClose: 2000})
    }

    deleteEmployee(empID){
        console.log(empID)
        EmployeeService.deleteEmployee(empID).then(res => {
            this.setState({employee: this.state.employee.filter(employee => employee.empID!== empID)});
            this.notify();
        });
    }

    editEmployee(id){
        console.log(id)
        this.props.history.push(`/update-employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) =>{
            this.setState({employee: res.data})
        });
    }
    addEmployee(){
        this.props.history.push('/add-employee');
    }

    //Filter data Function to filter Searched Item
    filterData(employees,searchKey){
        console.log(searchKey);
        console.log(employees);
            const result = employees.filter((employee) =>
            employee.empName.toLowerCase().includes(searchKey.toLowerCase()) ||
            employee.address.toLowerCase().includes(searchKey.toLowerCase()) ||
            employee.empType.toLowerCase().includes(searchKey.toLowerCase()) ||
            employee.empName.toUpperCase().includes(searchKey.toUpperCase()) ||
            employee.address.toUpperCase().includes(searchKey.toUpperCase()) ||
            employee.empType.toUpperCase().includes(searchKey.toUpperCase()))
            this.setState({employee:result})
    }

    //Handle Searcher to get User input and send to Filter Function
    handleSearchArea =(e) =>{
      const searchKey = e.target.value;
      EmployeeService.getEmployees().then((res) => {
        this.filterData(res.data,searchKey)
    });
    }
    render() {
        return (
            <div ref ={el=>(this.componentRef=el)}>
                <h2 className='text-center'>Employee Details</h2>

                <div id="repGSearch" className='col-lg-3 mt-2 mb-2 ml-5'>
                    <input className='form-control' type='search' placeholder='Search' name='searchQuery' onChange={this.handleSearchArea}>
                    </input>
                </div>
                <div className='btn'>
                    <button className='btn btn-outline-success btn-lg' onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className='btn'>
                    <button className='btn btn-outline-primary btn-lg' onClick={() => this.generatePDF()}>Generate Report</button>
                </div>
                             
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                            <th>Employee Name</th>
                            <th>Address</th>
                            <th>Contact Number</th>
                            <th>NIC</th>
                            <th>Employee Type</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employee.map(
                                    employee =>
                                    <tr key={employee.empID}>
                                        <td>{employee.empName}</td>
                                        <td>{employee.address}</td>
                                        <td>{employee.contactNo}</td>
                                        <td>{employee.nic}</td>
                                        <td>{employee.empType}</td>
                                        <td>
                                            <button onClick={()=>this.editEmployee(employee.empID)} className='btn btn-info'>Update</button>
                                            <button style={{marginLeft:"10px"}} onClick={()=>this.deleteEmployee(employee.empID)} className='btn btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                
            </div>
        );
    }
}

export default ListEmployeeComponent;