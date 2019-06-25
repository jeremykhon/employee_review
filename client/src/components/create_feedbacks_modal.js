import React from 'react';
import { Formik, Field } from 'formik';

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

const CreateFeedbacksModal = ({ employees }) => (
  <div>
    <Formik
      initialValues={{
        employees: [],
      }}
      onSubmit={values => alert(JSON.stringify(values, null, 2))}
    >
      {formik => (
        <div>
          <div>
            {employees.map(employee => <EmployeeCheckBox key={employee.id} name="employees" value={employee.id} employee={employee} />)}
          </div>
          <button type="button" onClick={formik.submitForm}>submit</button>
        </div>
      )}
    </Formik>
  </div>
);

export default CreateFeedbacksModal;
