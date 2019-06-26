import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import * as api from '../lib/api';

const PerformanceReviewSchema = Yup.object().shape({
  title: Yup.string()
    .max(20, 'Maximum 20 characters')
    .required('Required'),
});

const CreatePerformanceReviewModal = ({ employee, closeModal, fetchEmployee }) => {
  const createPerformanceReview = (performanceReviewData) => {
    api.adminCreatePerformanceReview(employee.id, performanceReviewData)
      .then(() => {
        fetchEmployee(employee.id);
        closeModal();
      })
      // TODO: placeholder for error handling
      .catch(error => console.error(error));
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
            <div className="form-group">
              <Field className={classNames('form-control', { 'is-invalid': errors.title })} name="title" placeholder="Title" />
              {errors.title && touched.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>
            <button className="btn btn-default full-w-btn" type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePerformanceReviewModal;