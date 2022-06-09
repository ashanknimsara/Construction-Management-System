import React, { Component } from 'react';
import RentService from '../services/RentService';
import ReactToPrint from 'react-to-print';

class ListRentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rents: [],
    };
    this.cancel = this.cancel.bind(this);
  }


  componentDidMount() {
    RentService.getRents().then((res) => {
      this.setState({ rents: res.data });
    });
  }
  cancel=() =>{
    this.props.history.push('/rent-dashbord');
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
                <h3 className='text-center'>Rental Report</h3>

        
        <div className='row'>
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer Name</th>
                <th>NIC</th>
                <th>Machine Name</th>
                <th>Rental Fee(per day)</th>
                <th>Quantity</th>
                <th>Days</th>
                <th>Total(Rs.)</th>
              </tr>
            </thead>

            <tbody>
              {this.state.rents.map((Rent) => (
                <tr key={Rent.id}>
                  <td>{Rent.date}</td>
                  <td>{Rent.customerName}</td>
                  <td>{Rent.nic}</td>
                  <td>{Rent.machineName}</td>
                  <td>{Rent.rentalFee}</td>
                  <td>{Rent.quantity}</td>
                  <td>{Rent.noOfDays}</td>
                  <td>{Rent.rentalFee*Rent.quantity*Rent.noOfDays}</td>
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

export default ListRentComponent;
