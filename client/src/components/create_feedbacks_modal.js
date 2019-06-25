import React from 'react';
import { Formik, Field } from 'formik';
import axios from 'axios';
import BASE_URL from '../utilities/base_url';

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

const createFeedbacks = (values, performanceReview, updateFeedbacks, closeModal) => {
  axios({
    method: 'POST',
    url: `${BASE_URL}/performance_reviews/${performanceReview.id}/create_many_feedbacks`,
    data: values,
  })
    .then((response) => {
      updateFeedbacks(response.data);
      closeModal();
    })
    .catch(error => console.log(error));
};

const CreateFeedbacksModal = ({ employees, performanceReview, updateFeedbacks, closeModal }) => (
  <div>
    <Formik
      initialValues={{
        employee_ids: [],
      }}
      onSubmit={values => createFeedbacks(values, performanceReview, updateFeedbacks, closeModal)}
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

export default CreateFeedbacksModal;
