import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../utilities/base_url';
import history from '../utilities/history';
import Navbar from './navbar';
import LoginPage from './login_page';
import AdminDashboard from './admin_dashboard';
import EmployeeDashboard from './employee_dashboard';
import PrivateRoute from './private_route';

const getDashboardPath = (employee) => {
  if (employee.is_admin) {
    return '/admin';
  }
  return '/employee';
};

const getAuthToken = () => {
  return localStorage.getItem('Authorization');
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      authToken: getAuthToken(),
      employee: undefined,
    };
  }

  componentDidMount() {
    const { authToken } = this.state;

    if (authToken) {
      this.loadEmployee(authToken);
    }
  }

  loadEmployee = () => {
    const { authToken } = this.state;

    axios.get(
      `${BASE_URL}/employees/current_employee`, {
        headers: {
          Authorization: authToken,
        },
      },
    )
      .then((response) => {
        const employee = response.data;
        this.setState({ employee });
      })
      .catch(error => console.log(error))
  }

  handleLoginSuccess = (authToken) => {
    this.setState({ authToken }, this.loadEmployee)
  }

  isLoggedIn = () => {
    const { authToken } = this.state;
    return !!authToken;
  }

  isLoading = () => {
    const { employee } = this.state;

    // Only loading when logged in but waiting for `loadEmployee`
    return this.isLoggedIn()
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
        <Navbar />
        <Switch>
          {/* Redirect */}
          <Route
            exact
            path="/"
            render={props => (
              this.isLoggedIn()
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