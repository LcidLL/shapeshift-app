class Api::V1::InvitationsController < ApplicationController
  before_action :set_invitation, only: %i[show destroy accept reject]

  def index
    invitations = Invitation.all
    render json: invitations, except: %i[created_at updated_at]
  end

  def show
    render json: @invitation.as_json(except: %i[created_at updated_at], include: { challenge: { except: %i[created_at updated_at challengeable_id group_started_at] } })
  end

  def create
    user_id = invitation_params[:user_id]
    challenge_id = invitation_params[:challenge_id]

    if Participation.exists?(user_id: user_id, challenge_id: challenge_id)
      render json: { error: 'User is already a participant of this challenge.' }, status: :unprocessable_entity
      return
    end

    if Invitation.exists?(user_id: user_id, challenge_id: challenge_id, status: 'accepted')
      render json: { error: 'User has already accepted an invitation to this challenge.' }, status: :unprocessable_entity
      return
    end

    invitation = Invitation.new(invitation_params)
    if invitation.save
      render json: invitation, status: :created
    else
      render json: invitation.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @invitation.destroy
    head :no_content
  end

  def accept
    if @invitation.update(status: 'accepted')
      Participation.create(user_id: @invitation.user_id, challenge_id: @invitation.challenge_id)
      render json: @invitation, status: :ok
    else
      render json: @invitation.errors, status: :unprocessable_entity
    end
  end

  def reject
    if @invitation.update(status: 'rejected')
      render json: @invitation, status: :ok
    else
      render json: @invitation.errors, status: :unprocessable_entity
    end
  end

  private

  def set_invitation
    @invitation = Invitation.find(params[:id])
  end

  def invitation_params
    params.require(:invitation).permit(:user_id, :challenge_id)
  end
end
