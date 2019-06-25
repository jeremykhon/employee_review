Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post 'authenticate', to: 'authentication#authenticate'
      resources :feedbacks, only: %i[index update]
      namespace :admin do
        resources :employees do
          resources :performance_reviews, only: %i[index create]
        end
        resources :performance_reviews, only: :update do
          post 'feedbacks/create_many', to: 'feedbacks#create_many'
          get 'feedbacks', to: 'feedbacks#index_by_performance_review'
        end
      end
    end
  end
end
