import React from 'react';

const selectedStyle = (employee, selectedEmployee) => {
  if (employee === selectedEmployee) {
    return 'employee-list-item selected';
  }
  return 'employee-list-item';
};

const EmployeeListItem = ({ employee, selectEmployee, selectedEmployee }) => {
  return (
    <div 
      className={selectedStyle(employee, selectedEmployee)} 
      onClick={() => {selectEmployee(employee)}}
    >
      {`${employee.first_name} ${employee.last_name}`} 
    </div>
  );
};

export default EmployeeListItem;
