require 'rails_helper'

RSpec.describe "Employees", type: :request do
  # Set up initial data to be shared across tests
  let!(:employees) { create_list(:employee, 3) }

  describe "GET /api/v1/admin/employees" do
    let(:uri) { "/api/v1/admin/employees" }

    it "renders http success status" do
      get uri
      expect(response).to have_http_status(:success)
    end

    it "renders the employee with correct attributes" do
      expected_response = (
        employees.map do |employee|
          {
            id: employee.id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
          }
        end
      ).to_json

      get uri
      expect(response.body).to eq(expected_response)
    end
  end

  describe "GET /api/v1/admin/employees/:id" do
    let(:employee) { employees.first }
    let(:uri) { "/api/v1/admin/employees/#{employee.id}" }

    it "renders http success status" do
      get uri
      expect(response).to have_http_status(:success)
    end

    it "renders the employee with correct attributes" do
      get uri
      expect(response.body).to eq(
        {
          id: employee.id,
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          performance_reviews: employee.performance_reviews,
        }.to_json
      )
    end

    context "when missing employee" do
      let(:missing_uri) { "/api/v1/admin/employees/-1" }

      it "raises an RecordNotFound error" do
        expect {
          get missing_uri
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  describe "POST /api/v1/admin/employees" do
    let(:employee_attrs) { attributes_for(:employee).slice(:first_name, :last_name, :email, :password) }
    let(:uri) { "/api/v1/admin/employees" }

    it "returns http created status" do
      post uri, params: { employee: employee_attrs }
      expect(response).to have_http_status(:created)
    end

    it "creates a new Employee" do
      expect {
        post uri, params: { employee: employee_attrs }
      }.to change(Employee, :count).by(1)
    end

    context "when invalid attributes" do
      let(:invalid_employee_attrs) { employee_attrs.merge({ first_name: nil }) }

      it "raises an RecordInvalid error" do
        expect {
          post uri, params: { employee: invalid_employee_attrs }
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end

  describe "PUT /api/v1/admin/employees/:id" do
    let(:employee) { employees.first }
    let(:new_employee_attrs) { attributes_for(:employee).slice(:first_name, :last_name, :email, :password) }
    let(:uri) { "/api/v1/admin/employees/#{employee.id}" }

    it "returns http success status" do
      put uri, params: { employee: new_employee_attrs }
      expect(response).to have_http_status(:success)
    end

    it "updates the employee attributes" do
      put uri, params: { employee: new_employee_attrs }
      employee.reload
      expect(employee).to have_attributes(new_employee_attrs)
    end

    context "when invalid attributes" do
      let(:invalid_employee_attrs) { new_employee_attrs.merge({ first_name: nil }) }

      it "raises an RecordInvalid error" do
        expect {
          put uri, params: { employee: invalid_employee_attrs }
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end

  describe "DELETE /api/v1/admin/employees/:id" do
    let(:employee) { employees.first }
    let(:uri) { "/api/v1/admin/employees/#{employee.id}" }

    it "returns http no_content status" do
      delete uri
      expect(response).to have_http_status(:no_content)
    end

    it "destroys the employee" do
      expect {
        delete uri
      }.to change(Employee, :count).by(-1)
    end

    context "when missing employee" do
      let(:missing_uri) { "/api/v1/admin/employees/-1" }

      it "raises an RecordNotFound error" do
        expect {
          delete missing_uri
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end