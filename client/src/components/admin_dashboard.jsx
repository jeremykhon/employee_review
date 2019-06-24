import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from 'react-sidebar';
import EmployeeList from './employee_list';

const BASE_URL = '/api/v1';

const mql = window.matchMedia('(min-width: 800px)');

class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      selectedEmployee: null,
      sidebarOpen: false,
      sidebarDocked: mql.matches,
    };
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
    axios.get(`${BASE_URL}/employees`)
      .then(response => this.setState({ employees: response.data }))
      .catch(error => console.log(error));
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  }

  selectEmployee = (employee) => {
    this.setState({ selectedEmployee: employee });
  }

  render() {
    const { employees, selectedEmployee, sidebarDocked, sidebarOpen } = this.state;
    return (
      <div>
        <Sidebar
          sidebar={(
            <EmployeeList
              employees={employees}
              selectEmployee={this.selectEmployee}
              selectedEmployee={selectedEmployee}
            />
          )}
          open={sidebarOpen}
          docked={sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
        >
          <div>
            right-side
          </div>
        </Sidebar>
      </div>
    );
  }
}

export default AdminDashboard;