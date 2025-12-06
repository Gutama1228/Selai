// ==========================================
// APPLICATION CONSTANTS
// ==========================================

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'SellerAI Pro';
export const APP_URL = import.meta.env.VITE_APP_URL || 'https://sellerai.pro';

// ==========================================
// USER ROLES
// ==========================================

export const USER_ROLES = {
  SELLER: 'seller',
  ADMIN: 'admin'
};

// ==========================================
// ADMIN EMAILS
// ==========================================

export const ADMIN_EMAILS = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [
  'admin@sellerai.com',
  'owner@sellerai.com'
];

// ==========================================
// MARKETPLACE PLATFORMS
// ==========================================

export const PLATFORMS = [
  { value: 'shopee', label: 'Shopee', color: 'orange' },
  { value: 'tokopedia', label: 'Tokopedia', color: 'green' },
  { value: 'lazada', label: 'Lazada', color: 'blue' },
  { value: 'tiktokshop', label: 'TikTok Shop', color: 'black' },
  { value: 'bukalapak', label: 'Bukalapak', color: 'red' },
  { value: 'blibli', label: 'BliBli', color: 'blue' }
];

// ==========================================
// PRODUCT CATEGORIES
// ==========================================

export const CATEGORIES = [
  'Fashion Pria',
  'Fashion Wanita',
  'Fashion Anak',
  'Sepatu',
  'Tas & Aksesoris',
  'Jam Tangan',
  'Elektronik',
  'Handphone & Tablet',
  'Komputer & Laptop',
  'Kamera & Foto',
  'Audio',
  'Gaming',
  'Rumah Tangga',
  'Dapur',
  'Furniture',
  'Dekorasi',
  'Kesehatan & Kecantikan',
  'Perawatan Tubuh',
  'Makanan & Minuman',
  'Otomotif',
  'Olahraga',
  'Mainan & Hobi',
  'Buku',
  'Perlengkapan Kantor',
  'Lainnya'
];

// ==========================================
// ORDER STATUS
// ==========================================

export const ORDER_STATUS = {
  PENDING: {
    value: 'pending',
    label: 'Menunggu Pembayaran',
    color: 'gray',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700'
  },
  PAID: {
    value: 'paid',
    label: 'Sudah Dibayar',
    color: 'blue',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-700'
  },
  PROCESSING: {
    value: 'processing',
    label: 'Sedang Diproses',
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700'
  },
  SHIPPED: {
    value: 'shipped',
    label: 'Sedang Dikirim',
    color: 'purple',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700'
  },
  DELIVERED: {
    value: 'delivered',
    label: 'Sudah Diterima',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700'
  },
  CANCELLED: {
    value: 'cancelled',
    label: 'Dibatalkan',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700'
  },
  RETURNED: {
    value: 'returned',
    label: 'Dikembalikan',
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700'
  }
};

// ==========================================
// PRODUCT STATUS
// ==========================================

export const PRODUCT_STATUS = {
  ACTIVE: {
    value: 'active',
    label: 'Aktif',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700'
  },
  INACTIVE: {
    value: 'inactive',
    label: 'Tidak Aktif',
    color: 'gray',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700'
  },
  OUT_OF_STOCK: {
    value: 'out_of_stock',
    label: 'Stok Habis',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700'
  },
  LOW_STOCK: {
    value: 'low_stock',
    label: 'Stok Rendah',
    color: 'orange',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-700'
  }
};

// ==========================================
// SUBSCRIPTION PLANS
// ==========================================

export const SUBSCRIPTION_PLANS = {
  STARTER: {
    id: 'starter',
    name: 'Starter',
    price: 99000,
    priceMonthly: 99000,
    priceYearly: 990000, // 10 months price
    features: [
      '10 AI Requests per hari',
      'Basic Analytics',
      'Email Support',
      '1 Toko',
      'Export Data (PDF)',
      'Product Management',
      'Order Tracking'
    ],
    limits: {
      aiRequests: 10,
      stores: 1,
      products: 100,
      orders: 500
    },
    popular: false
  },
  PROFESSIONAL: {
    id: 'professional',
    name: 'Professional',
    price: 299000,
    priceMonthly: 299000,
    priceYearly: 2990000,
    features: [
      'Unlimited AI Requests',
      'Advanced Analytics',
      'Priority Support',
      '5 Toko',
      'Export Data (PDF, Excel)',
      'Trend Analysis',
      'Auto Sync Marketplace',
      'Bulk Upload',
      'Custom Reports'
    ],
    limits: {
      aiRequests: -1, // unlimited
      stores: 5,
      products: 1000,
      orders: -1
    },
    popular: true
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 999000,
    priceMonthly: 999000,
    priceYearly: 9990000,
    features: [
      'Unlimited Everything',
      '24/7 Dedicated Support',
      'Unlimited Toko',
      'Custom Integration',
      'API Access',
      'White Label Option',
      'Dedicated Account Manager',
      'Custom AI Training',
      'Priority Processing',
      'Advanced Security'
    ],
    limits: {
      aiRequests: -1,
      stores: -1,
      products: -1,
      orders: -1
    },
    popular: false
  }
};

