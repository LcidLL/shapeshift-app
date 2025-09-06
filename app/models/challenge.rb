class Challenge < ApplicationRecord
  belongs_to :challengeable, polymorphic: true, optional: true
  has_many :participations, dependent: :destroy
  has_many :invitations, dependent: :destroy
  has_many :users, through: :participations

  def leaderboard
    Rails.logger.debug "[LEADERBOARD] challengeable_type: #{challengeable_type}, group_challenge?: #{group_challenge?}"
    result = group_challenge? ? group_leaderboard : individual_leaderboard
    Rails.logger.debug "[LEADERBOARD] leaderboard result: #{result.inspect}"
    result
  end

  def group_challenge?
    Rails.logger.debug "[GROUP_CHALLENGE?] challengeable_type: #{challengeable_type}"
    challengeable_type == 'GroupConfig'
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
    leaderboard = participations
      .where.not(group_config_id: nil)
      .group_by(&:group_config_id)
      .map do |group_id, parts|
        group = GroupConfig.find_by(id: group_id)
        entry = build_group_leaderboard_entry(group, parts)
        Rails.logger.debug "[LEADERBOARD] Group ID: #{group_id}, Entry: #{entry.inspect}"
        entry
      end
      .compact
      .sort_by { |g| -g[:times_completed] }
    Rails.logger.debug "[LEADERBOARD] Final Group Leaderboard: #{leaderboard.inspect}"
    leaderboard
  end

  def build_group_leaderboard_entry(group, parts)
    return unless group
    group_users = parts.map(&:user).compact
    participations_by_user = parts.index_by(&:user_id)
    # Calculate times_completed for each participation as the number of times this user completed the challenge in this group
    times_completed_arr = parts.map do |p|
      Participation.where(user_id: p.user_id, challenge_id: p.challenge_id, group_config_id: p.group_config_id)
        .select { |pp| pp.progress == 100 }.count
    end
    times_completed = times_completed_arr.empty? ? 0 : times_completed_arr.min
    # Use group_config_id from the participations for group_name
    group_config_id = parts.first.group_config_id
    group_name = "Group ##{group_config_id}"
    members = group_users.map { |u| u.first_name.to_s }
    entry = {
      group_id: group_config_id,
      group_name: group_name,
      times_completed: times_completed,
      members: members
    }
    Rails.logger.debug "[LEADERBOARD_ENTRY] Built: #{entry.inspect}"
    entry
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
          user_name: user&.first_name,
          times_completed: parts.count { |p| p.progress == 100 }
        }
      end
      .sort_by { |h| -h[:times_completed] }
  end
end