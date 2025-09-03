class Api::V1::LeaderboardsController < ApplicationController
  before_action :set_challenge, only: [:show]

  def show
    if @challenge.challengeable_type == 'GroupConfig'
      group_participations = @challenge.participations.where.not(group_config_id: nil).group_by(&:group_config_id)
      group_participations.each do |group_id, parts|
        if all_members_have_completed?(parts)
          min_times_completed = parts.map(&:times_completed).min
          if should_increment_times_completed?(min_times_completed, parts)
            Participation.where(id: parts.map(&:id)).update_all("times_completed = times_completed + 1")
          end
        end
      end
    end
    render json: { leaderboard: @challenge.leaderboard }
  end

  private

  def set_challenge
    @challenge = Challenge.find(params[:challenge_id])
  end

  def all_members_have_completed?(parts)
    parts.all? { |p| p.progress >= 100 }
  end

  def should_increment_times_completed?(min_times_completed, parts)
    min_times_completed < (parts.first.progress / 100)
  end
end
