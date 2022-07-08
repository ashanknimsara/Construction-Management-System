import React, { Component } from 'react';
import SalaryService from '../services/SalaryService';
import ReactToPrint from 'react-to-print';

class ListSalaryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      salaries: [],
    };
    this.cancel = this.cancel.bind(this);
  }

  //call REST Api
  componentDidMount() {
    SalaryService.getSalaries().then((res) => {
      console.log(res.data);
      this.setState({ salaries: res.data });
    });
  }

  cancel=() =>{
    this.props.history.push('/salaries');
}

  render() {
    return (
      <div>
        
        <div className='text-right mb-2 mr-5'>
                    <ReactToPrint
                        trigger={()=>{
                        return <button className="btn btn-success" > Download Report </button>
                        }}
                        content={()=>this.componentRef}
                        documentTitle = 'Current Salary Report'
                        pageStyle= "print"
                    />
                    <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
        </div>
        <div ref ={el=>(this.componentRef=el)}>

        <h1 className='text-center'>Vihanga Elecrticals and Constructions</h1>
                <h5 className='text-center'>Electrical installations, plumbing, steel fabricators {"&"} all civil constructions</h5>
                <h3 className='text-center'>Salary Report</h3>
        <div className='row' id='SalTable'>
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Date</th>
                <th>Employee Name</th>
                <th>OT Hours</th>
                <th>OT Payments</th>
                <th>Total Pay</th>
              </tr>
            </thead>

            <tbody>
              {this.state.salaries.map((Salary) => (
                <tr key={Salary.salId}>
                  <td>{Salary.empId}</td>
                  <td>{Salary.date}</td>
                  <td>{Salary.empName}</td>
                  <td>{Salary.othours}</td>
                  <td>{Salary.otpayment}</td>
                  <td>{Salary.totPay}</td>
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
