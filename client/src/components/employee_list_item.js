import React from 'react';
import history from '../lib/history';

const selectEmployee = (employeeId) => {
  history.push(`/admin/employees/${employeeId}`);
};

const selectedStyle = (employee, selectedEmployeeId) => {
  if (employee.id === parseInt(selectedEmployeeId, 10)) {
    return 'employee-list-item selected';
  }
  return 'employee-list-item';
};

const EmployeeListItem = ({ employee, selectedEmployeeId }) => {
  return (
    <div 
      className={selectedStyle(employee, selectedEmployeeId)} 
      onClick={() => {selectEmployee(employee.id)}}
    >
      {`${employee.first_name} ${employee.last_name}`} 
    </div>
  );
};

export default EmployeeListItem;
