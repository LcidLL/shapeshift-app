class TodaysWorkoutReminderJob
  include Sidekiq::Worker

  def perform
    User.find_each do |user|
      todays_plans_ids = user.plans
          .joins(:daily_plans)
          .merge(DailyPlan.where(workout_date: Date.today)).pluck("daily_plans.id")

      if todays_plans_ids.any?
        UserMailer.reminder_today(user, todays_plans_ids).deliver_later
      end
    end
  end
end