require 'sidekiq/web'

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  
  # Defines the root path route ("/")
  # root "api/v1/users#index"


  devise_for :users,
            path: 'api/v1',
            path_names: {
              sign_in: 'login',
              sign_out: 'logout',
              registration: 'signup'
            },
            controllers: {
              sessions: 'api/v1/users/sessions',
              registrations: 'api/v1/users/registrations',
              confirmations: 'api/v1/users/confirmations',
              passwords: 'api/v1/users/passwords'
            }
  namespace :api do
    namespace :v1 do  
      get '/profile', to: 'profiles#show'
      patch '/profile', to: 'profiles#update'
      post '/daily_weight', to: 'profiles#log_daily_weight'
  
      resources :search
      get "/get_info" => "search#get_info"
      get "/workouts/summary" => "workouts#summary"
      resources :workouts do
        resources :exercises
      end
      post "/generate-workout" => "plans#generate"
      resources :plans do
        resources :daily_plans do
          resources :reminders
          resources :exercise_plans
        end
      end
      resources :exercise_dbs
    end
  end

  mount Sidekiq::Web => "/sidekiq"   # http://localhost:3000/sidekiq
end
