import React from 'react';

const selectedStyle = (employee, selectedEmployeeId) => {
  if (employee.id == selectedEmployeeId) {
    return 'employee-list-item selected';
  }
  return 'employee-list-item';
};

const EmployeeListItem = ({ employee, selectEmployee, selectedEmployeeId }) => {
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
