# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_08_29_054159) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "daily_plans", force: :cascade do |t|
    t.string "workout_name"
    t.string "day_of_week"
    t.date "workout_date"
    t.bigint "plan_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "isAdded", default: false
    t.index ["plan_id"], name: "index_daily_plans_on_plan_id"
  end

  create_table "exercise_dbs", force: :cascade do |t|
    t.string "exercise_name"
    t.string "exercise_id"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "exercise_plans", force: :cascade do |t|
    t.string "exercise_name"
    t.string "exercise_id"
    t.integer "sets"
    t.string "reps"
    t.float "weight"
    t.string "intensity"
    t.float "distance"
    t.float "duration"
    t.bigint "daily_plan_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "isAdded", default: false
    t.index ["daily_plan_id"], name: "index_exercise_plans_on_daily_plan_id"
  end

  create_table "exercises", force: :cascade do |t|
    t.string "exercise_name"
    t.string "exercise_id"
    t.integer "sets"
    t.integer "reps"
    t.float "weight"
    t.string "intensity", default: "N/A"
    t.float "distance"
    t.float "duration"
    t.bigint "workout_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["workout_id"], name: "index_exercises_on_workout_id"
  end

  create_table "jwt_denylists", force: :cascade do |t|
    t.string "jti"
    t.datetime "exp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylists_on_jti"
  end

  create_table "plans", force: :cascade do |t|
    t.string "plan_name"
    t.text "description"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_plans_on_user_id"
  end

  create_table "reminders", force: :cascade do |t|
    t.datetime "remind_at"
    t.bigint "daily_plan_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title"
    t.index ["daily_plan_id"], name: "index_reminders_on_daily_plan_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "age"
    t.string "sex"
    t.float "weight"
    t.float "height"
    t.integer "daily_calorie_intake"
    t.integer "daily_calories_burned"
    t.integer "workout_duration"
    t.float "target_weight"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "workouts", force: :cascade do |t|
    t.string "workout_type"
    t.date "workout_date"
    t.float "duration"
    t.float "calories_burned"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_workouts_on_user_id"
  end

  add_foreign_key "daily_plans", "plans"
  add_foreign_key "exercise_plans", "daily_plans"
  add_foreign_key "exercises", "workouts"
  add_foreign_key "plans", "users"
  add_foreign_key "reminders", "daily_plans"
  add_foreign_key "workouts", "users"
end
