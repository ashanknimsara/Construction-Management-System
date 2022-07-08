import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import moment from 'moment';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#f3f6f9' : '##f3f6f9',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));
const StatsBar = ({ data }) => {
  const [totalBound, setTotalBound] = useState(0);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const calculateTotal = () => {
    const totalValue = setTotalBound(totalValue);
    return totalValue;
  };
  useEffect(() => {
    console.log(data);
    const totalBound = data.reduce((total, invoice) => {
      return total + invoice.total_amount;
    }, 0);
    console.log(totalBound);
    const totalPays = data.reduce((total, invoice) => {
      return total + invoice.paid_amount;
    }, 0);
    setTotalBound(totalBound);
    setTotalPaidAmount(totalPays);
  }, [data]);
  return (
    <div className='stats-component'>
      <div className='current-date-time'>
        <div>
          <p>{`Date : ` + moment().utcOffset('+05:30').format('DD-MM-YYYY')}</p>{' '}
        </div>
        <div>
          <p>
            {`Time : ` +
            moment().utcOffset('+05:30').format('LTS')
           }
          </p>
        </div>
      </div>
      <div>
        <div className='stats-bar-container'>
          <div className='stats-one'>
            <div>
              <p>Total bound to pay</p>
              <small>{`Rs. ` + totalBound}</small>
            </div>
            <div>
              <p>Most bounded supplier</p>
              <small>{`Perera & Son's`}</small>
              <small>{`Rs. ` + totalPaidAmount}</small>
            </div>
          </div>
          <div className='stats-two'>
            {' '}
            <div>
              <p>Total paid amount</p>
              <small>{`Rs. ` + totalPaidAmount}</small>
            </div>
            <div>
              <p>Today received items</p>
              <small>{`Item code : 1`}</small>
            </div>
          </div>
          <div className='stats-three'>
            {' '}
            <div className='stats-piechart'>
              <svg height='150' width='150' viewBox='0 0 20 20'>
                <circle r='10' cx='10' cy='10' fill='white' />
                <circle
                  r='5'
                  cx='10'
                  cy='10'
                  fill='transparent'
                  stroke='green'
                  strokeWidth='10'
                  strokeDasharray='calc(35 * 31.4 / 100) 31.4'
                  transform='rotate(-90) translate(-20)'
                />
              </svg>
              {/* <StatsPieChart statsdata={data}/> */}
            </div>
            <div>
              <div>
                <p
                  style={{
                    backgroundColor: 'green',
                    width: '20px',
                    height: '20px',
                  }}
                ></p>
                <small>Total bound</small>
              </div>
              <div>
                <p
                  style={{
                    backgroundColor: 'white',
                    width: '20px',
                    height: '20px',
                  }}
                ></p>
                <small>Paid Amount</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
