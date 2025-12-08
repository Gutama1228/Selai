// ============================================
// src/services/analytics.js
// ============================================
/**
 * Analytics Service
 * Track user events and generate analytics data
 */

/**
 * Track page view
 */
export const trackPageView = (pageName, userId = null) => {
  try {
    console.log('Page View:', pageName, 'User:', userId);
    
    // In production, send to analytics service (e.g., Google Analytics, Mixpanel)
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageName,
        user_id: userId
      });
    }
  } catch (error) {
    console.error('Track page view error:', error);
  }
};

/**
 * Track event
 */
export const trackEvent = (eventName, properties = {}) => {
  try {
    console.log('Event:', eventName, 'Properties:', properties);
    
    // In production, send to analytics service
    if (window.gtag) {
      window.gtag('event', eventName, properties);
    }
  } catch (error) {
    console.error('Track event error:', error);
  }
};

/**
 * Track product view
 */
export const trackProductView = (product) => {
  trackEvent('product_view', {
    product_id: product.id,
    product_name: product.name,
    product_price: product.price,
    product_category: product.category
  });
};

/**
 * Track product add
 */
export const trackProductAdd = (product) => {
  trackEvent('product_add', {
    product_id: product.id,
    product_name: product.name,
    product_price: product.price
  });
};

/**
 * Track order create
 */
export const trackOrderCreate = (order) => {
  trackEvent('order_create', {
    order_id: order.id,
    order_total: order.total,
    order_items: order.items?.length || 0
  });
};

/**
 * Track AI feature usage
 */
export const trackAIUsage = (feature, success = true) => {
  trackEvent('ai_feature_use', {
    feature: feature,
    success: success
  });
};

/**
 * Track search
 */
export const trackSearch = (query, resultsCount = 0) => {
  trackEvent('search', {
    search_query: query,
    results_count: resultsCount
  });
};

/**
 * Track user registration
 */
export const trackUserRegistration = (method = 'email') => {
  trackEvent('user_registration', {
    method: method
  });
};

/**
 * Track user login
 */
export const trackUserLogin = (method = 'email') => {
  trackEvent('user_login', {
    method: method
  });
};

/**
 * Get analytics data (mock implementation)
 */
export const getAnalyticsData = async (startDate, endDate) => {
  try {
    // In production, fetch from analytics API
    // For now, return mock data
    return {
      data: {
        pageViews: 1250,
        uniqueVisitors: 450,
        avgSessionDuration: 325, // seconds
        bounceRate: 42.5, // percentage
        topPages: [
          { page: '/dashboard', views: 350 },
          { page: '/products', views: 280 },
          { page: '/orders', views: 220 }
        ]
      },
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: error.message
    };
  }
};

export default {
  trackPageView,
  trackEvent,
  trackProductView,
  trackProductAdd,
  trackOrderCreate,
  trackAIUsage,
  trackSearch,
  trackUserRegistration,
  trackUserLogin,
  getAnalyticsData
};

// ============================================
// src/services/stripe.js
// ============================================
/**
 * Stripe Payment Service
 * Handle payment processing with Stripe
 */

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

/**
 * Initialize Stripe
 */
export const initializeStripe = () => {
  if (!STRIPE_PUBLIC_KEY) {
    console.warn('Stripe public key not configured');
    return null;
  }

  try {
    if (window.Stripe) {
      return window.Stripe(STRIPE_PUBLIC_KEY);
    }
    return null;
  } catch (error) {
    console.error('Initialize Stripe error:', error);
    return null;
  }
};

/**
 * Create checkout session
 */
export const createCheckoutSession = async (priceId, customerId = null) => {
  try {
    // In production, call your backend API to create Stripe checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        priceId,
        customerId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    return { data: { sessionId }, error: null };
  } catch (error) {
    console.error('Create checkout session error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Redirect to Stripe Checkout
 */
export const redirectToCheckout = async (sessionId) => {
  try {
    const stripe = initializeStripe();
    
    if (!stripe) {
      throw new Error('Stripe not initialized');
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      throw error;
    }

    return { data: true, error: null };
  } catch (error) {
    console.error('Redirect to checkout error:', error);
    return { data: false, error: error.message };
  }
};

/**
 * Create subscription
 */
export const createSubscription = async (planId, paymentMethodId) => {
  try {
    // In production, call your backend API to create Stripe subscription
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        planId,
        paymentMethodId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create subscription');
    }

    const subscription = await response.json();
    return { data: subscription, error: null };
  } catch (error) {
    console.error('Create subscription error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Cancel subscription
 */
export const cancelSubscription = async (subscriptionId) => {
  try {
    // In production, call your backend API to cancel Stripe subscription
    const response = await fetch('/api/cancel-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subscriptionId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to cancel subscription');
    }

    const result = await response.json();
    return { data: result, error: null };
  } catch (error) {
    console.error('Cancel subscription error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Get customer portal URL
 */
export const getCustomerPortalUrl = async (customerId) => {
  try {
    // In production, call your backend API to get Stripe customer portal URL
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get customer portal URL');
    }

    const { url } = await response.json();
    return { data: { url }, error: null };
  } catch (error) {
    console.error('Get customer portal URL error:', error);
    return { data: null, error: error.message };
  }
};

export default {
  initializeStripe,
  createCheckoutSession,
  redirectToCheckout,
  createSubscription,
  cancelSubscription,
  getCustomerPortalUrl
};
