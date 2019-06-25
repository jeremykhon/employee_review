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
        <label>
          <input
            type="checkbox"
            checked={field.value.includes(value)}
            onChange={() => handleChange(field, form)}
          />
          {employee.first_name}
        </label>
      )}
    </Field>
  );
};

const CreateFeedbacksModal = ({ employees, performanceReview, onFeedbacksCreated, closeModal }) => {
  const createFeedbacks = (feedbacksData) => {
    api.createFeedbacksPerPerformanceReview(performanceReview.id, feedbacksData)
      .then((feedbacks) => {
        onFeedbacksCreated(feedbacks);
        closeModal();
      })
      .catch(error => console.log(error));
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
          <div>
            <div>
              {employees.map(employee => <EmployeeCheckBox key={employee.id} name="employee_ids" value={employee.id} employee={employee} />)}
            </div>
            <button type="button" onClick={formik.submitForm}>submit</button>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default CreateFeedbacksModal;
