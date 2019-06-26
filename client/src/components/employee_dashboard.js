import React, { Component } from 'react';
import FeedbackTodoTable from './feedback_todo_table';
import FeedbackForm from './feedback_form';
import * as api from '../lib/api';

class EmployeeDashboard extends Component {
  constructor() {
    super();
    this.state = {
      feedbacks: [],
      selectedFeedback: null,
    };
  }

  componentDidMount() {
    this.fetchFeedbacks();
  }

  fetchFeedbacks = () => {
    const { selectedFeedback } = this.state
    api.fetchFeedbacks()
      .then((feedbacks) => {
        this.setState({ feedbacks });
        if (!selectedFeedback) {
          this.setState({ selectedFeedback: feedbacks[0] });
        }
      })
      .catch(error => console.error(error));
  }

  selectFeedback = (feedback) => {
    this.setState({ selectedFeedback: feedback });
  }

  render() {
    const { feedbacks, selectedFeedback } = this.state;
    return (
      <div className="container employee-dashboard">
        <div className="section-title">Feedbacks to give</div>
        <FeedbackTodoTable feedbacks={feedbacks} selectFeedback={this.selectFeedback} selectedFeedback={selectedFeedback} />
        <div className="section-title">Give feedback</div>
        <FeedbackForm selectedFeedback={selectedFeedback} fetchFeedbacks={this.fetchFeedbacks} />
      </div>
    );
  }
}

export default EmployeeDashboard;
