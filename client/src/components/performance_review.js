import React, { Component } from 'react';

class PerformanceReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: null,
    };
  }

  render() {
    const { performanceReview } = this.props;
    return (
      <div className="performance-review">
        {performanceReview.title}
      </div>
    );
  }
}

export default PerformanceReview;
