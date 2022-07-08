import React, { Component } from 'react'
import StockManagerService from '../services/StockManagerService'
// import Modal from 'react-modal/lib/components/Modal'
import StockMngNavBar from './StockMngNavBar';
import { SoloAlert } from 'soloalert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class ListItemComponent extends Component {
    constructor(props){
        super(props)

        this.state= {
            items: [],
            searchId: "",
        }
        this.addItem = this.addItem.bind(this);
        this.generateItemReport = this.generateItemReport.bind(this);
        //this.editItem = this.editItem.bind(this);
    }
     componentDidMount(){
         StockManagerService.getItems().then((res) => {
             this.setState({ items: res.data});
         });
     }

     searchItemById(event) {
      this.setState({ searchId: event.target.value.substr(0, 20) });
    }

    editItem(item_code) {
            this.props.history.push(`/edit-item/${item_code}`); 
            
    }
    addItem() {
        this.props.history.push('/add-item');
    }
    generateItemReport() {
      this.props.history.push("/list-item-report");
    }
    viewMore(item_code){
      this.props.history.push(`/view-item-details/${item_code}`);
    }

    // deleteItem(item_code) {
    //     SoloAlert.confirm({
    //         title: "Confirm Delete",
    //         body: "Are you sure",
    //         theme: "dark",
    //         useTransparency: true,
    //         onOk: async function () {
    //             try{
    //                 await StockManagerService.deleteItem(item_code);
    //                 this.setState({ items: this.state.items.filter(item => item.item_code !== item_code),
    //                 });
    //                 SoloAlert.alert({
    //                     title: "Welcome!",
    //                     body: "Deletion successful",
    //                     icon: "success",
    //                     theme: "dark",
    //                     useTransparency: true,
    //                     onOk: function () {
    //                       window.location = "/";
    //                     },
    //                 });
    //             } catch (err) {
    //                 SoloAlert.alert({
    //                   title: "Welcome!",
    //                   body: "Deletion successful",
    //                   icon: "success",
    //                   theme: "dark",
    //                   useTransparency: true,
    //                   onOk: function () {
    //                     window.location = "/";
    //                   },
    //                 });
    //               }

    //     // StockManagerService.deleteItem(item_code).then((res) => {
    //     // this.setState({ items: this.state.items.filter(item => item.item_code !== item_code)});
    //     // }
    //     },
    //     onCancel: function () {
    //       SoloAlert.alert({
    //         title: "Welcome!",
    //         body: "Deletion cancelled",
    //         icon: "success",
    //         theme: "dark",
    //         useTransparency: true,
    //         onOk: function () {
    //           window.location = "/";
    //         },
    //       });
    //     },
    //   });
    // }
    notify() {
      toast.success("Item Successfully Deleted!", {
        position: toast.POSITION.TOP_CENTER
      });
    }

    deleteItem(item_code) {
      this.notify();
      StockManagerService.deleteItem(item_code).then((res) => {
          this.setState({ items: this.state.items.filter(item => item.item_code !== item_code)});
      });
  }

  render() {
    let filterItemID = this.state.items.filter(
      (items) => {
        return (
          items.item_name
             .toLowerCase()
            .indexOf(this.state.searchId.toLowerCase()) !== -1
        );
      }
    );

    return (
      <div>
          <>
            <StockMngNavBar/> 
          </>
       
          <h2 className="text-center">List Items</h2>
          <div className='row'>
                <div className='col-sm-8'>
                  <button className="btn btn-primary" onClick={this.addItem}> + Add Item</button>
                </div>
                <div className='col-sm-4'>
                  <div className='search-box'>
                    <i className='fa-solid fa-magnifying-glass'></i>
                    <input
                      type="text"
                      class="form-control"
                      value={this.state.searchId}
                      onChange={this.searchItemById.bind(this)}
                      className='form-control'
                      placeholder='Search By Item Name&hellip;'
                    />
                  </div>
                </div>
              </div>

          <br></br>
           <div className="tb-container">
               {' '}
              <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>Item_Code</th>
                            <th>Invoice_Id</th>
                            <th>Item_Name</th>
                            <th>Quantity</th>
                            <th>ReOrder Level</th>
                            <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                            filterItemID.map((items) => (
                                <tr key={items.item_code}>
                                    <td>{items.item_code}</td>
                                    <td>{items.invoice_id}</td>
                                    <td>{items.item_name}</td>
                                    <td>{items.qty}</td>
                                    <td>{items.availability}</td>
                                    <td>
                                        <button onClick={() => this.editItem(items.item_code)} id='stockmgr-edit' className="btn btn-info">Edit</button>
                                        <button style={{marginLeft:"10px"}}onClick={() => this.deleteItem(items.item_code)} id='stockmgr-delete' className="btn btn-danger">Delete</button>
                                        <button style={{marginLeft:"10px"}}onClick={() => this.viewMore(items.item_code)} id='stockmgr-view' className="btn btn-info">More</button>

                                    </td>
                                </tr>    
                            ) )
                        }
                     </tbody>
               </table>   
                    
        </div>
        <div className = "row">
                <button className="btn btn-info" onClick={this.generateItemReport}>Generate Report</button>
          </div>
      </div>
    )
  }
}

