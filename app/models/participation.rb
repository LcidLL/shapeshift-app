class Participation < ApplicationRecord
  belongs_to :user
  belongs_to :challenge
  belongs_to :group_config, optional: true


  def progress
    return 0 unless joined_at && challenge&.duration && challenge&.duration_type
    elapsed = (Time.current - joined_at).to_f
    total_duration = duration_in_seconds
    percent = elapsed / total_duration
    [(percent * 100).round, 100].min
  end

  def as_json(options = {})
    data = super(options)
    data.delete('progress')
    data.merge(
      progress: progress,
      challenge_name: challenge&.name,
      user_name: user&.name
    )
  end

  private

  def duration_in_seconds
    case challenge.duration_type
    when 'seconds'
      challenge.duration
    when 'minutes'
      challenge.duration * 60
    when 'hours'
      challenge.duration * 3600
    else
      challenge.duration * 60
    end
  end
end