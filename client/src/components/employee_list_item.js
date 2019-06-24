import React from 'react';

const EmployeeListItem = ({ employee }) => {
  return (
    <div className="employee-list-item">
      {employee.first_name}
    </div>
  )
}

export default EmployeeListItem;