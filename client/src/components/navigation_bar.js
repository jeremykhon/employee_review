import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = ({ employee, onLogOut }) => {
  const signOut = () => {
    localStorage.removeItem('Authorization');
    onLogOut();
  };

  if (employee) {
    return (
      <Navbar variant="dark" bg="black" expand="lg">
        <Navbar.Brand>360 Review</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            { employee.is_admin ? <NavLink className="navbar-link" to="/admin">Admin dashboard</NavLink> : null }
            { employee.is_admin ? <NavLink className="navbar-link" to="/employee">Employee dashboard</NavLink> : null } 
            <div className="navbar-link" onClick={signOut}>
              Sign out
            </div>
            <div className="navbar-el">
              {`Hello ${employee.first_name}`}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
  return (
    <Navbar variant="dark" bg="black" expand="lg">
      <Navbar.Brand>360 Review</Navbar.Brand>
    </Navbar>
  );
};

export default NavigationBar;
