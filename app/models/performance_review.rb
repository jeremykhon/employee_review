class PerformanceReview < ApplicationRecord
  belongs_to :employee
  has_many :feedbacks, dependent: :destroy
  has_many :reviewers, through: :feedbacks, source: :employee

  validates :employee, presence: true
  validates_inclusion_of :final_rating, in: (1..5), allow_blank: true
end
