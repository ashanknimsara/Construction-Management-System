import React, { Component } from 'react'
//import { useState, useEffect } from 'react'
import StockManagerService from '../services/StockManagerService'
import StockMngNavBar from './StockMngNavBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();


export default class CreateItem extends Component {
    constructor(props) {
        super(props)
            this.state = {
                item_code: '',
                invoice_id: '',
                item_name: '',
                qty: '',
                availability: '',

                itemCodeError: "",
                invoiceIdError: "",
                itemNameError: "",
                qtyError: "",
                availabilityError: "",

            }
            //this.changeItemHandler = this.changeItemHandler.bind(this);
            this.itemCodeHandler = this.itemCodeHandler.bind(this);
            this.invoiceIdHandler = this.invoiceIdHandler.bind(this);
            this.itemNameHandler = this.itemNameHandler.bind(this);
            this.quantityHandler = this.quantityHandler.bind(this);
            this.availabilityHandler = this.availabilityHandler.bind(this);

            this.addItem = this.addItem.bind(this);
        }

        notify() {
            toast.success("Item added to the Item List successfully!", {
              position: toast.POSITION.TOP_CENTER
            });
          }
        
          notify1() {
            toast.error("Item was not added to the Item List!", {
              position: toast.POSITION.TOP_CENTER
            });
          }

          warning() {
            if (
              this.state.qty == this.state.availability ||
              this.state.qty < this.state.availability
            ) {
              toast.warn("Item is below or equal to the re-order level!", {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          }

          validate = () => {
                let itemCodeError = "";
                let invoiceIdError = "";
                let itemNameError = "";
                let qtyError = "";
                let availabilityError = "";

                if (!this.state.item_code) {
                    itemCodeError = "Required";
                  }
                    if (!this.state.invoice_id) {
                        invoiceIdError = "Required";
                      }
                        if (!this.state.item_name) {
                            itemNameError = "Required";
                          }
                            if (!this.state.qty) {
                                qtyError = "Required";
                              }
                                if (!this.state.availability) {
                                    availabilityError = "Required";
                                  }
                                  if(itemCodeError || invoiceIdError || itemNameError || qtyError || availabilityError){
                                    this.setState({itemCodeError, invoiceIdError, itemNameError, qtyError, availabilityError});
                                    return false;
                                  }

                                  return true;

          };

        addItem =(e) => {
            e.preventDefault();
            let item = {
                item_code: this.state.item_code,
                invoice_id: this.state.invoice_id,
                item_name: this.state.item_name,
                qty: this.state.qty,
                availability: this.state.availability,
            };
            const isValid = this.validate();
            if(isValid){
                // StockManagerService.addItem(item).then((res)=>{this.push()})
                StockManagerService.addItem(item).then((res)=>
                {
                    this.warning();
                    this.notify();
                    this.props.history.push('/');
                });
            }

           // StockManagerService.addItem(item).then((res)=>{this.push()})
        //    StockManagerService.addItem(item).then((res)=>
        //    {
        //        this.notify();
        //        this.props.history.push('/')
        //     })

//this.props.addItem(item);
            // this.setState({
            //     itemCode: '',
            //     invoiceId: '',
            //     itemName: '',
            //     quantity: '',
            //     availability: '',
            // })

            console.log(this.state.itemCode)
            console.log('item =>' +JSON.stringify(item));
        };

        itemCodeHandler = (event) => {
            this.setState({
                item_code: event.target.value
            })
            console.log(event.target.value)
        }
        invoiceIdHandler = (event) => {
            this.setState({
                invoice_id: event.target.value
            })
        }
        itemNameHandler = (event) => {
            this.setState({
                item_name: event.target.value
            })
        }
        quantityHandler = (event) => {
            this.setState({
                qty: event.target.value
            })
        }
        availabilityHandler = (event) => {
            this.setState({
                availability: event.target.value
            })
        }
        cancel = () => {
            this.notify1();
            this.props.history.push('/items');
        }

  render() {
    return (
      <div>
          <div className="container">
              <div className="row">

                  <div className='card col-md-6 offset-md-3' style={{marginTop: "15px"}}>
                  <h3 className="text-center">Add Item</h3>
                      <div className='card-body'>
                          <form>
                                <div className="form-group">
                                    <label>Item Code</label>
                                    <input type="text" className="form-control" placeholder="Enter Item Code" value={this.state.item_code}
                                    onChange={this.itemCodeHandler} required/>
                                    <div style={{fontSize: 14, color: "red"}}>{this.state.itemCodeError}</div>

                                </div>

                                <div className="form-group">
                                    <label>Invoice Id</label>
                                    <input type="text" className="form-control" placeholder="Enter Invoice Id" value={this.state.invoice_id}
                                    onChange={this.invoiceIdHandler} />
                                    <div style={{fontSize: 14, color: "red"}}>{this.state.invoiceIdError}</div>
                                </div>

                                <div className="form-group">
                                    <label>Item Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Item Name" value={this.state.item_name}
                                    onChange={this.itemNameHandler} />
                                    <div style={{fontSize: 14, color: "red"}}>{this.state.itemNameError}</div>
                                </div>

                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input type="text" className="form-control" placeholder="Enter Quantity" value={this.state.qty}
                                    onChange={this.quantityHandler} />
                                    <div style={{fontSize: 14, color: "red"}}>{this.state.qtyError}</div>
                                </div>

                                <div className="form-group">
                                    <label>Re Order Level</label>
                                    <input type="text" className="form-control" placeholder="Enter ReorderLevel" value={this.state.availability}
                                    onChange={this.availabilityHandler} />
                                    <div style={{fontSize: 14, color: "red"}}>{this.state.availabilityError}</div>
                                </div>

                                <button className='btn btn-primary' onClick={this.addItem}>Add</button>
                                <button style={{marginLeft: "10px"}} className='btn btn-danger' onClick={this.cancel.bind(this) }>Cancel</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
