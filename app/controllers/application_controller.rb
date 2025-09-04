class ApplicationController < ActionController::API
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  respond_to :json
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :debug_headers

  protected
  def authenticate_user!
    warden.authenticate!(scope: :user)
  end

  def current_user
    warden.user(scope: :user)
  end

  def user_signed_in?
    warden.authenticated?(scope: :user)
  end

  def warden
    request.env['warden']
  end

  def current_user
    User.find_by(email: 'admin@example.com')
  end

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
    devise_parameter_sanitizer.permit(:account_update, keys: [
      :first_name, :last_name, :age, :sex, :weight, :height,
      :daily_calorie_intake, :daily_calories_burned, 
      :workout_duration, :target_weight
    ])
  end

  def record_not_found
    render json: {errors: "Sorry, we couldn't find what you were looking for."}, status: :not_found
  end 

  # Checks if header is being sent to backend
  def debug_headers
    Rails.logger.info "AUTH HEADER: #{request.headers['Authorization']}"
  end
end