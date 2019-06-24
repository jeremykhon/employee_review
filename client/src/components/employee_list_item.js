import React from 'react';

const EmployeeListItem = ({ employee, selectEmployee }) => {
  return (
    <div className="employee-list-item" onClick={() => {selectEmployee(employee)}}>
      {employee.first_name}
    </div>
  )
}

export default EmployeeListItem;