import React from 'react';
import EmployeeListItem from './employee_list_item';

const EmployeeList = ({ employees, selectEmployee, selectedEmployeeId }) => {
  return (
    <div className="employees-list">
      <div className="employees-list-title">All Employees</div>
      {employees.map(employee => (
        <EmployeeListItem
          key={employee.id}
          employee={employee}
          selectEmployee={selectEmployee}
          selectedEmployeeId={selectedEmployeeId}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
