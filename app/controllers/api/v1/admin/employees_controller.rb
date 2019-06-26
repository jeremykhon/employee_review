class Api::V1::Admin::EmployeesController < Api::V1::Admin::AdminController
  before_action :set_employee, only: %i[show destroy update]

  # GET /api/v1/admin/employees
  def index
    employees = Employee.all
    render json: employees, only: %i[id first_name last_name email]
  end

  # GET /api/v1/admin/employees/:id
  def show
    render json: @employee, only: %i[id first_name last_name email], include: :performance_reviews
  end

  # POST /api/v1/admin/employees
  def create
    employee = Employee.create!(employee_params)
    render json: employee, only: %i[id first_name last_name email], status: :created
  end

  # DELETE /api/v1/admin/employees/:id
  def destroy
    @employee.destroy!
    head :no_content
  end

  # PATCH/PUT /api/v1/admin/employees/:id
  def update
    @employee.update!(employee_update_params)
    render json: @employee, only: %i[id first_name last_name email]
  end

  private

  def set_employee
    @employee = Employee.find_by!(id: params[:id])
  end

  def employee_update_params
    params.require(:employee).permit(:first_name, :last_name)
  end

  def employee_params
    params.require(:employee).permit(:first_name, :last_name, :email, :password)
  end
end
