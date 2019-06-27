import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '../lib/history';
import getAuthToken from '../lib/get_auth_token';
import NavigationBar from './navigation_bar';
import LoginPage from './login_page';
import AdminDashboard from './admin_dashboard';
import EmployeeDashboard from './employee_dashboard';
import PrivateRoute from './private_route';
import * as api from '../lib/api';

const getDashboardPath = (employee) => {
  if (employee.is_admin) {
    return '/admin';
  }
  return '/employee';
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: getAuthToken(),
    };
  }

  componentDidMount() {
    const { authToken } = this.state;

    if (authToken) {
      this.loadEmployee(authToken);
    }
  }

  loadEmployee = () => {
    api.fetchCurrentEmployee()
      .then(employee => this.setState({ employee }))
      // TODO: placeholder for error handling
      .catch(() => this.setState({ authToken: null }));
  }

  handleLoginSuccess = (authToken) => {
    this.setState({ authToken }, this.loadEmployee);
  }

  hasAuthToken = () => {
    const { authToken } = this.state;
    return !!authToken;
  }

  handleLogOut = () => {
    this.setState({ authToken: undefined, employee: undefined });
  }

  isLoading = () => {
    const { employee } = this.state;

    // Only loading when logged in but waiting for `loadEmployee`
    return this.hasAuthToken()
      ? employee === undefined
      : false;
  }

  render() {
    const { employee } = this.state;
    if (this.isLoading()) {
      return <div>Loading...</div>;
    }

    return (
      <Router history={history}>
        <NavigationBar employee={employee} onLogOut={this.handleLogOut} />
        <Switch>
          {/* Redirect */}
          <Route
            exact
            path="/"
            render={props => (
              this.hasAuthToken()
                ? <Redirect to={getDashboardPath(employee)} />
                : <LoginPage onLoginSuccess={this.handleLoginSuccess} {...props} />
            )}
          />
          <PrivateRoute employee={employee} adminOnly exact path="/admin/employees/:employee_id" component={AdminDashboard} />
          <PrivateRoute employee={employee} adminOnly path="/admin*" component={AdminDashboard} />
          <PrivateRoute employee={employee} path="/employee*" component={EmployeeDashboard} />
        </Switch>
      </Router>
    );
  }
}

export default App;