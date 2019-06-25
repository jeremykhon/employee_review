import React, { Component } from 'react';
import FeedbackTodoTable from './feedback_todo_table';
import FeedbackForm from './feedback_form';
import * as api from '../lib/api';

class EmployeeDashboard extends Component {
  constructor() {
    super();
    this.state = {
      feedbacks: [],
      // remove after implementing authentication service
      employee_id: 4,
      selectedFeedback: null,
    };
  }

  componentDidMount() {
    this.fetchFeedbacks();
  }

  fetchFeedbacks = () => {
    api.fetchFeedbacks()
      .then(feedbacks => this.setState({ feedbacks }))
      .catch(error => console.log(error));
  }

  selectFeedback = (feedback) => {
    this.setState({ selectedFeedback: feedback });
  }

  render() {
    const { feedbacks, selectedFeedback } = this.state;
    return (
      <div className="container">
        <FeedbackTodoTable feedbacks={feedbacks} selectFeedback={this.selectFeedback} selectedFeedback={selectedFeedback} />
        <FeedbackForm selectedFeedback={selectedFeedback} fetchFeedbacks={this.fetchFeedbacks} />
      </div>
    );
  }
}

export default EmployeeDashboard;
