class Api::V1::ParticipationsController < ApplicationController
  before_action :set_participation, only: %i[show destroy]

  def index
    participations = Participation.includes(:challenge, :user).all
    grouped = participations.group_by { |p| [p.challenge_id, p.group_config_id] }
    render json: grouped.map { |(challenge_id, group_config_id), parts|
      challenge_type = parts.first.challenge&.challengeable_type
      base = {
        challenge_id: challenge_id,
        group_config_id: group_config_id,
        challenge_type: challenge_type,
        progress: parts.first.progress
      }
      if challenge_type == 'IndividualConfig'
        base.merge!(user: { id: parts.first.user_id, name: parts.first.user&.name })
      else
        base.merge!(members: parts.map { |part| { id: part.user_id, name: part.user&.name } })
      end
      base
    }
  end

  def show
    render json: @participation.as_json(except: %i[status created_at joined_at updated_at times_completed], include: :challenge)
  end

  def create
    challenge = Challenge.find_by(id: params[:participation][:challenge_id])
    participation_attrs = participation_params.to_h

    if challenge&.challengeable_type == 'IndividualConfig'
      participation_attrs.delete('group_config_id')
    else
      if participation_attrs.key?('group_config_id') && participation_attrs['group_config_id'].blank?
        participation_attrs['group_config_id'] = nil
      end
      if participation_attrs['group_config_id'].nil?
        group = GroupConfig.create!
        participation_attrs['group_config_id'] = group.id
      end
    end

    if challenge&.challengeable_type == 'IndividualConfig'
      existing = Participation.where(user_id: participation_attrs['user_id'], challenge_id: participation_attrs['challenge_id']).order(created_at: :desc).first
      if existing && existing.progress < 100
        render json: { error: 'User is already participating in this individual challenge and has not completed it yet.' }, status: :unprocessable_entity
        return
      end
    else
      if Participation.exists?(user_id: participation_attrs['user_id'], challenge_id: participation_attrs['challenge_id'], group_config_id: participation_attrs['group_config_id'])
        render json: { error: 'User is already a participant of this challenge and group.' }, status: :unprocessable_entity
        return
      end
    end

    participation = Participation.new(participation_attrs)
    participation.joined_at = Time.current
    if participation.save
      render json: participation, status: :created
    else
      render json: participation.errors, status: :unprocessable_entity
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
