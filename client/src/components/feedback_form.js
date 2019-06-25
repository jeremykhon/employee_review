import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import BASE_URL from '../lib/base_url';

const FeedbackSchema = Yup.object().shape({
  comment: Yup.string()
    .max(20, 'Maximum 20 characters')
    .required('Required'),
  rating: Yup.number()
    .min(1, 'give rating from 1-5')
    .max(5, 'give rating from 1-5')
    .required('Required'),
});

const updateFeedback = (values, id, fetchFeedbacksPerEmployee) => {
  axios({
    method: 'PATCH',
    url: `${BASE_URL}/admin/feedbacks/${id}`,
    data: {
      feedback: values,
    },
  })
    .then(fetchFeedbacksPerEmployee)
    .catch(error => console.log(error));
};

const CompletedCheckBox = ({ name }) => {
  const handleChange = (field, form) => {
    if (field.value) {
      form.setFieldValue(name, false);
    } else {
      form.setFieldValue(name, true);
    }
  };

  return (
    <Field name={name}>
      {({ field, form }) => (
        <label>
          <input
            type="checkbox"
            checked={field.value}
            onChange={() => handleChange(field, form)}
          />
          completed?
        </label>
      )}
    </Field>
  );
};

const FeedbackForm = ({ selectedFeedback, fetchFeedbacksPerEmployee }) => {
  if (selectedFeedback) {
    const { comment, rating, id, completed_at } = selectedFeedback;
    let completed = completed_at;
    return (
      <div className="section-container">
        <Formik
          enableReinitialize
          initialValues={{
            comment: comment || '',
            rating: rating || 0,
            completed: completed_at ? true : false,
          }}
          validationSchema={FeedbackSchema}
          onSubmit={(values) => {
            updateFeedback(values, id, fetchFeedbacksPerEmployee);
          }}
        >
          {({ errors, touched }) => (
            <Form className="feedback-form">
              <div>
                <Field name="comment" />
                {errors.comment && touched.comment ? (<div>{errors.comment}</div>) : null}
              </div>
              <div>
                <Field name="rating" />
                {errors.rating && touched.rating ? (<div>{errors.rating}</div>) : null}
              </div>
              <div>
                <CompletedCheckBox name="completed" value={completed} />
              </div>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
  return null;
};

export default FeedbackForm;
