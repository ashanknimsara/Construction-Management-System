import React from 'react';
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink } from './NavBarElements';

export const NavBar = () => {
  return (
    <>
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

        <NavBtn>
          <NavBtnLink to='/signup'>Sign Up</NavBtnLink>
        </NavBtn>
        <NavBtn>
          <NavBtnLink to='/signin'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
