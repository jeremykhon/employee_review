import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

const NavigationBar = ({ employee, onLogOut }) => {
  const signOut = () => {
    localStorage.removeItem('Authorization');
    onLogOut();
  };

  const renderIfLoggedIn = () => {
    if (employee) {
      return (
        <div className="navbar-links-container">
          {employee.is_admin
            ? (
              <div className="navbar-left">
                <NavLink className="navbar-link" to="/admin">Admin view</NavLink>
                <NavLink className="navbar-link" to="/employee">Employee view</NavLink>
              </div>
            )
            : <div>Employee dashboard</div>
          }
          <div className="navbar-right">
            <div className="navbar-name">
              {`${employee.first_name} ${employee.last_name}`}
            </div>
            <div className="navbar-link" onClick={signOut}>
              Sign out
            </div>
          </div>
        </div>
      );
    }
    return null;
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
