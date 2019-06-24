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
        {employee.first_name}
      </div>
    );
  }
}

export default EmployeeInfoCard;
