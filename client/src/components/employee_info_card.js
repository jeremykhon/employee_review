import React, { Component } from 'react';
import Modal from 'react-modal';
import UpdateEmployeeModal from './update_employee_modal';
import DeleteEmployeeModal from './delete_employee_modal';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {
    zIndex: '2',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class EmployeeInfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      updating: true,
    };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  handleUpdateClick = () => {
    this.setState({ updating: true }, this.openModal);
  }

  handleDeleteClick = () => {
    this.setState({ updating: false }, this.openModal);
  }

  modalContent = () => {
    const { updating } = this.state;
    const { employee, fetchEmployees, clearEmployee } = this.props;
    if (updating) {
      return (
        <UpdateEmployeeModal employee={employee} closeModal={this.closeModal} />
      );
    }
    return (
      <DeleteEmployeeModal employee={employee} fetchEmployees={fetchEmployees} clearEmployee={clearEmployee} closeModal={this.closeModal} />
    );
  }

  render() {
    const { employee } = this.props;
    return (
      <div className="employee-info-card">
        <div className="employee-info-table">
          <div className="employee-info-labels">
            <div>First name</div>
            <div>Last name</div>
            <div>Email</div>
          </div>
          <div className="employee-info-values">
            <div>{employee.first_name}</div>
            <div>{employee.last_name}</div>
            <div>{employee.email}</div>
          </div>
        </div>
        <hr />
        <div className="employee-info-buttons-container">
          <button className="white-button" onClick={this.handleUpdateClick} type="button">update</button>
          <button className="white-button" onClick={this.handleDeleteClick} type="button">delete</button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {this.modalContent()}
        </Modal>
      </div>
    );
  }
}

export default EmployeeInfoCard;
