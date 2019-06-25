import React, { Component } from 'react';
import axios from 'axios';
import FeedbackTodoTable from './feedback_todo_table';
import FeedbackForm from './feedback_form';
import BASE_URL from '../utilities/base_url';

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
    this.fetchFeedbacksPerEmployee();
  }

  fetchFeedbacksPerEmployee = () => {
    axios.get(`${BASE_URL}/admin/employees/${this.state.employee_id}/feedbacks`)
      .then(response => this.setState({ feedbacks: response.data }))
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
        <FeedbackForm selectedFeedback={selectedFeedback} fetchFeedbacksPerEmployee={this.fetchFeedbacksPerEmployee} />
      </div>
    );
  }
}

export default EmployeeDashboard;
