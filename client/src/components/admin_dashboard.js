import React, { Component } from 'react';
import axios from 'axios';
import EmployeeListItem from './employee_list_item'
const BASE_URL = '/api/v1';

class AdminDashboard extends Component {
  constructor() {
    super()
    this.state = {
      employees: [],
      selectedEmployee: null,
    }
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/employees`)
    .then(response => this.setState({employees: response.data}))
    .catch(error => console.log(error));
  }

  selectEmployee = (employee) => {
    this.setState({ selectedEmployee: employee })
  }

  render() {
    const { employees, selectedEmployee } = this.state
    return (
      <div>
        {employees.map(employee => <EmployeeListItem key={employee.id} employee={employee} selectEmployee={this.selectEmployee} selectedEmployee={selectedEmployee} />)}
      </div>
    );
  }
}

export default AdminDashboard;