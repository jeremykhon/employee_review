class Api::V1::Admin::PerformanceReviewsController < Api::V1::Admin::AdminController
  before_action :set_employee, only: :create
  before_action :set_performance_review, only: :update

  # GET /api/v1/admin/employees/:employee_id/performance_reviews
  def index
    performance_reviews = PerformanceReview.where(employee_id: params[:employee_id])
    render json: performance_reviews
  end

  # POST /api/v1/admin/employees/:employee_id/performance_reviews
  def create
    performance_review = PerformanceReview.new(performance_review_params)
    performance_review.employee = @employee
    performance_review.save!
    render json: performance_review, status: :created
  end

  # PATCH/PUT /api/v1/admin/performance_reviews/:id
  def update
    @performance_review.update!(performance_review_params)
    render json: @performance_review
  end

  private

  def set_employee
    @employee = Employee.find_by!(id: params[:employee_id])
  end

  def set_performance_review
    @performance_review = PerformanceReview.find_by!(id: params[:id])
  end

  def performance_review_params
    params.require(:performance_review).permit(:title, :final_comment, :final_rating)
  end
end
