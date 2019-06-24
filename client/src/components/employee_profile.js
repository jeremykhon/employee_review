import React, { Component } from 'react';
import axios from 'axios';
import BASE_URL from '../utilities/base_url';

class EmployeeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: null,
    };
  }

  componentDidMount() {
    this.fetchEmployee();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedEmployeeId !== prevProps.selectedEmployeeId) {
      this.fetchEmployee(this.props.selectedEmployeeId);
    }
  }

  fetchEmployee = (employeeId) => {
    axios.get(`${BASE_URL}/employees/${employeeId}`)
      .then(response => this.setState({ employee: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    const { selectedEmployeeId } = this.props;
    const { employee } = this.state;
    if (employee) {
      return (
        <div className="employee-profile">
          <div>
            {selectedEmployeeId}
          </div>
          <div>
            {employee.first_name}
          </div>
        </div>
      );
    }
    return (
      <div className="employee-profile">
        nothing
      </div>
    );
  }
}

export default EmployeeProfile;
