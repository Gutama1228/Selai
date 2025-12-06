# 🚀 SellerAI Pro - Platform AI untuk Online Seller Indonesia

Platform lengkap berbasis AI untuk membantu seller online shop dari berbagai marketplace (Shopee, Tokopedia, Lazada, TikTok Shop, dll) meningkatkan penjualan dan efisiensi bisnis.

![SellerAI Pro](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Fitur Utama

### 🛍️ Untuk Seller
- **🏠 Landing Page** - Pengenalan lengkap tentang platform
- **🔐 Login & Register** - Sistem autentikasi user
- **📊 Dashboard Interaktif** - Monitoring penjualan, revenue, dan statistik real-time
- **💬 AI Chat Assistant** - Konsultasi strategi penjualan 24/7 dengan Claude AI
- **✍️ Generator Deskripsi Produk** - Buat deskripsi produk menarik & SEO-friendly otomatis
- **🎨 Image Generator AI** - Saran untuk foto produk dengan AI
- **📦 Manajemen Produk** - Kelola produk dari berbagai platform
- **📋 Manajemen Pesanan** - Track dan proses pesanan dengan mudah
- **📈 Analisis Trend** - Prediksi trend pasar dan rekomendasi produk
- **⚙️ Pengaturan Akun** - Customisasi profil dan preferensi

### 👑 Panel Admin (Protected)
- **🎯 Dashboard Admin** - Monitoring seluruh platform & statistik
- **👥 Kelola Pengguna** - CRUD user management (Create, Read, Update, Delete)
- **📄 Kelola Konten Website** - Edit landing page, fitur, dan paket harga
- **🔒 Admin Protection** - Hanya email tertentu yang bisa akses admin panel
- **📊 Analytics Platform** - Insight mendalam tentang performa platform

## 🔐 Admin Protection

Admin panel hanya bisa diakses oleh email yang sudah disetujui:
- `admin@sellerai.com`
- `owner@sellerai.com`

Email lainnya otomatis jadi Seller. Edit di `src/App.jsx` baris `ADMIN_EMAILS`.

## 🛠️ Teknologi yang Digunakan

- **React 18.2** - UI Framework
- **Vite 5.0** - Build tool & dev server super cepat
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Claude AI API** - Advanced AI capabilities
- **Vercel** - Hosting & deployment

## 📦 Instalasi

### Prerequisites
- Node.js 16+ 
- npm atau yarn atau pnpm
- Git

### 1. Clone Repository
```bash
git clone https://github.com/username/seller-ai-platform.git
cd seller-ai-platform
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

### 3. Jalankan Development Server
```bash
npm run dev
# atau
yarn dev
```

Buka browser di `http://localhost:3000`

### 4. Build untuk Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

## 🚀 Deployment ke Vercel

### Cara 1: Melalui GitHub (Recommended)

1. **Push code ke GitHub:**
```bash
git add .
git commit -m "Initial commit - SellerAI Platform"
git branch -M main
git remote add origin https://github.com/USERNAME/seller-ai-platform.git
git push -u origin main
```

2. **Deploy ke Vercel:**
   - Login ke [vercel.com](https://vercel.com)
   - Klik **"Add New Project"**
   - Import repository dari GitHub
   - Vercel akan auto-detect Vite framework
   - Klik **"Deploy"**
   - Selesai! ✅

### Cara 2: Melalui Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 📁 Struktur Project

```
seller-ai-platform/
├── public/
│   └── (favicon, images, etc)
├── src/
│   ├── App.jsx              # Main component with all pages
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vercel.json
├── vite.config.js
└── README.md
```

## 🎯 Cara Menggunakan

### Landing Page
1. Buka website
2. Lihat pengenalan fitur lengkap
3. Klik "Daftar Gratis" atau "Masuk"

### Register & Login
**Untuk Seller:**
- Gunakan email apapun (contoh: `seller@test.com`)
- Password minimal 8 karakter
- Otomatis redirect ke Seller Dashboard

**Untuk Admin:**
- Gunakan email: `admin@sellerai.com`
- Password apapun (demo mode)
- Otomatis redirect ke Admin Dashboard

### Mode Seller
1. **Dashboard** - Lihat overview penjualan
2. **AI Chat** - Tanya strategi ke AI
3. **Products** - Kelola produk
4. **Orders** - Track pesanan
5. **Logout** - Keluar dari akun

### Mode Admin
1. **Dashboard Admin** - Monitoring platform
2. **Kelola Pengguna** - CRUD users
3. **Kelola Konten** - Edit landing page
4. **Logout** - Keluar dari admin panel

## 🔧 Konfigurasi

### Menambah Admin Email
Edit file `src/App.jsx`:
```javascript
const ADMIN_EMAILS = [
  'admin@sellerai.com', 
  'owner@sellerai.com',
  'youremail@domain.com'  // Tambah email baru
];
```

### Ganti Warna Theme
Edit file `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#667eea', // Ganti warna primary
  },
  secondary: {
    500: '#a855f7', // Ganti warna secondary
  }
}
```

## 🐛 Troubleshooting

### Error: "Cannot find module 'react'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Failed to build"
- Pastikan Node.js versi 16+
- Cek semua file sudah ada
- Cek tidak ada typo di config files

### Port 3000 sudah digunakan
Edit `vite.config.js`:
```javascript
server: {
  port: 3001, // Ganti port
}
```

### AI Chat tidak berfungsi
- Claude API sudah built-in, tidak perlu setup
- Pastikan internet connection stabil
- Cek console browser (F12) untuk error detail

## 📈 Fitur Mendatang

- [ ] Real-time notifications
- [ ] Multi-language support (EN, ID)
- [ ] Payment gateway integration
- [ ] Advanced analytics & reports
- [ ] Mobile app (React Native)
- [ ] API integration (Shopee, Tokopedia, dll)
- [ ] Email notifications
- [ ] Export data to Excel/PDF

## 🤝 Contributing

Contributions are welcome! Untuk contribute:

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail lengkap.

## 👨‍💻 Author

**SellerAI Pro Team**
- Website: [sellerai.pro](https://sellerai.pro)
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: support@sellerai.pro

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [Anthropic Claude AI](https://www.anthropic.com/)
- [Vercel](https://vercel.com/)

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:

- 📧 Email: support@sellerai.pro
- 💬 Discord: [Join Community](https://discord.gg/sellerai)
- 🐦 Twitter: [@selleraipro](https://twitter.com/selleraipro)
- 📖 Docs: [docs.sellerai.pro](https://docs.sellerai.pro)

## ⭐ Star History

Jika project ini membantu, berikan ⭐ di GitHub!

---

**Made with ❤️ for Indonesian Sellers**

**Happy Selling! 🚀**
