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
                  sessions: 'users/sessions',
                  registrations: 'users/registrations',
                  confirmations: 'users/confirmations',
                  passwords: 'users/passwords'
                }

      get '/profile', to: 'users/registrations#show'
      patch '/profile', to: 'users/registrations#update_profile'
  
  # Defines the root path route ("/")
  # root "api/v1/users#index"
  
      resources :users do
        resources :workouts do
          get '/search' => 'workouts#search'
          resources :exercises
        end
      end
    end
  end
  
end
