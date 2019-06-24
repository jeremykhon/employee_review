import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../utilities/history';
import Navbar from './navbar';
import LoginPage from './login_page';
import AdminDashboard from './admin_dashboard';
import EmployeeDashboard from './employee_dashboard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      employee: null,
    };
  }

  render() {
    return (
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/admin/employees/:employee_id" component={AdminDashboard} />
          <Route path="/admin*" component={AdminDashboard} />
          <Route path="/employee*" component={EmployeeDashboard} />
        </Switch>
      </Router>
    );
  }
}

export default App;