require 'rails_helper'

RSpec.describe "Feedbacks", type: :request do
  # Set up initial data to be shared across tests
  let!(:feedbacks) { create_list(:feedback, 3) }

  describe "PUT /api/v1/admin/feedbacks/:id" do
    let(:feedback) { feedbacks.first }
    let(:new_feedback_attrs) { attributes_for(:feedback).slice(:comment, :rating) }
    let(:uri) { "/api/v1/admin/feedbacks/#{feedback.id}" }

    it "returns http success status" do
      put uri, params: { feedback: new_feedback_attrs }
      expect(response).to have_http_status(:success)
    end

    it "updates the feedback attributes" do
      put uri, params: { feedback: new_feedback_attrs }
      feedback.reload
      expect(feedback).to have_attributes(new_feedback_attrs)
    end

    context "when invalid attributes" do
      let(:invalid_feedback_attrs) { new_feedback_attrs.merge({ rating: -1 }) }

      it "raises an RecordInvalid error" do
        expect {
          put uri, params: { feedback: invalid_feedback_attrs }
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end