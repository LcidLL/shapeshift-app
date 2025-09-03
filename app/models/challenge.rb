class Challenge < ApplicationRecord
  belongs_to :challengeable, polymorphic: true, optional: true
  has_many :participations, dependent: :destroy
  has_many :invitations, dependent: :destroy
  has_many :users, through: :participations

  def leaderboard
    group_challenge? ? group_leaderboard : individual_leaderboard
  end

  def group_progress
    return nil unless group_challenge?
    group_users = challengeable.users
    return 0 if group_users.empty?
    participations_by_user = participations.index_by(&:user_id)
    progresses = group_users.map { |user| participations_by_user[user.id]&.progress || 0 }
    progresses.min == 100 ? 100 : progresses.min
  end

  private

  def group_challenge?
    challengeable_type == 'GroupConfig'
  end
  def group_leaderboard
    participations
      .where.not(group_config_id: nil)
      .group_by(&:group_config_id)
      .map do |group_id, parts|
        group = GroupConfig.find_by(id: group_id)
        build_group_leaderboard_entry(group, parts)
      end
      .compact
      .sort_by { |g| -g[:times_completed] }
  end

  def build_group_leaderboard_entry(group, parts)
    return unless group
    group_users = parts.map(&:user).compact
    participations_by_user = parts.index_by(&:user_id)
    times_completed = group_times_completed(group_users, participations_by_user)
    {
      group_id: group.id,
      group_name: group.try(:name) || "Group ##{group.id}",
      times_completed: times_completed,
      members: group_users.map { |user| group_member_progress(user, participations_by_user) }
    }
  end

  def group_times_completed(group_users, participations_by_user)
    times_completed_arr = group_users.map { |user| participations_by_user[user.id]&.times_completed.to_i rescue 0 }
    return 0 if times_completed_arr.empty?
    times_completed_arr.min
  end

  def group_member_progress(user, participations_by_user)
    p = participations_by_user[user.id]
    {
      user_id: user.id,
      user_name: user.name,
      times_completed: p&.times_completed.to_i
    }
  end

  def individual_leaderboard
    participations
      .group_by(&:user_id)
      .map do |user_id, parts|
        user = User.find_by(id: user_id)
        {
          user_id: user_id,
          name: user&.name,
          times_completed: parts.count { |p| p.progress == 100 }
        }
      end
      .sort_by { |h| -h[:times_completed] }
  end
end