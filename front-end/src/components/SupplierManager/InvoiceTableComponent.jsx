import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  cell: {
    color: 'white',
  },
  cellValue: {
    maxHeight: '5px',
  },
  tablecell: {
    fontSize: '400pt',
  },
});

export const InvoiceTable = ({
  total_amount,
  paid_amount,
  description,
  items,
}) => {
  const classes = useStyles();
  console.log(classes);
  console.log(items);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, border: '1px solid #2079FF' }}
        aria-label='spanning table'
      >
        <TableHead>
          <TableRow className={`invoice-table-header ` + classes.cellValue}>
            <TableCell
              align='center'
              className={classes.cell + ' ' + classes.cellValue}
            >
              item_id
            </TableCell>
            {/* <TableCell>Desc</TableCell> */}
            <TableCell align='center' className={classes.cell}>
              Qty.
            </TableCell>
            <TableCell align='center' className={classes.cell}>
              Rate(Rs:)
            </TableCell>
            <TableCell align='center' className={classes.cell}>
              Amount(Rs:)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.item_code} className='table_row_style'>
              <TableCell align='center' className='table_row_style'>
                {item.item_code}
              </TableCell>
              <TableCell align='center' className='table_row_style'>
                {item.qty + ' ' + item.qty_type}
              </TableCell>
              <TableCell align='center' className='table_row_style'>
                {item.unit_price}
              </TableCell>
              <TableCell align='center' className='table_row_style'>
                {item.qty * item.unit_price}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={5} className='table_row_style' />
            <TableCell colSpan={1} className='table_row_style'></TableCell>

            <TableCell align='center' className='table_row_style'>
              Total Amount
            </TableCell>
            <TableCell align='center' className='table_row_style'>
              {total_amount}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='table_row_style'></TableCell>
            <TableCell align='center' className='table_row_style'>
              Paid Amount
            </TableCell>
            <TableCell align='center' className='table_row_style'>
              {paid_amount}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='table_row_style'></TableCell>
            <TableCell align='center' className='table_row_style'></TableCell>
            <TableCell align='center' className='table_row_style'></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='table_row_style'></TableCell>
            <TableCell align='center' className='table_row_style'></TableCell>
            <TableCell align='center' className='table_row_style'></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='table_row_style'></TableCell>
            <TableCell align='center' className='table_row_style'>
              Remainning Amount
            </TableCell>
            <TableCell align='center' className='table_row_style'>
              {total_amount - paid_amount + ' /='}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default InvoiceTable;
