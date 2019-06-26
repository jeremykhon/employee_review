import React from 'react';
import { NavLink } from 'react-router-dom';
// import history from '../lib/history';

const Navbar = ({ employee, onLogOut }) => {
  const signOut = () => {
    localStorage.removeItem('Authorization');
    onLogOut();
  };

  const renderIfLoggedIn = () => {
    if (employee) {
      return (
        <div className="navbar-container">
          {employee.is_admin
            ? (
              <div className="navbar-left">
                <NavLink className="navbar-link" to="/admin">Admin dashboard</NavLink>
                <NavLink className="navbar-link" to="/employee">Employee dashboard</NavLink>
              </div>
            )
            : <div>Employee dashboard</div>
          }
          <div className="navbar-right">
            <div className="navbar-name">
              {`${employee.first_name} ${employee.last_name}`}
            </div>
            <div className="navbar-link sign-out" onClick={signOut}>
              Sign out
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="navbar">
      {renderIfLoggedIn()}
    </div>
  );
};

export default Navbar;
