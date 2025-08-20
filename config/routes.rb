Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      devise_for :users,
                path: '',
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

      get '/profile', to: 'profiles#show'
      patch '/profile', to: 'profiles#update'
      post '/daily_weight', to: 'profiles#log_daily_weight'
  
  # Defines the root path route ("/")
  # root "api/v1/users#index"
  
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
