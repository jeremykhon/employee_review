import React, { Component } from 'react';

class EmployeeInfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: null,
    };
  }

  render() {
    const { employee } = this.props;
    return (
      <div className="employee-info-card">
        <div className="employee-info-table">
          <div className="employee-info-labels">
            <div>First name</div>
            <div>Last name</div>
            <div>Email</div>
          </div>
          <div className="employee-info-values">
            <div>{employee.first_name}</div>
            <div>{employee.last_name}</div>
            <div>{employee.email}</div>
          </div>
        </div>
        <hr />
        <div className="employee-info-buttons-container">
          <button className="white-button" type="button">update</button>
          <button className="white-button" type="button">delete</button>
        </div>
      </div>
    );
  }
}

export default EmployeeInfoCard;
