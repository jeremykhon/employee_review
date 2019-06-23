class Api::V1::PerformanceReviewsController < ApplicationController
  before_action :set_employee, only: :create
  before_action :set_performance_review, only: :update

  def index
    performance_reviews = PerformanceReview.where(employee_id: params[:employee_id])
    render json: performance_reviews
  end

  def create
    performance_review = PerformanceReview.new(performance_review_params)
    performance_review.employee = @employee
    performance_review.save!
    render json: performance_review
  end

  def update
    @performance_review.update!(performance_review_params)
    head :ok
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
