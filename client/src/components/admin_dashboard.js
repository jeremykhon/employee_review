import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import EmployeeList from './employee_list';
import EmployeeProfile from './employee_profile';
import * as api from '../lib/api';

const smallScreenMql = window.matchMedia('(min-width: 800px)');

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      selectedEmployeeId: null || this.props.match.params.employee_id,
      sidebarOpen: false,
      sidebarDocked: smallScreenMql.matches,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.employee_id !== prevState.selectedEmployeeId) {
      return { selectedEmployeeId: nextProps.match.params.employee_id };
    }
    return null;
  }

  componentDidMount() {
    smallScreenMql.addListener(this.mediaQueryChanged);
    this.fetchEmployees();
  }

  componentWillUnmount() {
    smallScreenMql.removeListener(this.mediaQueryChanged);
  }

  fetchEmployees = () => {
    api.adminFetchEmployees()
      .then(employees => this.setState({ employees }))
      .catch(error => console.log(error));
  }

  handleEmployeeCreated = (employee) => {
    this.appendEmployee(employee);
  }

  appendEmployee = (employee) => {
    this.setState(state => (
      { employees: [...state.employees, employee] }
    ));
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: smallScreenMql.matches, sidebarOpen: false });
  }

  onSetSidebarOpen = (open) => {
    this.setState({ sidebarOpen: open });
  }

  render() {
    const { employees, selectedEmployeeId, sidebarDocked, sidebarOpen } = this.state;
    return (
      <div>
        <Sidebar
          styles={{ sidebar: { zIndex: 1, backgroundColor: 'white' } }}
          sidebar={(
            <EmployeeList
              employees={employees}
              selectEmployee={this.selectEmployee}
              selectedEmployeeId={selectedEmployeeId}
              onEmployeeCreated={this.handleEmployeeCreated}
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
