class Api::V1::Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    user = User.find_by(email: params[:user][:email])
    
    if user && user.valid_password?(params[:user][:password])
      unless user.confirmed?
        return render json: {
          status: {
            code: 401,
            message: 'You have to confirm your email address before continuing.'
          }
        }, status: :unauthorized
      end
      
      token = request.env['warden-jwt_auth.token']
      
      response.set_header('Authorization', "Bearer #{token}")
      
      render json: {
        status: {
          code: 200,
          message: 'Logged in successfully.'
        },
        data: {
          user: UserSerializer.new(user).serializable_hash[:data][:attributes]
        }
      }, status: :ok
    else
      render json: {
        status: {
          code: 401,
          message: 'Invalid email or password.'
        }
      }, status: :unauthorized
    end
  end

  def destroy
    render json: {
      status: {
        code: 200,
        message: 'Logged out successfully'
      }
    }, status: :ok
  end
end