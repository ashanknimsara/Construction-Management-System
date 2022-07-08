import React, { useEffect, useState } from 'react';

import Invoice from '../components/SupplierManager/InvoiceComponent';
import SupplierManagerService from '../Services/SupplierManagerService';
import StatsBar from '../components/SupplierManager/StatsBarComponent';
import { Route, useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import InvoiceFormComponent from '../components/SupplierManager/InvoiceFormComponent';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';

export default function SupplierMangerComponent() {
  const history = useHistory();
  const [dumyData, setDumyData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [invoiceID, setInvoiceId] = useState(0);
  // const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredDumyData, setFilteredDumyData] = useState([]);

  useEffect(() => {
    SupplierManagerService.getInvoiceDetails().then((resp) => {
      setDumyData(resp.data);
      console.log(dumyData);
    });
  }, []);
  const removeInvoice = (id, e) => {
    e.preventDefault();
    SupplierManagerService.deleteInvoice(id)
      .then((res) => {
        toast.success('Invoice deleted successfully.');
        // setIsSuccess(true);
        setDumyData((dumyData) => {
          return dumyData.filter((invoice) => invoice.invoice_id !== id);
        });
      })
      .catch((err) => {
        toast.error('invoice deletion unsuccessful');
      });
  };
  const searchInvoice = (id) => {
    console.log(id);
    let string = !isNaN(+id) ? id.toString() : id;
    setFlag(true);

    if (string) {
      const filtered = dumyData.filter(
        (invoice) =>
          invoice.invoice_id.toString().includes(string) ||
          invoice.supplier.supplierName.includes(string)
      );
      setFilteredDumyData([...filtered]);
      console.log(filtered);
      setLoading(false);
    } else {
      setLoading(true);
    }
  };
  const addInvoice = () => {
    history.push('/addInvoice');
  };

  return (
    <>
      <div className='backward-navigation'>
        <Link to='/dashboard'>{`<  `} Main Dashboard </Link>
      </div>
      <div className='container-xll'>
        <div className='stats-container'>
          <StatsBar data={dumyData} />
        </div>
      </div>
      <div className='container-xll'>
        <div className='table-responsive'>
          <div className='table-wrapper'>
            <div className='table-title'>
              <div className='row'>
                <div className='invoice-header-parts col-sm-8'>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={addInvoice}
                  >
                    + Add new Invoice
                  </button>
                </div>
                <div className='invoice-header-parts  col-sm-4'>
                  <div className='search-box'>
                    <i className='fa-solid fa-magnifying-glass'></i>
                    <input
                      //  value={invoiceID}
                      onChange={(e) => searchInvoice(e.target.value)}
                      type='text'
                      className='form-control'
                      placeholder='Search&hellip;'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='tb-container'>
              {' '}
              <table className='table table-striped table-hover table-bordered '>
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Supplier Name</th>
                    <th>Receiving Date</th>
                    <th>Total Amount(Rs.)</th>
                    <th>Paid Amount(Rs.)</th>
                    <th>Payment Status</th>
                    <th>Received Status</th>
                    <th colSpan={3} className='text-center'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? dumyData.map((test) => {
                        return (
                          <Invoice
                            key={test.invoice_id}
                            {...test}
                            removeInvoice={removeInvoice}
                          />
                        );
                      })
                    : filteredDumyData.map((test) => {
                        return (
                          <Invoice
                            key={test.invoice_id}
                            {...test}
                            removeInvoice={removeInvoice}
                          />
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
