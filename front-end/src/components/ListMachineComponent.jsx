import React, { Component } from 'react';
import MachineService from '../services/MachineService';

class ListMachineComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machines: [],
    };
    this.addMachine = this.addMachine.bind(this);
    this.editMachine = this.editMachine.bind(this);
    this.deleteMachine = this.deleteMachine.bind(this);
  }

  deleteMachine(id) {
    MachineService.deleteMachine(id).then((res) => {
      this.setState({
        machines: this.state.machines.filter((Machine) => Machine.id !== id),
      });
    });
  }

  editMachine(id) {
    this.props.history.push(`/update-Machine/${id}`);
  }

  componentDidMount() {
    MachineService.getMachines().then((res) => {
      this.setState({ machines: res.data });
    });
  }

  addMachine() {
    this.props.history.push('/add-Machine');
  }

  render() {
    return (
      <div>
        <h3 className='text-center'>Machine List</h3>
        <div className='btn btn'>
          <button className='btn btn-primary ' onClick={this.addMachine}>
            Add Machine
          </button>
        </div>
        <div className='row'>
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Machine Code</th>
                <th>Machine Name</th>
                <th>Quantity</th>
                <th>Rental Fee (Per Day)</th>
                <th>Rented Count</th>
                <th>Available Count</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.machines.map((Machine) => (
                <tr key={Machine.id}>
                  <td>{Machine.machineCode}</td>
                  <td>{Machine.machineName}</td>
                  <td>{Machine.quantity}</td>
                  <td>{Machine.rentalFee}</td>
                  <td>{Machine.rentedCount}</td>
                  <td>{Machine.quantity - Machine.rentedCount}</td>
                  <td>
                    <button
                      onClick={() => this.editMachine(Machine.id)}
                      className='btn btn-info'
                    >
                      Update
                    </button>
                    <button
                      style={{ marginLeft: '10px' }}
                      onClick={() => this.deleteMachine(Machine.id)}
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
    );
  }
}

export default ListMachineComponent;
