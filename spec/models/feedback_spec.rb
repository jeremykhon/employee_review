require 'rails_helper'

RSpec.describe Feedback, type: :model do
  let(:feedback) { create(:feedback) }

  it 'is valid' do
    expect(feedback).to be_valid
  end
end
