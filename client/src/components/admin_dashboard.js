import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import EmployeeList from './employee_list';
import EmployeeProfile from './employee_profile';
import * as api from '../lib/api';
import history from '../lib/history';

const smallScreenMql = window.matchMedia('(min-width: 800px)');

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      selectedEmployeeId: this.props.match.params.employee_id,
      sidebarOpen: false,
      sidebarDocked: smallScreenMql.matches,
    };
  }

  // update selectedEmployeeId state when url param changes
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
    const { selectedEmployeeId } = this.state;
    api.adminFetchEmployees()
      .then((employees) => {
        this.setState({ employees });
        if (selectedEmployeeId === undefined) {
          history.push(`/admin/employees/${employees[0].id}`);
        }
      })
      // TODO: placeholder for error handling
      .catch(error => console.error(error));
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
          styles={{ sidebar: { zIndex: 2, backgroundColor: 'white' }, dragHandle: { zIndex: 2 } }}
          sidebar={(
            <EmployeeList
              employees={employees}
              selectEmployee={this.selectEmployee}
              selectedEmployeeId={selectedEmployeeId}
              onEmployeeCreated={this.handleEmployeeCreated}
            />
          )}
          touchHandleWidth={40}
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
