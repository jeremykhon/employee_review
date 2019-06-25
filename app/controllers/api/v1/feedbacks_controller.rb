class Api::V1::FeedbacksController < ApplicationController
  before_action :set_performance_review, only: %i[create_many index_by_performance_review]

  def index
    feedbacks = Feedback.where(employee_id: params[:employee_id])
    render json: feedbacks
  end

  def create_many
    employee_ids = params[:employee_ids].to_a
    employee_ids.each do |employee_id|
      employee = Employee.find_by(id: employee_id)
      unless employee.nil?
        Feedback.create(employee: employee, performance_review: @performance_review)
      end
    end
    feedbacks = Feedback.where(performance_review: @performance_review)
    render json: feedbacks, include: [employee: { only: %i[id first_name last_name email] } ]
  end

  def update
    feedback = Feedback.find_by!(id: params[:id])
    feedback.update!(feedback_params)
    feedback.completed_at = params[:completed] ? DateTime.now : nil
    feedback.save!
    render json: feedback
  end

  def index_by_performance_review
    feedbacks = Feedback.where(performance_review_id: @performance_review.id)
    render json: feedbacks, include: [employee: { only: %i[id first_name last_name email] } ]
  end

  private

  def set_performance_review
    @performance_review = PerformanceReview.find_by!(id: params[:performance_review_id])
  end

  def feedback_params
    params.require(:feedback).permit(:comment, :rating)
  end
end
