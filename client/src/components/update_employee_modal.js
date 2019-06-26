import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import * as api from '../lib/api';

const EmployeeSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Minimum2 characters')
    .max(50, 'Maximum 50 characters')
    .required('Required'),
  last_name: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(50, 'Maximum 50 characters')
    .required('Required'),
});

const UpdateEmployeeModal = ({ employee: { id, first_name, last_name }, closeModal, fetchEmployee }) => {
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
        }}
        validationSchema={EmployeeSchema}
        onSubmit={(employeeData) => {
          updateEmployee(employeeData, id);
        }}
      >
        {({ errors, touched }) => (
          <Form className="employee-form">
            <div className="form-group">
              <Field className={classNames('form-control', { 'is-invalid': errors.first_name })} name="first_name" />
              {errors.first_name && touched.first_name && (
                <div className="invalid-feedback">{errors.first_name}</div>
              )}
            </div>
            <div className="form-group">
              <Field className={classNames('form-control', { 'is-invalid': errors.last_name })} name="last_name" />
              {errors.last_name && touched.last_name && (
                <div className="invalid-feedback">{errors.last_name}</div>
              )}
            </div>
            <button className="btn btn-default full-w-btn" type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateEmployeeModal;