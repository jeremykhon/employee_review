import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import BASE_URL from '../lib/base_url';

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

const updateEmployee = (values, id, closeModal, fetchEmployee) => {
  axios({
    method: 'PATCH',
    url: `${BASE_URL}/admin/employees/${id}`,
    data: {
      employee: values,
    },
  })
    .then(() => {
      fetchEmployee(id);
      closeModal();
    });
};

const UpdateEmployeeModal = ({ employee: { id, first_name, last_name, email }, closeModal, fetchEmployee }) => {
  return (
    <div>
      <Formik
        initialValues={{
          first_name,
          last_name,
          email,
        }}
        validationSchema={EmployeeSchema}
        onSubmit={(values) => {
          updateEmployee(values, id, closeModal, fetchEmployee);
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
