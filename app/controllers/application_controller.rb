class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  before_action :authenticate_request, except: :fallback_index_html
  attr_reader :current_employee

  def fallback_index_html
    respond_to do |format|
      format.html { render body: Rails.root.join('public/index.html').read }
    end
  end

  private

  def authenticate_request
    @current_employee = AuthorizeApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_employee
  end
end
