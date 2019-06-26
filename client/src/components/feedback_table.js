import React from 'react';

const FeedbackRow = ({ feedback }) => {
  return (
    <tr>
      <td>{feedback.id}</td>
      <td>{feedback.employee.first_name}</td>
      <td>{feedback.employee.last_name}</td>
      <td>{feedback.comment}</td>
      <td>{feedback.rating}</td>
      <td>{feedback.completed_at}</td>
    </tr>
  );
};

const FeedbackTable = ({ feedbacks }) => {
  return (
    <div className="table-responsive">
      <table className="table feedback-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Comment</th>
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