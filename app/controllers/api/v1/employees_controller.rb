class Api::V1::EmployeesController < ApplicationController
  before_action :set_employee, only: %i[show destroy update]

  def index
    employees = Employee.all
    render json: employees, only: %i[id first_name last_name email]
  end

  def show
    render json: @employee, only: %i[id first_name last_name email], include: :performance_reviews
  end

  def create
    employee = Employee.create!(employee_params)
    render json: employee, only: %i[id first_name last_name email]
  end

  def destroy
    @employee.destroy!
    head :no_content
  end

  def update
    @employee.update!(employee_params)
    render json: @employee, only: %i[id first_name last_name email]
  end

  private

  def set_employee
    @employee = Employee.find_by!(id: params[:id])
  end

  def employee_params
    params.require(:employee).permit(:first_name, :last_name, :email, :password)
  end
end
