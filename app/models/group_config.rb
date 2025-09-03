class GroupConfig < ApplicationRecord
    has_many :challenges, as: :challengeable
    has_many :users, through: :challenges
end
