import React, { Component } from 'react'
import InformSupplierService from '../services/InformSupplierService';
// import Modal from 'react-modal/lib/components/Modal'
//import StockMngNavBar from './StockMngNavBar';
import ReactToPrint from 'react-to-print';


export default class RequestedItemListComponent extends Component {
    constructor(props){
        super(props)

        this.state= {
            informSupplier: []
        }
        //this.addItem = this.addItem.bind(this);
        //this.editItem = this.editItem.bind(this);
    }
     componentDidMount(){
         InformSupplierService.getInformItems().then((res) => {
             this.setState({ informSupplier: res.data});
         });
     }
    // editItem(item_code) {
    //         this.props.history.push(`/edit-item/${item_code}`); 
    // }
    // addInformItem() {
    //     this.props.history.push('/add-item');
    // }
    deleteInformItem(inform_id) {
        InformSupplierService.deleteInformItem(inform_id).then((res) => {
            this.setState({ informSupplier: this.state.informSupplier.filter(informSupplier => informSupplier.inform_id !== inform_id)});
        });
    }

  render() {
    return (
        <div className="react-pdf__Page__canvas_Single_View3">
        {/* <div className="Post" ref={ref}> */}
        <div ref ={el=>(this.componentRef=el)}>
          <div style={{ marginLeft: 20 }}><br></br>
            <h1 className='text-center'>Vihanga Elecrticals and Constructions</h1>

                <h5 className='text-center'>Electrical installations, plumbing, steel fabricators {"&"} all civil constructions</h5>

                <h3 className='text-center'>Item Details</h3>
            <br></br>
          <br></br>
           {/* <div className="tb-container">
               {' '}
              <table className="table table-striped table-hover table-bordered">
                    <thead> */}
                      <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                        <tr>
                            <th>SupplierID</th>
                            <th>Item_Code</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Discripton</th>
                            <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {
                            this.state.informSupplier.map(
                                informSupplier => 
                                <tr key={informSupplier.informId}>
                                    <td>{informSupplier.supplierId}</td>
                                    <td>{informSupplier.itemCode}</td>
                                    <td>{informSupplier.itemName}</td>
                                    <td>{informSupplier.quantity}</td>
                                    <td>{informSupplier.description}</td>
                                    <td>
                                        {/* <button onClick={() => this.editItem(item.item_code)} id='stockmgr-edit' className="btn btn-info">Edit</button> */}
                                        <button style={{marginLeft:"10px"}}onClick={() => this.deleteInformItem(informSupplier.inform_id)} id='supplymgr-delete' className="btn btn-danger">Delete</button>
                                        {/* <button style={{marginLeft:"10px"}}onClick={() => this.viewItem(item.item_code)} id='stockmgr-view' className="btn btn-info">More</button> */}

                                    </td>
                                </tr>    
                            ) 
                        }
                     </tbody>
               </table>   
                    
        </div>
      </div>
      </div>
      <div className='text-right mb-2 mr-5'>
                    <ReactToPrint
                        trigger={()=>{
                        return <button className="btn btn-success">Download Report</button>
                        }}
                        content={()=>this.componentRef}
                        documentTitle = 'Employee Report'
                        pageStyle= "print"/>
            </div>   
      </div>
      
    )
  }
}

