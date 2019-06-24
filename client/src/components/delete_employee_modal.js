import React from 'react';
import axios from 'axios';
import BASE_URL from '../utilities/base_url';

const deleteEmployee = (employee, fetchEmployees, clearEmployee) => {
  axios.delete(`${BASE_URL}/employees/${employee.id}`)
    .then(() => {
      fetchEmployees();
      clearEmployee();
    })
    .catch(error => console.log(error));
};

const DeleteEmployeeModal = ({ employee, fetchEmployees, clearEmployee }) => {
  return (
    <div>
      <div>are you sure?</div>
      <button type="button" onClick={() => { deleteEmployee(employee, fetchEmployees, clearEmployee); }}>yes</button>
      <button type="button">no</button>
    </div>
  );
};

export default DeleteEmployeeModal;
