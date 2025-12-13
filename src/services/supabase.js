-- =====================================================
-- SELLERAI PRO - COMPLETE DATABASE SCHEMA
-- =====================================================

-- =====================================================
-- 1. USERS TABLE (Auth handled by Supabase Auth)
-- =====================================================
-- Note: User authentication is handled by Supabase Auth
-- This table stores additional user metadata
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  phone VARCHAR(50),
  subscription_tier VARCHAR(50) DEFAULT 'free', -- 'free', 'pro', 'enterprise'
  subscription_expires_at TIMESTAMP,
  ai_credits_remaining INTEGER DEFAULT 10, -- For free tier
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 2. API KEYS TABLE (Multiple keys per platform)
-- =====================================================
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform VARCHAR(50) NOT NULL, -- 'shopee', 'tokopedia', 'lazada', 'bukalapak', 'tiktok_shop'
  key_name VARCHAR(100) NOT NULL, -- 'SHOPEE_KEY_1', 'SHOPEE_KEY_2', etc
  api_key TEXT NOT NULL, -- Encrypted in application
  api_secret TEXT NOT NULL, -- Encrypted in application
  daily_limit INTEGER DEFAULT 1000,
  calls_used_today INTEGER DEFAULT 0,
  last_reset_at DATE DEFAULT CURRENT_DATE,
  is_active BOOLEAN DEFAULT true,
  notes TEXT, -- Admin notes about this key
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(platform, key_name)
);

-- =====================================================
-- 3. CONNECTED ACCOUNTS (User's marketplace accounts)
-- =====================================================
CREATE TABLE connected_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL, -- 'shopee', 'tokopedia', 'lazada', etc
  shop_id VARCHAR(255) NOT NULL, -- Platform's shop ID
  shop_name VARCHAR(255),
  access_token TEXT NOT NULL, -- Encrypted OAuth token
  refresh_token TEXT, -- Encrypted refresh token
  token_expires_at TIMESTAMP,
  last_synced_at TIMESTAMP,
  sync_status VARCHAR(50) DEFAULT 'active', -- 'active', 'error', 'expired'
  sync_error TEXT, -- Last sync error message
  connected_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, platform, shop_id)
);

-- =====================================================
-- 4. DASHBOARD CACHE (Temporary data storage)
-- =====================================================
CREATE TABLE dashboard_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  cache_key VARCHAR(100) NOT NULL, -- 'stats', 'products', 'orders', 'recent_orders'
  data JSONB NOT NULL, -- Cached data in JSON format
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, platform, cache_key)
);

