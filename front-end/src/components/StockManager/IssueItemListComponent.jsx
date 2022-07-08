import React, { Component } from 'react'
import StockManagerService from '../services/StockManagerService'
// import Modal from 'react-modal/lib/components/Modal'
//import StockMngNavBar from './StockMngNavBar';


export default class IssueItemListComponent extends Component {
    constructor(props){
        super(props)

        this.state= {
            items: []
        }
        //this.addItem = this.addItem.bind(this);
        //this.editItem = this.editItem.bind(this);
    }
    //  componentDidMount(){
    //      StockManagerService.getItems().then((res) => {
    //          this.setState({ items: res.data});
    //      });
    //  }
    // editItem(item_code) {
    //         this.props.history.push(`/edit-item/${item_code}`); 
    // }
    // addItem() {
    //     this.props.history.push('/add-item');
    // }
    // deleteItem(item_code) {
    //     StockManagerService.deleteItem(item_code).then((res) => {
    //         this.setState({ items: this.state.items.filter(item => item.item_code !== item_code)});
    //     });
    // }

  render() {
    return (
      <div>
          {/* <>
            <StockMngNavBar/> 
          </> */}
       
          <h2 className="text-center">Projects List</h2>
          {/* <div className = "row">
                <button className="btn btn-primary" onClick={this.addItem}> + Add Item</button>
          </div> */}
          <br></br>
           <div className="tb-container">
               {' '}
              <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Project Id</th>
                            <th>Project Name</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Discripton</th>
                            <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                            // this.state.items.map(
                            //     item => 
                            //     <tr key={item.item_code}>
                            //         <td>{item.item_code}</td>
                            //         <td>{item.invoice_id}</td>
                            //         <td>{item.item_name}</td>
                            //         <td>{item.qty}</td>
                            //         <td>{item.availability}</td>
                            //         <td>
                            //             <button onClick={() => this.editItem(item.item_code)} id='stockmgr-edit' className="btn btn-info">Edit</button>
                            //             <button style={{marginLeft:"10px"}}onClick={() => this.deleteItem(item.item_code)} id='stockmgr-delete' className="btn btn-danger">Delete</button>
                            //             <button style={{marginLeft:"10px"}}onClick={() => this.viewItem(item.item_code)} id='stockmgr-view' className="btn btn-info">More</button>

                            //         </td>
                            //     </tr>    
                            // ) 
                        }
                     </tbody>
               </table>   
                    
        </div>
      </div>
    )
  }
}

