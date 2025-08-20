Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "api/v1/users#index"
  
  namespace :api do
    namespace :v1 do
      resources :users do
        resources :search
        get "/get_info" => "search#get_info"
        resources :workouts do
          resources :exercises
        end
        resources :plans do
          resources :daily_plans do
            resources :exercise_plans
          end
        end
      end
    end
  end
end
