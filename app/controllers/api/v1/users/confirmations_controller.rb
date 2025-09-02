class Api::V1::Users::ConfirmationsController < Devise::ConfirmationsController
  respond_to :json

  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
    yield resource if block_given?

    if resource.errors.empty?
      render json: {
        status: {
          code: 200,
          message: 'Your email has been successfully confirmed. You can now log in.'
        }
      }, status: :ok
    else
      render json: {
        status: {
          code: 422,
          message: 'Email confirmation failed.',
          errors: resource.errors.full_messages
        }
      }, status: :unprocessable_entity
    end
  end

  def create
    self.resource = resource_class.send_confirmation_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      render json: {
        status: {
          code: 200,
          message: 'Confirmation email has been sent.'
        }
      }, status: :ok
    else
      render json: {
        status: {
          code: 422,
          message: 'Could not send confirmation email.',
          errors: resource.errors.full_messages
        }
      }, status: :unprocessable_entity
    end
  end

  private

  def resource_params
    params.require(:user).permit(:email)
  end
end