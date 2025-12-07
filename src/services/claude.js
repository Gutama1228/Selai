// src/services/claude.js
// AI Service using Claude API (Anthropic)

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

/**
 * Chat with AI Assistant
 */
export const chatWithAI = async (message, conversationHistory = []) => {
  try {
    const messages = [
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 2000,
        messages: messages,
        system: `Kamu adalah AI Assistant untuk SellerAI Pro, platform yang membantu seller online shop Indonesia.

Tugasmu:
- Membantu seller dengan strategi penjualan dan marketing
- Memberikan tips optimasi produk dan deskripsi
- Menjawab pertanyaan tentang bisnis online
- Memberikan analisis trend pasar
- Tips customer service dan handling komplain
- Saran pricing dan promosi

Selalu jawab dalam Bahasa Indonesia yang ramah dan profesional. Berikan jawaban yang praktis, actionable, dan mudah dipahami. Gunakan emoji secara natural untuk membuat percakapan lebih friendly.`
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    const aiMessage = data.content
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('\n');

    return {
      data: {
        message: aiMessage,
        conversationHistory: [
          ...messages,
          { role: 'assistant', content: aiMessage }
        ]
      },
      error: null
    };
  } catch (error) {
    console.error('AI Chat Error:', error);
    
    // Fallback response
    return {
      data: {
        message: getFallbackResponse(message),
        conversationHistory: [
          ...conversationHistory,
          { role: 'user', content: message },
          { role: 'assistant', content: getFallbackResponse(message) }
        ]
      },
      error: null
    };
  }
};

/**
 * Generate product description with AI
 */
export const generateProductDescription = async (productInfo) => {
  try {
    const prompt = `Generate deskripsi produk yang menarik dan SEO-friendly dalam Bahasa Indonesia untuk:

Nama Produk: ${productInfo.name}
Kategori: ${productInfo.category || 'Umum'}
Harga: Rp ${productInfo.price?.toLocaleString('id-ID') || '-'}
Platform: ${productInfo.platform || '-'}
${productInfo.features ? `Fitur: ${productInfo.features}` : ''}
${productInfo.targetAudience ? `Target Pembeli: ${productInfo.targetAudience}` : ''}

Buat deskripsi yang:
1. Opening hook yang menarik perhatian
2. Penjelasan manfaat utama produk (bukan hanya fitur)
3. Spesifikasi lengkap dalam bullet points
4. Social proof atau trust signals
5. Call to action yang persuasif
6. SEO-friendly dengan keyword natural

Format:
- Paragraf pembuka (2-3 kalimat)
- Manfaat utama (3-5 poin)
- Spesifikasi detail
- Paragraf penutup dengan CTA

Panjang ideal: 200-300 kata. Gunakan emoji secara natural.`;

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const description = data.content
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('\n');

    return { data: { description }, error: null };
  } catch (error) {
    console.error('Generate Description Error:', error);
    
    // Fallback template
    return {
      data: { description: getDescriptionTemplate(productInfo) },
      error: null
    };
  }
};

/**
 * Generate image suggestions for product photos
 */
export const generateImageSuggestions = async (productInfo) => {
  try {
    const prompt = `Berikan 5 saran foto produk e-commerce yang menarik dan profesional untuk:

Produk: ${productInfo.name}
Kategori: ${productInfo.category || 'Umum'}
Platform: ${productInfo.platform || 'Multi-platform'}

Untuk setiap saran, jelaskan:
1. Jenis foto (Hero Shot, Detail, Lifestyle, dll)
2. Angle dan komposisi
3. Background dan lighting
4. Props yang dibutuhkan (jika ada)
5. Tips eksekusi

Format: Numbered list dengan penjelasan detail tapi concise untuk setiap poin.`;

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const suggestions = data.content
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('\n');

    return { data: { suggestions }, error: null };
  } catch (error) {
    console.error('Generate Image Suggestions Error:', error);
    
    return {
      data: { suggestions: getImageSuggestionsTemplate(productInfo.category) },
      error: null
    };
  }
};

/**
 * Analyze market trends
 */
export const analyzeTrends = async (category, keywords = [], platform = '') => {
  try {
    const prompt = `Analisis trend pasar e-commerce Indonesia untuk:

Kategori: ${category}
${keywords.length > 0 ? `Keywords: ${keywords.join(', ')}` : ''}
${platform ? `Platform: ${platform}` : ''}

Berikan analisis komprehensif:

1. TREND SAAT INI (3-5 poin)
   - Apa yang sedang hot di kategori ini
   - Consumer behavior terbaru
   - Price point yang laku

2. PRODUK YANG NAIK DAUN (3-4 produk)
   - Jenis produk spesifik
   - Mengapa sedang trending
   - Estimasi demand

3. STRATEGI PENJUALAN (5 strategi)
   - Actionable tips marketing
   - Content strategy
   - Pricing strategy
   - Promotion ideas

4. PREDIKSI 3 BULAN KE DEPAN
   - Trend yang akan datang
   - Opportunity untuk seller
   - Risiko yang perlu diwaspadai

Format dengan struktur jelas menggunakan heading, bullet points, dan emoji.`;

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 2500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.content
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('\n');

    return { data: { analysis }, error: null };
  } catch (error) {
    console.error('Analyze Trends Error:', error);
    
    return {
      data: { analysis: getTrendsTemplate(category) },
      error: null
    };
  }
};

/**
 * Optimize product title
 */
export const optimizeProductTitle = async (currentTitle, category, keywords = []) => {
  try {
    const prompt = `Optimize judul produk untuk e-commerce (maksimal 70 karakter):

Judul Saat Ini: ${currentTitle}
Kategori: ${category}
${keywords.length > 0 ? `Keywords Target: ${keywords.join(', ')}` : ''}

Buat 3 alternatif judul yang:
1. SEO-friendly dengan keyword penting di awal
2. Clear dan descriptive
3. Menarik perhatian buyer
4. Maksimal 70 karakter
5. Tidak clickbait

Format: Numbered list, langsung judul tanpa penjelasan panjang.`;

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const suggestions = data.content
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('\n');

    return { data: { suggestions }, error: null };
  } catch (error) {
    console.error('Optimize Title Error:', error);
    return { data: null, error: error.message };
  }
};

/**
 * Suggest product pricing
 */
export const suggestPricing = async (productInfo, competitorPrices = []) => {
  try {
    const prompt = `Analisis dan saran pricing untuk:

Produk: ${productInfo.name}
Kategori: ${productInfo.category}
Modal: Rp ${productInfo.cost?.toLocaleString('id-ID') || '-'}
Harga Saat Ini: Rp ${productInfo.price?.toLocaleString('id-ID') || '-'}
${competitorPrices.length > 0 ? `Harga Kompetitor: ${competitorPrices.map(p => `Rp ${p.toLocaleString('id-ID')}`).join(', ')}` : ''}

Berikan:
1. Rekomendasi harga optimal
2. Range harga kompetitif
3. Margin profit yang sehat
4. Strategi pricing (penetration/premium/competitive)
5. Tips untuk maximize profit tanpa kehilangan customers

Format: Structured dengan angka konkret dan reasoning.`;

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.content
      .filter(item => item.type === 'text')
      .map(item => item.text)
      .join('\n');

    return { data: { analysis }, error: null };
  } catch (error) {
    console.error('Suggest Pricing Error:', error);
    return { data: null, error: error.message };
  }
};

// ========== FALLBACK TEMPLATES ==========

function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('strategi') || lowerMessage.includes('tips')) {
    return `💡 Strategi Penjualan Online yang Efektif:

1. **Optimasi Produk**
   📸 Gunakan foto berkualitas tinggi (min 5 foto berbeda)
   ✍️ Deskripsi detail & engaging
   🔍 Keyword SEO untuk searchability

2. **Marketing & Promosi**
   ⚡ Manfaatkan flash sale & voucher
   📱 Aktif di social media (IG, TikTok)
   💌 Email marketing untuk repeat customers

3. **Customer Service Excellence**
   ⏱️ Respon cepat (<5 menit)
   🤝 Ramah & solutif
   ⭐ Follow up setelah pembelian

4. **Analisis & Optimasi**
   📊 Monitor produk best seller
   💰 Track competitor pricing
   💬 Baca & respond customer reviews

Ada aspek spesifik yang ingin Anda dalami?`;
  }
  
  return `👋 Halo! Saya AI Assistant SellerAI Pro siap membantu Anda!

Saya bisa bantu dengan:
✅ Strategi penjualan & marketing
✅ Optimasi produk & deskripsi
✅ Analisis trend pasar
✅ Tips customer service
✅ Pricing strategy
✅ Social media content ideas

Silakan tanyakan apa saja tentang bisnis online shop Anda! 🚀`;
}

