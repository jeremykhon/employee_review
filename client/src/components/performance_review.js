import React, { Component } from 'react';
import axios from 'axios';
import BASE_URL from '../utilities/base_url';

class PerformanceReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
    };
  }

  componentDidMount() {
    this.fetchFeedbacksPerPerformanceReview();
  }

  fetchFeedbacksPerPerformanceReview = () => {
    const { performanceReview } = this.props;
    axios.get(`${BASE_URL}/performance_reviews/${performanceReview.id}/feedbacks`)
      .then(response => this.setState({ feedbacks: response.data }))
      .catch(error => console.log(error));
  }

  renderFeedbacks = () => {
    const { feedbacks } = this.state;
    if (feedbacks.length > 0) {
      return (
        feedbacks.map(feedback => <div>{feedback.employee_id}</div>)
      );
    }
    return null;
  }

  render() {
    const { performanceReview } = this.props;
    return (
      <div className="performance-review">
        <div>{performanceReview.title}</div>
        <div>
          {this.renderFeedbacks()}
        </div>
        
      </div>
    );
  }
}

export default PerformanceReview;
