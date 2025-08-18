class ApplicationController < ActionController::API
  before_action :authenticate_user!, except: [:create]
  before_action :configure_permitted_parameters, if: :devise_controller?
  respond_to :json

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
    devise_parameter_sanitizer.permit(:account_update, keys: [
      :first_name, :last_name, :age, :sex, :weight, :height, :daily_calorie_intake, :daily_calories_burned,
      :workout_duration, :target_weight
    ])
  end
end