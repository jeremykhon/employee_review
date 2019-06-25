import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import BASE_URL from '../utilities/base_url';
import history from '../utilities/history';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const login = (values) => {
  console.log(values);
  // axios({
  //   method: 'POST',
  //   url: `${BASE_URL}/admin/employees`,
  //   data: {
  //     employee: values,
  //   },
  // })
  //   .then((response) => {
  //     history.push(`/admin/employees/${response.data.id}`);
  //     onEmployeeCreated(response.data);
  //     closeModal();
  //   })
  //   .catch(error => console.log(error));
};

const LoginForm = () => (
  <div>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        login(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="login-form">
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

export default LoginForm;
