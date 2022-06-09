import React, { Component } from 'react';
import RentService from '../services/RentService';

class ListRentComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rents: [],
    };
    this.newRent = this.newRent.bind(this);
    this.deleteRent = this.deleteRent.bind(this);
  }

  deleteRent(id) {
    RentService.deleteRent(id).then((res) => {
      this.setState({
        rents: this.state.rents.filter((Rent) => Rent.id !== id),
      });
    });
  }

  componentDidMount() {
    RentService.getRents().then((res) => {
      this.setState({ rents: res.data });
    });
  }

  newRent() {
    this.props.history.push('/rent-Machine');
  }

  generateRentalReport() {
    this.props.history.push('/rent-Report');
  }

  //Filter data Function to filter Searched Item

filterData(rents,searchKey){

    console.log(searchKey);
  
    console.log(rents);
  
        const result = rents.filter((rent) =>
  
        rent.customerName.toLowerCase().includes(searchKey.toLowerCase())  ||
        rent.customerName.toUpperCase().includes(searchKey.toUpperCase())||
        rent.machineName.toLowerCase().includes(searchKey.toLowerCase())  ||
        rent.machineName.toUpperCase().includes(searchKey.toUpperCase())
        )
  
        this.setState({rents:result})
  
  }
  
  
  
  //Handle Searcher to get User input and send to Filter Function
  
  handleSearchArea =(e) =>{
  
  const searchKey = e.target.value;
  
  RentService.getRents().then((res) => {
  
    this.filterData(res.data,searchKey)
  
  });

}

  render() {
    return (
        <div>
            <h3 className='text-center'>Rent Details</h3>

            <div className='flexbox'>

            <div><button className='btn btn-primary ' onClick={this.newRent}> New Rent</button></div>
            <div><button id='btn-generatereport' style={{marginLeft:"10px"}} 
            className='btn btn-success'onClick={()=>this.generateRentalReport()}>Rental Report</button></div>

            <div className='flexbox-flex'><input className='form-contro' type='search' placeholder='Search' style={{margin:"0"}}
            name='searchQuery' onChange={this.handleSearchArea}></input></div>
           
            </div>
 
            
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
                <th>Actions</th>
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
                  <td>
                    
                    <button
                      onClick={() => this.deleteRent(Rent.id)}
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

export default ListRentComponent;
