import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import * as api from '../lib/api';

const EmployeeSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

const UpdateEmployeeModal = ({ employee: { id, first_name, last_name, email }, closeModal, fetchEmployee }) => {
  const updateEmployee = (values) => {
    api.adminUpdateEmployee(id, values)
      .then(() => {
        fetchEmployee(id);
        closeModal();
      });
  };

  return (
    <div>
      <Formik
        initialValues={{
          first_name,
          last_name,
          email,
        }}
        validationSchema={EmployeeSchema}
        onSubmit={(employeeData) => {
          updateEmployee(employeeData, id);
        }}
      >
        {({ errors, touched }) => (
          <Form className="employee-form">
            <div>
              <Field className="hello" name="first_name" />
              {errors.first_name && touched.first_name ? (<div>{errors.first_name}</div>) : null}
            </div>
            <div>
              <Field name="last_name" />
              {errors.last_name && touched.last_name ? (<div>{errors.last_name}</div>) : null}
            </div>
            <div>
              <Field name="email" type="email" />
              {errors.email && touched.email ? (<div>{errors.email}</div>) : null}
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateEmployeeModal;
