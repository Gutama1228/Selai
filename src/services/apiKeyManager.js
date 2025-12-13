// src/services/apiKeyManager.js
// Smart API Key Rotation & Management System

import { supabase } from './supabase';

/**
 * API Key Manager
 * Handles automatic rotation of API keys when limits are reached
 */
class APIKeyManager {
  constructor(platform) {
    this.platform = platform;
    this.currentKey = null;
    this.keyCache = new Map(); // Cache keys in memory
    this.lastCacheUpdate = null;
    this.CACHE_DURATION = 60000; // 1 minute
  }

  /**
   * Get available API key with auto-rotation
   */
  async getAvailableKey() {
    try {
      // 1. Reset daily counters if needed (runs automatically)
      await this.resetDailyCountersIfNeeded();

      // 2. Check if current key still has quota
      if (this.currentKey && await this.isKeyAvailable(this.currentKey)) {
        return this.currentKey;
      }

      // 3. Find next available key
      const availableKey = await this.findNextAvailableKey();

      if (!availableKey) {
        console.error(`❌ All ${this.platform} API keys exhausted!`);
        return null;
      }

      // 4. Update current key
      if (!this.currentKey || this.currentKey.id !== availableKey.id) {
        console.log(`🔄 Rotating to key: ${availableKey.key_name} (${availableKey.calls_used_today}/${availableKey.daily_limit})`);
      }

      this.currentKey = availableKey;
      return availableKey;

    } catch (error) {
      console.error('Error getting available key:', error);
      return null;
    }
  }

  /**
   * Check if a key has available quota
   */
  async isKeyAvailable(key) {
    if (!key) return false;

    // Fetch fresh data from database
    const { data, error } = await supabase
      .from('api_keys')
      .select('calls_used_today, daily_limit, is_active')
      .eq('id', key.id)
      .single();

    if (error || !data || !data.is_active) {
      return false;
    }

    // Keep 10% buffer for safety
    const safeLimit = data.daily_limit * 0.9;
    return data.calls_used_today < safeLimit;
  }

