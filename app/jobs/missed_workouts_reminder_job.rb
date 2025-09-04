class MissedWorkoutsReminderJob
  include Sidekiq::Worker

  def perform
    User.find_each do |user|
      missed_plans_ids = user.plans
          .joins(:daily_plans)
          .merge(DailyPlan.where(isAdded: false).where("workout_date <= ?", Date.today)).pluck("daily_plans.id")

      if missed_plans_ids.any?
        UserMailer.reminder_missed(user, missed_plans_ids).deliver_later
      end
    end
  end
end