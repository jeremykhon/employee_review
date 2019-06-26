import React, { Component } from 'react';
import Modal from 'react-modal';
import UpdateEmployeeModal from './update_employee_modal';
import DeleteEmployeeModal from './delete_employee_modal';
import modalStyles from '../lib/modal_styles';

Modal.setAppElement('#root');

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
    const { employee, fetchEmployees, clearEmployee, fetchEmployee } = this.props;
    if (updating) {
      return (
        <UpdateEmployeeModal employee={employee} fetchEmployee={fetchEmployee} closeModal={this.closeModal} />
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
        <div className="btns-container">
          <button className="btn btn-default" onClick={this.handleUpdateClick} type="button">Update</button>
          <button className="btn btn-default" onClick={this.handleDeleteClick} type="button">Delete</button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Example Modal"
        >
          {this.modalContent()}
        </Modal>
      </div>
    );
  }
}

export default EmployeeInfoCard;