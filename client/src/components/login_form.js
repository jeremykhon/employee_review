import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import * as api from '../lib/api';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

const LoginForm = ({ onLoginSuccess }) => (
  <div>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        api.login(values)
          .then(onLoginSuccess)
          .catch(error => console.log(error));
      }}
    >
      {({ errors, touched }) => (
        <Form className="login-form">
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
          <button className="btn btn-outline-dark" type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default LoginForm;