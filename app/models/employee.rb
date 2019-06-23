class Employee < ApplicationRecord
  has_many :feedbacks
  has_many :performance_reviews_to_review, through: :feedbacks, source: :performance_review
  has_many :performance_reviews

  validates :first_name, :last_name, :email, presence: true
  validates :email, uniqueness: true
end
