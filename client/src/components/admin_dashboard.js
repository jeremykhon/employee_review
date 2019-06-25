import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from 'react-sidebar';
import EmployeeList from './employee_list';
import EmployeeProfile from './employee_profile';
import BASE_URL from '../utilities/base_url';

const mql = window.matchMedia('(min-width: 800px)');

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      selectedEmployeeId: null || this.props.match.params.employee_id,
      sidebarOpen: false,
      sidebarDocked: mql.matches,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.employee_id !== prevState.selectedEmployeeId) {
      return { selectedEmployeeId: nextProps.match.params.employee_id };
    }
    return null;
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
    this.fetchEmployees();
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  fetchEmployees = () => {
    axios.get(`${BASE_URL}/employees`)
      .then(response => this.setState({ employees: response.data }))
      .catch(error => console.log(error));
  }

  appendEmployee = (employee) => {
    this.setState(state => (
      { employees: [...state.employees, employee] }
    ));
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  }

  render() {
    const { employees, selectedEmployeeId, sidebarDocked, sidebarOpen } = this.state;
    return (
      <div>
        <Sidebar
          sidebar={(
            <EmployeeList
              employees={employees}
              selectEmployee={this.selectEmployee}
              selectedEmployeeId={selectedEmployeeId}
              appendEmployee={this.appendEmployee}
            />
          )}
          open={sidebarOpen}
          docked={sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
        >
          <EmployeeProfile selectedEmployeeId={selectedEmployeeId} fetchEmployees={this.fetchEmployees} employees={employees} />
        </Sidebar>
      </div>
    );
  }
}

export default AdminDashboard;
