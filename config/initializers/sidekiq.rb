require "sidekiq"
require "sidekiq-cron"

Sidekiq.configure_server do |config|
  config.redis = { url: ENV.fetch("REDIS_URL", "redis://localhost:6379/0") }

  schedule_file = Rails.root.join("config/schedule.yml")

  if File.exist?(schedule_file) && Sidekiq.server?
    schedule = YAML.load_file(schedule_file)
    Rails.logger.info "📅 Loading Sidekiq schedule from #{schedule_file}: #{schedule.inspect}"
    Sidekiq::Cron::Job.load_from_hash schedule
    Rails.logger.info "✅ Loaded Sidekiq jobs: #{Sidekiq::Cron::Job.all.map(&:name)}"
  else
    Rails.logger.warn "⚠️ No schedule file found at #{schedule_file}, skipping Sidekiq cron setup."
  end
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV.fetch("REDIS_URL", "redis://localhost:6379/0") }
end
