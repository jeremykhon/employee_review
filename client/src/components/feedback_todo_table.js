import React from 'react';

const FeedbackTodoRow = ({ feedback, selectFeedback, selectedFeedback }) => {
  return (
    <tr onClick={() => selectFeedback(feedback)}>
      <td>{feedback.id}</td>
      <td>{feedback.performance_review.employee.first_name}</td>
      <td>{feedback.performance_review.employee.last_name}</td>
      <td>{feedback.comment}</td>
      <td>{feedback.rating}</td>
      <td>{feedback.completed_at}</td>
    </tr>
  );
};

const FeedbackTodoTable = ({ feedbacks, selectFeedback, selectedFeedback }) => (
  <div className="section-container feedback-todo-table-container">
    <table className="feedback-table">
      <tbody>
        <tr>
          <th>ID</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Comment</th>
          <th>Rating</th>
          <th>Completed</th>
        </tr>
        {feedbacks.map(feedback => <FeedbackTodoRow key={feedback.id} feedback={feedback} selectedFeedback={selectedFeedback} selectFeedback={selectFeedback} />)}
      </tbody>
    </table>
  </div>
);

export default FeedbackTodoTable;
