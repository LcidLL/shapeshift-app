class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]
  skip_before_action :authenticate_user!, only: [:create, :new]

  protected

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: { 
          code: 200, 
          message: 'Signed up successfully. Please check your email for confirmation.' 
        },
        data: {
          user: UserSerializer.new(resource).serializable_hash[:data][:attributes]
        }
      }
    else
      render json: {
        status: { 
          code: 422,
          message: "User couldn't be created successfully.",
          errors: resource.errors.full_messages
        }
      }, status: :unprocessable_entity
    end
  end

  private

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [
      :first_name, :last_name, :age, :sex, :weight, :height,
      :daily_calorie_intake, :daily_calories_burned, 
      :workout_duration, :target_weight
    ])
  end

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name)
  end
end