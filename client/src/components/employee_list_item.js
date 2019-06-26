import React from 'react';
import classNames from 'classnames';
import history from '../lib/history';

const selectEmployee = (employeeId) => {
  history.push(`/admin/employees/${employeeId}`);
};

const EmployeeListItem = ({ employee, selectedEmployeeId }) => {
  const employeeSelected = (employee.id === parseInt(selectedEmployeeId, 10));

  return (
    <div
      className={classNames('employee-list-item', { selected: employeeSelected })}
      onClick={() => {selectEmployee(employee.id)}}
    >
      {`${employee.first_name} ${employee.last_name}`}
    </div>
  );
};

export default EmployeeListItem;