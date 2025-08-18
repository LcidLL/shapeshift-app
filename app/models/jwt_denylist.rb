class JwtDenylist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::DenyList
  self.table_name = 'jwt_denyLists'
end
