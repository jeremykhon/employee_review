require 'rails_helper'

RSpec.describe "API::V1::Admin::Employees", type: :request do
  # Set up initial data to be shared across tests
  let!(:employees) { create_list(:employee, 3) }
  # Authenticate
  let(:current_employee) do
    employee = employees.first
    employee.update!(is_admin: true)
    employee
  end
  let(:headers_with_auth) do
    command = AuthenticateEmployee.call(current_employee.email, current_employee.password)
    auth_token = command.result
    { 'Authorization': auth_token }
  end

  describe "GET /api/v1/admin/employees" do
    let(:uri) { "/api/v1/admin/employees" }

    it "renders http success status" do
      get uri, headers: headers_with_auth
      expect(response).to have_http_status(:success)
    end

    it "renders the employees with correct attributes" do
      expected_response = (
        employees.map do |employee|
          a_hash_including({
            id: employee.id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
          }.stringify_keys)
        end
      )

      get uri, headers: headers_with_auth
      expect(JSON.parse(response.body)).to match_array(expected_response)
    end

    context "when unauthenticated" do
      it "returns http unauthorized status" do
        get uri
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when not admin" do
      it "returns http unauthorized status" do
        current_employee.update!(is_admin: false)
        get uri, headers: headers_with_auth
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "GET /api/v1/admin/employees/:id" do
    let(:employee) { employees.first }
    let(:uri) { "/api/v1/admin/employees/#{employee.id}" }

    it "renders http success status" do
      get uri, headers: headers_with_auth
      expect(response).to have_http_status(:success)
    end

    it "renders the employee with correct attributes" do
      get uri, headers: headers_with_auth
      expect(JSON.parse(response.body)).to include(
        {
          id: employee.id,
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          performance_reviews: employee.performance_reviews,
        }.stringify_keys
      )
    end

    context "when unauthenticated" do
      it "returns http unauthorized status" do
        get uri
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when not admin" do
      it "returns http unauthorized status" do
        current_employee.update!(is_admin: false)
        get uri, headers: headers_with_auth
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when missing employee" do
      let(:missing_uri) { "/api/v1/admin/employees/-1" }

      it "raises an RecordNotFound error" do
        expect {
          get missing_uri, headers: headers_with_auth
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end

  describe "POST /api/v1/admin/employees" do
    let(:employee_attrs) { attributes_for(:employee).slice(:first_name, :last_name, :email, :password) }
    let(:uri) { "/api/v1/admin/employees" }

    it "returns http created status" do
      post uri, headers: headers_with_auth, params: { employee: employee_attrs }
      expect(response).to have_http_status(:created)
    end

    it "creates a new Employee" do
      expect {
        post uri, headers: headers_with_auth, params: { employee: employee_attrs }
      }.to change(Employee, :count).by(1)
    end

    context "when unauthenticated" do
      it "returns http unauthorized status" do
        post uri, params: { employee: employee_attrs }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when not admin" do
      it "returns http unauthorized status" do
        current_employee.update!(is_admin: false)
        post uri, headers: headers_with_auth, params: { employee: employee_attrs }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when invalid attributes" do
      let(:invalid_employee_attrs) { employee_attrs.merge({ first_name: nil }) }

      it "raises an RecordInvalid error" do
        expect {
          post uri, headers: headers_with_auth, params: { employee: invalid_employee_attrs }
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end

  describe "PUT /api/v1/admin/employees/:id" do
    let(:employee) { employees.first }
    let(:new_employee_attrs) { attributes_for(:employee).slice(:first_name, :last_name, :password) }
    let(:uri) { "/api/v1/admin/employees/#{employee.id}" }

    it "returns http success status" do
      put uri, headers: headers_with_auth, params: { employee: new_employee_attrs }
      expect(response).to have_http_status(:success)
    end

    it "updates the employee attributes" do
      put uri, headers: headers_with_auth, params: { employee: new_employee_attrs }
      employee.reload
      expect(employee).to have_attributes(new_employee_attrs)
    end

    context "when unauthenticated" do
      it "returns http unauthorized status" do
        put uri, params: { employee: new_employee_attrs }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when not admin" do
      it "returns http unauthorized status" do
        current_employee.update!(is_admin: false)
        put uri, headers: headers_with_auth, params: { employee: new_employee_attrs }
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when invalid attributes" do
      let(:invalid_employee_attrs) { new_employee_attrs.merge({ first_name: nil }) }

      it "raises an RecordInvalid error" do
        expect {
          put uri, headers: headers_with_auth, params: { employee: invalid_employee_attrs }
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end

  describe "DELETE /api/v1/admin/employees/:id" do
    let(:employee) { employees.first }
    let(:uri) { "/api/v1/admin/employees/#{employee.id}" }

    it "returns http no_content status" do
      delete uri, headers: headers_with_auth
      expect(response).to have_http_status(:no_content)
    end

    it "destroys the employee" do
      expect {
        delete uri, headers: headers_with_auth
      }.to change(Employee, :count).by(-1)
    end

    context "when unauthenticated" do
      it "returns http unauthorized status" do
        delete uri
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when not admin" do
      it "returns http unauthorized status" do
        current_employee.update!(is_admin: false)
        delete uri, headers: headers_with_auth
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context "when missing employee" do
      let(:missing_uri) { "/api/v1/admin/employees/-1" }

      it "raises an RecordNotFound error" do
        expect {
          delete missing_uri, headers: headers_with_auth
        }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end