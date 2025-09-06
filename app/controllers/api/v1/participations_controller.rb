class Api::V1::ParticipationsController < ApplicationController
  before_action :set_participation, only: %i[show destroy]
  
  def index
    participations = current_user.participations.includes(:challenge, :user)
    # Exclude participations where the record was destroyed (forfeited)
    participations = participations.select { |p| !p.destroyed? }
    # For each challenge, pick the latest participation (by joined_at or created_at)
    latest_participations = participations.group_by(&:challenge_id).map do |_, parts|
      parts.max_by { |p| p.joined_at || p.created_at }
    end
    render json: latest_participations, include: :challenge
  end

  def show
    render json: @participation.as_json(except: %i[status created_at joined_at updated_at times_completed], include: :challenge)
  end

  def create
    challenge = Challenge.find_by(id: params[:participation][:challenge_id])
    participation_attrs = participation_params.to_h
    participation_attrs['user_id'] = current_user.id

    if challenge&.challengeable_type == 'IndividualConfig'
      participation_attrs.delete('group_config_id')
    else
      # Always create a new group for every join
      group = GroupConfig.create!
      participation_attrs['group_config_id'] = group.id
    end

    if challenge&.challengeable_type == 'IndividualConfig'
      last_participation = Participation.where(user_id: participation_attrs['user_id'], challenge_id: participation_attrs['challenge_id']).order(joined_at: :desc).first
      if last_participation && last_participation.progress < 100
        render json: { error: 'You must complete or forfeit your current participation before joining again.' }, status: :unprocessable_entity
        return
      end
      # allow new participation if previous is complete
    else
      if Participation.exists?(user_id: participation_attrs['user_id'], challenge_id: participation_attrs['challenge_id'], group_config_id: participation_attrs['group_config_id'])
        render json: { error: 'User is already a participant of this challenge and group.' }, status: :unprocessable_entity
        return
      end
    end

    participation = Participation.new(participation_attrs)
    participation.joined_at = Time.current
    participation.progress = 0
    if participation.save
      render json: participation, status: :created
    else
      render json: { error: participation.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def destroy
    @participation.destroy
    head :no_content
  end

  private

  def set_participation
    @participation = Participation.find(params[:id])
  end

  def participation_params
    params.require(:participation).permit(:user_id, :challenge_id, :group_config_id)
  end
end
