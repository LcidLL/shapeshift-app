class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]

  # GET /api/v1/profile
  def show
    render json: {
      status: {code: 200, message: 'Profile retrieved successfully.'},
      data: {user: UserSerializer.new(current_user).serializable_hash[:data][:attributes]}
    }
  end

  # PATCH /api/v1/profile
  def update_profile
    if current_user.update(profile_params)
      render json: {
        status: {code: 200, message: 'Profile updated successfully.'},
        data: {user: UserSerializer.new(current_user).serializable_hash[:data][:attributes]}
      }
    else
      render json: {
        status: {code: 422, message: 'Profile could not be updated.', errors: current_user.errors.full_messages}
      }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/daily_weight
  def log_daily_weight
    if current_user.update(weight: params[:weight])
      render json: {
        status: {code: 200, message: 'Weight logged successfully.'},
        data: {current_weight: current_user.weight, logged_at: Time.current}
      }
    else
      render json: {
        status: {code: 422, message: 'Weight could not be logged.', errors: current_user.errors.full_messages}
      }, status: :unprocessable_entity
    end
  end

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

  def profile_params
    params.require(:user).permit(
      :first_name, :last_name, :age, :sex, :weight, :height,
      :daily_calorie_intake, :daily_calories_burned, 
      :workout_duration, :target_weight
    )
  end
end