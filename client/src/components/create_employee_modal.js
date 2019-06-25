import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import BASE_URL from '../lib/base_url';
import history from '../lib/history';

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

const createEmployee = (values, onEmployeeCreated, closeModal) => {
  axios({
    method: 'POST',
    url: `${BASE_URL}/admin/employees`,
    data: {
      employee: values,
    },
  })
    .then((response) => {
      history.push(`/admin/employees/${response.data.id}`);
      onEmployeeCreated(response.data);
      closeModal();
    })
    .catch(error => console.log(error));
};

const CreateEmployeeModal = ({ onEmployeeCreated, closeModal }) => {
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
        onSubmit={(values) => {
          createEmployee(values, onEmployeeCreated, closeModal);
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
