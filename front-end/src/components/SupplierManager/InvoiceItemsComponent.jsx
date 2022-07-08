import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@mui/material';
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
  },
}));
export const InvoiceItemsComponent = ({
  allItems,
  handleChange,
  handleValidItems,
  noValidItems,
  prevStep,
  nextStep,
  invoice,
}) => {
  const [items, setItems] = useState(allItems[0]);
  const classes = useStyles();
  const [newItem, setNewItem] = useState({});
  const [itemQty, setItemQty] = useState(0);
  const [itemList, setItemList] = useState([...invoice.items]);

  const [itemNameError, setItemNameError] = useState('');
  const [itemQtyTypeError, setItemQtyTypeError] = useState('');
  //itemQuantity error
  const [itemQtyError, setItemQtyError] = useState(
    'Please add requred quantity.'
  );
  //unit price error
  const [unitPriceError, setUnitPriceError] = useState('');

  const [allItemValid, setAllItemsValid] = useState(noValidItems);
  const [isFirstTime, setIsFirstTime] = useState(false);

  const [isItemNameValid, setIsItemNameValid] = useState(noValidItems);
  const [isItemQtyValid, setIsItemQtyValid] = useState(noValidItems);
  const [isUnitPriceValid, setIsUnitPriceValid] = useState(noValidItems);
  const [isItemQtyTypeValid, setItemQtyTypeValid] = useState(noValidItems);

  //use effect
  useEffect(() => {
    let validity =
      isItemNameValid &&
      isItemQtyTypeValid &&
      isUnitPriceValid &&
      isItemQtyValid;
    if (validity) {
      setAllItemsValid(true);
    } else {
      setAllItemsValid(false);
    }
  }, [isItemNameValid, isItemQtyTypeValid, isItemQtyValid, isUnitPriceValid]);
  useEffect(() => {
    if (allItemValid) {
      setIsFirstTime(false);
    } else {
      setIsFirstTime(true);
    }
  }, []);
  //to determine whether this item list is empty
  const [flag, setFlag] = useState(itemList.length > 0 ? true : false);
  const [isValid, setIsValid] = useState(true);

  const handleItemChange = (e) => {
    const value = e.target.value;
    //
    setIsItemNameValid(true);
    setIsItemQtyValid(true);
    setIsUnitPriceValid(true);
    setItemQtyTypeValid(true);

    setIsFirstTime(false);

    setItemNameError('');
    setItemQtyError('Please add required quantity');
    setItemQtyTypeError('');
    setUnitPriceError('');

    setIsFirstTime(true);

    const chosenItem = allItems.find((oneItem) => oneItem.item_code === value);
    setItems({ ...chosenItem });
    setNewItem({ ...chosenItem });
  };
  //validate number inputs
  const validateItemInputs = (name, value) => {
    setIsItemNameValid(true);
    setIsItemQtyValid(true);
    setIsUnitPriceValid(true);
    setItemQtyTypeValid(true);

    setIsFirstTime(false);

    var errorFlag = true;
    if (name === 'qty') {
      setItemQty(value);
      if (value.length == 0) {
        setItemQtyError('Item quantity feild cannot be empty');
        setIsItemQtyValid(false);
      } else if (value <= 100 && !isNaN(+value)) {
        setItemQtyError('This quantity is valid');
        setIsItemQtyValid(true);
      } else if (value > 100) {
        setIsItemQtyValid(false);
        setItemQtyError('Item quantity cannot be higher than 100.');
      } else {
        setIsItemQtyValid(false);
        setItemQtyError('Item quantity must be a number.');
      }
    } else if (name === 'unit_price') {
      if (value.length == 0) {
        setIsUnitPriceValid(false);
        setUnitPriceError('Unit price cannot be empty.');
      } else if (value <= 100000 && !isNaN(+value)) {
        setUnitPriceError('Valid unit price');
        setIsUnitPriceValid(true);
      } else if (value > 100000) {
        setUnitPriceError('Unit price cannnot be more than 100000');
        setIsUnitPriceValid(false);
      } else {
        setIsUnitPriceValid(false);
        setUnitPriceError('Input must be a number');
      }
    } else if (name === 'qty_type') {
      if (value.length == 0) {
        setItemQtyTypeValid(false);
        setItemQtyTypeError('Quantity type feild cannot be empty.');
      } else if (
        value === 'Kg' ||
        value === 'kg' ||
        value === 'sqft' ||
        value === 'l'
      ) {
        setItemQtyTypeValid(true);
        setItemQtyTypeError('Valid quantity type.');
      } else {
        setItemQtyTypeValid(false);
        setItemQtyTypeError('Invalid quantity type.');
      }
    } else if (name === 'item_name') {
      if (value.length === 0) {
        setIsItemNameValid(false);
        setItemNameError('Item name field cannot be empty');
      } else {
        setItemNameError('Valid item name');
        setIsItemNameValid(true);
      }
    }
  };

  const handleNewItemChange = (e) => {
    const name = e.target.name;
    const value = e.target.value.trim();

    //set the validity of all the inputs
    validateItemInputs(name, value);
    setNewItem((newItem) => {
      return { ...newItem, [name]: value };
    });
    // to chceck the item is alredy exits
    if (name === 'item_name') {
      const isExists = allItems.some((item) => {
        return item.item_name === value;
      });

      if (!isExists) {
        setNewItem((newItem) => {
          return { ...newItem, ['item_code']: 0 };
        });
        console.log('items exists ' + newItem);
      }
    }

    console.log(invoice);
  };

  const continued = (e) => {
    e.preventDefault();
    //move forward and enter data to handle change

    if (flag) {
      handleChange('items', [...itemList]);
      setIsFirstTime(false);

      nextStep();
    } else {
      console.log('Please add some items');
      toast.error('Please Add items to navigate to next page');
    }
  };
  //add new items
  const addItem = () => {
    setFlag(true);
    if (isFirstTime) {
      setItemNameError('Valid item name');
      setItemQtyTypeError('Invalid quantity type.');
      setUnitPriceError('Input must be a number');
      setItemQtyError('Item quantity feild cannot be empty');
    } else {
      setUnitPriceError('');
      setItemQtyError('');
      setItemQtyTypeError('');
      setItemNameError('');
    }
    //check if the item is alredy existing one

    if (allItemValid) {
      setItemNameError('');
      setItemQtyError('');
      setItemQtyTypeError('');
      setUnitPriceError('');
      setItemList([...itemList, newItem]);
      console.log(itemList);
    } else {
      console.log('Please enter valid inputs ');
      toast.error('Please enter valid inputs to add items to the list');
    }
  };
  const moveBack = (e) => {
    e.preventDefault();
    //move handle Change to  this method

    prevStep();
  };

  //remove items
  const removeItem = (name) => {
    console.log(name);
    const removedItems = itemList.filter((item) => item.item_name !== name);
    console.log(removedItems);
    //
    if (itemList.length === 1) {
      setFlag(false);
    }
    setItemList([...removedItems]);
  };

  return (
    <div className='supplier-details-container'>
      <div className='tp-container'>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { ml: 5, mb: 2, mt: 2, width: '30ch' },
          }}
          noValidate
          autoComplete='off'
          marginLeft='20px'
        >
          <div>
            <Box pl={-3}>
              <div>
                <Typography
                  variant='h6'
                  component='h2'
                  gutterBottom
                  color='textSecondary'
                >
                  Existing Items
                </Typography>
                <TextField
                  required
                  select
                  name='item_code'
                  className={classes.textField}
                  defaultValue={0}
                  labelid='demo-simple-select-label'
                  id='demo-simple-select'
                  value={items.item_code ?? 0}
                  label='Item Code'
                  helperText='select existing item'
                  onChange={handleItemChange}
                >
                  {allItems.map((item) => {
                    const { item_code } = item;

                    return (
                      <MenuItem key={item_code} value={item_code}>
                        {item_code}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </div>

              <div>
                <Typography
                  variant='h6'
                  component='h2'
                  gutterBottom
                  color='textSecondary'
                >
                  New Items
                </Typography>
                <TextField
                  required
                  id='item_name'
                  label='Item name'
                  name='item_name'
                  className={classes.textField}
                  helperText={itemNameError}
                  value={newItem.item_name || ''}
                  variant='outlined'
                  onChange={handleNewItemChange}
                />
                <TextField
                  id='qty'
                  value={itemQty}
                  required
                  name='qty'
                  label='Item Quatity'
                  variant='outlined'
                  className={classes.textField}
                  helperText={itemQtyError}
                  onChange={handleNewItemChange}
                />
                <TextField
                  id='qty_type'
                  name='qty_type'
                  required
                  className={classes.textField}
                  helperText={itemQtyTypeError}
                  value={newItem.qty_type || ''}
                  label='Item Quantity Type'
                  variant='outlined'
                  onChange={handleNewItemChange}
                ></TextField>
              </div>
              <div>
                <TextField
                  required
                  select
                  defaultValue={items.availability}
                  labelid='demo-simple-select-label'
                  name='availability'
                  id='demo-simple-select'
                  value={newItem.availability ?? ' '}
                  label='Item Availability'
                  variant='outlined'
                  onChange={handleNewItemChange}
                >
                  <MenuItem key='y1' value='yes'>
                    Yes
                  </MenuItem>
                  <MenuItem key='y2' value='no'>
                    No
                  </MenuItem>
                </TextField>
                <TextField
                  id='item_unit_price'
                  name='unit_price'
                  value={newItem.unit_price || ''}
                  label='Item Unit Price'
                  variant='outlined'
                  required
                  className={classes.textField}
                  helperText={unitPriceError}
                  onChange={handleNewItemChange}
                />
                <Button
                  sx={{
                    color: 'white',
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    marginLeft: '42px',
                    marginTop: '18px',
                  }}
                  variant='contained'
                  color='success'
                  onClick={addItem}
                >
                  Add Item
                </Button>
              </div>
            </Box>
            <div className='items-included tb-container'>
              {' '}
              <table className='table table-striped table-hover table-bordered '>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Item Quantity</th>
                    <th>Item Quantity Type</th>
                    <th>Item Unit Price(Rs.)</th>
                    <th>Received Status</th>

                    <th className='text-center'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {flag &&
                    itemList.map((item) => {
                      const {
                        item_name,
                        qty,
                        qty_type,
                        availability,
                        unit_price,
                      } = item;
                      return (
                        <tr>
                          <td>{item_name}</td>
                          <td>{qty}</td>
                          <td>{qty_type}</td>
                          <td>{unit_price}</td>
                          <td>{availability}</td>
                          <td>
                            <Button
                              key={item_name}
                              variant='contained'
                              sx={{
                                color: 'white',
                                backgroundColor: 'red',
                                borderColor: 'red',
                              }}
                              color='success'
                              onClick={() => removeItem(item_name)}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className='btn-box item-btn-box'>
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
        </Box>
      </div>
    </div>
  );
};

export default InvoiceItemsComponent;
