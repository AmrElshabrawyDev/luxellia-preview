/**
 * Luxellia Parfums — Products Catalog Page Controller
 * Version: 1.3.1
 * Features:
 * - 12 Curated Mock Perfume Products (mock: true)
 * - Real client-side search, filtering, and sorting (AND logic)
 * - Safe URLSearchParams parsing with strict allowlist
 * - Safe DOM creation (Zero innerHTML for product data)
 * - Accessible Mobile Filter Drawer & Quick View Modal with focus trap & Escape handling
 * - "عرض المزيد" progressive revelation
 * - Shared mock cart integration via window.__LUXELLIA_CART__
 */

(function () {
  'use strict';

  // 1. Mock Products Dataset (12 Curated Fragrances)
  const MOCK_PRODUCTS = [
    {
      id: 'p1',
      sku: 'MOCK-SOV-100',
      nameAr: 'أتيليه سوفرين',
      nameEn: 'Atelier Sovereign',
      brand: 'Maison Mock',
      brandId: 'BRD-001',
      category: 'men',
      categoryNameAr: 'عطور رجالية',
      concentration: 'edp',
      concentrationNameAr: 'Eau de Parfum (ماء عطر)',
      volume: '100ml',
      volumeNameAr: '100 مل',
      price: 450,
      oldPrice: null,
      hasDiscount: false,
      badge: 'الأكثر طلباً',
      badgeType: 'featured',
      rating: 4.9,
      reviewsCount: 42,
      image: 'assets/prod-1.svg',
      description: 'عطر رجالي كلاسيكي يجمع بين نفحات خشب الأرز والبرغموت الإيطالي مع لمسة ناعمة من الفانيليا الدافئة.',
      scentNotes: 'البرغموت الإيطالي، خشب الأرز، العنبر النقي، الفانيليا',
      origin: 'فرنسا',
      inStock: true,
      mockDate: 1725500000000,
      mockPopularity: 98,
      mock: true
    },
    {
      id: 'p2',
      sku: 'MOCK-VEL-75',
      nameAr: 'فيلفيت هورايزون',
      nameEn: 'Velvet Horizon',
      brand: 'Royal Test',
      brandId: 'BRD-002',
      category: 'niche',
      categoryNameAr: 'عطور نيش',
      concentration: 'extrait',
      concentrationNameAr: 'Extrait de Parfum (خلاصة عطر)',
      volume: '75ml',
      volumeNameAr: '75 مل',
      price: 680,
      oldPrice: 780,
      hasDiscount: true,
      badge: 'خصم 15%',
      badgeType: 'discount',
      rating: 4.95,
      reviewsCount: 36,
      image: 'assets/prod-2.svg',
      description: 'تركيبة نيش استثنائية تحتوي على أزهار السوسن وخشب الصندل العتيق والباتشولي الإندونيسي الفاخر.',
      scentNotes: 'السوسن الفلورنسي، خشب الصندل، الباتشولي، الكشميران',
      origin: 'إيطاليا',
      inStock: true,
      mockDate: 1725450000000,
      mockPopularity: 96,
      mock: true
    },
    {
      id: 'p3',
      sku: 'MOCK-CEL-100',
      nameAr: 'سيليستيال إيريس',
      nameEn: 'Celestial Iris',
      brand: 'Niche Demo',
      brandId: 'BRD-003',
      category: 'women',
      categoryNameAr: 'عطور نسائية',
      concentration: 'edp',
      concentrationNameAr: 'Eau de Parfum (ماء عطر)',
      volume: '100ml',
      volumeNameAr: '100 مل',
      price: 520,
      oldPrice: null,
      hasDiscount: false,
      badge: 'الأكثر طلباً',
      badgeType: 'featured',
      rating: 4.85,
      reviewsCount: 29,
      image: 'assets/prod-3.svg',
      description: 'باقة زهرية أنثوية رقيقة تتألق بالياسمين الدمشقي والورد التركي وعبير الكمثرى النضرة مع لمسة مسك أبيض.',
      scentNotes: 'الياسمين الدمشقي، الورد التركي، الكمثرى، المسك الأبيض',
      origin: 'فرنسا',
      inStock: true,
      mockDate: 1725400000000,
      mockPopularity: 92,
      mock: true
    },
    {
      id: 'p4',
      sku: 'MOCK-SIL-50',
      nameAr: 'سيلفر سيدار',
      nameEn: 'Silver Cedar',
      brand: 'Parfums Prestige',
      brandId: 'BRD-004',
      category: 'men',
      categoryNameAr: 'عطور رجالية',
      concentration: 'edp',
      concentrationNameAr: 'Eau de Parfum (ماء عطر)',
      volume: '50ml',
      volumeNameAr: '50 مل',
      price: 380,
      oldPrice: null,
      hasDiscount: false,
      badge: 'جديد',
      badgeType: 'new',
      rating: 4.7,
      reviewsCount: 18,
      image: 'assets/prod-4.svg',
      description: 'عطر خشبي أروماتيك مستوحى من غابات الأرز النقية بنفحات الفلفل الأسود وجوزة الطيب وقاعدة جلدية ناعمة.',
      scentNotes: 'الفلفل الأسود، خشب الأرز الأطلسي، جوزة الطيب، نجيل الهند',
      origin: 'سويسرا',
      inStock: true,
      mockDate: 1725550000000,
      mockPopularity: 84,
      mock: true
    },
    {
      id: 'p5',
      sku: 'MOCK-TRIO-15',
      nameAr: 'مجموعة عينات ديسكفري',
      nameEn: 'Discovery Trio Vial Set',
      brand: 'Atelier Test',
      brandId: 'BRD-005',
      category: 'samples',
      categoryNameAr: 'عينات العطور',
      concentration: 'sample',
      concentrationNameAr: 'مجموعة عينات (Discovery Vials)',
      volume: 'samples',
      volumeNameAr: '٣×٥ مل',
      price: 120,
      oldPrice: null,
      hasDiscount: false,
      badge: 'عينة تجريبية',
      badgeType: 'sample',
      rating: 4.9,
      reviewsCount: 54,
      image: 'assets/prod-5.svg',
      description: 'مجموعة استكشافية حصرية تحتوي على ثلاثة عينات مصغرة من أبرز إبداعات الدار لتجربة ثبات وفوحان العطر.',
      scentNotes: 'توليفة متنوعة من أبرز نوتات الدار التجريبية',
      origin: 'فرنسا',
      inStock: true,
      mockDate: 1725300000000,
      mockPopularity: 95,
      mock: true
    },
    {
      id: 'p6',
      sku: 'MOCK-IMP-100',
      nameAr: 'إمبريال فيتيفير',
      nameEn: 'Imperial Vetiver',
      brand: 'Maison Mock',
      brandId: 'BRD-001',
      category: 'men',
      categoryNameAr: 'عطور رجالية',
      concentration: 'edp',
      concentrationNameAr: 'Eau de Parfum (ماء عطر)',
      volume: '100ml',
      volumeNameAr: '100 مل',
      price: 490,
      oldPrice: null,
      hasDiscount: false,
      badge: 'كلاسيكي',
      badgeType: 'featured',
      rating: 4.8,
      reviewsCount: 22,
      image: 'assets/prod-6.svg',
      description: 'فخامة نجيل الهند الهايتي مع الهيل الأخضر وقاعدة راتنجية عنبرية راقية تمنحك حضوراً هادئاً وواثقاً.',
      scentNotes: 'الهيل الأخضر، نجيل الهند الهايتي، البخور الراتنجي، العنبر',
      origin: 'فرنسا',
      inStock: true,
      mockDate: 1725200000000,
      mockPopularity: 88,
      mock: true
    },
    {
      id: 'p7',
      sku: 'MOCK-RSOV-100',
      nameAr: 'رويال سوفرين',
      nameEn: 'Royal Sovereign',
      brand: 'Royal Test',
      brandId: 'BRD-002',
      category: 'men',
      categoryNameAr: 'عطور رجالية',
      concentration: 'edp',
      concentrationNameAr: 'Eau de Parfum (ماء عطر)',
      volume: '100ml',
      volumeNameAr: '100 مل',
      price: 560,
      oldPrice: 650,
      hasDiscount: true,
      badge: 'خصم 14%',
      badgeType: 'discount',
      rating: 4.88,
      reviewsCount: 25,
      image: 'assets/prod-7.svg',
      description: 'توليفة ملكية دافئة تلتقي فيها أخشاب الغاياك مع الجلد والزعفران لتمنح إحساساً بالهيبة والسيادة.',
      scentNotes: 'الزعفران، خشب الغاياك، الجلود الفاخرة، حبوب التونكا',
      origin: 'إيطاليا',
      inStock: true,
      mockDate: 1725600000000,
      mockPopularity: 90,
      mock: true
    },
    {
      id: 'p8',
      sku: 'MOCK-RVEL-75',
      nameAr: 'روز فيلورز',
      nameEn: 'Rose Velours',
      brand: 'Parfums Prestige',
      brandId: 'BRD-004',
      category: 'women',
      categoryNameAr: 'عطور نسائية',
      concentration: 'edp',
      concentrationNameAr: 'Eau de Parfum (ماء عطر)',
      volume: '75ml',
      volumeNameAr: '75 مل',
      price: 460,
      oldPrice: null,
      hasDiscount: false,
      badge: 'الأكثر طلباً',
      badgeType: 'featured',
      rating: 4.76,
      reviewsCount: 31,
      image: 'assets/prod-8.svg',
      description: 'أناقة الورد المخملي الفرنسي ممتزجاً بالتوت البري وبراعم الكشمش مع قاعدة بلسمية من خشب الصندل.',
      scentNotes: 'الورد المخملي، التوت البري، الكشمش الأسود، خشب الصندل',
      origin: 'فرنسا',
      inStock: true,
      mockDate: 1725350000000,
      mockPopularity: 87,
      mock: true
    },
    {
      id: 'p9',
      sku: 'MOCK-NAMB-100',
      nameAr: 'نوار أمبريه',
      nameEn: 'Noir Ambré Extrait',
      brand: 'Crown Mock',
      brandId: 'BRD-006',
      category: 'niche',
      categoryNameAr: 'عطور نيش',
      concentration: 'extrait',
      concentrationNameAr: 'Extrait de Parfum (خلاصة عطر)',
      volume: '100ml',
      volumeNameAr: '100 مل',
      price: 720,
      oldPrice: null,
      hasDiscount: false,
      badge: 'إصدار حصري',
      badgeType: 'new',
      rating: 5.0,
      reviewsCount: 14,
      image: 'assets/prod-9.svg',
      description: 'إصدار نيش مظلم وفاخر يعتمد على العنبر الرمادي والعود الكمبودي النقي ونفحات القهوة المحمصة.',
      scentNotes: 'العنبر الرمادي، خلاصة القهوة، التبغ الخفيف، الباتشولي الداكن',
      origin: 'بريطانيا',
      inStock: true,
      mockDate: 1725580000000,
      mockPopularity: 99,
      mock: true
    },
    {
      id: 'p10',
      sku: 'MOCK-SBLA-50',
      nameAr: 'صندل بلان',
      nameEn: 'Santal Blanc',
      brand: 'Atelier Test',
      brandId: 'BRD-005',
      category: 'niche',
      categoryNameAr: 'عطور نيش',
      concentration: 'edp',
      concentrationNameAr: 'Eau de Parfum (ماء عطر)',
      volume: '50ml',
      volumeNameAr: '50 مل',
      price: 420,
      oldPrice: null,
      hasDiscount: false,
      badge: 'جديد',
      badgeType: 'new',
      rating: 4.82,
      reviewsCount: 19,
      image: 'assets/prod-10.svg',
      description: 'خشب صندل أبيض نقي ممزوج بحليب التين والمسك الحريري، عطر يمنح شعوراً بالسلام والنقاء الداخلي.',
      scentNotes: 'خشب الصندل الأبيض، حليب التين، الهيل، المسك الحريري',
      origin: 'فرنسا',
      inStock: true,
      mockDate: 1725590000000,
      mockPopularity: 89,
      mock: true
    },
    {
      id: 'p11',
      sku: 'MOCK-FDOR-75',
      nameAr: 'فلور دورونجيه',
      nameEn: "Fleur d'Oranger",
      brand: 'Niche Demo',
      brandId: 'BRD-003',
      category: 'women',
      categoryNameAr: 'عطور نسائية',
      concentration: 'edp',
      concentrationNameAr: 'Eau de Parfum (ماء عطر)',
      volume: '75ml',
      volumeNameAr: '75 مل',
      price: 480,
      oldPrice: 550,
      hasDiscount: true,
      badge: 'خصم 12%',
      badgeType: 'discount',
      rating: 4.78,
      reviewsCount: 27,
      image: 'assets/prod-11.svg',
      description: 'إشراقة أزهار البرتقال في صباح ربيعي دافئ مع ندى المندرين ولمسة خفيفة من خشب الأرز النضر.',
      scentNotes: 'زهر البرتقال، النيرولي، المندرين، خشب الأرز النضر',
      origin: 'فرنسا',
      inStock: true,
      mockDate: 1725250000000,
      mockPopularity: 85,
      mock: true
    },
    {
      id: 'p12',
      sku: 'MOCK-COFF-30',
      nameAr: 'باقة النيش كوفريت',
      nameEn: 'Niche Coffret Discovery',
      brand: 'Atelier Test',
      brandId: 'BRD-005',
      category: 'samples',
      categoryNameAr: 'عينات العطور',
      concentration: 'sample',
      concentrationNameAr: 'مجموعة عينات (Discovery Vials)',
      volume: 'samples',
      volumeNameAr: '٣×١٠ مل',
      price: 190,
      oldPrice: null,
      hasDiscount: false,
      badge: 'عينات فاخرة',
      badgeType: 'sample',
      rating: 4.92,
      reviewsCount: 48,
      image: 'assets/prod-12.svg',
      description: 'صندوق مخملي فاخر يضم ثلاثة عطور نيش بحجم ١٠ مل مع مرذاذ سفر أنيق، مثالي كهدية أو للاستكشاف.',
      scentNotes: 'ثلاثية: السوسن الملكي، العنبر الداكن، والصندل النقي',
      origin: 'فرنسا',
      inStock: true,
      mockDate: 1725480000000,
      mockPopularity: 94,
      mock: true
    }
  ];

  // 2. Strict Allowlist Definitions for URL Query Params
  const ALLOWED_CATEGORIES = new Set(['all', 'men', 'women', 'niche', 'samples']);
  const ALLOWED_SORTS = new Set(['featured', 'newest', 'price-asc', 'price-desc', 'rating-desc']);
  const ALLOWED_BRANDS = new Set(['Maison Mock', 'Royal Test', 'Niche Demo', 'Parfums Prestige', 'Atelier Test', 'Crown Mock']);

  const CATEGORY_DISPLAY_NAMES = {
    all: 'كافة العطور',
    men: 'عطور رجالية',
    women: 'عطور نسائية',
    niche: 'عطور نيش',
    samples: 'عينات العطور'
  };

  // 3. State Management
  const state = {
    selectedCategory: 'all',
    selectedBrands: new Set(),
    selectedConcentrations: new Set(),
    selectedVolumes: new Set(),
    minPrice: 100,
    maxPrice: 800,
    onlyOffers: false,
    inStockOnly: true,
    searchQuery: '',
    sortBy: 'featured',
    visibleCount: 8, // Initial display count
    lastActiveTrigger: null
  };

  // 4. Safe URL Query Parameter Parser
  function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);

    // Category
    const cat = params.get('category');
    if (cat && ALLOWED_CATEGORIES.has(cat.toLowerCase())) {
      state.selectedCategory = cat.toLowerCase();
    }

    // Offers
    const offers = params.get('offers');
    if (offers === 'true' || offers === '1') {
      state.onlyOffers = true;
    }

    // Brand
    const brand = params.get('brand');
    if (brand && ALLOWED_BRANDS.has(brand)) {
      state.selectedBrands.add(brand);
    }

    // Search query (sanitized plain text)
    const q = params.get('q') || params.get('search');
    if (q) {
      state.searchQuery = q.trim().slice(0, 80);
    }

    // Sort
    const sort = params.get('sort');
    if (sort && ALLOWED_SORTS.has(sort)) {
      state.sortBy = sort;
    }
  }

  // 5. Filtering Logic (AND-logic across all active criteria)
  function getFilteredProducts() {
    return MOCK_PRODUCTS.filter((prod) => {
      // 1. Category Filter
      if (state.selectedCategory !== 'all' && prod.category !== state.selectedCategory) {
        return false;
      }

      // 2. Brand Filter
      if (state.selectedBrands.size > 0 && !state.selectedBrands.has(prod.brand)) {
        return false;
      }

      // 3. Price Filter
      if (prod.price < state.minPrice || prod.price > state.maxPrice) {
        return false;
      }

      // 4. Concentration Filter
      if (state.selectedConcentrations.size > 0 && !state.selectedConcentrations.has(prod.concentration)) {
        return false;
      }

      // 5. Volume Filter
      if (state.selectedVolumes.size > 0 && !state.selectedVolumes.has(prod.volume)) {
        return false;
      }

      // 6. Special Status Filters
      if (state.onlyOffers && !prod.hasDiscount) {
        return false;
      }
      if (state.inStockOnly && !prod.inStock) {
        return false;
      }

      // 7. Search Query Filter
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        const haystack = [
          prod.nameAr,
          prod.nameEn,
          prod.brand,
          prod.scentNotes,
          prod.categoryNameAr
        ].join(' ').toLowerCase();

        if (!haystack.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }

  // 6. Sorting Logic
  function sortProducts(products) {
    const list = [...products];
    switch (state.sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return list.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return list.sort((a, b) => b.mockDate - a.mockDate);
      case 'featured':
      default:
        return list.sort((a, b) => b.mockPopularity - a.mockPopularity);
    }
  }

  // 7. Safe DOM Product Card Creator (ZERO innerHTML)
  function createProductCard(prod) {
    const card = document.createElement('article');
    card.className = 'luxellia-product-card';
    card.setAttribute('data-id', prod.id);
    card.setAttribute('data-sku', prod.sku);

    // Badges Container
    const badgesWrap = document.createElement('div');
    badgesWrap.className = 'luxellia-product-badges';

    // Mock Badge
    const mockBadge = document.createElement('span');
    mockBadge.className = 'luxellia-badge luxellia-badge-mock';
    mockBadge.textContent = 'عينة تجريبية';
    badgesWrap.appendChild(mockBadge);

    // Special status badge
    if (prod.badge) {
      const specialBadge = document.createElement('span');
      specialBadge.className = 'luxellia-badge ' + (prod.hasDiscount ? 'luxellia-badge-discount' : 'luxellia-badge-featured');
      specialBadge.textContent = prod.badge;
      badgesWrap.appendChild(specialBadge);
    }
    card.appendChild(badgesWrap);

    // Media Container
    const media = document.createElement('div');
    media.className = 'luxellia-product-media';

    const img = document.createElement('img');
    img.src = prod.image;
    img.alt = prod.nameAr + ' — ' + prod.brand;
    img.className = 'luxellia-product-img';
    img.loading = 'lazy';
    img.width = 280;
    img.height = 280;
    media.appendChild(img);

    // Quick View Overlay Button
    const quickViewBtn = document.createElement('button');
    quickViewBtn.type = 'button';
    quickViewBtn.className = 'luxellia-card-quickview-btn';
    quickViewBtn.setAttribute('data-quickview-id', prod.id);
    quickViewBtn.setAttribute('aria-label', 'معاينة سريعة لعطر ' + prod.nameAr);
    quickViewBtn.textContent = 'معاينة سريعة';
    media.appendChild(quickViewBtn);

    card.appendChild(media);

    // Product Info Container
    const info = document.createElement('div');
    info.className = 'luxellia-product-info';

    // Brand Name
    const brand = document.createElement('span');
    brand.className = 'luxellia-product-brand';
    brand.textContent = prod.brand;
    info.appendChild(brand);

    // Product Name (Interactive link to quickview)
    const title = document.createElement('h3');
    title.className = 'luxellia-product-name';
    const titleBtn = document.createElement('button');
    titleBtn.type = 'button';
    titleBtn.className = 'luxellia-product-name-btn';
    titleBtn.setAttribute('data-quickview-id', prod.id);
    titleBtn.textContent = prod.nameAr;
    title.appendChild(titleBtn);
    info.appendChild(title);

    // Specification (Volume & Concentration)
    const spec = document.createElement('p');
    spec.className = 'luxellia-product-spec';
    spec.textContent = prod.volumeNameAr + ' — ' + (prod.concentration === 'extrait' ? 'خلاصة عطر' : (prod.concentration === 'sample' ? 'عينات' : 'ماء عطر'));
    info.appendChild(spec);

    // Star Rating
    const ratingWrap = document.createElement('div');
    ratingWrap.className = 'luxellia-product-rating';
    ratingWrap.setAttribute('aria-label', 'التقييم: ' + prod.rating + ' من 5');
    const stars = document.createElement('span');
    stars.className = 'luxellia-stars';
    stars.setAttribute('aria-hidden', 'true');
    stars.textContent = '★★★★★';
    const score = document.createElement('span');
    score.className = 'luxellia-rating-num';
    score.textContent = String(prod.rating);
    ratingWrap.appendChild(stars);
    ratingWrap.appendChild(score);
    info.appendChild(ratingWrap);

    // Pricing Row
    const priceRow = document.createElement('div');
    priceRow.className = 'luxellia-product-price-row';

    const currentPrice = document.createElement('span');
    currentPrice.className = 'luxellia-product-price';
    currentPrice.textContent = prod.price + ' ر.س';
    priceRow.appendChild(currentPrice);

    if (prod.oldPrice) {
      const oldPrice = document.createElement('span');
      oldPrice.className = 'luxellia-product-price-old';
      oldPrice.textContent = prod.oldPrice + ' ر.س';
      priceRow.appendChild(oldPrice);
    }

    const tax = document.createElement('span');
    tax.className = 'luxellia-tax-note';
    tax.textContent = 'شامل الضريبة';
    priceRow.appendChild(tax);

    info.appendChild(priceRow);

    // Add to Cart Button
    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className = 'luxellia-btn luxellia-btn-add';
    addBtn.setAttribute('data-id', prod.id);
    addBtn.setAttribute('data-name', prod.nameAr);
    addBtn.textContent = 'إضافة للسلة';
    info.appendChild(addBtn);

    card.appendChild(info);

    return card;
  }

  // 8. Render Engine
  function renderCatalog() {
    const grid = document.getElementById('productsGrid');
    const resultsCountEl = document.getElementById('resultsCount');
    const emptyState = document.getElementById('emptyStateContainer');
    const loadMoreWrap = document.getElementById('loadMoreWrap');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadMoreRemaining = document.getElementById('loadMoreRemaining');

    if (!grid) return;

    // Filter & Sort
    const filtered = getFilteredProducts();
    const sorted = sortProducts(filtered);
    const totalCount = sorted.length;

    // Update Results Counter
    if (resultsCountEl) {
      if (totalCount === 0) {
        resultsCountEl.textContent = 'لا توجد نتائج';
      } else {
        resultsCountEl.textContent = 'عرض ' + Math.min(state.visibleCount, totalCount) + ' من أصل ' + totalCount + ' عطر';
      }
    }

    // Handle Empty State
    if (totalCount === 0) {
      grid.replaceChildren(); // Safe clear
      if (emptyState) emptyState.hidden = false;
      if (loadMoreWrap) loadMoreWrap.hidden = true;
      renderActiveTags();
      return;
    }

    if (emptyState) emptyState.hidden = true;

    // Slice visible products
    const visibleProducts = sorted.slice(0, state.visibleCount);

    // Render cards safely into DocumentFragment
    const fragment = document.createDocumentFragment();
    visibleProducts.forEach((prod) => {
      fragment.appendChild(createProductCard(prod));
    });

    grid.replaceChildren(fragment);

    // Handle Load More Button
    if (loadMoreWrap) {
      if (state.visibleCount >= totalCount) {
        loadMoreWrap.hidden = true;
      } else {
        loadMoreWrap.hidden = false;
        const remaining = totalCount - state.visibleCount;
        if (loadMoreRemaining) {
          loadMoreRemaining.textContent = '(' + remaining + ' متبقية)';
        }
      }
    }

    renderActiveTags();
    syncFilterControlsUI();
  }

  // 9. Active Tags Bar Renderer
  function renderActiveTags() {
    const bar = document.getElementById('activeFiltersBar');
    const list = document.getElementById('activeTagsList');
    if (!bar || !list) return;

    list.replaceChildren();
    let hasActiveFilters = false;

    function addTag(label, removeCallback) {
      hasActiveFilters = true;
      const tag = document.createElement('span');
      tag.className = 'luxellia-active-tag';

      const tagText = document.createElement('span');
      tagText.textContent = label;
      tag.appendChild(tagText);

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'luxellia-tag-remove-btn';
      removeBtn.setAttribute('aria-label', 'إزالة فلتر ' + label);
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', () => {
        removeCallback();
        state.visibleCount = 8;
        renderCatalog();
      });

      tag.appendChild(removeBtn);
      list.appendChild(tag);
    }

    // Category
    if (state.selectedCategory !== 'all') {
      addTag('القسم: ' + (CATEGORY_DISPLAY_NAMES[state.selectedCategory] || state.selectedCategory), () => {
        state.selectedCategory = 'all';
      });
    }

    // Brands
    state.selectedBrands.forEach((b) => {
      addTag('الدار: ' + b, () => {
        state.selectedBrands.delete(b);
      });
    });

    // Concentrations
    state.selectedConcentrations.forEach((c) => {
      const label = c === 'extrait' ? 'خلاصة عطر' : (c === 'sample' ? 'عينات' : 'ماء عطر');
      addTag('التركيز: ' + label, () => {
        state.selectedConcentrations.delete(c);
      });
    });

    // Volumes
    state.selectedVolumes.forEach((v) => {
      addTag('الحجم: ' + v, () => {
        state.selectedVolumes.delete(v);
      });
    });

    // Price Max
    if (state.maxPrice < 800) {
      addTag('السعر حتى: ' + state.maxPrice + ' ر.س', () => {
        state.maxPrice = 800;
        const slider = document.getElementById('priceRangeSlider');
        const maxInput = document.getElementById('maxPriceInput');
        if (slider) slider.value = '800';
        if (maxInput) maxInput.value = '800';
        const display = document.getElementById('priceDisplayMax');
        if (display) display.textContent = '800 ر.س';
      });
    }

    // Offers
    if (state.onlyOffers) {
      addTag('عروض خاصة فقط', () => {
        state.onlyOffers = false;
        const check = document.getElementById('onlyOffersCheck');
        if (check) check.checked = false;
      });
    }

    // Search Query
    if (state.searchQuery) {
      addTag('البحث: "' + state.searchQuery + '"', () => {
        state.searchQuery = '';
        const input = document.getElementById('catalogSearchInput');
        const clear = document.getElementById('searchClearBtn');
        if (input) input.value = '';
        if (clear) clear.hidden = true;
      });
    }

    bar.hidden = !hasActiveFilters;

    // Mobile badge count
    const mobileBadge = document.getElementById('mobileFilterBadge');
    if (mobileBadge) {
      let count = (state.selectedCategory !== 'all' ? 1 : 0) +
                  state.selectedBrands.size +
                  state.selectedConcentrations.size +
                  state.selectedVolumes.size +
                  (state.maxPrice < 800 ? 1 : 0) +
                  (state.onlyOffers ? 1 : 0) +
                  (state.searchQuery ? 1 : 0);
      if (count > 0) {
        mobileBadge.textContent = String(count);
        mobileBadge.hidden = false;
      } else {
        mobileBadge.hidden = true;
      }
    }
  }

  // 10. Sync Desktop & Drawer UI Controls
  function syncFilterControlsUI() {
    // 1. Quick Category Pills
    document.querySelectorAll('.luxellia-pill-btn').forEach((btn) => {
      const cat = btn.getAttribute('data-filter-cat');
      const isActive = cat === state.selectedCategory;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });

    // Update banner title & breadcrumb
    const bannerTitle = document.getElementById('catalogTitle');
    const breadcrumbCurrent = document.getElementById('breadcrumbCategoryName');
    const name = CATEGORY_DISPLAY_NAMES[state.selectedCategory] || 'كافة العطور';
    if (bannerTitle) bannerTitle.textContent = name;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = name;

    // 2. Checkboxes in sidebar
    document.querySelectorAll('input[name="catFilter"]').forEach((input) => {
      input.checked = state.selectedCategory === input.value;
    });

    document.querySelectorAll('input[name="brandFilter"]').forEach((input) => {
      input.checked = state.selectedBrands.has(input.value);
    });

    document.querySelectorAll('input[name="concentrationFilter"]').forEach((input) => {
      input.checked = state.selectedConcentrations.has(input.value);
    });

    document.querySelectorAll('input[name="volumeFilter"]').forEach((input) => {
      input.checked = state.selectedVolumes.has(input.value);
    });

    const onlyOffersEl = document.getElementById('onlyOffersCheck');
    if (onlyOffersEl) onlyOffersEl.checked = state.onlyOffers;

    const inStockEl = document.getElementById('inStockCheck');
    if (inStockEl) inStockEl.checked = state.inStockOnly;

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = state.sortBy;
  }

  // 11. Reset All Filters
  function resetAllFilters() {
    state.selectedCategory = 'all';
    state.selectedBrands.clear();
    state.selectedConcentrations.clear();
    state.selectedVolumes.clear();
    state.minPrice = 100;
    state.maxPrice = 800;
    state.onlyOffers = false;
    state.inStockOnly = true;
    state.searchQuery = '';
    state.visibleCount = 8;

    const searchInput = document.getElementById('catalogSearchInput');
    const searchClear = document.getElementById('searchClearBtn');
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.hidden = true;

    const slider = document.getElementById('priceRangeSlider');
    const minInput = document.getElementById('minPriceInput');
    const maxInput = document.getElementById('maxPriceInput');
    const priceDisplay = document.getElementById('priceDisplayMax');

    if (slider) slider.value = '800';
    if (minInput) minInput.value = '100';
    if (maxInput) maxInput.value = '800';
    if (priceDisplay) priceDisplay.textContent = '800 ر.س';

    renderCatalog();
  }

  // 12. Accessible Quick View Modal Controller
  function openQuickView(productId, triggerElement) {
    const prod = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (!prod) return;

    state.lastActiveTrigger = triggerElement;

    const modal = document.getElementById('quickViewModal');
    if (!modal) return;

    // Populate modal using safe DOM methods (Zero innerHTML)
    const img = document.getElementById('quickViewImg');
    const badge = document.getElementById('quickViewBadge');
    const brand = document.getElementById('quickViewBrand');
    const title = document.getElementById('quickViewTitle');
    const spec = document.getElementById('quickViewSpec');
    const rating = document.getElementById('quickViewRating');
    const reviews = document.getElementById('quickViewReviews');
    const price = document.getElementById('quickViewPrice');
    const oldPrice = document.getElementById('quickViewOldPrice');
    const desc = document.getElementById('quickViewDesc');
    const notes = document.getElementById('quickViewNotes');
    const addBtn = document.getElementById('quickViewAddBtn');

    if (img) {
      img.src = prod.image;
      img.alt = prod.nameAr;
    }
    if (badge) {
      badge.textContent = prod.badge || 'عينة تجريبية';
    }
    if (brand) brand.textContent = prod.brand;
    if (title) title.textContent = prod.nameAr;
    if (spec) spec.textContent = prod.concentrationNameAr + ' — ' + prod.volumeNameAr;
    if (rating) rating.textContent = String(prod.rating);
    if (reviews) reviews.textContent = '(' + prod.reviewsCount + ' تقييماً تجريبياً)';
    if (price) price.textContent = prod.price + ' ر.س';

    if (oldPrice) {
      if (prod.oldPrice) {
        oldPrice.textContent = prod.oldPrice + ' ر.س';
        oldPrice.hidden = false;
      } else {
        oldPrice.hidden = true;
      }
    }

    if (desc) desc.textContent = prod.description;
    if (notes) notes.textContent = prod.scentNotes;

    if (addBtn) {
      addBtn.setAttribute('data-id', prod.id);
      addBtn.setAttribute('data-name', prod.nameAr);
    }

    // Open Modal
    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    // Focus close button
    const closeBtn = document.getElementById('closeQuickViewBtn');
    if (closeBtn) closeBtn.focus();
  }

  function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    if (!modal || modal.hidden) return;

    modal.hidden = true;
    document.body.style.overflow = '';

    // Restore focus to trigger button
    if (state.lastActiveTrigger && typeof state.lastActiveTrigger.focus === 'function') {
      state.lastActiveTrigger.focus();
      state.lastActiveTrigger = null;
    }
  }

  // 13. Mobile Drawer Controller
  function openFilterDrawer(triggerBtn) {
    const drawer = document.getElementById('filterDrawer');
    const trigger = triggerBtn || document.getElementById('openFilterDrawerBtn');
    if (!drawer) return;

    state.lastActiveTrigger = trigger;
    drawer.hidden = false;
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Populate drawer body from sidebar if empty
    const drawerBody = document.getElementById('drawerFilterBody');
    const sidebar = document.getElementById('catalogSidebar');
    if (drawerBody && sidebar && drawerBody.children.length === 0) {
      // Clone fieldsets safely
      const fieldsets = sidebar.querySelectorAll('fieldset');
      fieldsets.forEach((fs) => {
        drawerBody.appendChild(fs.cloneNode(true));
      });

      // Hook change events on cloned inputs
      drawerBody.addEventListener('change', (e) => {
        const target = e.target;
        if (target.name === 'catFilter') {
          state.selectedCategory = target.checked ? target.value : 'all';
        } else if (target.name === 'brandFilter') {
          if (target.checked) state.selectedBrands.add(target.value);
          else state.selectedBrands.delete(target.value);
        } else if (target.name === 'concentrationFilter') {
          if (target.checked) state.selectedConcentrations.add(target.value);
          else state.selectedConcentrations.delete(target.value);
        } else if (target.name === 'volumeFilter') {
          if (target.checked) state.selectedVolumes.add(target.value);
          else state.selectedVolumes.delete(target.value);
        }
      });
    }

    const closeBtn = document.getElementById('closeFilterDrawerBtn');
    if (closeBtn) closeBtn.focus();
  }

  function closeFilterDrawer() {
    const drawer = document.getElementById('filterDrawer');
    const trigger = document.getElementById('openFilterDrawerBtn');
    if (!drawer || drawer.hidden) return;

    drawer.hidden = true;
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    if (state.lastActiveTrigger && typeof state.lastActiveTrigger.focus === 'function') {
      state.lastActiveTrigger.focus();
      state.lastActiveTrigger = null;
    }
  }

  // 14. Event Bindings & Lifecycle
  function initCatalog() {
    parseUrlParams();

    // 1. Search Box input listener
    const searchInput = document.getElementById('catalogSearchInput');
    const searchClear = document.getElementById('searchClearBtn');

    if (searchInput) {
      if (state.searchQuery) {
        searchInput.value = state.searchQuery;
        if (searchClear) searchClear.hidden = false;
      }

      let debounceTimer = null;
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        state.searchQuery = val;
        if (searchClear) {
          searchClear.hidden = val.length === 0;
        }
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          state.visibleCount = 8;
          renderCatalog();
        }, 180);
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        searchClear.hidden = true;
        state.searchQuery = '';
        state.visibleCount = 8;
        renderCatalog();
      });
    }

    // 2. Sort dropdown
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.value = state.sortBy;
      sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderCatalog();
      });
    }

    // 3. Category Quick Pills
    document.querySelectorAll('.luxellia-pill-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-filter-cat') || 'all';
        state.selectedCategory = cat;
        state.visibleCount = 8;
        renderCatalog();
      });
    });

    // 4. Sidebar Checkbox changes
    const sidebar = document.getElementById('catalogSidebar');
    if (sidebar) {
      sidebar.addEventListener('change', (e) => {
        const target = e.target;
        state.visibleCount = 8;

        if (target.name === 'catFilter') {
          state.selectedCategory = target.checked ? target.value : 'all';
        } else if (target.name === 'brandFilter') {
          if (target.checked) state.selectedBrands.add(target.value);
          else state.selectedBrands.delete(target.value);
        } else if (target.name === 'concentrationFilter') {
          if (target.checked) state.selectedConcentrations.add(target.value);
          else state.selectedConcentrations.delete(target.value);
        } else if (target.name === 'volumeFilter') {
          if (target.checked) state.selectedVolumes.add(target.value);
          else state.selectedVolumes.delete(target.value);
        } else if (target.id === 'onlyOffersCheck') {
          state.onlyOffers = target.checked;
        } else if (target.id === 'inStockCheck') {
          state.inStockOnly = target.checked;
        }

        renderCatalog();
      });
    }

    // 5. Price slider & number inputs
    const slider = document.getElementById('priceRangeSlider');
    const minInput = document.getElementById('minPriceInput');
    const maxInput = document.getElementById('maxPriceInput');
    const priceDisplay = document.getElementById('priceDisplayMax');

    if (slider) {
      slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        state.maxPrice = val;
        if (maxInput) maxInput.value = String(val);
        if (priceDisplay) priceDisplay.textContent = val + ' ر.س';
        state.visibleCount = 8;
        renderCatalog();
      });
    }

    if (maxInput) {
      maxInput.addEventListener('change', (e) => {
        const val = Math.min(800, Math.max(100, parseInt(e.target.value, 10) || 800));
        state.maxPrice = val;
        if (slider) slider.value = String(val);
        if (priceDisplay) priceDisplay.textContent = val + ' ر.س';
        state.visibleCount = 8;
        renderCatalog();
      });
    }

    if (minInput) {
      minInput.addEventListener('change', (e) => {
        const val = Math.min(state.maxPrice, Math.max(100, parseInt(e.target.value, 10) || 100));
        state.minPrice = val;
        state.visibleCount = 8;
        renderCatalog();
      });
    }

    // 6. Reset buttons
    ['desktopResetBtn', 'clearAllTagsBtn', 'emptyResetBtn', 'resetDrawerFiltersBtn'].forEach((btnId) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener('click', resetAllFilters);
      }
    });

    // 7. Load More Button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        state.visibleCount += 8;
        renderCatalog();
      });
    }

    // 8. Mobile Drawer trigger and close
    const openDrawerBtn = document.getElementById('openFilterDrawerBtn');
    const closeDrawerBtn = document.getElementById('closeFilterDrawerBtn');
    const drawerBackdrop = document.getElementById('filterDrawerBackdrop');
    const applyDrawerBtn = document.getElementById('applyDrawerFiltersBtn');

    if (openDrawerBtn) {
      openDrawerBtn.addEventListener('click', () => openFilterDrawer(openDrawerBtn));
    }
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', closeFilterDrawer);
    }
    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeFilterDrawer);
    }
    if (applyDrawerBtn) {
      applyDrawerBtn.addEventListener('click', () => {
        closeFilterDrawer();
        renderCatalog();
      });
    }

    // 9. Quick View open buttons (Event Delegation on Document)
    document.addEventListener('click', (e) => {
      const qvBtn = e.target.closest('[data-quickview-id]');
      if (qvBtn) {
        e.preventDefault();
        const prodId = qvBtn.getAttribute('data-quickview-id');
        openQuickView(prodId, qvBtn);
      }
    });

    // Quick View close buttons
    const closeQvBtn = document.getElementById('closeQuickViewBtn');
    const qvBackdrop = document.getElementById('quickViewBackdrop');

    if (closeQvBtn) closeQvBtn.addEventListener('click', closeQuickView);
    if (qvBackdrop) qvBackdrop.addEventListener('click', closeQuickView);

    // 10. Global Keyboard Accessibility (Escape handling & focus traps)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        const qvModal = document.getElementById('quickViewModal');
        if (qvModal && !qvModal.hidden) {
          closeQuickView();
          return;
        }

        const drawer = document.getElementById('filterDrawer');
        if (drawer && !drawer.hidden) {
          closeFilterDrawer();
        }
      }
    });

    // Expose controller for testing and inspectability
    if (typeof window !== 'undefined') {
      window.__LUXELLIA_PRODUCTS__ = {
        MOCK_PRODUCTS,
        getFilteredProducts,
        filterProducts: getFilteredProducts,
        sortProducts,
        state,
        ALLOWED_CATEGORIES,
        ALLOWED_SORTS
      };
    }

    // Initial render
    renderCatalog();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCatalog);
  } else {
    initCatalog();
  }
})();
