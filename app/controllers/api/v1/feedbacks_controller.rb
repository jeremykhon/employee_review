class Api::V1::FeedbacksController < ApplicationController
  # before_action :set_employee, only: %i[create]
  before_action :set_performance_review, only: %i[create index_by_performance_review]

  def index
    feedbacks = Feedback.where(employee_id: params[:employee_id])
    render json: feedbacks
  end

  def create
    employee_ids = params[:employee_ids].to_a
    employee_ids.each do |employee_id|
      employee = Employee.find_by(id: employee_id)
      unless employee.nil?
        Feedback.create(employee: employee, performance_review: @performance_review)
      end
    end
    feedbacks = Feedback.where(performance_review: @performance_review)
    render json: feedbacks
  end

  def update
    feedback = Feedback.find_by!(id: params[:id])
    feedback.update!(feedback_params)
    head :ok
  end

  def index_by_performance_review
    feedbacks = Feedback.where(performance_review_id: @performance_review.id)
    render json: feedbacks
  end

  private

  def set_employee
    @employee = Employee.find_by!(id: params[:employee_id])
  end

  def set_performance_review
    @performance_review = PerformanceReview.find_by!(id: params[:performance_review_id])
  end

  def feedback_params
    params.require(:feedback).permit(:comment, :rating)
  end
end
