require 'rails_helper'

RSpec.describe Employee, type: :model do
  let(:employee) { create(:employee) }

  it 'is valid' do
    expect(employee).to be_valid
  end

  describe '#performance_reviews' do
    it 'returns the correct records' do
      performance_review = create(:performance_review, employee: employee)
      reviewer = create(:employee)
      create(:feedback, employee: reviewer, performance_review: performance_review)
      expect(employee.performance_reviews.length).to be(1)
      expect(employee.performance_reviews[0].id).to be(performance_review.id)
    end
  end

  describe '#performance_reviews_to_review' do
    it 'returns the correct records' do
      performance_review = create(:performance_review, employee: employee)
      reviewer = create(:employee)
      create(:feedback, employee: reviewer, performance_review: performance_review)
      expect(reviewer.performance_reviews_to_review.length).to be(1)
      expect(reviewer.performance_reviews_to_review[0].id).to be(performance_review.id)
    end
  end
end
