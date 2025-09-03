class Api::V1::GroupsController < ApplicationController
  before_action :set_group, only: [:rechallenge]

  def index
    groups = GroupConfig.all
    render json: groups.map { |g| { group_config_id: g.id, group_name: (g.respond_to?(:name) && g.name.present?) ? g.name : "Group ##{g.id}" } }
  end

  def rechallenge
    participations = Participation.where(group_config_id: params[:group_id], challenge_id: params[:challenge_id])
    if participations.all? { |p| p.progress >= 100 }
      participations.update_all("times_completed = times_completed + 1")
    end
    participations.update_all(progress: 0, joined_at: Time.current)
    render json: { message: 'Group rechallenged. Progress and joined_at reset to zero/current for all members.' }, status: :ok
  end

  private

  def set_group
    @group = GroupConfig.find_by(id: params[:group_id])
  end
end
