import React from 'react';
import EmployeeListItem from './employee_list_item';

const EmployeeList = ({ employees, selectEmployee, selectedEmployeeId }) => {
  return (
    <div className="employee-list">
      <div className="employee-list-top-container">
        <div className="employee-list-title">All Employees</div>
        <button className="white-btn" type="button">Add Employee</button>
      </div>
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
