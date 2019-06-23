class Feedback < ApplicationRecord
  belongs_to :employee
  belongs_to :performance_review

  validates :employee, :performance_review, :comment, :rating, presence: true
end
