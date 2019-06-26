require 'rails_helper'

RSpec.describe "API::V1::Feedbacks", type: :request do
  # Authenticate
  let(:current_employee) { create(:employee, is_admin: true) }
  let(:headers_with_auth) do
    command = AuthenticateEmployee.call(current_employee.email, current_employee.password)
    auth_token = command.result
    { 'Authorization': auth_token }
  end

  describe "PUT /api/v1/feedbacks/:id" do
    let!(:feedbacks) { create_list(:feedback, 3, employee: current_employee) }
    let(:feedback) { feedbacks.first }
    let(:new_feedback_attrs) { attributes_for(:feedback).slice(:comment, :rating) }
    let(:uri) { "/api/v1/feedbacks/#{feedback.id}" }

    it "returns http success status" do
      put uri, headers: headers_with_auth, params: { feedback: new_feedback_attrs }
      expect(response).to have_http_status(:success)
    end

    it "updates the feedback attributes" do
      put uri, headers: headers_with_auth, params: { feedback: new_feedback_attrs }
      feedback.reload
      expect(feedback).to have_attributes(new_feedback_attrs)
    end

    context "when unauthenticated" do
      it "returns http unauthorized status" do
        put uri, params: { feedback: new_feedback_attrs }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when not admin" do
      it "returns http success status" do
        current_employee.update!(is_admin: false)
        put uri, headers: headers_with_auth, params: { feedback: new_feedback_attrs }
        expect(response).to have_http_status(:success)
      end
    end

    context "when invalid attributes" do
      let(:invalid_feedback_attrs) { new_feedback_attrs.merge({ rating: -1 }) }

      it "raises an RecordInvalid error" do
        expect {
          put uri, headers: headers_with_auth, params: { feedback: invalid_feedback_attrs }
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
