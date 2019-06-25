import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import * as api from '../lib/api';

const PerformanceReviewSchema = Yup.object().shape({
  title: Yup.string()
    .max(20, 'Maximum 20 characters')
    .required('Required'),
});

const CreatePerformanceReviewModal = ({ employee, closeModal, fetchEmployee }) => {
  const createPerformanceReview = (performanceReviewData) => {
    api.createPerformanceReview(employee.id, performanceReviewData)
      .then(() => {
        fetchEmployee(employee.id);
        closeModal();
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <Formik
        initialValues={{
          title: '',
        }}
        validationSchema={PerformanceReviewSchema}
        onSubmit={(performanceReviewData) => {
          createPerformanceReview(performanceReviewData);
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
