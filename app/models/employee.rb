class Employee < ApplicationRecord
  has_secure_password

  has_many :feedbacks, -> { order('id DESC') }, dependent: :destroy

  has_many :performance_reviews_to_review, through: :feedbacks, source: :performance_review
  has_many :performance_reviews, dependent: :destroy

  validates :first_name, :last_name, :email, presence: true
  validates :email, uniqueness: true
end
