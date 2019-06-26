import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import * as api from '../lib/api';

const FeedbackSchema = Yup.object().shape({
  comment: Yup.string()
    .max(280, 'Maximum 280 characters')
    .required('Required'),
  rating: Yup.number('Invalid number')
    .min(1, 'Must be between 1 and 5')
    .max(5, 'Must be between 1 and 5')
    .required('Required'),
});

const CompletedCheckBox = ({ name }) => {
  const handleChange = (field, form) => {
    if (field.value) {
      form.setFieldValue(name, false);
    } else {
      form.setFieldValue(name, true);
    }
  };

  return (
    <Field className="form-check" name={name}>
      {({ field, form }) => (
        <div className="form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              checked={field.value}
              onChange={() => handleChange(field, form)}
            />
            I have completed my feedback
          </label>
        </div>
      )}
    </Field>
  );
};

const FeedbackForm = ({ selectedFeedback, fetchFeedbacks }) => {
  const updateFeedback = (feedbackData, id) => {
    api.updateFeedback(id, feedbackData)
      .then(fetchFeedbacks)
      // TODO: placeholder for error handling
      .catch(error => console.error(error));
  };

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
            updateFeedback(values, id, fetchFeedbacks);
          }}
        >
          {({ errors, touched }) => (
            <Form className="feedback-form">
              <div className="form-label">Comment</div>
              <div className="form-group">
                <Field className={classNames('form-control', { 'is-invalid': errors.comment })} component="textarea" name="comment" placeholder="He was a very helpful colleague who always put others first" />
                {errors.comment && touched.comment && (
                  <div className="invalid-feedback">{errors.comment}</div>
                )}
              </div>
              <div className="form-label">Rating</div>
              <div className="form-group">
                <Field className={classNames('form-control', { 'is-invalid': errors.rating })} component="select" name="rating">
                  <option>Select rating</option>
                  <option value="1">1 - Needs improvement</option>
                  <option value="2">2 - Below expectations</option>
                  <option value="3">3 - As expected</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Outstanding</option>
                </Field>
                {errors.rating && touched.rating && (
                  <div className="invalid-feedback">{errors.rating}</div>
                )}
              </div>
              <div className="form-group">
                <CompletedCheckBox name="completed" value={completed} />
              </div>
              <button className="btn btn-default" type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
  return null;
};

export default FeedbackForm;
