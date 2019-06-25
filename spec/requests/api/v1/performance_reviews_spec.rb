require 'rails_helper'

RSpec.describe "PerformanceReviews", type: :request do
  # Set up initial data to be shared across tests
  let!(:performance_reviews) { create_list(:performance_review, 3) }

  describe "PUT /api/v1/performance_reviews/:id" do
    let(:performance_review) { performance_reviews.first }
    let(:new_performance_review_attrs) { attributes_for(:performance_review).slice(:employee_id, :final_comment, :final_rating) }
    let(:uri) { "/api/v1/performance_reviews/#{performance_review.id}" }

    it "returns http success status" do
      put uri, params: { performance_review: new_performance_review_attrs }
      expect(response).to have_http_status(:success)
    end

    it "updates the performance_review attributes" do
      put uri, params: { performance_review: new_performance_review_attrs }
      performance_review.reload
      expect(performance_review).to have_attributes(new_performance_review_attrs)
    end

    context "when invalid attributes" do
      let(:invalid_performance_review_attrs) { new_performance_review_attrs.merge({ final_rating: -1 }) }

      it "raises an RecordInvalid error" do
        expect {
          put uri, params: { performance_review: invalid_performance_review_attrs }
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
