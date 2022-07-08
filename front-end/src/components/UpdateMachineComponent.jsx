import React, { Component } from 'react';
import MachineService from '../services/MachineService';

class UpdateMachineComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      machineCode: '',
      machineName: '',
      quantity: '',
      rentalFee: '',
    };
    this.changeMachineCodeHandler = this.changeMachineCodeHandler.bind(this);
    this.changeMachineNameHandler = this.changeMachineNameHandler.bind(this);
    this.changequantityHandler = this.changequantityHandler.bind(this);
    this.changerentalFeeHandler = this.changerentalFeeHandler.bind(this);
    this.updateMachine = this.updateMachine.bind(this);
  }

  componentDidMount() {
    MachineService.getMachineById(this.state.id).then((res) => {
      let machine = res.data;
      this.setState({
        machineCode: machine.machineCode,
        machineName: machine.machineName,
        quantity: machine.quantity,
        rentalFee: machine.rentalFee,
      });
    });
  }

  updateMachine = (e) => {
    e.preventDefault();
    let machine = {
      machineCode: this.state.machineCode,
      machineName: this.state.machineName,
      quantity: this.state.quantity,
      rentalFee: this.state.rentalFee,
    };
    console.log('machine =>' + JSON.stringify(machine));
    MachineService.updateMachine(machine, this.state.id).then((res) => {
      this.props.history.push('/machines');
    });
  };

  changeMachineCodeHandler = (event) => {
    this.setState({ machineCode: event.target.value });
  };

  changeMachineNameHandler = (event) => {
    this.setState({ machineName: event.target.value });
  };

  changequantityHandler = (event) => {
    this.setState({ quantity: event.target.value });
  };

  changerentalFeeHandler = (event) => {
    this.setState({ rentalFee: event.target.value });
  };

  cancel() {
    this.props.history.push('/machines');
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
              <h3 className='text-center'>Update Machine</h3>
              <div className='card-body'>
                <form>
                  <div className='form-group'>
                    <label>Machine Code</label>
                    <input
                      placeholder='Machine Code'
                      name='machineCode'
                      className='form-control'
                      value={this.state.machineCode}
                      onChange={this.changeMachineCodeHandler}
                    />
                  </div>

                  <div className='form-group'>
                    <label>Machine Name</label>
                    <input
                      placeholder='Machine Name'
                      name='machineName'
                      className='form-control'
                      value={this.state.machineName}
                      onChange={this.changeMachineNameHandler}
                    />
                  </div>

                  <div className='form-group'>
                    <label>Quantity</label>
                    <input
                      placeholder='Quantity'
                      name='quantity'
                      className='form-control'
                      value={this.state.quantity}
                      onChange={this.changequantityHandler}
                    />
                  </div>

                  <div className='form-group'>
                    <label>Rental Fee</label>
                    <input
                      placeholder='Rental Fee'
                      name='rentalFee'
                      className='form-control'
                      value={this.state.rentalFee}
                      onChange={this.changerentalFeeHandler}
                    />
                  </div>

                  <div className='btnpanel'>
                    <button
                      className='btn btn-success '
                      onClick={this.updateMachine}
                    >
                      Update
                    </button>
                    <button
                      className='btn btn-danger '
                      onClick={this.cancel.bind(this)}
                      style={{ marginLeft: '10px' }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateMachineComponent;
