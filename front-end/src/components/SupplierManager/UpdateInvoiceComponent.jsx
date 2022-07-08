import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SupplierManagerService from '../../Services/SupplierManagerService';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFilledInput-root': {
      background: 'rgb(232, 241, 250)',
    },
  },
  modalUpdate: {
    background: 'rgba(255, 255, 255, 0.5))',
  },
  textField: {
    width: 400,
    '& p': {
      color: 'red',
    },
  },
}));

export const UpdateInvoiceComponent = () => {
  const params = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [paidAmountError, setPaidAmountError] = useState(
    '*optional(Change if company has paid to the supplier)'
  );
  const [remainningAmount, setReamainningAmount] = useState(0);

  const [updatedInvoice, setUpdatedInvoice] = useState({
    invoice_id: params.invoice_id,
    promised_date: '',
    paid_amount: 0,
    payment_status: '',
    received_status: '',
  });
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    console.log(params);
    SupplierManagerService.getInvoiceById(params.invoice_id).then((res) => {
      const invoice = res.data;
      const {
        invoice_id,
        promised_date,
        paid_amount,
        payment_status,
        received_status,
        total_amount,
      } = invoice;
      setReamainningAmount(total_amount - paid_amount);

      setUpdatedInvoice({
        invoice_id,
        promised_date,
        paid_amount,
        payment_status,
        received_status,
      });
    });
  }, []);
  const validateUpdateInvoice = (name, value) => {
    var errorFlag = true;
    if (name === 'paid_amount') {
      //check if the
      if (value > remainningAmount) {
        console.log(name);
        //  value=remainningAmount
        setPaidAmountError(
          'Paid amount cannot be higher than  ' +
            remainningAmount +
            ', please change the value'
        );
        errorFlag = false;
      } else if (value.length == 0) {
        setPaidAmountError('Paid amount cannot be empty.');
        errorFlag = false;
      } else if (value <= remainningAmount && !isNaN(+value)) {
        setPaidAmountError('This amount is valid.');
        errorFlag = true;
      } else {
        errorFlag = false;
        setPaidAmountError('Input must be a number. please change the value');
      }
    } else if (name === 'received_status') {
    } else if (name == 'promised_date') {
    }
    return errorFlag;
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateUpdateInvoice(name, value);
    setUpdatedInvoice({ ...updatedInvoice, [name]: value });
  };
  const saveOrUpdateInvoice = (e) => {
    e.preventDefault();
    SupplierManagerService.updateInvoice(updatedInvoice, params.invoice_id)
      .then((res) => {
        toast.success('Invoice updated successfully.');

        history.push('/supplier_Manager_Dashboard');
      })
      .catch((err) => {
        toast.success('Invoice updation unsuccessful.');
      });
  };

  return (
    <div className='update-invoice-container'>
     
      <div className='backward-navigation'>
        <Link to='/supplier_Manager_Dashboard'>
          {`<  `} Supplier Manager Dashboard{' '}
        </Link>
      </div>
      <div className='page-invoice-title'>
        <p>Update Invoice</p>
      </div>
      <main>
        <div className='glass'>
          {' '}
          <Box
            p={15}
            pl={23}
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 5, width: '30ch' },
            }}
            noValidate
            autoComplete='off'
          >
            <div>
              {' '}
              <TextField
                select
                defaultValue={'Received'}
                labelid='demo-simple-select-label'
                id='demo-simple-select'
                name='received_status'
                value={updatedInvoice.received_status}
                label='Item Received Status'
                onChange={handleChange}
                helperText='*optional(update if items are received)'
                className={classes.textField}
              >
                <MenuItem value='Received'>Received</MenuItem>
                <MenuItem value='Not Received'>Not Received</MenuItem>
              </TextField>
              <TextField
                helperText={paidAmountError}
                id='paid_amount'
                name='paid_amount'
                label='Paid Amount'
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                value={updatedInvoice.paid_amount}
                variant='outlined'
                onChange={handleChange}
                className={classes.textField}
              />
            </div>
            <div>
              {' '}
              <TextField
                helperText='*optional(update if item reeceiving date is changed)'
                id='date'
                name='promised_date'
                label='Item Receiving Date'
                type='date'
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                //set minimum date as default to prevent from inputing previous dates
                inputProps={{
                  min: updatedInvoice.promised_date,
                }}
                onChange={handleChange}
                value={updatedInvoice.promised_date}
                className={classes.textField}
              />{' '}
              <TextField
                select
                defaultValue={'not paid'}
                labelid='demo-simple-select-label'
                id='dpayment_status'
                name='payment_status'
                value={updatedInvoice.payment_status}
                label='Items Payment Status'
                onChange={handleChange}
                className={classes.textField}
              >
                <MenuItem value='Paid'>Paid</MenuItem>
                <MenuItem value='Not Paid'>Not Paid</MenuItem>
                <MenuItem value='Half Paid'>Half Paid</MenuItem>
              </TextField>
            </div>

            <div className='btn-update-confirm update-invoice-received-paid'>
              <div className='p-remainning-amount'>
                {' '}
                <p>{`Remaining Amount is Rs. ` + remainningAmount}</p>
              </div>
              <Button
                variant='contained'
                style={{
                  borderRadius: 5,
                  backgroundColor: '#2091F9',
                  padding: '12px 24px',
                  textTransform: 'none',
                  fontSize: '12px',

                  color: 'white',
                }}
                onClick={showModal}
              >
                Update
              </Button>
            </div>
            <Modal
              show={isOpen}
              onHide={hideModal}
              size='sm'
              aria-labelledby='contained-modal-title-vcenter'
              centered
              className={classes.modalup}
            >
              <Modal.Header className={classes.modalUpdate}>
                <Modal.Title className={classes.modalUpdate}>
                  Do you wand to update this invoice ?
                </Modal.Title>
              </Modal.Header>

              <Modal.Footer className={classes.modalUpdate}>
                <button onClick={hideModal}>No</button>
                <button onClick={saveOrUpdateInvoice}>Yes</button>
              </Modal.Footer>
            </Modal>
          </Box>
        </div>
      </main>
    </div>
  );
};

export default UpdateInvoiceComponent;
