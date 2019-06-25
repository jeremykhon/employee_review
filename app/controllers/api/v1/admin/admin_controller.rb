class Api::V1::Admin::AdminController < ApplicationController
  before_action :check_admin

  private

  def check_admin
    render json: { error: 'Not Authorized' }, status: :unauthorized unless @current_employee.is_admin?
  end
end
