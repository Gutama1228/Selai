// src/services/platformAPI.js
// Universal Platform API Service with Auto Key Rotation

import { getKeyManager } from './apiKeyManager';

/**
 * Platform API Base URLs
 */
const PLATFORM_CONFIGS = {
  shopee: {
    name: 'Shopee',
    baseURL: 'https://partner.shopeemobile.com/api/v2',
    oauthURL: 'https://partner.shopeemobile.com/api/v2/auth',
    icon: '🛍️',
    color: '#EE4D2D'
  },
  tokopedia: {
    name: 'Tokopedia',
    baseURL: 'https://fs.tokopedia.net/v2',
    oauthURL: 'https://accounts.tokopedia.com/authorize',
    icon: '🟢',
    color: '#42B549'
  },
  lazada: {
    name: 'Lazada',
    baseURL: 'https://api.lazada.com/rest',
    oauthURL: 'https://auth.lazada.com/oauth/authorize',
    icon: '🔵',
    color: '#0F1BA6'
  },
  bukalapak: {
    name: 'Bukalapak',
    baseURL: 'https://api.bukalapak.com/v2',
    oauthURL: 'https://oauth.bukalapak.com/authorize',
    icon: '🔴',
    color: '#E31E52'
  },
  tiktok_shop: {
    name: 'TikTok Shop',
    baseURL: 'https://open-api.tiktokglobalshop.com',
    oauthURL: 'https://auth.tiktok-shops.com/oauth/authorize',
    icon: '⚫',
    color: '#000000'
  },
  blibli: {
    name: 'Blibli',
    baseURL: 'https://api.blibli.com',
    oauthURL: 'https://www.blibli.com/backend/api/auth',
    icon: '🔵',
    color: '#0095DA'
  }
};

/**
 * Platform API Service
 * Handles API calls with automatic key rotation
 */
class PlatformAPI {
  constructor(platform) {
    if (!PLATFORM_CONFIGS[platform]) {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    this.platform = platform;
    this.config = PLATFORM_CONFIGS[platform];
    this.keyManager = getKeyManager(platform);
  }

  /**
   * Make API request with auto key rotation
   */
  async makeRequest(endpoint, options = {}, userId = null, maxRetries = 3) {
    const startTime = Date.now();
    let lastError = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // 1. Get available API key
        const apiKey = await this.keyManager.getAvailableKey();

        if (!apiKey) {
          throw new Error(
            `All ${this.config.name} API keys are rate limited. ` +
            `Please try again later or upgrade your plan.`
          );
        }

        // 2. Build request
        const url = `${this.config.baseURL}${endpoint}`;
        const requestOptions = {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...this.buildAuthHeaders(apiKey),
            ...options.headers
          }
        };

        // 3. Make request
        console.log(`📡 API Call: ${options.method || 'GET'} ${endpoint} via ${apiKey.key_name}`);
        const response = await fetch(url, requestOptions);

        const responseTime = Date.now() - startTime;

        // 4. Handle rate limit response
        if (response.status === 429) {
          console.warn(`⚠️ Rate limit hit on ${apiKey.key_name}, rotating...`);
          
          // Mark key as exhausted
          await this.keyManager.markKeyExhausted(apiKey.id);
          
          // Log the failed attempt
          await this.keyManager.logUsage(
            apiKey.id,
            userId,
            endpoint,
            429,
            responseTime,
            'Rate limit exceeded'
          );

          // Retry with next available key
          if (attempt < maxRetries - 1) {
            console.log(`🔄 Retry attempt ${attempt + 1}/${maxRetries}`);
            await this.sleep(1000 * (attempt + 1)); // Exponential backoff
            continue;
          }
        }

        // 5. Handle other errors
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `API Error ${response.status}: ${response.statusText} - ${errorText}`
          );
        }

        // 6. Success! Parse response
        const data = await response.json();

        // 7. Increment usage counter
        await this.keyManager.incrementUsage(apiKey.id);

        // 8. Log successful request
        await this.keyManager.logUsage(
          apiKey.id,
          userId,
          endpoint,
          response.status,
          responseTime
        );

        console.log(
          `✅ API Success: ${endpoint} via ${apiKey.key_name} (${responseTime}ms)`
        );

        return {
          success: true,
          data: data,
          responseTime: responseTime,
          keyUsed: apiKey.key_name
        };

      } catch (error) {
        lastError = error;
        console.error(
          `❌ API Error (attempt ${attempt + 1}/${maxRetries}): ${error.message}`
        );

        // If not rate limit error and last attempt, throw
        if (attempt === maxRetries - 1) {
          break;
        }

        // Wait before retry
        await this.sleep(1000 * (attempt + 1));
      }
    }

    // All retries failed
    return {
      success: false,
      error: lastError?.message || 'Unknown error',
      data: null
    };
  }

  /**
   * Build authentication headers for platform
   */
  buildAuthHeaders(apiKey) {
    // Each platform has different auth format
    switch (this.platform) {
      case 'shopee':
        return {
          'Authorization': `Bearer ${apiKey.api_key}`,
          'partner-id': apiKey.api_secret
        };
      
      case 'tokopedia':
        return {
          'Authorization': `Bearer ${apiKey.api_key}`
        };
      
      case 'lazada':
        return {
          'Authorization': `Bearer ${apiKey.api_key}`
        };
      
      default:
        return {
          'Authorization': `Bearer ${apiKey.api_key}`
        };
    }
  }

  /**
   * Get orders from platform
   */
  async getOrders(accessToken, userId, params = {}) {
    const endpoint = this.getEndpoint('orders', params);
    
    return await this.makeRequest(
      endpoint,
      {
        method: 'GET',
        headers: {
          'User-Access-Token': accessToken // User's OAuth token
        }
      },
      userId
    );
  }

  /**
   * Get products from platform
   */
  async getProducts(accessToken, userId, params = {}) {
    const endpoint = this.getEndpoint('products', params);
    
    return await this.makeRequest(
      endpoint,
      {
        method: 'GET',
        headers: {
          'User-Access-Token': accessToken
        }
      },
      userId
    );
  }

  /**
   * Get shop info from platform
   */
  async getShopInfo(accessToken, userId) {
    const endpoint = this.getEndpoint('shop');
    
    return await this.makeRequest(
      endpoint,
      {
        method: 'GET',
        headers: {
          'User-Access-Token': accessToken
        }
      },
      userId
    );
  }

  /**
   * Get endpoint for platform-specific resource
   */
  getEndpoint(resource, params = {}) {
    // Each platform has different endpoint structure
    const endpoints = {
      shopee: {
        orders: '/order/get_order_list',
        products: '/product/get_item_list',
        shop: '/shop/get_shop_info'
      },
      tokopedia: {
        orders: '/order/list',
        products: '/products/list',
        shop: '/shop/info'
      },
      lazada: {
        orders: '/orders/get',
        products: '/products/get',
        shop: '/seller/get'
      }
      // Add other platforms...
    };

    const platformEndpoints = endpoints[this.platform] || {};
    let endpoint = platformEndpoints[resource] || `/${resource}`;

    // Add query parameters
    if (Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      endpoint += `?${queryString}`;
    }

    return endpoint;
  }

  /**
   * Sleep utility for retries
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get platform health status
   */
  async getHealthStatus() {
    return await this.keyManager.getHealthStatus();
  }
}

