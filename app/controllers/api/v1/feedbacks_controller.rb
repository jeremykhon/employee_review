class Api::V1::FeedbacksController < ApplicationController
  # GET /api/v1/feedbacks
  def index
    feedbacks = @current_employee.feedbacks
    render json: feedbacks, include: [performance_review: { include: { employee: { only: %i[id first_name last_name email] } } }]
  end

  # PATCH/PUT /api/v1/feedbacks/:id
  def update
    feedback = @current_employee.feedbacks.find_by!(id: params[:id])
    feedback.update!(feedback_params)
    feedback.completed_at = params[:feedback][:completed] ? DateTime.now : nil
    feedback.save!
    head :no_content
  end

  private

  def feedback_params
    params.require(:feedback).permit(:comment, :rating)
  end
end
