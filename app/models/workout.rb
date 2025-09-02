class Workout < ApplicationRecord
  belongs_to :user
  has_many :exercises, dependent: :destroy

  validates :workout_type, presence: true
  validates :workout_date, presence: true
  validates :duration, presence: true
  validates :calories_burned, presence: true

  def exercises_count
    exercises.count
  end

  def self.summary_by_period(period)
    workout_period = 
      case period
        when :day
          "workout_date"
        when :week
          "DATE_TRUNC('week', workout_date)"
        when :month
          "DATE_TRUNC('month', workout_date)"
        else
          raise ArgumentError, "Invalid period: #{period}"
      end

    records = group(workout_period)
              .select(
                "#{workout_period} AS period_start",
                "SUM(calories_burned) AS total_calories",
                "SUM(duration) AS total_duration",
                "COUNT(*) AS workouts_count"
              )
              .order("period_start")

    records.map do |r|
      workouts = r.workouts_count.to_i
      total_calories = r.total_calories.to_f
      total_duration = r.total_duration.to_f
      start_date = r.period_start.to_date
      end_date = 
        case period
          when :week then start_date + 6.days
          when :month then start_date.end_of_month
          else start_date
        end

      formatted_label =  
        case period
          when :day
            start_date.strftime("%b %d, %Y") # "Aug 29, 2025"
          when :week
            "#{start_date.strftime("%b %d")} – #{end_date.strftime("%b %d, %Y")}"
          when :month
            start_date.strftime("%b %Y")     # "Aug 2025"
        end

      {
        periodStart: start_date.to_s,
        endDate: end_date.to_s,
        workoutPeriod: formatted_label,
        totalCalories: total_calories.round(2),
        totalDuration: total_duration.round(2),
        workoutsCount: workouts,
        averageCalories: workouts > 0 ? (total_calories / workouts).round(2) : 0.0,
        averageDuration: workouts > 0 ? (total_duration / workouts).round(2) : 0.0
      }
    end
  end
end
