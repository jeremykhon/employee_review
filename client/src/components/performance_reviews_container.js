import React, { Component } from 'react';
import Modal from 'react-modal';
import PerformanceReview from './performance_review';
import CreatePerformanceReviewModal from './create_performance_review_modal';
import modalStyles from '../lib/modal_styles';

class PerformanceReviewsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { performanceReviews, employee, fetchEmployee, employees } = this.props;
    if (performanceReviews) {
      return (
        <div className="performance-reviews-container">
          <div className="performance-review-list">
            {performanceReviews.map(performanceReview => (
              <PerformanceReview key={performanceReview.id} performanceReview={performanceReview} employees={employees} />
            ))}
          </div>
          <hr />
          <button className="btn btn-default" type="button" onClick={this.openModal}>New performance review</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={modalStyles}
            contentLabel="Example Modal"
          >
            <CreatePerformanceReviewModal fetchEmployee={fetchEmployee} employee={employee} closeModal={this.closeModal} />
          </Modal>
        </div>
      );
    }
    return null;
  }
}

export default PerformanceReviewsContainer;
