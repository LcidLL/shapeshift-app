class UserSerializer
  include JSONAPI::Serializer

  attributes :id, :email, :first_name, :last_name, :age, :sex, :weight, :height,
             :daily_calorie_intake, :daily_calories_burned, :workout_duration, 
             :target_weight, :created_at

  attribute :confirmed do |user|
    user.confirmed?
  end

  attribute :full_name do |user|
    "#{user.first_name} #{user.last_name}".strip
  end
end