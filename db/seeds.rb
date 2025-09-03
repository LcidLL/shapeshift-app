# # This file should ensure the existence of records required to run the application in every environment (production,
# # development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# #
# # Example:
# #
# #   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
# #     MovieGenre.find_or_create_by!(name: genre_name)
# #   end

# ExerciseDb.create!([
#   {
#     "exercise_id": "3_4_Sit-Up",
#     "exercise_name": "3/4 Sit-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "90_90_Hamstring",
#     "exercise_name": "90/90 Hamstring",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Ab_Crunch_Machine",
#     "exercise_name": "Ab Crunch Machine",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Ab_Roller",
#     "exercise_name": "Ab Roller",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Adductor",
#     "exercise_name": "Adductor",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Adductor_Groin",
#     "exercise_name": "Adductor/Groin",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Advanced_Kettlebell_Windmill",
#     "exercise_name": "Advanced Kettlebell Windmill",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Air_Bike",
#     "exercise_name": "Air Bike",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "All_Fours_Quad_Stretch",
#     "exercise_name": "All Fours Quad Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Alternate_Hammer_Curl",
#     "exercise_name": "Alternate Hammer Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Alternate_Heel_Touchers",
#     "exercise_name": "Alternate Heel Touchers",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Alternate_Incline_Dumbbell_Curl",
#     "exercise_name": "Alternate Incline Dumbbell Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Alternate_Leg_Diagonal_Bound",
#     "exercise_name": "Alternate Leg Diagonal Bound",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Alternating_Cable_Shoulder_Press",
#     "exercise_name": "Alternating Cable Shoulder Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Alternating_Deltoid_Raise",
#     "exercise_name": "Alternating Deltoid Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Alternating_Floor_Press",
#     "exercise_name": "Alternating Floor Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Alternating_Hang_Clean",
#     "exercise_name": "Alternating Hang Clean",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Alternating_Kettlebell_Press",
#     "exercise_name": "Alternating Kettlebell Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Alternating_Kettlebell_Row",
#     "exercise_name": "Alternating Kettlebell Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Alternating_Renegade_Row",
#     "exercise_name": "Alternating Renegade Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Ankle_Circles",
#     "exercise_name": "Ankle Circles",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Ankle_On_The_Knee",
#     "exercise_name": "Ankle On The Knee",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Anterior_Tibialis-SMR",
#     "exercise_name": "Anterior Tibialis-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Anti-Gravity_Press",
#     "exercise_name": "Anti-Gravity Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Arm_Circles",
#     "exercise_name": "Arm Circles",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Arnold_Dumbbell_Press",
#     "exercise_name": "Arnold Dumbbell Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Around_The_Worlds",
#     "exercise_name": "Around The Worlds",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Atlas_Stone_Trainer",
#     "exercise_name": "Atlas Stone Trainer",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Atlas_Stones",
#     "exercise_name": "Atlas Stones",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Axle_Deadlift",
#     "exercise_name": "Axle Deadlift",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Back_Flyes_-_With_Bands",
#     "exercise_name": "Back Flyes - With Bands",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Backward_Drag",
#     "exercise_name": "Backward Drag",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Backward_Medicine_Ball_Throw",
#     "exercise_name": "Backward Medicine Ball Throw",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Balance_Board",
#     "exercise_name": "Balance Board",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Ball_Leg_Curl",
#     "exercise_name": "Ball Leg Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Band_Assisted_Pull-Up",
#     "exercise_name": "Band Assisted Pull-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Band_Good_Morning",
#     "exercise_name": "Band Good Morning",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Band_Good_Morning_Pull_Through",
#     "exercise_name": "Band Good Morning (Pull Through)",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Band_Hip_Adductions",
#     "exercise_name": "Band Hip Adductions",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Band_Pull_Apart",
#     "exercise_name": "Band Pull Apart",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Band_Skull_Crusher",
#     "exercise_name": "Band Skull Crusher",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Ab_Rollout",
#     "exercise_name": "Barbell Ab Rollout",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Ab_Rollout_-_On_Knees",
#     "exercise_name": "Barbell Ab Rollout - On Knees",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Bench_Press_-_Medium_Grip",
#     "exercise_name": "Barbell Bench Press - Medium Grip",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Curl",
#     "exercise_name": "Barbell Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Curls_Lying_Against_An_Incline",
#     "exercise_name": "Barbell Curls Lying Against An Incline",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Deadlift",
#     "exercise_name": "Barbell Deadlift",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Full_Squat",
#     "exercise_name": "Barbell Full Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Glute_Bridge",
#     "exercise_name": "Barbell Glute Bridge",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Barbell_Guillotine_Bench_Press",
#     "exercise_name": "Barbell Guillotine Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Hack_Squat",
#     "exercise_name": "Barbell Hack Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Hip_Thrust",
#     "exercise_name": "Barbell Hip Thrust",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Barbell_Incline_Bench_Press_-_Medium_Grip",
#     "exercise_name": "Barbell Incline Bench Press - Medium Grip",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Incline_Shoulder_Raise",
#     "exercise_name": "Barbell Incline Shoulder Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Lunge",
#     "exercise_name": "Barbell Lunge",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Rear_Delt_Row",
#     "exercise_name": "Barbell Rear Delt Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Rollout_from_Bench",
#     "exercise_name": "Barbell Rollout from Bench",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Seated_Calf_Raise",
#     "exercise_name": "Barbell Seated Calf Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Shoulder_Press",
#     "exercise_name": "Barbell Shoulder Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Shrug",
#     "exercise_name": "Barbell Shrug",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Shrug_Behind_The_Back",
#     "exercise_name": "Barbell Shrug Behind The Back",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Side_Bend",
#     "exercise_name": "Barbell Side Bend",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Side_Split_Squat",
#     "exercise_name": "Barbell Side Split Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Squat",
#     "exercise_name": "Barbell Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Squat_To_A_Bench",
#     "exercise_name": "Barbell Squat To A Bench",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Step_Ups",
#     "exercise_name": "Barbell Step Ups",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Barbell_Walking_Lunge",
#     "exercise_name": "Barbell Walking Lunge",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Battling_Ropes",
#     "exercise_name": "Battling Ropes",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bear_Crawl_Sled_Drags",
#     "exercise_name": "Bear Crawl Sled Drags",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Behind_Head_Chest_Stretch",
#     "exercise_name": "Behind Head Chest Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Bench_Dips",
#     "exercise_name": "Bench Dips",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bench_Jump",
#     "exercise_name": "Bench Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Bench_Press_-_Powerlifting",
#     "exercise_name": "Bench Press - Powerlifting",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Bench_Press_-_With_Bands",
#     "exercise_name": "Bench Press - With Bands",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bench_Press_with_Chains",
#     "exercise_name": "Bench Press with Chains",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Bench_Sprint",
#     "exercise_name": "Bench Sprint",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Bent-Arm_Barbell_Pullover",
#     "exercise_name": "Bent-Arm Barbell Pullover",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bent-Arm_Dumbbell_Pullover",
#     "exercise_name": "Bent-Arm Dumbbell Pullover",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bent-Knee_Hip_Raise",
#     "exercise_name": "Bent-Knee Hip Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bent_Over_Barbell_Row",
#     "exercise_name": "Bent Over Barbell Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bent_Over_Dumbbell_Rear_Delt_Raise_With_Head_On_Bench",
#     "exercise_name": "Bent Over Dumbbell Rear Delt Raise With Head On Bench",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bent_Over_Low-Pulley_Side_Lateral",
#     "exercise_name": "Bent Over Low-Pulley Side Lateral",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bent_Over_One-Arm_Long_Bar_Row",
#     "exercise_name": "Bent Over One-Arm Long Bar Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bent_Over_Two-Arm_Long_Bar_Row",
#     "exercise_name": "Bent Over Two-Arm Long Bar Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bent_Over_Two-Dumbbell_Row",
#     "exercise_name": "Bent Over Two-Dumbbell Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bent_Over_Two-Dumbbell_Row_With_Palms_In",
#     "exercise_name": "Bent Over Two-Dumbbell Row With Palms In",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bent_Press",
#     "exercise_name": "Bent Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bicycling",
#     "exercise_name": "Bicycling",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Bicycling_Stationary",
#     "exercise_name": "Bicycling, Stationary",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Board_Press",
#     "exercise_name": "Board Press",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Body-Up",
#     "exercise_name": "Body-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Body_Tricep_Press",
#     "exercise_name": "Body Tricep Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bodyweight_Flyes",
#     "exercise_name": "Bodyweight Flyes",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bodyweight_Mid_Row",
#     "exercise_name": "Bodyweight Mid Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bodyweight_Squat",
#     "exercise_name": "Bodyweight Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bodyweight_Walking_Lunge",
#     "exercise_name": "Bodyweight Walking Lunge",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bosu_Ball_Cable_Crunch_With_Side_Bends",
#     "exercise_name": "Bosu Ball Cable Crunch With Side Bends",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bottoms-Up_Clean_From_The_Hang_Position",
#     "exercise_name": "Bottoms-Up Clean From The Hang Position",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Bottoms_Up",
#     "exercise_name": "Bottoms Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Box_Jump_Multiple_Response",
#     "exercise_name": "Box Jump (Multiple Response)",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Box_Skip",
#     "exercise_name": "Box Skip",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Box_Squat",
#     "exercise_name": "Box Squat",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Box_Squat_with_Bands",
#     "exercise_name": "Box Squat with Bands",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Box_Squat_with_Chains",
#     "exercise_name": "Box Squat with Chains",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Brachialis-SMR",
#     "exercise_name": "Brachialis-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Bradford_Rocky_Presses",
#     "exercise_name": "Bradford/Rocky Presses",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Butt-Ups",
#     "exercise_name": "Butt-Ups",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Butt_Lift_Bridge",
#     "exercise_name": "Butt Lift (Bridge)",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Butterfly",
#     "exercise_name": "Butterfly",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Chest_Press",
#     "exercise_name": "Cable Chest Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Crossover",
#     "exercise_name": "Cable Crossover",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Crunch",
#     "exercise_name": "Cable Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Deadlifts",
#     "exercise_name": "Cable Deadlifts",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Hammer_Curls_-_Rope_Attachment",
#     "exercise_name": "Cable Hammer Curls - Rope Attachment",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Hip_Adduction",
#     "exercise_name": "Cable Hip Adduction",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Incline_Pushdown",
#     "exercise_name": "Cable Incline Pushdown",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Incline_Triceps_Extension",
#     "exercise_name": "Cable Incline Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Internal_Rotation",
#     "exercise_name": "Cable Internal Rotation",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Iron_Cross",
#     "exercise_name": "Cable Iron Cross",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Judo_Flip",
#     "exercise_name": "Cable Judo Flip",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Lying_Triceps_Extension",
#     "exercise_name": "Cable Lying Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_One_Arm_Tricep_Extension",
#     "exercise_name": "Cable One Arm Tricep Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Preacher_Curl",
#     "exercise_name": "Cable Preacher Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Rear_Delt_Fly",
#     "exercise_name": "Cable Rear Delt Fly",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Reverse_Crunch",
#     "exercise_name": "Cable Reverse Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Rope_Overhead_Triceps_Extension",
#     "exercise_name": "Cable Rope Overhead Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Rope_Rear-Delt_Rows",
#     "exercise_name": "Cable Rope Rear-Delt Rows",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Russian_Twists",
#     "exercise_name": "Cable Russian Twists",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Seated_Crunch",
#     "exercise_name": "Cable Seated Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Seated_Lateral_Raise",
#     "exercise_name": "Cable Seated Lateral Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Shoulder_Press",
#     "exercise_name": "Cable Shoulder Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Shrugs",
#     "exercise_name": "Cable Shrugs",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cable_Wrist_Curl",
#     "exercise_name": "Cable Wrist Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Calf-Machine_Shoulder_Shrug",
#     "exercise_name": "Calf-Machine Shoulder Shrug",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Calf_Press",
#     "exercise_name": "Calf Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Calf_Press_On_The_Leg_Press_Machine",
#     "exercise_name": "Calf Press On The Leg Press Machine",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Calf_Raise_On_A_Dumbbell",
#     "exercise_name": "Calf Raise On A Dumbbell",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Calf_Raises_-_With_Bands",
#     "exercise_name": "Calf Raises - With Bands",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Calf_Stretch_Elbows_Against_Wall",
#     "exercise_name": "Calf Stretch Elbows Against Wall",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Calf_Stretch_Hands_Against_Wall",
#     "exercise_name": "Calf Stretch Hands Against Wall",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Calves-SMR",
#     "exercise_name": "Calves-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Car_Deadlift",
#     "exercise_name": "Car Deadlift",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Car_Drivers",
#     "exercise_name": "Car Drivers",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Carioca_Quick_Step",
#     "exercise_name": "Carioca Quick Step",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Cat_Stretch",
#     "exercise_name": "Cat Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Catch_and_Overhead_Throw",
#     "exercise_name": "Catch and Overhead Throw",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Chain_Handle_Extension",
#     "exercise_name": "Chain Handle Extension",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Chain_Press",
#     "exercise_name": "Chain Press",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Chair_Leg_Extended_Stretch",
#     "exercise_name": "Chair Leg Extended Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Chair_Lower_Back_Stretch",
#     "exercise_name": "Chair Lower Back Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Chair_Squat",
#     "exercise_name": "Chair Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Chair_Upper_Body_Stretch",
#     "exercise_name": "Chair Upper Body Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Chest_And_Front_Of_Shoulder_Stretch",
#     "exercise_name": "Chest And Front Of Shoulder Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Chest_Push_from_3_point_stance",
#     "exercise_name": "Chest Push from 3 point stance",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Chest_Push_multiple_response",
#     "exercise_name": "Chest Push (multiple response)",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Chest_Push_single_response",
#     "exercise_name": "Chest Push (single response)",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Chest_Push_with_Run_Release",
#     "exercise_name": "Chest Push with Run Release",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Chest_Stretch_on_Stability_Ball",
#     "exercise_name": "Chest Stretch on Stability Ball",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Childs_Pose",
#     "exercise_name": "Child's Pose",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Chin-Up",
#     "exercise_name": "Chin-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Chin_To_Chest_Stretch",
#     "exercise_name": "Chin To Chest Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Circus_Bell",
#     "exercise_name": "Circus Bell",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Clean",
#     "exercise_name": "Clean",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Clean_Deadlift",
#     "exercise_name": "Clean Deadlift",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Clean_Pull",
#     "exercise_name": "Clean Pull",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Clean_Shrug",
#     "exercise_name": "Clean Shrug",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Clean_and_Jerk",
#     "exercise_name": "Clean and Jerk",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Clean_and_Press",
#     "exercise_name": "Clean and Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Clean_from_Blocks",
#     "exercise_name": "Clean from Blocks",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Clock_Push-Up",
#     "exercise_name": "Clock Push-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Close-Grip_Barbell_Bench_Press",
#     "exercise_name": "Close-Grip Barbell Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Close-Grip_Dumbbell_Press",
#     "exercise_name": "Close-Grip Dumbbell Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Close-Grip_EZ-Bar_Curl_with_Band",
#     "exercise_name": "Close-Grip EZ-Bar Curl with Band",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Close-Grip_EZ-Bar_Press",
#     "exercise_name": "Close-Grip EZ-Bar Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Close-Grip_EZ_Bar_Curl",
#     "exercise_name": "Close-Grip EZ Bar Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Close-Grip_Front_Lat_Pulldown",
#     "exercise_name": "Close-Grip Front Lat Pulldown",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Close-Grip_Push-Up_off_of_a_Dumbbell",
#     "exercise_name": "Close-Grip Push-Up off of a Dumbbell",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Close-Grip_Standing_Barbell_Curl",
#     "exercise_name": "Close-Grip Standing Barbell Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cocoons",
#     "exercise_name": "Cocoons",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Conans_Wheel",
#     "exercise_name": "Conan's Wheel",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Concentration_Curls",
#     "exercise_name": "Concentration Curls",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cross-Body_Crunch",
#     "exercise_name": "Cross-Body Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cross_Body_Hammer_Curl",
#     "exercise_name": "Cross Body Hammer Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cross_Over_-_With_Bands",
#     "exercise_name": "Cross Over - With Bands",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Crossover_Reverse_Lunge",
#     "exercise_name": "Crossover Reverse Lunge",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Crucifix",
#     "exercise_name": "Crucifix",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Crunch_-_Hands_Overhead",
#     "exercise_name": "Crunch - Hands Overhead",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Crunch_-_Legs_On_Exercise_Ball",
#     "exercise_name": "Crunch - Legs On Exercise Ball",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Crunches",
#     "exercise_name": "Crunches",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Cuban_Press",
#     "exercise_name": "Cuban Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dancers_Stretch",
#     "exercise_name": "Dancer's Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Dead_Bug",
#     "exercise_name": "Dead Bug",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Deadlift_with_Bands",
#     "exercise_name": "Deadlift with Bands",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Deadlift_with_Chains",
#     "exercise_name": "Deadlift with Chains",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Decline_Barbell_Bench_Press",
#     "exercise_name": "Decline Barbell Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Decline_Close-Grip_Bench_To_Skull_Crusher",
#     "exercise_name": "Decline Close-Grip Bench To Skull Crusher",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Decline_Crunch",
#     "exercise_name": "Decline Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Decline_Dumbbell_Bench_Press",
#     "exercise_name": "Decline Dumbbell Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Decline_Dumbbell_Flyes",
#     "exercise_name": "Decline Dumbbell Flyes",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Decline_Dumbbell_Triceps_Extension",
#     "exercise_name": "Decline Dumbbell Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Decline_EZ_Bar_Triceps_Extension",
#     "exercise_name": "Decline EZ Bar Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Decline_Oblique_Crunch",
#     "exercise_name": "Decline Oblique Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Decline_Push-Up",
#     "exercise_name": "Decline Push-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Decline_Reverse_Crunch",
#     "exercise_name": "Decline Reverse Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Decline_Smith_Press",
#     "exercise_name": "Decline Smith Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Deficit_Deadlift",
#     "exercise_name": "Deficit Deadlift",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Depth_Jump_Leap",
#     "exercise_name": "Depth Jump Leap",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Dip_Machine",
#     "exercise_name": "Dip Machine",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dips_-_Chest_Version",
#     "exercise_name": "Dips - Chest Version",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dips_-_Triceps_Version",
#     "exercise_name": "Dips - Triceps Version",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Donkey_Calf_Raises",
#     "exercise_name": "Donkey Calf Raises",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Double_Kettlebell_Alternating_Hang_Clean",
#     "exercise_name": "Double Kettlebell Alternating Hang Clean",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Double_Kettlebell_Jerk",
#     "exercise_name": "Double Kettlebell Jerk",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Double_Kettlebell_Push_Press",
#     "exercise_name": "Double Kettlebell Push Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Double_Kettlebell_Snatch",
#     "exercise_name": "Double Kettlebell Snatch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Double_Kettlebell_Windmill",
#     "exercise_name": "Double Kettlebell Windmill",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Double_Leg_Butt_Kick",
#     "exercise_name": "Double Leg Butt Kick",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Downward_Facing_Balance",
#     "exercise_name": "Downward Facing Balance",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Drag_Curl",
#     "exercise_name": "Drag Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Drop_Push",
#     "exercise_name": "Drop Push",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Dumbbell_Alternate_Bicep_Curl",
#     "exercise_name": "Dumbbell Alternate Bicep Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Bench_Press",
#     "exercise_name": "Dumbbell Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Bench_Press_with_Neutral_Grip",
#     "exercise_name": "Dumbbell Bench Press with Neutral Grip",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Bicep_Curl",
#     "exercise_name": "Dumbbell Bicep Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Clean",
#     "exercise_name": "Dumbbell Clean",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Floor_Press",
#     "exercise_name": "Dumbbell Floor Press",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Dumbbell_Flyes",
#     "exercise_name": "Dumbbell Flyes",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Incline_Row",
#     "exercise_name": "Dumbbell Incline Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Incline_Shoulder_Raise",
#     "exercise_name": "Dumbbell Incline Shoulder Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Lunges",
#     "exercise_name": "Dumbbell Lunges",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Lying_One-Arm_Rear_Lateral_Raise",
#     "exercise_name": "Dumbbell Lying One-Arm Rear Lateral Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Lying_Pronation",
#     "exercise_name": "Dumbbell Lying Pronation",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Lying_Rear_Lateral_Raise",
#     "exercise_name": "Dumbbell Lying Rear Lateral Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Lying_Supination",
#     "exercise_name": "Dumbbell Lying Supination",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_One-Arm_Shoulder_Press",
#     "exercise_name": "Dumbbell One-Arm Shoulder Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_One-Arm_Triceps_Extension",
#     "exercise_name": "Dumbbell One-Arm Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_One-Arm_Upright_Row",
#     "exercise_name": "Dumbbell One-Arm Upright Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Prone_Incline_Curl",
#     "exercise_name": "Dumbbell Prone Incline Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Raise",
#     "exercise_name": "Dumbbell Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Rear_Lunge",
#     "exercise_name": "Dumbbell Rear Lunge",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Scaption",
#     "exercise_name": "Dumbbell Scaption",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Seated_Box_Jump",
#     "exercise_name": "Dumbbell Seated Box Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Dumbbell_Seated_One-Leg_Calf_Raise",
#     "exercise_name": "Dumbbell Seated One-Leg Calf Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Shoulder_Press",
#     "exercise_name": "Dumbbell Shoulder Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Shrug",
#     "exercise_name": "Dumbbell Shrug",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Side_Bend",
#     "exercise_name": "Dumbbell Side Bend",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Squat",
#     "exercise_name": "Dumbbell Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Squat_To_A_Bench",
#     "exercise_name": "Dumbbell Squat To A Bench",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Step_Ups",
#     "exercise_name": "Dumbbell Step Ups",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dumbbell_Tricep_Extension_-Pronated_Grip",
#     "exercise_name": "Dumbbell Tricep Extension -Pronated Grip",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Dynamic_Back_Stretch",
#     "exercise_name": "Dynamic Back Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Dynamic_Chest_Stretch",
#     "exercise_name": "Dynamic Chest Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "EZ-Bar_Curl",
#     "exercise_name": "EZ-Bar Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "EZ-Bar_Skullcrusher",
#     "exercise_name": "EZ-Bar Skullcrusher",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Elbow_Circles",
#     "exercise_name": "Elbow Circles",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Elbow_to_Knee",
#     "exercise_name": "Elbow to Knee",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Elbows_Back",
#     "exercise_name": "Elbows Back",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Elevated_Back_Lunge",
#     "exercise_name": "Elevated Back Lunge",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Elevated_Cable_Rows",
#     "exercise_name": "Elevated Cable Rows",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Elliptical_Trainer",
#     "exercise_name": "Elliptical Trainer",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Exercise_Ball_Crunch",
#     "exercise_name": "Exercise Ball Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Exercise_Ball_Pull-In",
#     "exercise_name": "Exercise Ball Pull-In",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Extended_Range_One-Arm_Kettlebell_Floor_Press",
#     "exercise_name": "Extended Range One-Arm Kettlebell Floor Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "External_Rotation",
#     "exercise_name": "External Rotation",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "External_Rotation_with_Band",
#     "exercise_name": "External Rotation with Band",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "External_Rotation_with_Cable",
#     "exercise_name": "External Rotation with Cable",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Face_Pull",
#     "exercise_name": "Face Pull",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Farmers_Walk",
#     "exercise_name": "Farmer's Walk",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Fast_Skipping",
#     "exercise_name": "Fast Skipping",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Finger_Curls",
#     "exercise_name": "Finger Curls",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Flat_Bench_Cable_Flyes",
#     "exercise_name": "Flat Bench Cable Flyes",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Flat_Bench_Leg_Pull-In",
#     "exercise_name": "Flat Bench Leg Pull-In",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Flat_Bench_Lying_Leg_Raise",
#     "exercise_name": "Flat Bench Lying Leg Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Flexor_Incline_Dumbbell_Curls",
#     "exercise_name": "Flexor Incline Dumbbell Curls",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Floor_Glute-Ham_Raise",
#     "exercise_name": "Floor Glute-Ham Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Floor_Press",
#     "exercise_name": "Floor Press",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Floor_Press_with_Chains",
#     "exercise_name": "Floor Press with Chains",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Flutter_Kicks",
#     "exercise_name": "Flutter Kicks",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Foot-SMR",
#     "exercise_name": "Foot-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Forward_Drag_with_Press",
#     "exercise_name": "Forward Drag with Press",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Frankenstein_Squat",
#     "exercise_name": "Frankenstein Squat",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Freehand_Jump_Squat",
#     "exercise_name": "Freehand Jump Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Frog_Hops",
#     "exercise_name": "Frog Hops",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Frog_Sit-Ups",
#     "exercise_name": "Frog Sit-Ups",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Front_Barbell_Squat",
#     "exercise_name": "Front Barbell Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Front_Barbell_Squat_To_A_Bench",
#     "exercise_name": "Front Barbell Squat To A Bench",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Front_Box_Jump",
#     "exercise_name": "Front Box Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Front_Cable_Raise",
#     "exercise_name": "Front Cable Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Front_Cone_Hops_or_hurdle_hops",
#     "exercise_name": "Front Cone Hops (or hurdle hops)",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Front_Dumbbell_Raise",
#     "exercise_name": "Front Dumbbell Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Front_Incline_Dumbbell_Raise",
#     "exercise_name": "Front Incline Dumbbell Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Front_Leg_Raises",
#     "exercise_name": "Front Leg Raises",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Front_Plate_Raise",
#     "exercise_name": "Front Plate Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Front_Raise_And_Pullover",
#     "exercise_name": "Front Raise And Pullover",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Front_Squat_Clean_Grip",
#     "exercise_name": "Front Squat (Clean Grip)",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Front_Squats_With_Two_Kettlebells",
#     "exercise_name": "Front Squats With Two Kettlebells",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Front_Two-Dumbbell_Raise",
#     "exercise_name": "Front Two-Dumbbell Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Full_Range-Of-Motion_Lat_Pulldown",
#     "exercise_name": "Full Range-Of-Motion Lat Pulldown",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Gironda_Sternum_Chins",
#     "exercise_name": "Gironda Sternum Chins",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Glute_Ham_Raise",
#     "exercise_name": "Glute Ham Raise",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Glute_Kickback",
#     "exercise_name": "Glute Kickback",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Goblet_Squat",
#     "exercise_name": "Goblet Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Good_Morning",
#     "exercise_name": "Good Morning",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Good_Morning_off_Pins",
#     "exercise_name": "Good Morning off Pins",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Gorilla_Chin_Crunch",
#     "exercise_name": "Gorilla Chin/Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Groin_and_Back_Stretch",
#     "exercise_name": "Groin and Back Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Groiners",
#     "exercise_name": "Groiners",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Hack_Squat",
#     "exercise_name": "Hack Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Hammer_Curls",
#     "exercise_name": "Hammer Curls",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Hammer_Grip_Incline_DB_Bench_Press",
#     "exercise_name": "Hammer Grip Incline DB Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Hamstring-SMR",
#     "exercise_name": "Hamstring-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Hamstring_Stretch",
#     "exercise_name": "Hamstring Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Handstand_Push-Ups",
#     "exercise_name": "Handstand Push-Ups",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Hang_Clean",
#     "exercise_name": "Hang Clean",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Hang_Clean_-_Below_the_Knees",
#     "exercise_name": "Hang Clean - Below the Knees",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Hang_Snatch",
#     "exercise_name": "Hang Snatch",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Hang_Snatch_-_Below_Knees",
#     "exercise_name": "Hang Snatch - Below Knees",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Hanging_Bar_Good_Morning",
#     "exercise_name": "Hanging Bar Good Morning",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Hanging_Leg_Raise",
#     "exercise_name": "Hanging Leg Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Hanging_Pike",
#     "exercise_name": "Hanging Pike",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Heaving_Snatch_Balance",
#     "exercise_name": "Heaving Snatch Balance",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Heavy_Bag_Thrust",
#     "exercise_name": "Heavy Bag Thrust",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "High_Cable_Curls",
#     "exercise_name": "High Cable Curls",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Hip_Circles_prone",
#     "exercise_name": "Hip Circles (prone)",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Hip_Extension_with_Bands",
#     "exercise_name": "Hip Extension with Bands",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Hip_Flexion_with_Band",
#     "exercise_name": "Hip Flexion with Band",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Hip_Lift_with_Band",
#     "exercise_name": "Hip Lift with Band",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Hug_A_Ball",
#     "exercise_name": "Hug A Ball",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Hug_Knees_To_Chest",
#     "exercise_name": "Hug Knees To Chest",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Hurdle_Hops",
#     "exercise_name": "Hurdle Hops",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Hyperextensions_Back_Extensions",
#     "exercise_name": "Hyperextensions (Back Extensions)",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Hyperextensions_With_No_Hyperextension_Bench",
#     "exercise_name": "Hyperextensions With No Hyperextension Bench",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "IT_Band_and_Glute_Stretch",
#     "exercise_name": "IT Band and Glute Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Iliotibial_Tract-SMR",
#     "exercise_name": "Iliotibial Tract-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Inchworm",
#     "exercise_name": "Inchworm",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Incline_Barbell_Triceps_Extension",
#     "exercise_name": "Incline Barbell Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Bench_Pull",
#     "exercise_name": "Incline Bench Pull",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Cable_Chest_Press",
#     "exercise_name": "Incline Cable Chest Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Cable_Flye",
#     "exercise_name": "Incline Cable Flye",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Dumbbell_Bench_With_Palms_Facing_In",
#     "exercise_name": "Incline Dumbbell Bench With Palms Facing In",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Dumbbell_Curl",
#     "exercise_name": "Incline Dumbbell Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Dumbbell_Flyes",
#     "exercise_name": "Incline Dumbbell Flyes",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Dumbbell_Flyes_-_With_A_Twist",
#     "exercise_name": "Incline Dumbbell Flyes - With A Twist",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Dumbbell_Press",
#     "exercise_name": "Incline Dumbbell Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Hammer_Curls",
#     "exercise_name": "Incline Hammer Curls",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Inner_Biceps_Curl",
#     "exercise_name": "Incline Inner Biceps Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Push-Up",
#     "exercise_name": "Incline Push-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Push-Up_Close-Grip",
#     "exercise_name": "Incline Push-Up Close-Grip",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Push-Up_Depth_Jump",
#     "exercise_name": "Incline Push-Up Depth Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Incline_Push-Up_Medium",
#     "exercise_name": "Incline Push-Up Medium",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Push-Up_Reverse_Grip",
#     "exercise_name": "Incline Push-Up Reverse Grip",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Incline_Push-Up_Wide",
#     "exercise_name": "Incline Push-Up Wide",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Intermediate_Groin_Stretch",
#     "exercise_name": "Intermediate Groin Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Intermediate_Hip_Flexor_and_Quad_Stretch",
#     "exercise_name": "Intermediate Hip Flexor and Quad Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Internal_Rotation_with_Band",
#     "exercise_name": "Internal Rotation with Band",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Inverted_Row",
#     "exercise_name": "Inverted Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Inverted_Row_with_Straps",
#     "exercise_name": "Inverted Row with Straps",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Iron_Cross",
#     "exercise_name": "Iron Cross",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Iron_Crosses_stretch",
#     "exercise_name": "Iron Crosses (stretch)",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Isometric_Chest_Squeezes",
#     "exercise_name": "Isometric Chest Squeezes",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Isometric_Neck_Exercise_-_Front_And_Back",
#     "exercise_name": "Isometric Neck Exercise - Front And Back",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Isometric_Neck_Exercise_-_Sides",
#     "exercise_name": "Isometric Neck Exercise - Sides",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Isometric_Wipers",
#     "exercise_name": "Isometric Wipers",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "JM_Press",
#     "exercise_name": "JM Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Jackknife_Sit-Up",
#     "exercise_name": "Jackknife Sit-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Janda_Sit-Up",
#     "exercise_name": "Janda Sit-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Jefferson_Squats",
#     "exercise_name": "Jefferson Squats",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Jerk_Balance",
#     "exercise_name": "Jerk Balance",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Jerk_Dip_Squat",
#     "exercise_name": "Jerk Dip Squat",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Jogging_Treadmill",
#     "exercise_name": "Jogging, Treadmill",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Keg_Load",
#     "exercise_name": "Keg Load",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Kettlebell_Arnold_Press",
#     "exercise_name": "Kettlebell Arnold Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Dead_Clean",
#     "exercise_name": "Kettlebell Dead Clean",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Figure_8",
#     "exercise_name": "Kettlebell Figure 8",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Hang_Clean",
#     "exercise_name": "Kettlebell Hang Clean",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_One-Legged_Deadlift",
#     "exercise_name": "Kettlebell One-Legged Deadlift",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Pass_Between_The_Legs",
#     "exercise_name": "Kettlebell Pass Between The Legs",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Pirate_Ships",
#     "exercise_name": "Kettlebell Pirate Ships",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Pistol_Squat",
#     "exercise_name": "Kettlebell Pistol Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Seated_Press",
#     "exercise_name": "Kettlebell Seated Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Seesaw_Press",
#     "exercise_name": "Kettlebell Seesaw Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Sumo_High_Pull",
#     "exercise_name": "Kettlebell Sumo High Pull",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Thruster",
#     "exercise_name": "Kettlebell Thruster",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Turkish_Get-Up_Lunge_style",
#     "exercise_name": "Kettlebell Turkish Get-Up (Lunge style)",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Turkish_Get-Up_Squat_style",
#     "exercise_name": "Kettlebell Turkish Get-Up (Squat style)",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kettlebell_Windmill",
#     "exercise_name": "Kettlebell Windmill",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kipping_Muscle_Up",
#     "exercise_name": "Kipping Muscle Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Knee_Across_The_Body",
#     "exercise_name": "Knee Across The Body",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Knee_Circles",
#     "exercise_name": "Knee Circles",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Knee_Hip_Raise_On_Parallel_Bars",
#     "exercise_name": "Knee/Hip Raise On Parallel Bars",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Knee_Tuck_Jump",
#     "exercise_name": "Knee Tuck Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Kneeling_Arm_Drill",
#     "exercise_name": "Kneeling Arm Drill",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Kneeling_Cable_Crunch_With_Alternating_Oblique_Twists",
#     "exercise_name": "Kneeling Cable Crunch With Alternating Oblique Twists",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kneeling_Cable_Triceps_Extension",
#     "exercise_name": "Kneeling Cable Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kneeling_Forearm_Stretch",
#     "exercise_name": "Kneeling Forearm Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Kneeling_High_Pulley_Row",
#     "exercise_name": "Kneeling High Pulley Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kneeling_Hip_Flexor",
#     "exercise_name": "Kneeling Hip Flexor",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Kneeling_Jump_Squat",
#     "exercise_name": "Kneeling Jump Squat",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Kneeling_Single-Arm_High_Pulley_Row",
#     "exercise_name": "Kneeling Single-Arm High Pulley Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Kneeling_Squat",
#     "exercise_name": "Kneeling Squat",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Landmine_180s",
#     "exercise_name": "Landmine 180's",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Landmine_Linear_Jammer",
#     "exercise_name": "Landmine Linear Jammer",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lateral_Bound",
#     "exercise_name": "Lateral Bound",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Lateral_Box_Jump",
#     "exercise_name": "Lateral Box Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Lateral_Cone_Hops",
#     "exercise_name": "Lateral Cone Hops",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Lateral_Raise_-_With_Bands",
#     "exercise_name": "Lateral Raise - With Bands",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Latissimus_Dorsi-SMR",
#     "exercise_name": "Latissimus Dorsi-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Leg-Over_Floor_Press",
#     "exercise_name": "Leg-Over Floor Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Leg-Up_Hamstring_Stretch",
#     "exercise_name": "Leg-Up Hamstring Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Leg_Extensions",
#     "exercise_name": "Leg Extensions",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Leg_Lift",
#     "exercise_name": "Leg Lift",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Leg_Press",
#     "exercise_name": "Leg Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Leg_Pull-In",
#     "exercise_name": "Leg Pull-In",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Leverage_Chest_Press",
#     "exercise_name": "Leverage Chest Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Leverage_Deadlift",
#     "exercise_name": "Leverage Deadlift",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Leverage_Decline_Chest_Press",
#     "exercise_name": "Leverage Decline Chest Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Leverage_High_Row",
#     "exercise_name": "Leverage High Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Leverage_Incline_Chest_Press",
#     "exercise_name": "Leverage Incline Chest Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Leverage_Iso_Row",
#     "exercise_name": "Leverage Iso Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Leverage_Shoulder_Press",
#     "exercise_name": "Leverage Shoulder Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Leverage_Shrug",
#     "exercise_name": "Leverage Shrug",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Linear_3-Part_Start_Technique",
#     "exercise_name": "Linear 3-Part Start Technique",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Linear_Acceleration_Wall_Drill",
#     "exercise_name": "Linear Acceleration Wall Drill",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Linear_Depth_Jump",
#     "exercise_name": "Linear Depth Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Log_Lift",
#     "exercise_name": "Log Lift",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "London_Bridges",
#     "exercise_name": "London Bridges",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Looking_At_Ceiling",
#     "exercise_name": "Looking At Ceiling",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Low_Cable_Crossover",
#     "exercise_name": "Low Cable Crossover",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Low_Cable_Triceps_Extension",
#     "exercise_name": "Low Cable Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Low_Pulley_Row_To_Neck",
#     "exercise_name": "Low Pulley Row To Neck",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lower_Back-SMR",
#     "exercise_name": "Lower Back-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Lower_Back_Curl",
#     "exercise_name": "Lower Back Curl",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Lunge_Pass_Through",
#     "exercise_name": "Lunge Pass Through",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lunge_Sprint",
#     "exercise_name": "Lunge Sprint",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Bent_Leg_Groin",
#     "exercise_name": "Lying Bent Leg Groin",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Lying_Cable_Curl",
#     "exercise_name": "Lying Cable Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Cambered_Barbell_Row",
#     "exercise_name": "Lying Cambered Barbell Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Close-Grip_Bar_Curl_On_High_Pulley",
#     "exercise_name": "Lying Close-Grip Bar Curl On High Pulley",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Close-Grip_Barbell_Triceps_Extension_Behind_The_Head",
#     "exercise_name": "Lying Close-Grip Barbell Triceps Extension Behind The Head",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Close-Grip_Barbell_Triceps_Press_To_Chin",
#     "exercise_name": "Lying Close-Grip Barbell Triceps Press To Chin",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Crossover",
#     "exercise_name": "Lying Crossover",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Lying_Dumbbell_Tricep_Extension",
#     "exercise_name": "Lying Dumbbell Tricep Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Face_Down_Plate_Neck_Resistance",
#     "exercise_name": "Lying Face Down Plate Neck Resistance",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Face_Up_Plate_Neck_Resistance",
#     "exercise_name": "Lying Face Up Plate Neck Resistance",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Glute",
#     "exercise_name": "Lying Glute",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Lying_Hamstring",
#     "exercise_name": "Lying Hamstring",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Lying_High_Bench_Barbell_Curl",
#     "exercise_name": "Lying High Bench Barbell Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Leg_Curls",
#     "exercise_name": "Lying Leg Curls",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Machine_Squat",
#     "exercise_name": "Lying Machine Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_One-Arm_Lateral_Raise",
#     "exercise_name": "Lying One-Arm Lateral Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Prone_Quadriceps",
#     "exercise_name": "Lying Prone Quadriceps",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Lying_Rear_Delt_Raise",
#     "exercise_name": "Lying Rear Delt Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Supine_Dumbbell_Curl",
#     "exercise_name": "Lying Supine Dumbbell Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_T-Bar_Row",
#     "exercise_name": "Lying T-Bar Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Lying_Triceps_Press",
#     "exercise_name": "Lying Triceps Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Machine_Bench_Press",
#     "exercise_name": "Machine Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Machine_Bicep_Curl",
#     "exercise_name": "Machine Bicep Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Machine_Preacher_Curls",
#     "exercise_name": "Machine Preacher Curls",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Machine_Shoulder_Military_Press",
#     "exercise_name": "Machine Shoulder (Military) Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Machine_Triceps_Extension",
#     "exercise_name": "Machine Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Medicine_Ball_Chest_Pass",
#     "exercise_name": "Medicine Ball Chest Pass",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Medicine_Ball_Full_Twist",
#     "exercise_name": "Medicine Ball Full Twist",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Medicine_Ball_Scoop_Throw",
#     "exercise_name": "Medicine Ball Scoop Throw",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Middle_Back_Shrug",
#     "exercise_name": "Middle Back Shrug",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Middle_Back_Stretch",
#     "exercise_name": "Middle Back Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Mixed_Grip_Chin",
#     "exercise_name": "Mixed Grip Chin",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Monster_Walk",
#     "exercise_name": "Monster Walk",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Mountain_Climbers",
#     "exercise_name": "Mountain Climbers",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Moving_Claw_Series",
#     "exercise_name": "Moving Claw Series",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Muscle_Snatch",
#     "exercise_name": "Muscle Snatch",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Muscle_Up",
#     "exercise_name": "Muscle Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Narrow_Stance_Hack_Squats",
#     "exercise_name": "Narrow Stance Hack Squats",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Narrow_Stance_Leg_Press",
#     "exercise_name": "Narrow Stance Leg Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Narrow_Stance_Squats",
#     "exercise_name": "Narrow Stance Squats",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Natural_Glute_Ham_Raise",
#     "exercise_name": "Natural Glute Ham Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Neck-SMR",
#     "exercise_name": "Neck-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Neck_Press",
#     "exercise_name": "Neck Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Oblique_Crunches",
#     "exercise_name": "Oblique Crunches",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Oblique_Crunches_-_On_The_Floor",
#     "exercise_name": "Oblique Crunches - On The Floor",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Olympic_Squat",
#     "exercise_name": "Olympic Squat",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "On-Your-Back_Quad_Stretch",
#     "exercise_name": "On-Your-Back Quad Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "On_Your_Side_Quad_Stretch",
#     "exercise_name": "On Your Side Quad Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "One-Arm_Dumbbell_Row",
#     "exercise_name": "One-Arm Dumbbell Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Flat_Bench_Dumbbell_Flye",
#     "exercise_name": "One-Arm Flat Bench Dumbbell Flye",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_High-Pulley_Cable_Side_Bends",
#     "exercise_name": "One-Arm High-Pulley Cable Side Bends",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Incline_Lateral_Raise",
#     "exercise_name": "One-Arm Incline Lateral Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Kettlebell_Clean",
#     "exercise_name": "One-Arm Kettlebell Clean",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Kettlebell_Clean_and_Jerk",
#     "exercise_name": "One-Arm Kettlebell Clean and Jerk",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Kettlebell_Floor_Press",
#     "exercise_name": "One-Arm Kettlebell Floor Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Kettlebell_Jerk",
#     "exercise_name": "One-Arm Kettlebell Jerk",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Kettlebell_Military_Press_To_The_Side",
#     "exercise_name": "One-Arm Kettlebell Military Press To The Side",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Kettlebell_Para_Press",
#     "exercise_name": "One-Arm Kettlebell Para Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Kettlebell_Push_Press",
#     "exercise_name": "One-Arm Kettlebell Push Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Kettlebell_Row",
#     "exercise_name": "One-Arm Kettlebell Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Kettlebell_Snatch",
#     "exercise_name": "One-Arm Kettlebell Snatch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Kettlebell_Split_Jerk",
#     "exercise_name": "One-Arm Kettlebell Split Jerk",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Kettlebell_Split_Snatch",
#     "exercise_name": "One-Arm Kettlebell Split Snatch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Kettlebell_Swings",
#     "exercise_name": "One-Arm Kettlebell Swings",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Long_Bar_Row",
#     "exercise_name": "One-Arm Long Bar Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Medicine_Ball_Slam",
#     "exercise_name": "One-Arm Medicine Ball Slam",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Open_Palm_Kettlebell_Clean",
#     "exercise_name": "One-Arm Open Palm Kettlebell Clean",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Overhead_Kettlebell_Squats",
#     "exercise_name": "One-Arm Overhead Kettlebell Squats",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Side_Deadlift",
#     "exercise_name": "One-Arm Side Deadlift",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Arm_Side_Laterals",
#     "exercise_name": "One-Arm Side Laterals",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One-Legged_Cable_Kickback",
#     "exercise_name": "One-Legged Cable Kickback",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One_Arm_Against_Wall",
#     "exercise_name": "One Arm Against Wall",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "One_Arm_Chin-Up",
#     "exercise_name": "One Arm Chin-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One_Arm_Dumbbell_Bench_Press",
#     "exercise_name": "One Arm Dumbbell Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One_Arm_Dumbbell_Preacher_Curl",
#     "exercise_name": "One Arm Dumbbell Preacher Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One_Arm_Floor_Press",
#     "exercise_name": "One Arm Floor Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One_Arm_Lat_Pulldown",
#     "exercise_name": "One Arm Lat Pulldown",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One_Arm_Pronated_Dumbbell_Triceps_Extension",
#     "exercise_name": "One Arm Pronated Dumbbell Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One_Arm_Supinated_Dumbbell_Triceps_Extension",
#     "exercise_name": "One Arm Supinated Dumbbell Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "One_Half_Locust",
#     "exercise_name": "One Half Locust",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "One_Handed_Hang",
#     "exercise_name": "One Handed Hang",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "One_Knee_To_Chest",
#     "exercise_name": "One Knee To Chest",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "One_Leg_Barbell_Squat",
#     "exercise_name": "One Leg Barbell Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Open_Palm_Kettlebell_Clean",
#     "exercise_name": "Open Palm Kettlebell Clean",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Otis-Up",
#     "exercise_name": "Otis-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Overhead_Cable_Curl",
#     "exercise_name": "Overhead Cable Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Overhead_Lat",
#     "exercise_name": "Overhead Lat",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Overhead_Slam",
#     "exercise_name": "Overhead Slam",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Overhead_Squat",
#     "exercise_name": "Overhead Squat",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Overhead_Stretch",
#     "exercise_name": "Overhead Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Overhead_Triceps",
#     "exercise_name": "Overhead Triceps",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Pallof_Press",
#     "exercise_name": "Pallof Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Pallof_Press_With_Rotation",
#     "exercise_name": "Pallof Press With Rotation",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Palms-Down_Dumbbell_Wrist_Curl_Over_A_Bench",
#     "exercise_name": "Palms-Down Dumbbell Wrist Curl Over A Bench",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Palms-Down_Wrist_Curl_Over_A_Bench",
#     "exercise_name": "Palms-Down Wrist Curl Over A Bench",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Palms-Up_Barbell_Wrist_Curl_Over_A_Bench",
#     "exercise_name": "Palms-Up Barbell Wrist Curl Over A Bench",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Palms-Up_Dumbbell_Wrist_Curl_Over_A_Bench",
#     "exercise_name": "Palms-Up Dumbbell Wrist Curl Over A Bench",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Parallel_Bar_Dip",
#     "exercise_name": "Parallel Bar Dip",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Pelvic_Tilt_Into_Bridge",
#     "exercise_name": "Pelvic Tilt Into Bridge",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Peroneals-SMR",
#     "exercise_name": "Peroneals-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Peroneals_Stretch",
#     "exercise_name": "Peroneals Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Physioball_Hip_Bridge",
#     "exercise_name": "Physioball Hip Bridge",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Pin_Presses",
#     "exercise_name": "Pin Presses",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Piriformis-SMR",
#     "exercise_name": "Piriformis-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Plank",
#     "exercise_name": "Plank",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Plate_Pinch",
#     "exercise_name": "Plate Pinch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Plate_Twist",
#     "exercise_name": "Plate Twist",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Platform_Hamstring_Slides",
#     "exercise_name": "Platform Hamstring Slides",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Plie_Dumbbell_Squat",
#     "exercise_name": "Plie Dumbbell Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Plyo_Kettlebell_Pushups",
#     "exercise_name": "Plyo Kettlebell Pushups",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Plyo_Push-up",
#     "exercise_name": "Plyo Push-up",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Posterior_Tibialis_Stretch",
#     "exercise_name": "Posterior Tibialis Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Power_Clean",
#     "exercise_name": "Power Clean",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Power_Clean_from_Blocks",
#     "exercise_name": "Power Clean from Blocks",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Power_Jerk",
#     "exercise_name": "Power Jerk",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Power_Partials",
#     "exercise_name": "Power Partials",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Power_Snatch",
#     "exercise_name": "Power Snatch",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Power_Snatch_from_Blocks",
#     "exercise_name": "Power Snatch from Blocks",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Power_Stairs",
#     "exercise_name": "Power Stairs",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Preacher_Curl",
#     "exercise_name": "Preacher Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Preacher_Hammer_Dumbbell_Curl",
#     "exercise_name": "Preacher Hammer Dumbbell Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Press_Sit-Up",
#     "exercise_name": "Press Sit-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Prone_Manual_Hamstring",
#     "exercise_name": "Prone Manual Hamstring",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Prowler_Sprint",
#     "exercise_name": "Prowler Sprint",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Pull_Through",
#     "exercise_name": "Pull Through",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Pullups",
#     "exercise_name": "Pullups",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Push-Up_Wide",
#     "exercise_name": "Push-Up Wide",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Push-Ups_-_Close_Triceps_Position",
#     "exercise_name": "Push-Ups - Close Triceps Position",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Push-Ups_With_Feet_Elevated",
#     "exercise_name": "Push-Ups With Feet Elevated",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Push-Ups_With_Feet_On_An_Exercise_Ball",
#     "exercise_name": "Push-Ups With Feet On An Exercise Ball",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Push_Press",
#     "exercise_name": "Push Press",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Push_Press_-_Behind_the_Neck",
#     "exercise_name": "Push Press - Behind the Neck",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Push_Up_to_Side_Plank",
#     "exercise_name": "Push Up to Side Plank",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Pushups",
#     "exercise_name": "Pushups",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Pushups_Close_and_Wide_Hand_Positions",
#     "exercise_name": "Pushups (Close and Wide Hand Positions)",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Pyramid",
#     "exercise_name": "Pyramid",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Quad_Stretch",
#     "exercise_name": "Quad Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Quadriceps-SMR",
#     "exercise_name": "Quadriceps-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Quick_Leap",
#     "exercise_name": "Quick Leap",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Rack_Delivery",
#     "exercise_name": "Rack Delivery",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Rack_Pull_with_Bands",
#     "exercise_name": "Rack Pull with Bands",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Rack_Pulls",
#     "exercise_name": "Rack Pulls",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Rear_Leg_Raises",
#     "exercise_name": "Rear Leg Raises",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Recumbent_Bike",
#     "exercise_name": "Recumbent Bike",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Return_Push_from_Stance",
#     "exercise_name": "Return Push from Stance",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Reverse_Band_Bench_Press",
#     "exercise_name": "Reverse Band Bench Press",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Reverse_Band_Box_Squat",
#     "exercise_name": "Reverse Band Box Squat",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Reverse_Band_Deadlift",
#     "exercise_name": "Reverse Band Deadlift",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Reverse_Band_Power_Squat",
#     "exercise_name": "Reverse Band Power Squat",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Reverse_Band_Sumo_Deadlift",
#     "exercise_name": "Reverse Band Sumo Deadlift",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Reverse_Barbell_Curl",
#     "exercise_name": "Reverse Barbell Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Reverse_Barbell_Preacher_Curls",
#     "exercise_name": "Reverse Barbell Preacher Curls",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Reverse_Cable_Curl",
#     "exercise_name": "Reverse Cable Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Reverse_Crunch",
#     "exercise_name": "Reverse Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Reverse_Flyes",
#     "exercise_name": "Reverse Flyes",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Reverse_Flyes_With_External_Rotation",
#     "exercise_name": "Reverse Flyes With External Rotation",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Reverse_Grip_Bent-Over_Rows",
#     "exercise_name": "Reverse Grip Bent-Over Rows",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Reverse_Grip_Triceps_Pushdown",
#     "exercise_name": "Reverse Grip Triceps Pushdown",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Reverse_Hyperextension",
#     "exercise_name": "Reverse Hyperextension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Reverse_Machine_Flyes",
#     "exercise_name": "Reverse Machine Flyes",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Reverse_Plate_Curls",
#     "exercise_name": "Reverse Plate Curls",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Reverse_Triceps_Bench_Press",
#     "exercise_name": "Reverse Triceps Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Rhomboids-SMR",
#     "exercise_name": "Rhomboids-SMR",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Rickshaw_Carry",
#     "exercise_name": "Rickshaw Carry",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Rickshaw_Deadlift",
#     "exercise_name": "Rickshaw Deadlift",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Ring_Dips",
#     "exercise_name": "Ring Dips",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Rocket_Jump",
#     "exercise_name": "Rocket Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Rocking_Standing_Calf_Raise",
#     "exercise_name": "Rocking Standing Calf Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Rocky_Pull-Ups_Pulldowns",
#     "exercise_name": "Rocky Pull-Ups/Pulldowns",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Romanian_Deadlift",
#     "exercise_name": "Romanian Deadlift",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Romanian_Deadlift_from_Deficit",
#     "exercise_name": "Romanian Deadlift from Deficit",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Rope_Climb",
#     "exercise_name": "Rope Climb",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Rope_Crunch",
#     "exercise_name": "Rope Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Rope_Jumping",
#     "exercise_name": "Rope Jumping",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Rope_Straight-Arm_Pulldown",
#     "exercise_name": "Rope Straight-Arm Pulldown",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Round_The_World_Shoulder_Stretch",
#     "exercise_name": "Round The World Shoulder Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Rowing_Stationary",
#     "exercise_name": "Rowing, Stationary",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Runners_Stretch",
#     "exercise_name": "Runner's Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Running_Treadmill",
#     "exercise_name": "Running, Treadmill",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Russian_Twist",
#     "exercise_name": "Russian Twist",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Sandbag_Load",
#     "exercise_name": "Sandbag Load",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Scapular_Pull-Up",
#     "exercise_name": "Scapular Pull-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Scissor_Kick",
#     "exercise_name": "Scissor Kick",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Scissors_Jump",
#     "exercise_name": "Scissors Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Seated_Band_Hamstring_Curl",
#     "exercise_name": "Seated Band Hamstring Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Barbell_Military_Press",
#     "exercise_name": "Seated Barbell Military Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Barbell_Twist",
#     "exercise_name": "Seated Barbell Twist",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Bent-Over_One-Arm_Dumbbell_Triceps_Extension",
#     "exercise_name": "Seated Bent-Over One-Arm Dumbbell Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Bent-Over_Rear_Delt_Raise",
#     "exercise_name": "Seated Bent-Over Rear Delt Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension",
#     "exercise_name": "Seated Bent-Over Two-Arm Dumbbell Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Biceps",
#     "exercise_name": "Seated Biceps",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Seated_Cable_Rows",
#     "exercise_name": "Seated Cable Rows",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Cable_Shoulder_Press",
#     "exercise_name": "Seated Cable Shoulder Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Calf_Raise",
#     "exercise_name": "Seated Calf Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Calf_Stretch",
#     "exercise_name": "Seated Calf Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Seated_Close-Grip_Concentration_Barbell_Curl",
#     "exercise_name": "Seated Close-Grip Concentration Barbell Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Dumbbell_Curl",
#     "exercise_name": "Seated Dumbbell Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Dumbbell_Inner_Biceps_Curl",
#     "exercise_name": "Seated Dumbbell Inner Biceps Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Dumbbell_Palms-Down_Wrist_Curl",
#     "exercise_name": "Seated Dumbbell Palms-Down Wrist Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Dumbbell_Palms-Up_Wrist_Curl",
#     "exercise_name": "Seated Dumbbell Palms-Up Wrist Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Dumbbell_Press",
#     "exercise_name": "Seated Dumbbell Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Flat_Bench_Leg_Pull-In",
#     "exercise_name": "Seated Flat Bench Leg Pull-In",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Floor_Hamstring_Stretch",
#     "exercise_name": "Seated Floor Hamstring Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Seated_Front_Deltoid",
#     "exercise_name": "Seated Front Deltoid",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Seated_Glute",
#     "exercise_name": "Seated Glute",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Seated_Good_Mornings",
#     "exercise_name": "Seated Good Mornings",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Seated_Hamstring",
#     "exercise_name": "Seated Hamstring",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Seated_Hamstring_and_Calf_Stretch",
#     "exercise_name": "Seated Hamstring and Calf Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Seated_Head_Harness_Neck_Resistance",
#     "exercise_name": "Seated Head Harness Neck Resistance",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Leg_Curl",
#     "exercise_name": "Seated Leg Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Leg_Tucks",
#     "exercise_name": "Seated Leg Tucks",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_One-Arm_Dumbbell_Palms-Down_Wrist_Curl",
#     "exercise_name": "Seated One-Arm Dumbbell Palms-Down Wrist Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_One-Arm_Dumbbell_Palms-Up_Wrist_Curl",
#     "exercise_name": "Seated One-Arm Dumbbell Palms-Up Wrist Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_One-arm_Cable_Pulley_Rows",
#     "exercise_name": "Seated One-arm Cable Pulley Rows",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Overhead_Stretch",
#     "exercise_name": "Seated Overhead Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Seated_Palm-Up_Barbell_Wrist_Curl",
#     "exercise_name": "Seated Palm-Up Barbell Wrist Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Palms-Down_Barbell_Wrist_Curl",
#     "exercise_name": "Seated Palms-Down Barbell Wrist Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Side_Lateral_Raise",
#     "exercise_name": "Seated Side Lateral Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Triceps_Press",
#     "exercise_name": "Seated Triceps Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Seated_Two-Arm_Palms-Up_Low-Pulley_Wrist_Curl",
#     "exercise_name": "Seated Two-Arm Palms-Up Low-Pulley Wrist Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "See-Saw_Press_Alternating_Side_Press",
#     "exercise_name": "See-Saw Press (Alternating Side Press)",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Shotgun_Row",
#     "exercise_name": "Shotgun Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Shoulder_Circles",
#     "exercise_name": "Shoulder Circles",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Shoulder_Press_-_With_Bands",
#     "exercise_name": "Shoulder Press - With Bands",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Shoulder_Raise",
#     "exercise_name": "Shoulder Raise",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Shoulder_Stretch",
#     "exercise_name": "Shoulder Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Side-Lying_Floor_Stretch",
#     "exercise_name": "Side-Lying Floor Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Side_Bridge",
#     "exercise_name": "Side Bridge",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Side_Hop-Sprint",
#     "exercise_name": "Side Hop-Sprint",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Side_Jackknife",
#     "exercise_name": "Side Jackknife",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Side_Lateral_Raise",
#     "exercise_name": "Side Lateral Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Side_Laterals_to_Front_Raise",
#     "exercise_name": "Side Laterals to Front Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Side_Leg_Raises",
#     "exercise_name": "Side Leg Raises",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Side_Lying_Groin_Stretch",
#     "exercise_name": "Side Lying Groin Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Side_Neck_Stretch",
#     "exercise_name": "Side Neck Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Side_Standing_Long_Jump",
#     "exercise_name": "Side Standing Long Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Side_To_Side_Chins",
#     "exercise_name": "Side To Side Chins",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Side_Wrist_Pull",
#     "exercise_name": "Side Wrist Pull",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Side_to_Side_Box_Shuffle",
#     "exercise_name": "Side to Side Box Shuffle",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Single-Arm_Cable_Crossover",
#     "exercise_name": "Single-Arm Cable Crossover",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Single-Arm_Linear_Jammer",
#     "exercise_name": "Single-Arm Linear Jammer",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Single-Arm_Push-Up",
#     "exercise_name": "Single-Arm Push-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Single-Cone_Sprint_Drill",
#     "exercise_name": "Single-Cone Sprint Drill",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Single-Leg_High_Box_Squat",
#     "exercise_name": "Single-Leg High Box Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Single-Leg_Hop_Progression",
#     "exercise_name": "Single-Leg Hop Progression",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Single-Leg_Lateral_Hop",
#     "exercise_name": "Single-Leg Lateral Hop",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Single-Leg_Leg_Extension",
#     "exercise_name": "Single-Leg Leg Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Single-Leg_Stride_Jump",
#     "exercise_name": "Single-Leg Stride Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Single_Dumbbell_Raise",
#     "exercise_name": "Single Dumbbell Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Single_Leg_Butt_Kick",
#     "exercise_name": "Single Leg Butt Kick",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Single_Leg_Glute_Bridge",
#     "exercise_name": "Single Leg Glute Bridge",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Single_Leg_Push-off",
#     "exercise_name": "Single Leg Push-off",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Sit-Up",
#     "exercise_name": "Sit-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Sit_Squats",
#     "exercise_name": "Sit Squats",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Skating",
#     "exercise_name": "Skating",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Sled_Drag_-_Harness",
#     "exercise_name": "Sled Drag - Harness",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Sled_Overhead_Backward_Walk",
#     "exercise_name": "Sled Overhead Backward Walk",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Sled_Overhead_Triceps_Extension",
#     "exercise_name": "Sled Overhead Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Sled_Push",
#     "exercise_name": "Sled Push",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Sled_Reverse_Flye",
#     "exercise_name": "Sled Reverse Flye",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Sled_Row",
#     "exercise_name": "Sled Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Sledgehammer_Swings",
#     "exercise_name": "Sledgehammer Swings",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Smith_Incline_Shoulder_Raise",
#     "exercise_name": "Smith Incline Shoulder Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Behind_the_Back_Shrug",
#     "exercise_name": "Smith Machine Behind the Back Shrug",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Bench_Press",
#     "exercise_name": "Smith Machine Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Bent_Over_Row",
#     "exercise_name": "Smith Machine Bent Over Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Calf_Raise",
#     "exercise_name": "Smith Machine Calf Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Close-Grip_Bench_Press",
#     "exercise_name": "Smith Machine Close-Grip Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Decline_Press",
#     "exercise_name": "Smith Machine Decline Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Hang_Power_Clean",
#     "exercise_name": "Smith Machine Hang Power Clean",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Hip_Raise",
#     "exercise_name": "Smith Machine Hip Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Incline_Bench_Press",
#     "exercise_name": "Smith Machine Incline Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Leg_Press",
#     "exercise_name": "Smith Machine Leg Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_One-Arm_Upright_Row",
#     "exercise_name": "Smith Machine One-Arm Upright Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Overhead_Shoulder_Press",
#     "exercise_name": "Smith Machine Overhead Shoulder Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Pistol_Squat",
#     "exercise_name": "Smith Machine Pistol Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Reverse_Calf_Raises",
#     "exercise_name": "Smith Machine Reverse Calf Raises",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Squat",
#     "exercise_name": "Smith Machine Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Stiff-Legged_Deadlift",
#     "exercise_name": "Smith Machine Stiff-Legged Deadlift",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Machine_Upright_Row",
#     "exercise_name": "Smith Machine Upright Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Smith_Single-Leg_Split_Squat",
#     "exercise_name": "Smith Single-Leg Split Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Snatch",
#     "exercise_name": "Snatch",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Snatch_Balance",
#     "exercise_name": "Snatch Balance",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Snatch_Deadlift",
#     "exercise_name": "Snatch Deadlift",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Snatch_Pull",
#     "exercise_name": "Snatch Pull",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Snatch_Shrug",
#     "exercise_name": "Snatch Shrug",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Snatch_from_Blocks",
#     "exercise_name": "Snatch from Blocks",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Speed_Band_Overhead_Triceps",
#     "exercise_name": "Speed Band Overhead Triceps",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Speed_Box_Squat",
#     "exercise_name": "Speed Box Squat",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Speed_Squats",
#     "exercise_name": "Speed Squats",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Spell_Caster",
#     "exercise_name": "Spell Caster",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Spider_Crawl",
#     "exercise_name": "Spider Crawl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Spider_Curl",
#     "exercise_name": "Spider Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Spinal_Stretch",
#     "exercise_name": "Spinal Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Split_Clean",
#     "exercise_name": "Split Clean",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Split_Jerk",
#     "exercise_name": "Split Jerk",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Split_Jump",
#     "exercise_name": "Split Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Split_Snatch",
#     "exercise_name": "Split Snatch",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Split_Squat_with_Dumbbells",
#     "exercise_name": "Split Squat with Dumbbells",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Split_Squats",
#     "exercise_name": "Split Squats",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Squat_Jerk",
#     "exercise_name": "Squat Jerk",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Squat_with_Bands",
#     "exercise_name": "Squat with Bands",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Squat_with_Chains",
#     "exercise_name": "Squat with Chains",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Squat_with_Plate_Movers",
#     "exercise_name": "Squat with Plate Movers",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Squats_-_With_Bands",
#     "exercise_name": "Squats - With Bands",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Stairmaster",
#     "exercise_name": "Stairmaster",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Standing_Alternating_Dumbbell_Press",
#     "exercise_name": "Standing Alternating Dumbbell Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Barbell_Calf_Raise",
#     "exercise_name": "Standing Barbell Calf Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Barbell_Press_Behind_Neck",
#     "exercise_name": "Standing Barbell Press Behind Neck",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Bent-Over_One-Arm_Dumbbell_Triceps_Extension",
#     "exercise_name": "Standing Bent-Over One-Arm Dumbbell Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Bent-Over_Two-Arm_Dumbbell_Triceps_Extension",
#     "exercise_name": "Standing Bent-Over Two-Arm Dumbbell Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Biceps_Cable_Curl",
#     "exercise_name": "Standing Biceps Cable Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Biceps_Stretch",
#     "exercise_name": "Standing Biceps Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Standing_Bradford_Press",
#     "exercise_name": "Standing Bradford Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Cable_Chest_Press",
#     "exercise_name": "Standing Cable Chest Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Cable_Lift",
#     "exercise_name": "Standing Cable Lift",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Cable_Wood_Chop",
#     "exercise_name": "Standing Cable Wood Chop",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Calf_Raises",
#     "exercise_name": "Standing Calf Raises",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Concentration_Curl",
#     "exercise_name": "Standing Concentration Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Dumbbell_Calf_Raise",
#     "exercise_name": "Standing Dumbbell Calf Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Dumbbell_Press",
#     "exercise_name": "Standing Dumbbell Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Dumbbell_Reverse_Curl",
#     "exercise_name": "Standing Dumbbell Reverse Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Dumbbell_Straight-Arm_Front_Delt_Raise_Above_Head",
#     "exercise_name": "Standing Dumbbell Straight-Arm Front Delt Raise Above Head",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Dumbbell_Triceps_Extension",
#     "exercise_name": "Standing Dumbbell Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Dumbbell_Upright_Row",
#     "exercise_name": "Standing Dumbbell Upright Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Elevated_Quad_Stretch",
#     "exercise_name": "Standing Elevated Quad Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Standing_Front_Barbell_Raise_Over_Head",
#     "exercise_name": "Standing Front Barbell Raise Over Head",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Gastrocnemius_Calf_Stretch",
#     "exercise_name": "Standing Gastrocnemius Calf Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Standing_Hamstring_and_Calf_Stretch",
#     "exercise_name": "Standing Hamstring and Calf Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Standing_Hip_Circles",
#     "exercise_name": "Standing Hip Circles",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Standing_Hip_Flexors",
#     "exercise_name": "Standing Hip Flexors",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Standing_Inner-Biceps_Curl",
#     "exercise_name": "Standing Inner-Biceps Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Lateral_Stretch",
#     "exercise_name": "Standing Lateral Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Standing_Leg_Curl",
#     "exercise_name": "Standing Leg Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Long_Jump",
#     "exercise_name": "Standing Long Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Standing_Low-Pulley_Deltoid_Raise",
#     "exercise_name": "Standing Low-Pulley Deltoid Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Low-Pulley_One-Arm_Triceps_Extension",
#     "exercise_name": "Standing Low-Pulley One-Arm Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Military_Press",
#     "exercise_name": "Standing Military Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Olympic_Plate_Hand_Squeeze",
#     "exercise_name": "Standing Olympic Plate Hand Squeeze",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_One-Arm_Cable_Curl",
#     "exercise_name": "Standing One-Arm Cable Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_One-Arm_Dumbbell_Curl_Over_Incline_Bench",
#     "exercise_name": "Standing One-Arm Dumbbell Curl Over Incline Bench",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_One-Arm_Dumbbell_Triceps_Extension",
#     "exercise_name": "Standing One-Arm Dumbbell Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Overhead_Barbell_Triceps_Extension",
#     "exercise_name": "Standing Overhead Barbell Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Palm-In_One-Arm_Dumbbell_Press",
#     "exercise_name": "Standing Palm-In One-Arm Dumbbell Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Palms-In_Dumbbell_Press",
#     "exercise_name": "Standing Palms-In Dumbbell Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Palms-Up_Barbell_Behind_The_Back_Wrist_Curl",
#     "exercise_name": "Standing Palms-Up Barbell Behind The Back Wrist Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Pelvic_Tilt",
#     "exercise_name": "Standing Pelvic Tilt",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Standing_Rope_Crunch",
#     "exercise_name": "Standing Rope Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Soleus_And_Achilles_Stretch",
#     "exercise_name": "Standing Soleus And Achilles Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Standing_Toe_Touches",
#     "exercise_name": "Standing Toe Touches",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Standing_Towel_Triceps_Extension",
#     "exercise_name": "Standing Towel Triceps Extension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Standing_Two-Arm_Overhead_Throw",
#     "exercise_name": "Standing Two-Arm Overhead Throw",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Star_Jump",
#     "exercise_name": "Star Jump",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Step-up_with_Knee_Raise",
#     "exercise_name": "Step-up with Knee Raise",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Step_Mill",
#     "exercise_name": "Step Mill",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Stiff-Legged_Barbell_Deadlift",
#     "exercise_name": "Stiff-Legged Barbell Deadlift",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Stiff-Legged_Dumbbell_Deadlift",
#     "exercise_name": "Stiff-Legged Dumbbell Deadlift",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Stiff_Leg_Barbell_Good_Morning",
#     "exercise_name": "Stiff Leg Barbell Good Morning",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Stomach_Vacuum",
#     "exercise_name": "Stomach Vacuum",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Straight-Arm_Dumbbell_Pullover",
#     "exercise_name": "Straight-Arm Dumbbell Pullover",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Straight-Arm_Pulldown",
#     "exercise_name": "Straight-Arm Pulldown",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Straight_Bar_Bench_Mid_Rows",
#     "exercise_name": "Straight Bar Bench Mid Rows",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Straight_Raises_on_Incline_Bench",
#     "exercise_name": "Straight Raises on Incline Bench",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Stride_Jump_Crossover",
#     "exercise_name": "Stride Jump Crossover",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Sumo_Deadlift",
#     "exercise_name": "Sumo Deadlift",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Sumo_Deadlift_with_Bands",
#     "exercise_name": "Sumo Deadlift with Bands",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Sumo_Deadlift_with_Chains",
#     "exercise_name": "Sumo Deadlift with Chains",
#     "category": "powerlifting"
#   },
#   {
#     "exercise_id": "Superman",
#     "exercise_name": "Superman",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Supine_Chest_Throw",
#     "exercise_name": "Supine Chest Throw",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Supine_One-Arm_Overhead_Throw",
#     "exercise_name": "Supine One-Arm Overhead Throw",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Supine_Two-Arm_Overhead_Throw",
#     "exercise_name": "Supine Two-Arm Overhead Throw",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Suspended_Fallout",
#     "exercise_name": "Suspended Fallout",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Suspended_Push-Up",
#     "exercise_name": "Suspended Push-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Suspended_Reverse_Crunch",
#     "exercise_name": "Suspended Reverse Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Suspended_Row",
#     "exercise_name": "Suspended Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Suspended_Split_Squat",
#     "exercise_name": "Suspended Split Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Svend_Press",
#     "exercise_name": "Svend Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "T-Bar_Row_with_Handle",
#     "exercise_name": "T-Bar Row with Handle",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Tate_Press",
#     "exercise_name": "Tate Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "The_Straddle",
#     "exercise_name": "The Straddle",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Thigh_Abductor",
#     "exercise_name": "Thigh Abductor",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Thigh_Adductor",
#     "exercise_name": "Thigh Adductor",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Tire_Flip",
#     "exercise_name": "Tire Flip",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Toe_Touchers",
#     "exercise_name": "Toe Touchers",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Torso_Rotation",
#     "exercise_name": "Torso Rotation",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Trail_Running_Walking",
#     "exercise_name": "Trail Running/Walking",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Trap_Bar_Deadlift",
#     "exercise_name": "Trap Bar Deadlift",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Tricep_Dumbbell_Kickback",
#     "exercise_name": "Tricep Dumbbell Kickback",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Tricep_Side_Stretch",
#     "exercise_name": "Tricep Side Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Triceps_Overhead_Extension_with_Rope",
#     "exercise_name": "Triceps Overhead Extension with Rope",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Triceps_Pushdown",
#     "exercise_name": "Triceps Pushdown",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Triceps_Pushdown_-_Rope_Attachment",
#     "exercise_name": "Triceps Pushdown - Rope Attachment",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Triceps_Pushdown_-_V-Bar_Attachment",
#     "exercise_name": "Triceps Pushdown - V-Bar Attachment",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Triceps_Stretch",
#     "exercise_name": "Triceps Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Tuck_Crunch",
#     "exercise_name": "Tuck Crunch",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Two-Arm_Dumbbell_Preacher_Curl",
#     "exercise_name": "Two-Arm Dumbbell Preacher Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Two-Arm_Kettlebell_Clean",
#     "exercise_name": "Two-Arm Kettlebell Clean",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Two-Arm_Kettlebell_Jerk",
#     "exercise_name": "Two-Arm Kettlebell Jerk",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Two-Arm_Kettlebell_Military_Press",
#     "exercise_name": "Two-Arm Kettlebell Military Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Two-Arm_Kettlebell_Row",
#     "exercise_name": "Two-Arm Kettlebell Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Underhand_Cable_Pulldowns",
#     "exercise_name": "Underhand Cable Pulldowns",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Upper_Back-Leg_Grab",
#     "exercise_name": "Upper Back-Leg Grab",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Upper_Back_Stretch",
#     "exercise_name": "Upper Back Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Upright_Barbell_Row",
#     "exercise_name": "Upright Barbell Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Upright_Cable_Row",
#     "exercise_name": "Upright Cable Row",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Upright_Row_-_With_Bands",
#     "exercise_name": "Upright Row - With Bands",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Upward_Stretch",
#     "exercise_name": "Upward Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "V-Bar_Pulldown",
#     "exercise_name": "V-Bar Pulldown",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "V-Bar_Pullup",
#     "exercise_name": "V-Bar Pullup",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Vertical_Swing",
#     "exercise_name": "Vertical Swing",
#     "category": "plyometrics"
#   },
#   {
#     "exercise_id": "Walking_Treadmill",
#     "exercise_name": "Walking, Treadmill",
#     "category": "cardio"
#   },
#   {
#     "exercise_id": "Weighted_Ball_Hyperextension",
#     "exercise_name": "Weighted Ball Hyperextension",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Weighted_Ball_Side_Bend",
#     "exercise_name": "Weighted Ball Side Bend",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Weighted_Bench_Dip",
#     "exercise_name": "Weighted Bench Dip",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Weighted_Crunches",
#     "exercise_name": "Weighted Crunches",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Weighted_Jump_Squat",
#     "exercise_name": "Weighted Jump Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Weighted_Pull_Ups",
#     "exercise_name": "Weighted Pull Ups",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Weighted_Sissy_Squat",
#     "exercise_name": "Weighted Sissy Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Weighted_Sit-Ups_-_With_Bands",
#     "exercise_name": "Weighted Sit-Ups - With Bands",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Weighted_Squat",
#     "exercise_name": "Weighted Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Wide-Grip_Barbell_Bench_Press",
#     "exercise_name": "Wide-Grip Barbell Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Wide-Grip_Decline_Barbell_Bench_Press",
#     "exercise_name": "Wide-Grip Decline Barbell Bench Press",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Wide-Grip_Decline_Barbell_Pullover",
#     "exercise_name": "Wide-Grip Decline Barbell Pullover",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Wide-Grip_Lat_Pulldown",
#     "exercise_name": "Wide-Grip Lat Pulldown",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Wide-Grip_Pulldown_Behind_The_Neck",
#     "exercise_name": "Wide-Grip Pulldown Behind The Neck",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Wide-Grip_Rear_Pull-Up",
#     "exercise_name": "Wide-Grip Rear Pull-Up",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Wide-Grip_Standing_Barbell_Curl",
#     "exercise_name": "Wide-Grip Standing Barbell Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Wide_Stance_Barbell_Squat",
#     "exercise_name": "Wide Stance Barbell Squat",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Wide_Stance_Stiff_Legs",
#     "exercise_name": "Wide Stance Stiff Legs",
#     "category": "olympic weightlifting"
#   },
#   {
#     "exercise_id": "Wind_Sprints",
#     "exercise_name": "Wind Sprints",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Windmills",
#     "exercise_name": "Windmills",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Worlds_Greatest_Stretch",
#     "exercise_name": "World's Greatest Stretch",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Wrist_Circles",
#     "exercise_name": "Wrist Circles",
#     "category": "stretching"
#   },
#   {
#     "exercise_id": "Wrist_Roller",
#     "exercise_name": "Wrist Roller",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Wrist_Rotations_with_Straight_Bar",
#     "exercise_name": "Wrist Rotations with Straight Bar",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Yoke_Walk",
#     "exercise_name": "Yoke Walk",
#     "category": "strongman"
#   },
#   {
#     "exercise_id": "Zercher_Squats",
#     "exercise_name": "Zercher Squats",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Zottman_Curl",
#     "exercise_name": "Zottman Curl",
#     "category": "strength"
#   },
#   {
#     "exercise_id": "Zottman_Preacher_Curl",
#     "exercise_name": "Zottman Preacher Curl",
#     "category": "strength"
#   }
# ])

User.create!([
  { first_name: 'Admin', last_name: 'User', email: 'admin@example.com', password: 'password', admin: true },
  { first_name: 'Alice', last_name: 'Smith', email: 'alice@example.com', password: 'password', admin: false },
  { first_name: 'Bob', last_name: 'Brown', email: 'bob@example.com', password: 'password', admin: false },
  { first_name: 'Charlie', last_name: 'Johnson', email: 'charlie@example.com', password: 'password', admin: false }
])

