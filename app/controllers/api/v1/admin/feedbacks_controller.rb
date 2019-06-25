class Api::V1::Admin::FeedbacksController < Api::V1::Admin::AdminController
  before_action :set_performance_review, only: %i[create_many index_by_performance_review]

  # GET /api/v1/admin/performance_reviews/:performance_review_id/feedbacks
  def index_by_performance_review
    feedbacks = Feedback.where(performance_review_id: @performance_review.id)
    render json: feedbacks, include: [employee: { only: %i[id first_name last_name email] }]
  end

  # POST /api/v1/admin/performance_reviews/:performance_review_id/feedbacks/create_many
  def create_many
    created = []
    employee_ids = params[:employee_ids].to_a
    ActiveRecord::Base.transaction do
      employee_ids.each do |employee_id|
        employee = Employee.find_by!(id: employee_id)
        created << Feedback.create!(employee: employee, performance_review: @performance_review)
      end
    end
    render json: created, include: [employee: { only: %i[id first_name last_name email] }], status: :created
  end

  private

  def set_performance_review
    @performance_review = PerformanceReview.find_by!(id: params[:performance_review_id])
  end

  def feedback_params
    params.require(:feedback).permit(:comment, :rating)
  end
end
