import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import FeedbackTable from './feedback_table';
import CreateFeedbacksModal from './create_feedbacks_modal';
import BASE_URL from '../utilities/base_url';
import modalStyles from '../utilities/modal_styles';

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
    axios.get(`${BASE_URL}/performance_reviews/${performanceReview.id}/feedbacks`)
      .then(response => this.setState({ feedbacks: response.data }))
      .catch(error => console.log(error));
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
        <button className="white-btn" type="button" onClick={this.openModal}>Add reviewers</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Example Modal"
        >
          <CreateFeedbacksModal employees={employees} performanceReview={performanceReview} />
        </Modal>
      </div>
    );
  }
}

export default PerformanceReview;
