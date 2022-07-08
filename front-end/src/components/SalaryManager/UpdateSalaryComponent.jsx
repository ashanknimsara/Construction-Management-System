import React, { Component } from 'react';
import SalaryService from '../services/SalaryService';
import Swal from 'sweetalert2'

class UpdateSalaryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      empId: '',
      date: '',
      empName: '',
      othours: '',
      otpayment: '',
      totPay: '',
    };
    this.changeempIdHandler = this.changeempIdHandler.bind(this);
    this.changedateHandler = this.changedateHandler.bind(this);
    this.changeempNameHandler = this.changeempNameHandler.bind(this);
    this.changeothoursHandler = this.changeothoursHandler.bind(this);
    this.changeotpaymentHandler = this.changeotpaymentHandler.bind(this);
    this.changetotPayHandler = this.changetotPayHandler.bind(this);

    this.UpdateSalary = this.UpdateSalary.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    SalaryService.getSalaryById(this.state.id).then((res) => {
      let salary = res.data;
      this.setState({
        empId: salary.empId,
        date: salary.date,
        empName: salary.empName,
        othours: salary.othours,
        otpayment: salary.otpayment,
        totPay: salary.totPay,
      });
    });
  }

  UpdateSalary = (e) => {
    e.preventDefault();
    let salary = {
      empId: this.state.empId,
      date: this.state.date,
      empName: this.state.empName,
      othours: this.state.othours,
      otpayment: this.state.otpayment,
      totPay: this.state.totPay,
    };
    console.log('salary => ' + JSON.stringify(salary));
    SalaryService.updateSalary(salary, this.state.id).then((res) => {
      this.props.history.push('/salaries');
    });
    Swal.fire({
                   
      icon: 'success',
      title: 'Salery Details Updated Successfully',
      showConfirmButton: false,
      showCancelButton: false,
      timer: 1500
    })
  };

  cancel() {
    this.props.history.push('/salaries');
  }

  changeempIdHandler = (event) => {
    this.setState({ empId: event.target.value });
  };

  changedateHandler = (event) => {
    this.setState({ date: event.target.value });
  };

  changeempNameHandler = (event) => {
    this.setState({ empName: event.target.value });
  };

  changeothoursHandler = (event) => {
    this.setState({ othours: event.target.value });
  };

  changeotpaymentHandler = (event) => {
    this.setState({ otpayment: event.target.value });
  };

  changetotPayHandler = (event) => {
    this.setState({ totPay: event.target.value });
  };

  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
              <h3 className='text-center'>Daily Salary Report</h3>
              <div className='card-body'>
                <form>
                  <div className='form-group'>
                    <label>Employee ID</label>
                    <input
                      placeholder='Employee Id'
                      name='empId'
                      className='form-control'
                      value={this.state.empId}
                      onChange={this.changeempIdHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Date</label>
                    <input
                      placeholder='date'
                      name='date'
                      className='form-control'
                      value={this.state.date}
                      onChange={this.changedateHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Employee Name</label>
                    <input
                      placeholder='Employee Name'
                      name='empName'
                      className='form-control'
                      value={this.state.empName}
                      onChange={this.changeempNameHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>OT Hours</label>
                    <input
                      placeholder='OT Hours'
                      name='othours'
                      className='form-control'
                      value={this.state.othours}
                      onChange={this.changeothoursHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>OT Payment</label>
                    <input
                      placeholder='OT Payment'
                      name='otpayment'
                      className='form-control'
                      value={this.state.otpayment}
                      onChange={this.changeotpaymentHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Total Pay</label>
                    <input
                      placeholder='Total Pay'
                      name='totPay'
                      className='form-control'
                      value={this.state.totPay}
                      onChange={this.changetotPayHandler}
                    />
                    <br></br>
                  </div>
                  <button
                    className='btn btn-success'
                    onClick={this.UpdateSalary}
                  >
                    Save Salary
                  </button>
                  <button 
                    className='btn btn-danger'
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: '10px'}}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateSalaryComponent;
