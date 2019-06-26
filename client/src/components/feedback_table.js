import React from 'react';
import moment from 'moment';

const FeedbackRow = ({ feedback }) => {
  return (
    <tr>
      <td>{feedback.employee.first_name}</td>
      <td>{feedback.employee.last_name}</td>
      <td className="comment-cell">{feedback.comment}</td>
      <td>{feedback.rating}</td>
      <td>{feedback.completed_at ? moment(feedback.completed_at).format('MMMM Do YYYY') : null}</td>
    </tr>
  );
};

const FeedbackTable = ({ feedbacks }) => {
  return (
    <div className="table-responsive">
      <table className="table feedback-table">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th className="comment-cell">Comment</th>
            <th>Rating</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map(feedback => <FeedbackRow key={feedback.id} feedback={feedback} />)}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;