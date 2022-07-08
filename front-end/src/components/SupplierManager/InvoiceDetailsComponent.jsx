import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@mui/material';
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
    '& p': {
      color: 'red',
    },
    '&&': {
      width: 500,
      marginLeft: 1000,
    },
  },
}));

export const InvoiceDetailsComponent = ({
  selectedItems,
  nextStep,
  prevStep,
  invoice,
  handleChange,
  nvalidOther,
  handleValidOther,
}) => {
  const classes = useStyles();

  const [totalAmount, setTotalAmount] = useState(invoice.total_amount);
  const [seletedItem, setSeletedItem] = useState([...invoice.items]);
  const [promisedDate, setPromisedDate] = useState(invoice.promised_date);
  const [paymentStatus, setPaymentStatus] = useState(invoice.payment_status);
  const [paidAmount, setPaidAmount] = useState(invoice.paid_amount);

  const [paidAmountError, setPaidAmountError] = useState(
    '*optional(Change if company has paid to the supplier)'
  );
  const [paymentStatusError, setPaymentStatusError] = useState(
    '*Required(please add a payment status)'
  );
  const [dateError, setDateError] = useState('Please add a new date');

  const [allDetailsValid, setAllDetailsValid] = useState(nvalidOther);
  const [isValidPayment, setIsValidPayment] = useState(nvalidOther);
  const [isValidPaymentStatus, setIsValidPaymentStatus] = useState(nvalidOther);
  const [isValidDate, setIsValidDate] = useState(nvalidOther);

  const [isFirstTime, setIsFirstTime] = useState(false);

  //to watch the current state
  //console.log won't show the current
  useEffect(() => {
    selectedItems.map((item) => {
      const amount = item.qty * item.unit_price;
      setTotalAmount((totalAmount) => totalAmount + amount);
    });

    setSeletedItem([...selectedItems]);
    //setTotal amount
    if (allDetailsValid) {
      setIsFirstTime(false);
    } else {
      setIsFirstTime(true);
    }
  }, []);
  useEffect(() => {
    let validity = isValidDate && isValidPayment && isValidPaymentStatus;
    if (validity) {
      setAllDetailsValid(true);
    } else {
      setAllDetailsValid(false);
    }
  }, [isValidPayment, isValidPaymentStatus, isValidDate]);
  const validateUpdateInvoice = (name, value) => {
    setIsValidPayment(true);
    setIsValidPaymentStatus(true);
    setIsValidDate(true);

    setIsFirstTime(false);

    if (name === 'paid_amount') {
      setPaidAmount(value);
      //check if the
      if (value > totalAmount) {
        console.log(name);
        //  value=remainningAmount
        setPaidAmountError(
          'Paying amount cannot be higher than  ' +
            totalAmount +
            ', please change the value'
        );
        setIsValidPayment(false);
      } else if (value.length == 0) {
        setPaidAmountError('Paid amount cannot be empty.');
      } else if (value <= totalAmount && !isNaN(+value)) {
        setPaidAmountError(
          `You can pay half payment :- Rs : ${totalAmount / 2} `
        );
        setIsValidPayment(true);
      } else {
        setIsValidPayment(false);
        setPaidAmountError('Intput must be a number.');
      }
    } else if (name === 'payment_status') {
      setPaymentStatus(value);
      if (value.length === 0) {
        setIsValidPaymentStatus(false);

        setPaymentStatusError('Plesase choose the payment status');
      } else {
        setIsValidPaymentStatus(true);
      }
    } else if (name == 'promised_date') {
      setPromisedDate(value);
      if (value.length === 0) {
        setIsValidDate(false);
        setDateError('Please choose a date to continue');
      } else {
        setIsValidDate(true);
      }
    }
  };

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateUpdateInvoice(name, value);

    handleChange(name, value);
  };

  const continued = (e) => {
    e.preventDefault();
    handleChange('total_amount', totalAmount);
    if (allDetailsValid) {
      handleValidOther();
      setIsFirstTime(false);
      nextStep();
    } else {
      console.log('Please enter valid inputs ');
      toast.error('Please fill all the fields with valid inputs.');
    }
    if (isFirstTime) {
      setDateError('Please choose a date to continue');

      setPaymentStatusError('Plesase choose the payment status');
    } else {
      setDateError('');
      setPaidAmountError('');
      setPaymentStatusError('');
    }
  };

  //travel to dash board
  const moveBack = (e) => {
    e.preventDefault();

    prevStep();
  };
  return (
    <div className='supplier-details-container'>
      <div className='tp-container'>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { ml: 5, mt: 2, width: '30ch' },
          }}
          noValidate
          autoComplete='off'
          paddingLeft='50px'
          paddingTop='50px'
        >
          <div>
            <div>
              <Typography
                variant='h6'
                component='h2'
                gutterBottom
                color='textSecondary'
              >
                Other Details
              </Typography>
              <TextField
                helperText={dateError}
                id='date'
                defaultValue={moment().utcOffset('+05:30').format('MM/DD/YYYY')}
                name='promised_date'
                label='Item Receiving Date'
                type='date'
                onChange={handleInputs}
                value={promisedDate}
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                //set minimum date as default to prevent from inputing previous dates
                inputProps={{
                  min: moment().utcOffset('+05:30').format('MM/DD/YYYY'),
                }}
                className={classes.textField}
              />
              <Typography
                variant='h7'
                component='h6'
                gutterBottom
                paddingLeft='10px'
                color='textSecondary'
              >
                Total Amount :-{` Rs :` + totalAmount}
              </Typography>
            </div>

            <div className='new-supplier'>
              <div>
                <TextField
                  select
                  defaultValue={'not paid'}
                  labelid='demo-simple-select-label'
                  id='payment_status'
                  name='payment_status'
                  onChange={handleInputs}
                  value={paymentStatus}
                  label='Items Payment Status'
                  helperText={paymentStatusError}
                  className={classes.textField}
                >
                  <MenuItem value='Paid'>Paid</MenuItem>
                  <MenuItem value='Not Paid'>Not Paid</MenuItem>
                  <MenuItem value='Half Paid'>Half Paid</MenuItem>
                </TextField>
              </div>

              <div className='inner-input-validation'>
                <TextField
                  name='paid_amount'
                  id='paid_amount'
                  helperText={paidAmountError}
                  label='Paying amount'
                  variant='outlined'
                  onChange={handleInputs}
                  value={paidAmount}
                  className={classes.textField}
                />
              </div>
              <div className='inner-input-validation'></div>
            </div>
          </div>
        </Box>
        <div className='btn-box invoice-details-box'>
          <div class='continue-btn'>
            {' '}
            <Button variant='contained' color='primary' onClick={moveBack}>
              {`< Back`}
            </Button>
          </div>
          <div>
            {' '}
            <Button variant='contained' color='primary' onClick={continued}>
              {`Continue >`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsComponent;
