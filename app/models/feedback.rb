class Feedback < ApplicationRecord
  belongs_to :employee
  belongs_to :performance_review

  validates :employee, :performance_review, presence: true
  validates_inclusion_of :rating, in: (1..5), allow_blank: true
end
