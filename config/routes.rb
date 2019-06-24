Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :employees do
        resources :feedbacks, only: :index
        resources :performance_reviews, only: %i[index create] do
        end
      end
      resources :performance_reviews, only: :update do
        resources :feedbacks, only: :create
        get 'feedbacks', to: 'feedbacks#index_by_performance_review'
      end
      resources :feedbacks, only: :update
    end
  end
end
