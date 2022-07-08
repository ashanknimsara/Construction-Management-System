import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import validator from 'validator';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
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

export const SupplierDetailsComponent = ({
  allSuppliers,
  handleChange,
  nextStep,
  nvalidSupplier,
  handleValidSupplier,
  invoice,
}) => {
  const history = useHistory();
  const [validSupplier, setValidSupplier] = useState(nvalidSupplier);
  const classes = useStyles();

  const [emailError, setEmailError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [nameError, setNameError] = useState('');

  const [isFirstTime, setIsFirstTime] = useState(false);
  const [newSupplier, setNewSupplier] = useState({ ...invoice.supplier });

  const [isValidMail, setIsValidMail] = useState(nvalidSupplier);
  const [isValidPhoneNumber, setisValidPhoneNumber] = useState(nvalidSupplier);
  const [isValidAddress, setisValidAddress] = useState(nvalidSupplier);
  const [isValidName, setisValidName] = useState(nvalidSupplier);

  //referencing inputs

  //use effect solved the issue in usestate update issue
  useEffect(() => {
    let validity =
      isValidAddress && isValidMail && isValidName && isValidPhoneNumber;

    if (validity) {
      setValidSupplier(true);
    } else {
      setValidSupplier(false);
    }
  }, [isValidAddress, isValidMail, isValidName, isValidPhoneNumber]);

  useEffect(() => {
    if (validSupplier) {
      setIsFirstTime(false);
    } else {
      setIsFirstTime(true);
    }
  }, []);
  const handleSupChange = (e) => {
    const value = e.target.value;
    setisValidName(true);
    setIsValidMail(true);
    setisValidAddress(true);

    setisValidPhoneNumber(true);

    setIsFirstTime(false);
    setEmailError('');
    setMobileNoError('');
    setNameError('');
    setAddressError('');
    //set supplier as a valid input
    setValidSupplier(true);

    const changedSupplier = allSuppliers.find(
      (oneSupplier) => oneSupplier.supplierName === value
    );
    setNewSupplier(changedSupplier);
  };
  //validate user inputs
  const validateSupdetails = (input, name) => {
    setisValidName(true);
    setIsValidMail(true);
    setisValidAddress(true);
    setisValidPhoneNumber(true);

    setIsFirstTime(false);

    if (name === 'email') {
      if (validator.isEmail(input)) {
        setEmailError('Valid Email');
        setIsValidMail(true);
      } else if (input.length == 0) {
        setEmailError('Email field cannot be empty');
        setIsValidMail(false);
      } else {
        setEmailError('Invalid Email,Please use email as ex :- abc@gmail.com');
        setIsValidMail(false);
      }
    } else if (name === 'phoneNumber') {
      var pattern = new RegExp(/^[0-9\b\+\-\(\)]+$/);

      if (pattern.test(input) && input.length == 10) {
        setMobileNoError('Valid Mobile Number');
        setisValidPhoneNumber(true);
      } else if (input.length == 0) {
        setMobileNoError('Mobile number field cannot be empty.');
        setisValidPhoneNumber(false);
      } else {
        setMobileNoError(
          'Invalid mobile number, please use only 10 numbers ex :- 0755297678'
        );
        setisValidPhoneNumber(false);
      }
    } else if (name === 'supplierName') {
      if (input.length == 0) {
        setNameError('Supplier name field cannot be empty');
        setisValidName(false);
      } else {
        setNameError('');
        setisValidName(true);
      }
    } else if (name === 'supplierAddress') {
      if (input.length == 0) {
        setAddressError('Supplier address field cannot be empty');
        setisValidAddress(false);
      } else {
        setAddressError('');
        setisValidAddress(true);
      }
    }
    console.log(isValidAddress, isValidMail, isValidPhoneNumber, isValidName);
  };
  //to watch the current state
  //console.log won't show the current

  //to add existing supplier
  //to add new suppliers
  const handleNewSupChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.trim();
    //check if the supplier name already exists, nad set a default supplier id
    if (
      name === 'supplierName' &&
      allSuppliers.map((supplier) => {
        return supplier.supplierName === value ? true : false;
      })
    ) {
      setNewSupplier((newSupplier) => {
        return { ...newSupplier, ['supId']: 0 };
      });
    }

    validateSupdetails(value, name);

    setNewSupplier((newSupplier) => {
      return { ...newSupplier, [name]: value };
    });

    console.log(invoice);
  };

  //to move to item inputs
  const continued = (e) => {
    e.preventDefault();
    //move to next page only if supplier is valid

    if (validSupplier) {
      handleValidSupplier();
      setIsFirstTime(false);
      //set supplier details in invoice object
      handleChange('supplier', { ...newSupplier });
      nextStep();
    } else {
      console.log('Please enter valid inputs ');
      toast.error('Please enter valid inputs to navigate to next part.');
    }
    if (isFirstTime) {
      setAddressError('Supplier address field cannot be empty');
      setNameError('Supplier name field cannot be empty');
      setMobileNoError('Mobile number field cannot be empty.');
      setEmailError('Email field cannot be empty');
    } else {
      setAddressError('');
      setNameError('');
      setMobileNoError('');
      setEmailError('');
    }
  };
  //demobutton
  const addDemoDetails = () => {
    setValidSupplier(true);
    setNewSupplier({
      supId: 0,
      supplierName: 'Jayasekara suppliers',
      phoneNumber: '0755297678',
      email: 'jayasekara@gmail.com',
      supplierAddress: '177/9 Gonahena,Kadawatha',
    });
    setMobileNoError('Valid Mobile Number');
    setAddressError('');
    setEmailError('Valid Email');
    setNameError('');
  };

  //travel to dash board
  const moveBack = (e) => {
    e.preventDefault();

    history.push('/supplier_Manager_Dashboard');
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
                Existing supplier
              </Typography>
              <TextField
                select
                className={classes.textField}
                helperText='*select existing supplier'
                labelid='demo-simple-select-label'
                id='demo-simple-select'
                value={newSupplier.supplierName ?? ''}
                label='choose a supplier'
                variant='outlined'
                onChange={handleSupChange}
              >
                {allSuppliers.map((oneSup) => {
                  const { supId, supplierName } = oneSup;

                  return (
                    <MenuItem key={supId} value={supplierName}>
                      {supplierName}
                    </MenuItem>
                  );
                })}
              </TextField>
              <Button
                variant='contained'
                color='primary'
                sx={{
                  color: 'white',
                  backgroundColor: 'blue',
                  borderColor: 'blue',
                  marginLeft: '42px',
                  marginTop: '18px',
                }}
                onClick={addDemoDetails}
              >
                Demo button
              </Button>
            </div>
            <Typography
              variant='h6'
              component='h2'
              gutterBottom
              color='textSecondary'
            >
              Enter new supplier details
            </Typography>

            <div className='new-supplier'>
              <div>
                {' '}
                <TextField
                  fullWidth
                  name='supplierName'
                  helperText={nameError}
                  id='newsupplierName'
                  label='Supplier Name'
                  inputProps={{
                    className: classes.field,
                  }}
                  variant='outlined'
                  className={classes.textField}
                  value={newSupplier.supplierName || ' '}
                  onChange={handleNewSupChange}
                />
              </div>

              <div className='inner-input-validation'>
                <TextField
                  name='phoneNumber'
                  id='newphoneNo'
                  helperText={mobileNoError}
                  label="Supplier's Phone No. "
                  variant='outlined'
                  className={classes.textField}
                  value={newSupplier.phoneNumber || ' '}
                  onChange={handleNewSupChange}
                />
              </div>
              <div className='inner-input-validation'>
                {' '}
                <TextField
                  name='email'
                  helperText={emailError}
                  id='newemail'
                  label="Supplier's Email"
                  className={classes.textField}
                  value={newSupplier.email || ' '}
                  variant='outlined'
                  onChange={handleNewSupChange}
                />
              </div>
            </div>
            <div>
              <TextField
                id='newsupplierAddress'
                name='supplierAddress'
                helperText={addressError}
                className={classes.textField}
                value={newSupplier.supplierAddress || ' '}
                onChange={handleNewSupChange}
                label="Supplier's Address"
                multiline
                rows={4}
              />
            </div>
          </div>
        </Box>
        <div className='btn-box supplier-details-btn'>
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

export default SupplierDetailsComponent;
