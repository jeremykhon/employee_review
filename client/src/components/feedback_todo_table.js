import React from 'react';
import moment from 'moment';

const compareFeedback = (feedback, selectedFeedback) => {
  if (selectedFeedback) {
    if (feedback.id === selectedFeedback.id) return true;
  }
  return false;
};

const FeedbackTodoRow = ({ feedback, selectFeedback, selectedFeedback }) => {
  return (
    <tr className={compareFeedback(feedback, selectedFeedback) ? 'selected table-row' : 'table-row'} onClick={() => selectFeedback(feedback)}>
      <td>{feedback.performance_review.employee.first_name}</td>
      <td>{feedback.performance_review.employee.last_name}</td>
      <td className="comment-cell">{feedback.comment}</td>
      <td>{feedback.rating}</td>
      <td>{feedback.completed_at ? moment(feedback.completed_at).format('MMMM Do YYYY') : null}</td>
    </tr>
  );
};

const FeedbackTodoTable = ({ feedbacks, selectFeedback, selectedFeedback }) => (
  <div className="section-container feedback-todo-table-container">
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
          {feedbacks.map(feedback => <FeedbackTodoRow key={feedback.id} feedback={feedback} selectedFeedback={selectedFeedback} selectFeedback={selectFeedback} />)}
        </tbody>
      </table>
    </div>
  </div>
);

export default FeedbackTodoTable;