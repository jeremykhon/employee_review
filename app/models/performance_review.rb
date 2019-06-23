class PerformanceReview < ApplicationRecord
  belongs_to :employee
  has_many :feedbacks
  has_many :reviewers, through: :feedbacks, source: :employee

  validates :employee, presence: true
end
