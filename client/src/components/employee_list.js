import React, { Component } from 'react';
import Modal from 'react-modal';
import EmployeeListItem from './employee_list_item';
import CreateEmployeeModal from './create_employee_modal';
import modalStyles from '../lib/modal_styles';

Modal.setAppElement('#root');

class EmployeeList extends Component {
  constructor() {
    super();
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
    const { employees, selectEmployee, selectedEmployeeId, onEmployeeCreated } = this.props;
    return (
      <div className="employee-list">
        <div className="employee-list-top-container">
          <div className="employee-list-title">All Employees</div>
          <button className="btn btn-default" type="button" onClick={this.openModal}>Add employee</button>
        </div>
        {employees.map(employee => (
          <EmployeeListItem
            key={employee.id}
            employee={employee}
            selectEmployee={selectEmployee}
            selectedEmployeeId={selectedEmployeeId}
          />
        ))}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyles}
          contentLabel="Example Modal"
        >
          <CreateEmployeeModal onEmployeeCreated={onEmployeeCreated} closeModal={this.closeModal} />
        </Modal>
      </div>
    );
  }
}

export default EmployeeList;