function getDescriptionTemplate(productInfo) {
  return `✨ ${productInfo.name} - Solusi Terbaik untuk Kebutuhan Anda!

${productInfo.name} hadir dengan kualitas premium yang dirancang khusus untuk memberikan pengalaman terbaik. Produk ini cocok untuk Anda yang menginginkan kombinasi sempurna antara kualitas, fungsionalitas, dan value for money.

🌟 KEUNGGULAN UTAMA:
• Kualitas material premium yang tahan lama
• Desain modern dan fungsional
• Value for money dengan performa maksimal
• Mudah digunakan untuk semua kalangan

💎 SPESIFIKASI:
• Kategori: ${productInfo.category || 'Premium Product'}
• Platform: ${productInfo.platform || 'Multi-platform'}
• Kualitas: Terjamin Original

💰 HARGA SPESIAL: Rp ${productInfo.price?.toLocaleString('id-ID') || '-'}

📦 READY STOCK & SIAP KIRIM!
🚚 Pengiriman cepat & aman dengan bubble wrap
💯 Garansi kepuasan pelanggan
⭐ Customer service responsif

Jangan lewatkan kesempatan emas ini! Order sekarang juga dan rasakan perbedaannya! 🛒

#${productInfo.name.replace(/\s+/g, '')} #KualitasTerjamin #PromoSpesial`;
}

function getImageSuggestionsTemplate(category) {
  return `📸 Saran Foto Produk untuk ${category}:

1. **Hero Shot - Main Product**
   • Angle: Straight-on dengan slight angle dari atas (eye-level)
   • Background: Putih bersih atau neutral solid color
   • Lighting: Soft natural light atau 2-point lighting setup
   • Komposisi: Produk center frame, rule of thirds
   • Props: Minimal, fokus pada produk

2. **Detail Shot - Close Up Features**
   • Zoom ke fitur unik atau quality indicators
   • Texture, material, branding visible
   • Background blur untuk emphasis
   • Macro lens jika ada

3. **Lifestyle Shot - In Context**
   • Tunjukkan produk being used/worn
   • Model atau tangan untuk scale
   • Setting natural sesuai product usage
   • Storytelling element

4. **Flat Lay - Top Down View**
   • Susun produk dengan complementary items
   • Grid atau geometric composition
   • Color palette harmonis
   • Props: minimal & relevant

5. **Size Reference - Scale Comparison**
   • Bandingkan dengan objek familiar
   • Multiple angle views
   • Include ruler/measuring tape
   • Hand/person for scale

💡 Tips: Gunakan tripod untuk consistency, natural lighting optimal jam 9-11 pagi, edit minimal (adjust brightness/contrast), consistent style across all photos!`;
}

function getTrendsTemplate(category) {
  return `📊 Analisis Trend ${category}:

📈 TREND SAAT INI:
• Shift ke produk sustainable & eco-friendly
• Desain minimalis modern semakin diminati
• Multi-fungsi dan space-saving jadi prioritas
• Personalisasi & customization tinggi

🔥 PRODUK YANG NAIK DAUN:
• Bundle/paket hemat (value proposition)
• Limited edition items (scarcity effect)
• Kolaborasi brand lokal (supporting local)
• Produk dengan story/purpose (emotional connection)

💡 STRATEGI PENJUALAN:
1. Focus pada USP yang jelas & kuat
2. Content marketing via TikTok & Instagram Reels
3. UGC (User Generated Content) & authentic reviews
4. Flash sale strategis (weekend, end of month, payday)
5. Loyalty program & repeat customer incentives

🎯 TIPS MARKETING:
• Video pendek (<60 detik) lebih engaging
• Before-after demonstration powerful
• Micro-influencer untuk engagement rate tinggi
• Storytelling > hard selling
• Interactive content (polls, quiz, giveaway)

🔮 PREDIKSI 3 BULAN:
• Demand naik saat seasonal events (Ramadan, Lebaran, etc)
• Social commerce makin dominan (live selling)
• AI & automation tools jadi must-have
• Personalization & customer experience jadi diferensiator

💡 Selalu monitor trend, listen to customer feedback, dan stay agile! 🚀`;
}

export default {
  chatWithAI,
  generateProductDescription,
  generateImageSuggestions,
  analyzeTrends,
  optimizeProductTitle,
  suggestPricing
};
