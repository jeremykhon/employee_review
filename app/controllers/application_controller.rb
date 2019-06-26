class ApplicationController < ActionController::API
  before_action :authenticate_request, except: :fallback_index_html
  attr_reader :current_employee

  def fallback_index_html
    render file: 'public/index.html'
  end

  private

  def authenticate_request
    @current_employee = AuthorizeApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_employee
  end
end
