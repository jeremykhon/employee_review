import React from 'react';

const EmployeeProfile = ({ selectedEmployeeId }) => {
  return (
    <div className="employee-profile">
      {selectedEmployeeId}
    </div>
  );
};

export default EmployeeProfile;
