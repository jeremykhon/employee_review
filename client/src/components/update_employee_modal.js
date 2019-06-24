import React, { Component } from 'react';
import axios from 'axios';
import BASE_URL from '../utilities/base_url';
import { Formik } from 'formik';

// class UpdateEmployeeModal extends Component {
//   constructor(props) {
//     super(props);
//     const { employee: { first_name, last_name, email } } = this.props;
//     this.state = {
//       firstName: first_name,
//       lastName: last_name,
//       email: email,
//     };
//   }


const UpdateEmployeeModal = ({ employee: { first_name, last_name, email } }) => {
  return (
    <div>
      
    </div>
  );
}

export default UpdateEmployeeModal;