/**
 * Multi-Platform Data Aggregator
 * Fetches data from all connected platforms
 */
export class MultiPlatformAggregator {
  constructor() {
    this.apis = {};
  }

  /**
   * Get API instance for platform
   */
  getAPI(platform) {
    if (!this.apis[platform]) {
      this.apis[platform] = new PlatformAPI(platform);
    }
    return this.apis[platform];
  }

  /**
   * Fetch data from multiple platforms
   */
  async fetchFromAllPlatforms(connectedAccounts, resource, userId) {
    const promises = connectedAccounts.map(async (account) => {
      try {
        const api = this.getAPI(account.platform);
        
        let result;
        switch (resource) {
          case 'orders':
            result = await api.getOrders(account.access_token, userId);
            break;
          case 'products':
            result = await api.getProducts(account.access_token, userId);
            break;
          case 'shop':
            result = await api.getShopInfo(account.access_token, userId);
            break;
          default:
            throw new Error(`Unknown resource: ${resource}`);
        }

        return {
          platform: account.platform,
          shop_name: account.shop_name,
          ...result
        };
      } catch (error) {
        console.error(`Error fetching ${resource} from ${account.platform}:`, error);
        return {
          platform: account.platform,
          shop_name: account.shop_name,
          success: false,
          error: error.message,
          data: null
        };
      }
    });

    const results = await Promise.all(promises);
    return results;
  }

  /**
   * Aggregate statistics from all platforms
   */
  aggregateStats(platformResults) {
    const aggregated = {
      totalProducts: 0,
      totalRevenue: 0,
      totalOrders: 0,
      pendingOrders: 0,
      platforms: []
    };

    platformResults.forEach(result => {
      if (result.success && result.data) {
        const data = result.data;
        
        // Aggregate totals
        aggregated.totalProducts += data.products?.length || 0;
        aggregated.totalRevenue += data.total_revenue || 0;
        aggregated.totalOrders += data.orders?.length || 0;
        aggregated.pendingOrders += data.pending_orders || 0;

        // Store per-platform data
        aggregated.platforms.push({
          platform: result.platform,
          shop_name: result.shop_name,
          products: data.products?.length || 0,
          revenue: data.total_revenue || 0,
          orders: data.orders?.length || 0,
          pending: data.pending_orders || 0
        });
      }
    });

    return aggregated;
  }
}

/**
 * Export platform configs for UI
 */
export function getPlatformConfig(platform) {
  return PLATFORM_CONFIGS[platform];
}

export function getAllPlatformConfigs() {
  return PLATFORM_CONFIGS;
}

export default PlatformAPI;