  /**
   * Find next available key (least used)
   */
  async findNextAvailableKey() {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('platform', this.platform)
        .eq('is_active', true)
        .order('calls_used_today', { ascending: true });

      if (error) throw error;

      if (!data || data.length === 0) {
        console.error(`No API keys configured for platform: ${this.platform}`);
        return null;
      }

      // Find first key with available quota
      for (const key of data) {
        const safeLimit = key.daily_limit * 0.9;
        if (key.calls_used_today < safeLimit) {
          return key;
        }
      }

      // All keys exhausted
      return null;

    } catch (error) {
      console.error('Error finding available key:', error);
      return null;
    }
  }

  /**
   * Increment usage counter for a key
   */
  async incrementUsage(keyId) {
    try {
      const { error } = await supabase.rpc('increment_api_usage', {
        key_id: keyId
      });

      if (error) {
        // Fallback: manual increment if function doesn't exist
        const { error: updateError } = await supabase
          .from('api_keys')
          .update({ 
            calls_used_today: supabase.raw('calls_used_today + 1') 
          })
          .eq('id', keyId);

        if (updateError) throw updateError;
      }

      // Update local cache
      if (this.currentKey && this.currentKey.id === keyId) {
        this.currentKey.calls_used_today += 1;
      }

    } catch (error) {
      console.error('Error incrementing usage:', error);
    }
  }

  /**
   * Log API usage for analytics
   */
  async logUsage(keyId, userId, endpoint, status, responseTime, errorMessage = null) {
    try {
      await supabase
        .from('api_usage_log')
        .insert({
          api_key_id: keyId,
          user_id: userId,
          platform: this.platform,
          endpoint,
          response_status: status,
          response_time_ms: responseTime,
          error_message: errorMessage
        });
    } catch (error) {
      // Don't throw - logging failure shouldn't break the app
      console.error('Error logging API usage:', error);
    }
  }

  /**
   * Mark key as exhausted (when rate limit hit)
   */
  async markKeyExhausted(keyId) {
    try {
      const { data: key } = await supabase
        .from('api_keys')
        .select('daily_limit')
        .eq('id', keyId)
        .single();

      if (key) {
        await supabase
          .from('api_keys')
          .update({ 
            calls_used_today: key.daily_limit,
            notes: `Rate limited at ${new Date().toISOString()}`
          })
          .eq('id', keyId);

        console.log(`🔴 Key marked as exhausted: ${keyId}`);
      }
    } catch (error) {
      console.error('Error marking key as exhausted:', error);
    }
  }

  /**
   * Reset daily counters (runs automatically at midnight)
   */
  async resetDailyCountersIfNeeded() {
    try {
      const today = new Date().toISOString().split('T')[0];

      // Check if reset needed
      const { data: keysNeedingReset } = await supabase
        .from('api_keys')
        .select('id')
        .lt('last_reset_at', today)
        .limit(1);

      if (keysNeedingReset && keysNeedingReset.length > 0) {
        console.log('🔄 Resetting daily API counters...');

        const { error } = await supabase
          .from('api_keys')
          .update({
            calls_used_today: 0,
            last_reset_at: today
          })
          .lt('last_reset_at', today);

        if (error) throw error;

        console.log('✅ Daily counters reset successfully');
        
        // Clear current key cache to force refresh
        this.currentKey = null;
      }
    } catch (error) {
      console.error('Error resetting daily counters:', error);
    }
  }

  /**
   * Get usage statistics for monitoring
   */
  async getUsageStats() {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('platform', this.platform)
        .eq('is_active', true)
        .order('calls_used_today', { ascending: false });

      if (error) throw error;

      return data.map(key => ({
        key_name: key.key_name,
        calls_used: key.calls_used_today,
        daily_limit: key.daily_limit,
        usage_percent: ((key.calls_used_today / key.daily_limit) * 100).toFixed(2),
        status: key.calls_used_today >= key.daily_limit * 0.9 ? '🔴' :
                key.calls_used_today >= key.daily_limit * 0.7 ? '🟡' : '🟢'
      }));
    } catch (error) {
      console.error('Error getting usage stats:', error);
      return [];
    }
  }

  /**
   * Get total available calls remaining today
   */
  async getTotalRemainingCalls() {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('calls_used_today, daily_limit')
        .eq('platform', this.platform)
        .eq('is_active', true);

      if (error) throw error;

      const total = data.reduce((sum, key) => {
        const remaining = Math.max(0, key.daily_limit - key.calls_used_today);
        return sum + remaining;
      }, 0);

      return total;
    } catch (error) {
      console.error('Error getting remaining calls:', error);
      return 0;
    }
  }

  /**
   * Health check - are we running low on API quota?
   */
  async getHealthStatus() {
    try {
      const remaining = await this.getTotalRemainingCalls();
      const stats = await this.getUsageStats();
      
      const totalCapacity = stats.reduce((sum, s) => sum + parseInt(s.daily_limit), 0);
      const usagePercent = totalCapacity > 0 
        ? ((totalCapacity - remaining) / totalCapacity * 100).toFixed(2)
        : 0;

      return {
        platform: this.platform,
        total_capacity: totalCapacity,
        remaining_calls: remaining,
        usage_percent: usagePercent,
        active_keys: stats.length,
        status: remaining < totalCapacity * 0.1 ? 'critical' :
                remaining < totalCapacity * 0.3 ? 'warning' : 'healthy',
        keys: stats
      };
    } catch (error) {
      console.error('Error getting health status:', error);
      return {
        platform: this.platform,
        status: 'error',
        error: error.message
      };
    }
  }
}

/**
 * Global key managers (singleton per platform)
 */
const keyManagers = {
  shopee: null,
  tokopedia: null,
  lazada: null,
  bukalapak: null,
  tiktok_shop: null,
  blibli: null
};

/**
 * Get or create key manager for platform
 */
export function getKeyManager(platform) {
  if (!keyManagers[platform]) {
    keyManagers[platform] = new APIKeyManager(platform);
  }
  return keyManagers[platform];
}

/**
 * Get health status for all platforms
 */
export async function getAllPlatformsHealth() {
  const platforms = Object.keys(keyManagers);
  const healthPromises = platforms.map(async (platform) => {
    const manager = getKeyManager(platform);
    return await manager.getHealthStatus();
  });

  const results = await Promise.all(healthPromises);
  return results;
}

/**
 * Emergency: Disable a key manually
 */
export async function disableKey(keyId, reason) {
  try {
    const { error } = await supabase
      .from('api_keys')
      .update({ 
        is_active: false,
        notes: `Disabled: ${reason} at ${new Date().toISOString()}`
      })
      .eq('id', keyId);

    if (error) throw error;

    console.log(`🔴 Key ${keyId} disabled: ${reason}`);
    return { success: true };
  } catch (error) {
    console.error('Error disabling key:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Re-enable a disabled key
 */
export async function enableKey(keyId) {
  try {
    const { error } = await supabase
      .from('api_keys')
      .update({ 
        is_active: true,
        notes: `Re-enabled at ${new Date().toISOString()}`
      })
      .eq('id', keyId);

    if (error) throw error;

    console.log(`🟢 Key ${keyId} re-enabled`);
    return { success: true };
  } catch (error) {
    console.error('Error enabling key:', error);
    return { success: false, error: error.message };
  }
}

export default APIKeyManager;
