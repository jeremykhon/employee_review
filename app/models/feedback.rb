class Feedback < ApplicationRecord
  belongs_to :employee
  belongs_to :performance_review
end
