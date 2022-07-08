import React, { Component } from 'react';
import SalaryService from '../services/SalaryService';
import ReactToPrint from 'react-to-print';
import Swal from 'sweetalert2';

class ListSalaryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      salaries: [],
    };
    //binding methods to components
    this.addSalary = this.addSalary.bind(this);
    this.editSalary = this.editSalary.bind(this);
    this.deleteSalary = this.deleteSalary.bind(this);
  }

  deleteSalary(salId) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Once Delete, You won't be able to revert this Data!",
      icon: 'warning',
      dangerMode: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        SalaryService.deleteSalary(salId).then((res) => {
          this.setState({
            salaries: this.state.salaries.filter(
              (Salary) => Salary.salId !== salId
            ),
          });
        });
        Swal.fire(
          'Deleted!',
          'Your Details has been deleted.',
          'success'
        )
      }
    })
  }

  editSalary(id) {
    console.log(id);
    const { history } = this.props;
    console.log(history);
    history.push(`/update-salary/${id}`);
  }
  addSalary() {
    this.props.history.push('/add-salary');
  }

  //call REST Api
  componentDidMount() {
    SalaryService.getSalaries().then((res) => {
      console.log(res.data);
      this.setState({ salaries: res.data });
    });
  }

  generatePDF(){

    this.props.history.push(`/salary-report`)

}

//Filter data Function to filter Searched Item

filterData(salaries,searchKey){

  console.log(searchKey);

  console.log(salaries);

      const result = salaries.filter((salary) =>

      salary.empName.toLowerCase().includes(searchKey.toLowerCase())  ||

      salary.empName.toUpperCase().includes(searchKey.toUpperCase()) )

      this.setState({salaries:result})

}



//Handle Searcher to get User input and send to Filter Function

handleSearchArea =(e) =>{

const searchKey = e.target.value;

SalaryService.getSalaries().then((res) => {

  this.filterData(res.data,searchKey)

});

}
  render() {
    return (
      <div>
        <h2 className='text-center'>Salary Detail List</h2>
        <div id="repGSearch" className='col-lg-3 mt-2 mb-2 ml-5'>
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Search</span>
            <input className='form-control' type='search' placeholder='@Name' name='searchQuery' onChange={this.handleSearchArea}></input>
          </div>
        </div>
        
        <div className='btn'>
          <button className='btn btn-outline-primary btn-lg' onClick={this.addSalary}>
            {' '}
            Enter Daily Salary
          </button>
          <div className='btn'> <button className='btn btn-outline-success btn-lg' onClick={() => this.generatePDF()}>Generate Report</button>
          </div>
        </div>

        
        
        <br></br>
        <div ref ={el=>(this.componentRef=el)}>
        <div className='row'>
          <table className='table table-striped table-bordered' id='SalaryTable'>
            <thead>
              <tr>
                <th>Salary ID</th>
                <th>Employee ID</th>
                <th>Date</th>
                <th>Employee Name</th>
                <th>OT Hours</th>
                <th>OT Payments</th>
                <th>Total Pay</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.salaries.map((Salary) => (
                <tr key={Salary.salId}>
                  <td>{Salary.salId}</td>
                  <td>{Salary.empId}</td>
                  <td>{Salary.date}</td>
                  <td>{Salary.empName}</td>
                  <td>{Salary.othours}</td>
                  <td>{Salary.otpayment}</td>
                  <td>{Salary.totPay}</td>
                  <td>
                    <button
                      onClick={() => this.editSalary(Salary.salId)}
                      className='btn btn-info'
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: '10px' }}
                      onClick={() => this.deleteSalary(Salary.salId)}
                      className='btn btn-danger'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListSalaryComponent;
