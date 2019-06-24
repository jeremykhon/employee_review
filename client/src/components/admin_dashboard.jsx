import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from 'react-sidebar';
import EmployeeList from './employee_list';

const BASE_URL = '/api/v1';

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