-- =====================================================
-- 5. API USAGE LOG (Track all API calls)
-- =====================================================
CREATE TABLE api_usage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key_id UUID REFERENCES api_keys(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  platform VARCHAR(50) NOT NULL,
  endpoint VARCHAR(500) NOT NULL,
  method VARCHAR(10) DEFAULT 'GET',
  response_status INTEGER,
  response_time_ms INTEGER,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 6. SYNC JOBS (Background sync tracking)
-- =====================================================
CREATE TABLE sync_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  job_type VARCHAR(50) NOT NULL, -- 'full_sync', 'orders_sync', 'products_sync'
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
  progress INTEGER DEFAULT 0, -- 0-100
  total_items INTEGER,
  processed_items INTEGER DEFAULT 0,
  error_message TEXT,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- 7. AI USAGE LOG (Track AI feature usage)
-- =====================================================
CREATE TABLE ai_usage_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature VARCHAR(100) NOT NULL, -- 'description_generator', 'image_suggestions', 'trend_analysis'
  input_data JSONB, -- Input parameters
  output_data JSONB, -- AI response
  tokens_used INTEGER,
  cost_credits INTEGER DEFAULT 1, -- How many credits consumed
  created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- API Keys indexes
CREATE INDEX idx_api_keys_platform_active ON api_keys(platform, is_active, calls_used_today);
CREATE INDEX idx_api_keys_last_reset ON api_keys(last_reset_at);

-- Connected Accounts indexes
CREATE INDEX idx_connected_accounts_user ON connected_accounts(user_id);
CREATE INDEX idx_connected_accounts_platform ON connected_accounts(platform);
CREATE INDEX idx_connected_accounts_sync ON connected_accounts(last_synced_at);

-- Dashboard Cache indexes
CREATE INDEX idx_dashboard_cache_user_platform ON dashboard_cache(user_id, platform);
CREATE INDEX idx_dashboard_cache_expires ON dashboard_cache(expires_at);

-- API Usage Log indexes
CREATE INDEX idx_api_usage_log_created ON api_usage_log(created_at);
CREATE INDEX idx_api_usage_log_user ON api_usage_log(user_id);
CREATE INDEX idx_api_usage_log_platform ON api_usage_log(platform);

-- Sync Jobs indexes
CREATE INDEX idx_sync_jobs_user_status ON sync_jobs(user_id, status);
CREATE INDEX idx_sync_jobs_created ON sync_jobs(created_at);

-- AI Usage Log indexes
CREATE INDEX idx_ai_usage_log_user ON ai_usage_log(user_id);
CREATE INDEX idx_ai_usage_log_created ON ai_usage_log(created_at);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-update updated_at for user_profiles
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Auto-update updated_at for api_keys
CREATE TRIGGER update_api_keys_updated_at
  BEFORE UPDATE ON api_keys
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function: Clean expired cache automatically
CREATE OR REPLACE FUNCTION clean_expired_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM dashboard_cache WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Function: Reset daily API counters
CREATE OR REPLACE FUNCTION reset_daily_api_counters()
RETURNS void AS $$
BEGIN
  UPDATE api_keys
  SET calls_used_today = 0,
      last_reset_at = CURRENT_DATE
  WHERE last_reset_at < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE connected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_log ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own data
CREATE POLICY user_profiles_policy ON user_profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY connected_accounts_policy ON connected_accounts
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY dashboard_cache_policy ON dashboard_cache
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY sync_jobs_policy ON sync_jobs
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY ai_usage_log_policy ON ai_usage_log
  FOR ALL USING (auth.uid() = user_id);

-- Admin-only tables (no RLS for service role)
-- api_keys and api_usage_log are admin-only

-- =====================================================
-- INITIAL DATA SETUP
-- =====================================================

-- Insert example API keys (REPLACE WITH YOUR REAL KEYS!)
INSERT INTO api_keys (platform, key_name, api_key, api_secret, daily_limit, is_active) VALUES
  ('shopee', 'SHOPEE_KEY_1', 'your_shopee_key_1_here', 'your_shopee_secret_1_here', 1000, true),
  ('shopee', 'SHOPEE_KEY_2', 'your_shopee_key_2_here', 'your_shopee_secret_2_here', 1000, true),
  ('tokopedia', 'TOKOPEDIA_KEY_1', 'your_tokopedia_key_1_here', 'your_tokopedia_secret_1_here', 1000, true),
  ('lazada', 'LAZADA_KEY_1', 'your_lazada_key_1_here', 'your_lazada_secret_1_here', 1000, true);

-- =====================================================
-- MATERIALIZED VIEWS (Optional - for analytics)
-- =====================================================

-- Daily API usage summary
CREATE MATERIALIZED VIEW daily_api_usage AS
SELECT 
  DATE(created_at) as date,
  platform,
  COUNT(*) as total_calls,
  COUNT(DISTINCT user_id) as unique_users,
  AVG(response_time_ms) as avg_response_time,
  COUNT(CASE WHEN response_status >= 400 THEN 1 END) as error_count
FROM api_usage_log
GROUP BY DATE(created_at), platform;

-- Create index on materialized view
CREATE INDEX idx_daily_api_usage_date ON daily_api_usage(date);

-- =====================================================
-- SCHEDULED JOBS (Using pg_cron extension if available)
-- =====================================================

-- Clean expired cache every hour
-- SELECT cron.schedule('clean-cache', '0 * * * *', 'SELECT clean_expired_cache();');

-- Reset daily API counters at midnight
-- SELECT cron.schedule('reset-api-counters', '0 0 * * *', 'SELECT reset_daily_api_counters();');

-- Refresh materialized view daily
-- SELECT cron.schedule('refresh-analytics', '0 1 * * *', 'REFRESH MATERIALIZED VIEW daily_api_usage;');

-- =====================================================
-- HELPFUL QUERIES FOR MONITORING
-- =====================================================

-- Check API key usage
-- SELECT 
--   platform,
--   key_name,
--   calls_used_today,
--   daily_limit,
--   ROUND((calls_used_today::float / daily_limit * 100), 2) as usage_percent,
--   is_active
-- FROM api_keys
-- ORDER BY platform, calls_used_today DESC;

-- Find users with most API calls today
-- SELECT 
--   u.email,
--   COUNT(*) as api_calls,
--   COUNT(DISTINCT l.platform) as platforms_used
-- FROM api_usage_log l
-- JOIN auth.users u ON l.user_id = u.id
-- WHERE DATE(l.created_at) = CURRENT_DATE
-- GROUP BY u.email
-- ORDER BY api_calls DESC
-- LIMIT 10;

-- Check cache hit rate
-- SELECT 
--   COUNT(*) as total_requests,
--   COUNT(CASE WHEN expires_at > NOW() THEN 1 END) as cache_hits,
--   ROUND(COUNT(CASE WHEN expires_at > NOW() THEN 1 END)::float / COUNT(*) * 100, 2) as hit_rate
-- FROM dashboard_cache;

-- =====================================================
-- END OF SCHEMA
-- =====================================================
