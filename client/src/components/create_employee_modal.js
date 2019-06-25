import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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
    api.createEmployee(employeeData)
      .then((employee) => {
        history.push(`/admin/employees/${employee.id}`);
        onEmployeeCreated(employee);
        closeModal();
      })
      .catch(error => console.log(error));
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
            <div>
              <Field className="hello" name="first_name" placeholder="First name" />
              {errors.first_name && touched.first_name ? (<div>{errors.first_name}</div>) : null}
            </div>
            <div>
              <Field name="last_name" placeholder="Last name" />
              {errors.last_name && touched.last_name ? (<div>{errors.last_name}</div>) : null}
            </div>
            <div>
              <Field autoComplete="username" name="email" type="email" placeholder="Email" />
              {errors.email && touched.email ? (<div>{errors.email}</div>) : null}
            </div>
            <div>
              <Field autoComplete="new-password" name="password" type="password" placeholder="Password" />
              {errors.password && touched.password ? (<div>{errors.password}</div>) : null}
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEmployeeModal;