// ==========================================
// AI FEATURES
// ==========================================

export const AI_FEATURES = {
  CHAT: 'chat',
  DESCRIPTION: 'description',
  IMAGE_SUGGESTION: 'image_suggestion',
  TREND_ANALYSIS: 'trend_analysis',
  PRICE_OPTIMIZATION: 'price_optimization',
  COMPETITOR_ANALYSIS: 'competitor_analysis',
  TITLE_OPTIMIZATION: 'title_optimization'
};

// ==========================================
// NAVIGATION MENUS
// ==========================================

export const SELLER_MENU = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: 'BarChart3'
  },
  {
    id: 'ai-chat',
    label: 'AI Chat Assistant',
    path: '/dashboard/ai-chat',
    icon: 'MessageSquare',
    badge: 'AI'
  },
  {
    id: 'products',
    label: 'Produk',
    path: '/dashboard/products',
    icon: 'ShoppingBag'
  },
  {
    id: 'orders',
    label: 'Pesanan',
    path: '/dashboard/orders',
    icon: 'Package'
  },
  {
    id: 'description-generator',
    label: 'Generator Deskripsi',
    path: '/dashboard/description-generator',
    icon: 'Edit',
    badge: 'AI'
  },
  {
    id: 'image-generator',
    label: 'Generator Gambar',
    path: '/dashboard/image-generator',
    icon: 'Image',
    badge: 'AI'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/dashboard/analytics',
    icon: 'TrendingUp'
  },
  {
    id: 'trend-analysis',
    label: 'Analisis Trend',
    path: '/dashboard/trend-analysis',
    icon: 'LineChart',
    badge: 'AI'
  },
  {
    id: 'settings',
    label: 'Pengaturan',
    path: '/dashboard/settings',
    icon: 'Settings'
  }
];

export const ADMIN_MENU = [
  {
    id: 'admin-dashboard',
    label: 'Dashboard',
    path: '/admin',
    icon: 'Activity'
  },
  {
    id: 'users',
    label: 'Kelola Pengguna',
    path: '/admin/users',
    icon: 'Users'
  },
  {
    id: 'content',
    label: 'Kelola Konten',
    path: '/admin/content',
    icon: 'FileText'
  },
  {
    id: 'subscriptions',
    label: 'Langganan',
    path: '/admin/subscriptions',
    icon: 'CreditCard'
  },
  {
    id: 'payments',
    label: 'Pembayaran',
    path: '/admin/payments',
    icon: 'DollarSign'
  },
  {
    id: 'analytics',
    label: 'Analytics Platform',
    path: '/admin/analytics',
    icon: 'BarChart3'
  },
  {
    id: 'settings',
    label: 'Pengaturan Sistem',
    path: '/admin/settings',
    icon: 'Shield'
  },
  {
    id: 'logs',
    label: 'System Logs',
    path: '/admin/logs',
    icon: 'Database'
  }
];

// ==========================================
// DATE FORMATS
// ==========================================

export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd MMMM yyyy',
  WITH_TIME: 'dd/MM/yyyy HH:mm',
  FULL: 'EEEE, dd MMMM yyyy HH:mm'
};

// ==========================================
// CURRENCY
// ==========================================

export const CURRENCY = {
  CODE: 'IDR',
  SYMBOL: 'Rp',
  LOCALE: 'id-ID'
};

// ==========================================
// PAGINATION
// ==========================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100]
};

// ==========================================
// FILE UPLOAD
// ==========================================

export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// ==========================================
// VALIDATION RULES
// ==========================================

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  PRODUCT_NAME_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 5000
};

// ==========================================
// LOCAL STORAGE KEYS
// ==========================================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  LANGUAGE: 'language'
};

// ==========================================
// API ENDPOINTS (for future backend)
// ==========================================

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  PRODUCTS: {
    LIST: '/products',
    GET: '/products/:id',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id'
  },
  ORDERS: {
    LIST: '/orders',
    GET: '/orders/:id',
    CREATE: '/orders',
    UPDATE: '/orders/:id'
  },
  AI: {
    CHAT: '/ai/chat',
    GENERATE_DESCRIPTION: '/ai/description',
    GENERATE_IMAGE: '/ai/image-suggestion',
    ANALYZE_TREND: '/ai/trend'
  }
};

export default {
  APP_NAME,
  APP_URL,
  USER_ROLES,
  ADMIN_EMAILS,
  PLATFORMS,
  CATEGORIES,
  ORDER_STATUS,
  PRODUCT_STATUS,
  SUBSCRIPTION_PLANS,
  AI_FEATURES,
  SELLER_MENU,
  ADMIN_MENU,
  DATE_FORMATS,
  CURRENCY,
  PAGINATION,
  FILE_UPLOAD,
  VALIDATION,
  STORAGE_KEYS,
  API_ENDPOINTS
};
