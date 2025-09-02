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
      
      if user.jti.blank?
        user.update_column(:jti, SecureRandom.uuid)
      end
      
      payload = {
        sub: user.id.to_s,
        jti: user.jti,
        scp: 'user',
        aud: nil,
        iat: Time.current.to_i,
        exp: (Time.current + 1.day).to_i
      }
      
      token = JWT.encode(payload, Rails.application.secret_key_base, 'HS256')
      
      response.set_header('Authorization', "Bearer #{token}")
      
      render json: {
        status: {
          code: 200,
          message: 'Logged in successfully.'
        },
        data: {
          user: UserSerializer.new(user).serializable_hash[:data][:attributes],
          token: token
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
    auth_header = request.headers['Authorization']
    if auth_header&.start_with?('Bearer ')
      token = auth_header[7..-1]
      
      begin
        decoded_token = JWT.decode(token, Rails.application.secret_key_base, true, { algorithm: 'HS256' })
        payload = decoded_token[0]
        
        jti = payload['jti']
        exp = Time.at(payload['exp'])
        
        JwtDenylist.create!(jti: jti, exp: exp)
        
      rescue JWT::DecodeError => e
        Rails.logger.error "JWT decode error during logout: #{e.message}"
      end
    end
    
    render json: {
      status: {
        code: 200,
        message: 'Logged out successfully'
      }
    }, status: :ok
  end
end