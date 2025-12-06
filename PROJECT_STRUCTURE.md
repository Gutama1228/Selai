# 🏗️ SellerAI Pro - Professional Project Structure

## 📁 Struktur Folder Lengkap

```
seller-ai-platform/
├── public/
│   ├── images/
│   ├── favicon.ico
│   └── og-image.png
│
├── src/
│   ├── api/                      # API Routes (Backend)
│   │   ├── auth.js               # Authentication API
│   │   ├── products.js           # Products CRUD API
│   │   ├── orders.js             # Orders API
│   │   ├── users.js              # User management API
│   │   └── ai.js                 # AI integration API
│   │
│   ├── components/               # Reusable Components
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── AdminLayout.jsx
│   │   │
│   │   ├── seller/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── OrderCard.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── ChatMessage.jsx
│   │   │
│   │   └── admin/
│   │       ├── UserTable.jsx
│   │       ├── AnalyticsChart.jsx
│   │       └── ContentEditor.jsx
│   │
│   ├── pages/                    # All Pages (Separated)
│   │   ├── public/
│   │   │   ├── LandingPage.jsx   # Home/Landing
│   │   │   ├── LoginPage.jsx     # Login
│   │   │   ├── RegisterPage.jsx  # Register
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── Pricing.jsx
│   │   │
│   │   ├── seller/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AIChat.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductAdd.jsx
│   │   │   ├── ProductEdit.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── OrderDetail.jsx
│   │   │   ├── DescriptionGenerator.jsx
│   │   │   ├── ImageGenerator.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── TrendAnalysis.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── UserManagement.jsx
│   │       ├── UserDetail.jsx
│   │       ├── ContentManagement.jsx
│   │       ├── PaymentManagement.jsx
│   │       ├── SubscriptionManagement.jsx
│   │       ├── PlatformAnalytics.jsx
│   │       ├── SystemSettings.jsx
│   │       └── AdminLogs.jsx
│   │
│   ├── context/                  # State Management
│   │   ├── AuthContext.jsx       # User authentication state
│   │   ├── ProductContext.jsx    # Products state
│   │   ├── OrderContext.jsx      # Orders state
│   │   └── ThemeContext.jsx      # Theme/UI state
│   │
│   ├── hooks/                    # Custom Hooks
│   │   ├── useAuth.js
│   │   ├── useProducts.js
│   │   ├── useOrders.js
│   │   ├── useAI.js
│   │   └── useDatabase.js
│   │
│   ├── services/                 # External Services
│   │   ├── supabase.js          # Supabase config
│   │   ├── vercelKV.js          # Vercel KV config
│   │   ├── claude.js            # Claude AI service
│   │   ├── stripe.js            # Payment service
│   │   └── analytics.js         # Analytics service
│   │
│   ├── utils/                    # Utility Functions
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── validation.js
│   │   ├── formatters.js
│   │   └── permissions.js
│   │
│   ├── App.jsx                   # Main App Router
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
│
├── .env                          # Environment variables (local)
├── .env.example                  # Example env file
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── README.md
```

## 🗄️ Database Architecture

### Database 1: Supabase (Auth & Users)
**Purpose:** Authentication, User management
**Tables:**
- `users` - User profiles
- `auth_logs` - Login history
- `sessions` - Active sessions

**Free Tier:** 500MB database, 50,000 monthly active users

### Database 2: Vercel KV (Products & Orders)
**Purpose:** Fast key-value storage for products, orders
**Collections:**
- `products:{userId}` - User products
- `orders:{userId}` - User orders
- `cache:*` - Cache data

**Free Tier:** 256MB, 30M requests/month

### Database 3: Vercel Postgres (Analytics & Logs)
**Purpose:** Analytics, logs, reports
**Tables:**
- `analytics` - Usage analytics
- `ai_requests` - AI usage tracking
- `subscriptions` - Payment & subscription
- `admin_logs` - Admin activity logs

**Free Tier:** 256MB, 60 hours compute/month

### Database 4: MongoDB Atlas (Content & Settings)
**Purpose:** CMS content, settings
**Collections:**
- `website_content` - Landing page content
- `pricing_plans` - Pricing information
- `system_settings` - App configuration
- `notifications` - User notifications

