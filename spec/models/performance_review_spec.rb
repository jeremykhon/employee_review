require 'rails_helper'

RSpec.describe PerformanceReview, type: :model do
  let(:performance_review) { create(:performance_review) }

  it 'is valid' do
    expect(performance_review).to be_valid
  end
end
