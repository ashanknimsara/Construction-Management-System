import React, { useState } from 'react';
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink } from './NavBarElements';
import { fetchUserData } from '../api/authenticationService';
import { Button } from '@mui/material';
import { useParams, useHistory, Link } from 'react-router-dom';
export const NavBar = (props) => {
  const [data, setData] = useState({});
  const { isLoggedIn, setIsLoggedIn } = useState(false);
  const history = useHistory();
  React.useEffect(() => {
    fetchUserData()
      .then((response) => {
        setData(response.data);
        setIsLoggedIn(
          data &&
            data.roles &&
            data.roles.filter((value) => value.roleCode === 'ADMIN').length > 0
        );
      })
      .catch((e) => {
        localStorage.clear();
        history.push('/');
      });

    console.log(isLoggedIn);
  }, []);

  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };
  const toSignIn = () => {
    history.push('/login');
  };
  const toSignOut = () => {
    history.push('/');
  };
  return (
    <>
      {
        <Nav>
          <NavLink to='/'>
            <img
              style={{ width: '70px' }}
              src={require('../assets/images/logo.png')}
            />
          </NavLink>

          <NavMenu>
            <NavLink to='/home' activesyle='true'>
              Home
            </NavLink>
            <NavLink to='/about' activesyle='true'>
              About
            </NavLink>
            <NavLink to='/services' activesyle='true'>
              Service
            </NavLink>
            <NavLink to='/contact-us'>Contact Us</NavLink>
          </NavMenu>
          {!isLoggedIn && (
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
              onClick={toSignOut}
            >
              Sign Up
            </Button>
          )}
          {!isLoggedIn && (
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
              onClick={toSignIn}
            >
              Sign In
            </Button>
          )}
          {!isLoggedIn && (
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
              onClick={logOut}
            >
              Sign out
            </Button>
          )}

          {/* <NavBtn>
            <NavBtnLink to='/signup'>Sign Up</NavBtnLink>
          </NavBtn>
          <NavBtn>
            <NavBtnLink to='/login'>Sign In</NavBtnLink>
          </NavBtn> */}
        </Nav>
      }
    </>
  );
};
