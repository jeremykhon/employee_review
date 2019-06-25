import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import BASE_URL from '../utilities/base_url';

const PerformanceReviewSchema = Yup.object().shape({
  title: Yup.string()
    .max(20, 'Maximum 20 characters')
    .required('Required'),
});

const createPerformanceReview = (values, employee, closeModal, fetchEmployee) => {
  axios({
    method: 'POST',
    url: `${BASE_URL}/employees/${employee.id}/performance_reviews`,
    data: {
      performance_review: values,
    },
  })
    .then(() => {
      fetchEmployee(employee.id);
      closeModal();
    })
    .catch(error => console.log(error));
};

const CreatePerformanceReviewModal = ({ employee, closeModal, fetchEmployee }) => {
  return (
    <div>
      <Formik
        initialValues={{
          title: '',
        }}
        validationSchema={PerformanceReviewSchema}
        onSubmit={(values) => {
          createPerformanceReview(values, employee, closeModal, fetchEmployee);
        }}
      >
        {({ errors, touched }) => (
          <Form className="performance-review-form form">
            <div>
              <Field className="hello" name="title" placeholder="Title" />
              {errors.title && touched.title ? (<div>{errors.title}</div>) : null}
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePerformanceReviewModal;
