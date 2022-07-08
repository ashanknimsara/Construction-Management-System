import React, { Component } from 'react'
import StockMngNavBar from './StockMngNavBar'
//import { useState, useEffect } from 'react'


export default class IssueItemsComponent extends Component {
    constructor(props) {
        super(props)
            this.state = {
                item_code: '',
                invoice_id: '',
                item_name: '',
                qty: '',
                availability: '',

                // this.requested-item = this.requested-item.bind(this);

            }
           
//             //this.changeItemHandler = this.changeItemHandler.bind(this);
//             this.itemCodeHandler = this.itemCodeHandler.bind(this);
//             this.invoiceIdHandler = this.invoiceIdHandler.bind(this);
//             this.itemNameHandler = this.itemNameHandler.bind(this);
//             this.quantityHandler = this.quantityHandler.bind(this);
//             this.availabilityHandler = this.availabilityHandler.bind(this);

//             this.addItem = this.addItem.bind(this);
             //  this.issue-items = this.issue-items.bind(this);
       }
//         addItem =(e) => {
//             e.preventDefault();
//             let item = {
//                 item_code: this.state.item_code,
//                 invoice_id: this.state.invoice_id,
//                 item_name: this.state.item_name,
//                 qty: this.state.qty,
//                 availability: this.state.availability,
// };
//            // StockManagerService.addItem(item).then((res)=>{this.push()})
//            StockManagerService.addItem(item).then((res)=>{this.props.history.push('/')})

//this.props.addItem(item);
            // this.setState({
            //     itemCode: '',
            //     invoiceId: '',
            //     itemName: '',
            //     quantity: '',
            //     availability: '',
            // })

        //     console.log(this.state.itemCode)
        //     console.log('item =>' +JSON.stringify(item));
        // }

        // itemCodeHandler = (event) => {
        //     this.setState({
        //         item_code: event.target.value
        //     })
        //     console.log(event.target.value)
        // }
        // invoiceIdHandler = (event) => {
        //     this.setState({
        //         invoice_id: event.target.value
        //     })
        // }
        // itemNameHandler = (event) => {
        //     this.setState({
        //         item_name: event.target.value
        //     })
        // }
        // quantityHandler = (event) => {
        //     this.setState({
        //         qty: event.target.value
        //     })
        // }
        // availabilityHandler = (event) => {
        //     this.setState({
        //         availability: event.target.value
        //     })
        // }
        // cancel = () => {
        //     this.props.history.push('/items');
        // }

  render() {
    return (
      <div>
             <>
                    <StockMngNavBar />
                </>
          <div className="container">
       
              <div className="row">
               

                  <div className='card col-md-6 offset-md-3' style={{marginTop: "15px"}}>
                  <h3 className="text-center">Issue Items</h3>
                      <div className='card-body'>
                          <form>
                                <div className="form-group">
                                    <label>Project ID</label>
                                    <input type="text" className="form-control" placeholder="Enter Project ID" value={this.state.item_code}
                                    onChange={this.itemCodeHandler} required/>
                                </div>

                                <div className="form-group">
                                    <label>Project Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Project Name" value={this.state.invoice_id}
                                    onChange={this.invoiceIdHandler} />
                                </div>

                                <div className="form-group">
                                    <label>Location</label>
                                    <input type="text" className="form-control" placeholder="Address" value={this.state.item_name}
                                    onChange={this.itemNameHandler} />
                                </div>

                                <div className="form-group">
                                    <label>Date</label>
                                    <input type="date" id='date' className="form-control" placeholder="Enter Date" value={this.state.qty}
                                     />
                                </div>

                                <div className="form-group">
                                    <label>Discription</label>
                                    <textarea className="form-control" placeholder="Enter Discription" value={this.state.availability} onChange={this.availabilityHandler}>
                                        
                                    </textarea>

                                    {/* <input type="text" className="form-control" placeholder="Enter Availability" value={this.state.availability}
                                    onChange={this.availabilityHandler} /> */}
                                </div>

                                <button className='btn btn-primary'>Send</button>
                                <button style={{marginLeft: "10px"}} className='btn btn-danger'>Cancel</button>

                                <button style={{marginLeft: "180px"}} className='btn btn-info'>View Issue Items</button>

                                
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
