class Api::V1::EmployeesController < ApplicationController
  def current_employee
    render json: @current_employee, only: %i[id first_name last_name email is_admin]
  end
end
