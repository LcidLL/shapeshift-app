class DailyWorkoutReminderJob < ApplicationJob
  queue_as :default

  def perform(name = "world")
    Rails.logger.info "👋 Hello, #{name}! TestJob is running in Sidekiq at #{Time.current}"
  #   User.find_each do |user|
  #     missed_plans = user.workout_plans.select do |plan|
  #       !user.workouts
  #         .where(workout_plan_id: plan.id)
  #         .where("DATE(performed_time) = ?", Date.today)
  #         .exists?
  #     end

  #     if missed_plans.any?
  #       UserMailer.daily_workout_summary(user, missed_plans).deliver_later
  #     end
  #   end
  end
end