import React from 'react';
import axios from 'axios';
import BASE_URL from '../lib/base_url';

const deleteEmployee = (employee, fetchEmployees, clearEmployee) => {
  axios.delete(`${BASE_URL}/admin/employees/${employee.id}`)
    .then(() => {
      fetchEmployees();
      clearEmployee();
    })
    .catch(error => console.log(error));
};

const DeleteEmployeeModal = ({ employee, fetchEmployees, clearEmployee, closeModal }) => {
  return (
    <div>
      <div>Are you sure you want to delete this employee? All ongoing feedbacks that he/she is participating and performance reports that he/she belongs to will also be deleted</div>
      <button type="button" onClick={() => { deleteEmployee(employee, fetchEmployees, clearEmployee); }}>yes</button>
      <button type="button" onClick={closeModal}>no</button>
    </div>
  );
};

export default DeleteEmployeeModal;
