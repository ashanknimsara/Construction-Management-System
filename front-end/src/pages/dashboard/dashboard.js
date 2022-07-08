import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchUserData } from '../../api/authenticationService';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const MainWrapper = styled.div`
  padding-top: 40px;
`;

export const Dashboard = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  React.useEffect(() => {
    fetchUserData()
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        localStorage.clear();
        props.history.push('/');
      });
  }, []);

  const logOut = () => {
    localStorage.clear();
    props.history.push('/');
  };

  return (
    <div className='admin-dashboard'>
      {/* <h4>Hello {data && `${data.firstName} ${data.lastName}`}</h4>
      <br></br>
      {data &&
        data.roles &&
        data.roles.filter((value) => value.roleCode === 'ADMIN').length > 0 && (
          <Button type='variant'>Add User</Button>
        )}
      <br></br>

      <Button style={{ marginTop: '5px' }} onClick={() => logOut()}>
        Logout
      </Button> */}
      <div className='admin-navigations'>
        <div className='left-navigation'>
          <div>
            {' '}
            <div className='nav-link-div'></div>
            <div className='nav-link-div'>
              {' '}
              <div className='align-admin-navlinks'>
                {' '}
                <Link to='/supplier_Manager_Dashboard'>
                  {`SUPPLIER MANAGEMENT (INVOICES)`}
                </Link>
              </div>
            </div>
            <div className='nav-link-div'></div>
            <div className='nav-link-div'></div>
          </div>
        </div>
        <div className='right-navigation'>
          <div>
            {' '}
            <div className='nav-link-div'></div>
            <div className='nav-link-div'></div>
            <div className='nav-link-div'>
              <div className='align-admin-navlinks'>
                {' '}
                <Link to='/employee'>{`EMPLOYEE MANAGEMENT`}</Link>
              </div>
            </div>
            <div className='nav-link-div'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
