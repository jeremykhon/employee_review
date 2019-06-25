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
    <table className="feedback-table">
      <tr>
        <th>ID</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Comment</th>
        <th>Rating</th>
        <th>Completed</th>
      </tr>
      {feedbacks.map(feedback => <FeedbackRow feedback={feedback} />)}
    </table>
  );
};

export default FeedbackTable;
