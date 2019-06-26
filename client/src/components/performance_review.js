import React, { Component } from 'react';
import Modal from 'react-modal';
import FeedbackTable from './feedback_table';
import CreateFeedbacksModal from './create_feedbacks_modal';
import modalStyles from '../lib/modal_styles';
import * as api from '../lib/api';

Modal.setAppElement('#root');

class PerformanceReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: [],
      modalIsOpen: false,
    };
  }

  componentDidMount() {
    this.fetchFeedbacksPerPerformanceReview();
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  fetchFeedbacksPerPerformanceReview = () => {
    const { performanceReview } = this.props;
    api.adminFetchFeedbacksPerPerformanceReview(performanceReview.id)
      .then(feedbacks => this.setState({ feedbacks }))
      // TODO: placeholder for error handling
      .catch(error => console.error(error));
  }

  handleFeedbacksCreated = (feedbacks) => {
    this.appendFeedbacks(feedbacks);
  }

  appendFeedbacks = (feedbacks) => {
    this.setState(state => (
      { feedbacks: [...state.feedbacks, ...feedbacks] }
    ));
  }

  renderFeedbacks = () => {
    const { feedbacks } = this.state;
    if (feedbacks.length > 0) {
      return (
        <FeedbackTable feedbacks={feedbacks} />
      );
    }
    return null;
  }

  render() {
    const { performanceReview, employees } = this.props;
    return (
      <div className="performance-review">
        <div className="performance-review-title">{performanceReview.title}</div>
        <div>
          {this.renderFeedbacks()}
        </div>
        <button className="btn btn-default" type="button" onClick={this.openModal}>Add reviewers</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Example Modal"
        >
          <CreateFeedbacksModal closeModal={this.closeModal} employees={employees} performanceReview={performanceReview} onFeedbacksCreated={this.handleFeedbacksCreated} />
        </Modal>
      </div>
    );
  }
}

export default PerformanceReview;