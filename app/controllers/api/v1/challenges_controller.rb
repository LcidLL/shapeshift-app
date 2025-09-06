class Api::V1::ChallengesController < ApplicationController
  before_action :require_admin, only: %i[update]
  before_action :set_challenge, only: %i[show update destroy leaderboard]

  def leaderboard
    render json: @challenge.leaderboard
  end

  def index
    challenges = Challenge.all
    render json: challenges, except: %i[created_at updated_at group_started_at challengeable_id duration_minutes]
  end

  def show
    render json: @challenge, include: :users, except: %i[created_at updated_at group_started_at challengeable_id]
  end

  def create
    challenge_attrs = challenge_params.to_h
    challengeable_type = challenge_attrs['challengeable_type']

    unless challengeable_type.present?
      render json: { error: 'challengeable_type is required' }, status: :unprocessable_entity
      return
    end

    if challengeable_type == 'GroupConfig'
      group_config = GroupConfig.create!
      challenge_attrs['challengeable_id'] = group_config.id
      challenge_attrs['challengeable_type'] = 'GroupConfig'
    end

    challenge = Challenge.new(challenge_attrs)
    if challenge.save
      render json: challenge, status: :created
    else
      render json: challenge.errors, status: :unprocessable_entity
    end
  end

  def update
    if @challenge.update(challenge_params)
      render json: @challenge, status: :ok
    else
      render json: @challenge.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @challenge.destroy
    head :no_content
  end

  private

  def set_challenge
    @challenge = Challenge.find(params[:id])
  end

  def require_admin
    render json: { error: 'Forbidden: Admins only.' }, status: :forbidden unless current_user&.admin?
  end

  def challenge_params
    params.require(:challenge).permit(:name, :description, :duration, :duration_type, :value, :unit, :challengeable_type, :challengeable_id)
  end
end
