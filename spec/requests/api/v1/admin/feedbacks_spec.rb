require 'rails_helper'

RSpec.describe "API::V1::Admin::PerformanceReviews", type: :request do
  # Set up initial data to be shared across tests
  let!(:performance_reviews) { create_list(:performance_review, 3) }
  # Authenticate
  let(:current_employee) { create(:employee, is_admin: true) }
  let(:headers_with_auth) do
    command = AuthenticateEmployee.call(current_employee.email, current_employee.password)
    auth_token = command.result
    { 'Authorization': auth_token }
  end

  describe "PUT /api/v1/admin/performance_reviews/:id" do
    let(:performance_review) { performance_reviews.first }
    let(:new_performance_review_attrs) { attributes_for(:performance_review).slice(:employee_id, :final_comment, :final_rating) }
    let(:uri) { "/api/v1/admin/performance_reviews/#{performance_review.id}" }

    it "returns http success status" do
      put uri, headers: headers_with_auth, params: { performance_review: new_performance_review_attrs }
      expect(response).to have_http_status(:success)
    end

    it "updates the performance_review attributes" do
      put uri, headers: headers_with_auth, params: { performance_review: new_performance_review_attrs }
      performance_review.reload
      expect(performance_review).to have_attributes(new_performance_review_attrs)
    end

    context "when unauthenticated" do
      it "returns http unauthorized status" do
        put uri, params: { performance_review: new_performance_review_attrs }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when not admin" do
      it "returns http unauthorized status" do
        current_employee.update!(is_admin: false)
        put uri, headers: headers_with_auth, params: { performance_review: new_performance_review_attrs }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when invalid attributes" do
      let(:invalid_performance_review_attrs) { new_performance_review_attrs.merge({ final_rating: -1 }) }

      it "raises an RecordInvalid error" do
        expect {
          put uri, headers: headers_with_auth, params: { performance_review: invalid_performance_review_attrs }
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