**Free Tier:** 512MB storage

## 🔐 Environment Variables

```env
# Supabase (Auth & Users)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# Vercel KV (Products & Orders)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Vercel Postgres (Analytics)
POSTGRES_URL=
POSTGRES_PRISMA_URL=

# MongoDB Atlas (Content)
MONGODB_URI=

# Claude AI
VITE_CLAUDE_API_KEY=

# Stripe (Payment)
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Admin Config
VITE_ADMIN_EMAILS=admin@sellerai.com,owner@sellerai.com
```

## 🚀 Key Features Per Module

### Landing Page
- Hero section with animations
- Features showcase
- Pricing plans
- Testimonials
- FAQ section
- CTA sections

### Authentication
- Email/Password login
- Social login (Google, Facebook)
- Email verification
- Forgot password
- Session management
- Protected routes

### Seller Dashboard
- Real-time statistics
- Revenue charts
- Quick actions
- Recent orders
- Low stock alerts
- AI recommendations

### Products Management
- CRUD operations
- Bulk upload
- Image management
- Category management
- Inventory tracking
- Multi-platform sync

### Orders Management
- Order tracking
- Status updates
- Customer details
- Invoice generation
- Export to Excel/PDF
- Shipping integration

### AI Features
- Chat assistant (Claude)
- Description generator
- Image suggestions
- Trend analysis
- Price optimization
- Competitor analysis

### Admin Panel
- User management (CRUD)
- Content management
- Analytics dashboard
- Subscription management
- Payment tracking
- System logs
- Email broadcasts

### Payment & Subscription
- Multiple plans (Starter, Pro, Enterprise)
- Stripe integration
- Invoice generation
- Auto-renewal
- Payment history
- Refund management

## 📊 Component Hierarchy

```
App
├── AuthProvider
│   ├── PublicRoutes
│   │   ├── LandingPage
│   │   ├── LoginPage
│   │   └── RegisterPage
│   │
│   └── ProtectedRoutes
│       ├── SellerRoutes
│       │   ├── SellerLayout
│       │   │   ├── Sidebar
│       │   │   ├── Header
│       │   │   └── Dashboard
│       │   │       ├── StatsCard
│       │   │       └── RecentOrders
│       │   └── [Other Seller Pages]
│       │
│       └── AdminRoutes
│           └── AdminLayout
│               ├── AdminSidebar
│               ├── AdminHeader
│               └── AdminDashboard
│                   ├── UserStats
│                   └── PlatformMetrics
```

## 🔄 Data Flow

```
User Action
    ↓
Component
    ↓
Context/Hook
    ↓
API Service
    ↓
Database
    ↓
Response
    ↓
Update UI
```

## 📦 Package Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@supabase/supabase-js": "^2.38.0",
    "@vercel/kv": "^1.0.0",
    "axios": "^1.6.0",
    "lucide-react": "^0.263.1",
    "recharts": "^2.10.0",
    "date-fns": "^2.30.0",
    "react-hot-toast": "^2.4.1",
    "zustand": "^4.4.0"
  }
}
```

## 🎯 Implementation Priority

**Phase 1: Core Setup (Week 1)**
- ✅ Project structure
- ✅ Database setup (all 4 databases)
- ✅ Authentication system
- ✅ Basic routing

**Phase 2: Seller Features (Week 2)**
- ✅ Dashboard
- ✅ Products CRUD
- ✅ Orders management
- ✅ AI Chat

**Phase 3: AI Features (Week 3)**
- ✅ Description generator
- ✅ Image generator
- ✅ Trend analysis
- ✅ Analytics

**Phase 4: Admin Panel (Week 4)**
- ✅ User management
- ✅ Content management
- ✅ Platform analytics
- ✅ System settings

**Phase 5: Payment & Polish (Week 5)**
- ✅ Stripe integration
- ✅ Subscription management
- ✅ Email notifications
- ✅ Bug fixes & optimization

Apakah Anda ingin saya mulai membuat semua file dengan struktur ini?
