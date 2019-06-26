import React from 'react';
import { Formik, Field } from 'formik';
import * as api from '../lib/api';

const EmployeeCheckBox = ({ name, value, employee }) => {
  const handleChange = (field, form) => {
    if (field.value.includes(value)) {
      const nextValue = field.value.filter(
        x => x !== value,
      );
      form.setFieldValue(name, nextValue);
    } else {
      const nextValue = field.value.concat(value);
      form.setFieldValue(name, nextValue);
    }
  };

  return (
    <Field name={name}>
      {({ field, form }) => (
        <div className="form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              checked={field.value.includes(value)}
              onChange={() => handleChange(field, form)}
            />
            {`${employee.first_name} ${employee.last_name}`}
          </label>
        </div>
      )}
    </Field>
  );
};

const CreateFeedbacksModal = ({ employees, performanceReview, onFeedbacksCreated, closeModal }) => {
  const createFeedbacks = (feedbacksData) => {
    api.adminCreateFeedbacksPerPerformanceReview(performanceReview.id, feedbacksData)
      .then((feedbacks) => {
        onFeedbacksCreated(feedbacks);
        closeModal();
      })
      // TODO: placeholder for error handling
      .catch(error => console.error(error));
  };

  return (
    <div>
      <Formik
        initialValues={{
          employee_ids: [],
        }}
        onSubmit={values => createFeedbacks(values, performanceReview, onFeedbacksCreated, closeModal)}
      >
        {formik => (
          <div className="add-reviewers-form">
            <div className="section-title">Add reviewers</div>
            <div className="form-group">
              {employees.map(employee => <EmployeeCheckBox key={employee.id} name="employee_ids" value={employee.id} employee={employee} />)}
            </div>
            <button className="btn btn-default full-w-btn" type="button" onClick={formik.submitForm}>Submit</button>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default CreateFeedbacksModal;