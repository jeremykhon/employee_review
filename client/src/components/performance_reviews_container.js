import React, { Component } from 'react';
import PerformanceReview from './performance_review';

class PerformanceReviewsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: null,
    };
  }

  render() {
    const { performanceReviews } = this.props;
    if (performanceReviews) {
      return (
        <div className="performance-reviews-container">
          {performanceReviews.map(performanceReview => (
            <PerformanceReview key={performanceReview.id} performanceReview={performanceReview} />
          ))}
        </div>
      );
    }
    return null;
  }
}

export default PerformanceReviewsContainer;
