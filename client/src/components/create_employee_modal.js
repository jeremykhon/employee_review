import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import history from '../lib/history';
import * as api from '../lib/api';

const EmployeeSchema = Yup.object().shape({
  first_name: Yup.string()
    .max(20, 'Maximum 20 characters')
    .required('Required'),
  last_name: Yup.string()
    .max(20, 'Maximum 20 characters')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Minimum 6 characters')
    .max(20, 'Maximum 20 characters')
    .required('Required'),
});

const CreateEmployeeModal = ({ onEmployeeCreated, closeModal }) => {
  const createEmployee = (employeeData) => {
    api.adminCreateEmployee(employeeData)
      .then((employee) => {
        history.push(`/admin/employees/${employee.id}`);
        onEmployeeCreated(employee);
        closeModal();
      })
      // TODO: placeholder for error handling
      .catch(error => console.error(error));
  };

  return (
    <div>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          password: '',
        }}
        validationSchema={EmployeeSchema}
        onSubmit={(employeeData) => {
          createEmployee(employeeData);
        }}
      >
        {({ errors, touched }) => (
          <Form className="employee-form">
            <div className="form-group">
              <Field className={classNames('form-control', { 'is-invalid': errors.first_name })} name="first_name" placeholder="First name" />
              {errors.first_name && touched.first_name && (
                <div className="invalid-feedback">{errors.first_name}</div>
              )}
            </div>
            <div className="form-group">
              <Field className={classNames('form-control', { 'is-invalid': errors.last_name })} name="last_name" placeholder="Last name" />
              {errors.last_name && touched.last_name && (
                <div className="invalid-feedback">{errors.last_name}</div>
              )}
            </div>
            <div className="form-group">
              <Field className={classNames('form-control', { 'is-invalid': errors.email })} autoComplete="username" name="email" type="email" placeholder="Email" />
              {errors.email && touched.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <Field className={classNames('form-control', { 'is-invalid': errors.password })} autoComplete="new-password" name="password" type="password" placeholder="Password" />
              {errors.password && touched.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <button className="btn btn-default full-w-btn" type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEmployeeModal;