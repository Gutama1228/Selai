// Claude AI Service for all AI features

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = import.meta.env.VITE_CLAUDE_MODEL || 'claude-sonnet-4-20250514';

/**
 * Make request to Claude API
 */
const makeClaudeRequest = async (prompt, maxTokens = 1000) => {
  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: maxTokens,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    return { data: data.content[0].text, error: null };
  } catch (error) {
    console.error('Claude API error:', error);
    return { data: null, error: error.message };
  }
};

// ==========================================
// AI CHAT FUNCTIONS
// ==========================================

/**
 * Send chat message to AI
 */
export const sendChatMessage = async (message, context = '') => {
  const prompt = `Kamu adalah AI assistant profesional untuk seller online shop di Indonesia. 
Tugasmu adalah membantu seller meningkatkan penjualan mereka dengan memberikan saran yang actionable, spesifik, dan relevan.

${context ? `Context: ${context}` : ''}

Pertanyaan dari seller: ${message}

Berikan jawaban yang:
1. Langsung to the point
2. Mudah dipahami
3. Actionable (bisa langsung diterapkan)
4. Berikan contoh konkret jika perlu
5. Gunakan bahasa Indonesia yang friendly

Jawab:`;

  return await makeClaudeRequest(prompt, 1500);
};

// ==========================================
// PRODUCT DESCRIPTION GENERATOR
// ==========================================

/**
 * Generate product description
 */
export const generateProductDescription = async (productName, platform, category = '', specs = '') => {
  const prompt = `Buatkan deskripsi produk yang SANGAT MENARIK dan PERSUASIF untuk "${productName}" yang akan dijual di platform ${platform}.

${category ? `Kategori: ${category}` : ''}
${specs ? `Spesifikasi: ${specs}` : ''}

Format yang harus kamu buat:

📌 JUDUL PRODUK (catchy & SEO-friendly)
Buat judul yang menarik perhatian dan mengandung keyword penting.

📝 DESKRIPSI UTAMA
Paragraf pembuka yang powerful dan membuat orang tertarik (2-3 kalimat).

✨ KEUNGGULAN PRODUK
• Keunggulan 1 - Jelaskan benefit untuk pembeli
• Keunggulan 2 - Fokus pada solusi masalah
• Keunggulan 3 - Highlight unique selling point
• Keunggulan 4 - Tambahkan social proof jika relevan
(minimal 4-6 keunggulan)

📦 SPESIFIKASI
Tulis spesifikasi lengkap dalam format yang rapi dan mudah dibaca.

💯 KENAPA HARUS BELI DI TOKO KAMI?
• Garansi resmi
• Pengiriman cepat
• Harga terbaik
• Customer service responsive
(sesuaikan dengan benefit toko)

🔥 CALL TO ACTION
Kalimat persuasif yang mendorong pembeli untuk checkout sekarang.

#️⃣ HASHTAG
Berikan 8-12 hashtag yang relevan untuk SEO di marketplace.

PENTING:
- Gunakan emoji yang relevan untuk menarik perhatian
- Tulis dalam bahasa Indonesia yang persuasif
- Fokus pada benefit, bukan hanya fitur
- Buat pembeli merasa "HARUS BELI SEKARANG"
- Optimalkan untuk SEO marketplace

Buatkan sekarang:`;

  return await makeClaudeRequest(prompt, 2000);
};

// ==========================================
// IMAGE SUGGESTIONS GENERATOR
// ==========================================

/**
 * Generate image suggestions for product
 */
export const generateImageSuggestions = async (productName, category = '') => {
  const prompt = `Sebagai fotografer produk profesional, berikan saran LENGKAP dan DETAIL untuk membuat foto produk "${productName}"${category ? ` (kategori: ${category})` : ''} yang SEMPURNA untuk dijual di e-commerce.

Berikan panduan dalam format:

📸 KONSEP FOTO (3-5 angle berbeda)
Jelaskan setiap angle dengan detail:
1. [Nama angle] - Deskripsi lengkap posisi kamera dan objek
2. [Nama angle] - ...
dst

💡 LIGHTING SETUP
- Jenis cahaya yang ideal (natural/studio/kombinasi)
- Posisi cahaya utama
- Pencahayaan tambahan yang dibutuhkan
- Tips menghindari shadow yang buruk

🎨 BACKGROUND & PROPS
- Warna background yang cocok (berikan 2-3 pilihan)
- Props pendukung yang bisa digunakan
- Konsep styling yang menarik
- Tips komposisi visual

📐 KOMPOSISI & FRAMING
- Rule of thirds
- Spacing & margins
- Focus point
- Depth of field suggestions

✨ TIPS EDITING
- Color grading yang cocok
- Brightness & contrast adjustments
- Retouching areas
- Format & size untuk marketplace

🎯 DO's & DON'Ts
DO:
• [Tip 1]
• [Tip 2]
• [Tip 3]

DON'T:
• [Tip 1]
• [Tip 2]
• [Tip 3]

💰 BUDGET OPTIONS
- Low budget setup (HP + DIY)
- Medium budget setup
- Professional setup

Berikan saran yang:
- Praktis dan bisa diterapkan langsung
- Sesuai dengan standar marketplace Indonesia
- Meningkatkan conversion rate
- Budget-friendly tapi tetap profesional

Jawab dalam bahasa Indonesia:`;

  return await makeClaudeRequest(prompt, 2000);
};

// ==========================================
// TREND ANALYSIS
// ==========================================

/**
 * Analyze market trends
 */
export const analyzeTrends = async (category, platform = 'all') => {
  const prompt = `Sebagai market analyst e-commerce Indonesia, berikan analisis TREND TERKINI untuk kategori "${category}"${platform !== 'all' ? ` di platform ${platform}` : ' di berbagai platform (Shopee, Tokopedia, Lazada, TikTok Shop)'}.

Analisis harus mencakup:

📊 TREND PRODUK TERPOPULER
1. [Nama produk/niche] - Alasan trending
2. [Nama produk/niche] - ...
3. dst (minimal 5 produk)

📈 INSIGHT PENJUALAN
- Produk yang sedang naik daun
- Produk yang mulai menurun
- Seasonal patterns
- Price range yang paling laku

🎯 TARGET MARKET
- Demografi pembeli utama
- Behavioral patterns
- Pain points yang bisa disolve
- Preferred shopping times

💡 STRATEGI REKOMENDASI
1. **Produk yang Harus Dijual**
   - [Produk A] - Alasan & potential profit
   - [Produk B] - ...

2. **Strategi Pricing**
   - Price range optimal
   - Discount strategies
   - Bundle recommendations

3. **Marketing Tips**
   - Content ideas
   - Hashtag suggestions
   - Best posting times
   - Competitor analysis

4. **Inventory Planning**
   - Stock recommendations
   - Best suppliers tips
   - MOQ considerations

🚀 ACTION PLAN
Langkah konkret yang bisa dilakukan MINGGU INI:
1. [Action 1]
2. [Action 2]
3. [Action 3]
(minimal 5 actions)

⚠️ RED FLAGS (Produk/strategi yang harus dihindari)
• [Warning 1]
• [Warning 2]
• [Warning 3]

Berikan analisis yang:
- Based on real market conditions
- Actionable dan praktis
- Fokus pada profit optimization
- Up-to-date dengan trend terkini

Jawab dalam bahasa Indonesia:`;

  return await makeClaudeRequest(prompt, 2500);
};

// ==========================================
// PRICE OPTIMIZATION
// ==========================================

/**
 * Optimize product pricing
 */
export const optimizePrice = async (productName, currentPrice, category, competitorPrices = []) => {
  const competitorInfo = competitorPrices.length > 0 
    ? `Harga kompetitor: ${competitorPrices.join(', ')}` 
    : '';

  const prompt = `Sebagai pricing strategist untuk e-commerce, analisis dan berikan rekomendasi harga optimal untuk:

Produk: ${productName}
Kategori: ${category}
Harga saat ini: Rp ${currentPrice.toLocaleString()}
${competitorInfo}

Berikan analisis dalam format:

💰 ANALISIS HARGA SAAT INI
- Apakah harga sudah optimal?
- Positioning di market (premium/mid/budget)
- Competitive advantage/disadvantage

📊 REKOMENDASI HARGA
- Harga optimal: Rp [jumlah]
- Alasan & justifikasi
- Expected impact on sales
- Profit margin analysis

🎯 STRATEGI PRICING
1. **Base Price Strategy**
   - Harga dasar yang recommended
   - Psychological pricing tips
   
2. **Discount Strategy**
   - Kapan sebaiknya diskon
   - Berapa % diskon yang ideal
   - Flash sale recommendations

3. **Bundle Pricing**
   - Bundle suggestions
   - Bundle pricing
   - Upsell opportunities

4. **Competitor Response**
   - Cara respond terhadap price war
   - Differentiation strategies

📈 REVENUE PROJECTION
- Current scenario vs Recommended scenario
- Expected conversion rate improvement
- Estimated revenue increase

⚠️ RISKS & MITIGATION
- Potential risks dari price change
- Mitigation strategies
- Testing recommendations (A/B testing)

Berikan rekomendasi yang:
- Data-driven
- Fokus maximize profit (bukan hanya sales volume)
- Sustainable long-term
- Praktis untuk diterapkan

Jawab dalam bahasa Indonesia:`;

  return await makeClaudeRequest(prompt, 1800);
};

// ==========================================
// COMPETITOR ANALYSIS
// ==========================================

/**
 * Analyze competitors
 */
export const analyzeCompetitors = async (productName, competitorInfo = '') => {
  const prompt = `Analisis kompetitor untuk produk "${productName}".

${competitorInfo ? `Info kompetitor:\n${competitorInfo}` : 'Berikan analisis umum untuk produk ini.'}

Berikan analisis mendalam:

🔍 COMPETITIVE LANDSCAPE
- Siapa main players
- Market share estimation
- Strength & weakness setiap kompetitor

💡 DIFFERENTIATION OPPORTUNITIES
- Gap di market yang bisa dimanfaatkan
- Unique value proposition ideas
- Positioning recommendations

📊 BENCHMARKING
- Product quality comparison
- Price positioning
- Service level
- Marketing effectiveness

🎯 ACTIONABLE STRATEGIES
1. Short-term (1-3 bulan):
   - [Strategy 1]
   - [Strategy 2]
   
2. Long-term (6-12 bulan):
   - [Strategy 1]
   - [Strategy 2]

Fokus pada cara MENGALAHKAN kompetitor dengan smart strategies!

Jawab dalam bahasa Indonesia:`;

  return await makeClaudeRequest(prompt, 2000);
};

// ==========================================
// TITLE OPTIMIZER
// ==========================================

/**
 * Optimize product title for SEO
 */
export const optimizeTitle = async (currentTitle, platform, category = '') => {
  const prompt = `Optimalkan judul produk untuk marketplace ${platform}.

Judul saat ini: "${currentTitle}"
${category ? `Kategori: ${category}` : ''}

Berikan 5 alternatif judul yang:
1. SEO-optimized dengan keyword yang tepat
2. Eye-catching dan menarik perhatian
3. Sesuai dengan aturan character limit ${platform}
4. Mengandung benefit/unique selling point
5. Menggunakan power words yang efektif

Format:
1. [Judul 1] - Penjelasan kenapa judul ini bagus
2. [Judul 2] - ...
dst

Plus berikan TIPS UMUM untuk judul yang convert tinggi di ${platform}.

Jawab dalam bahasa Indonesia:`;

  return await makeClaudeRequest(prompt, 1200);
};

export default {
  sendChatMessage,
  generateProductDescription,
  generateImageSuggestions,
  analyzeTrends,
  optimizePrice,
  analyzeCompetitors,
  optimizeTitle
};
