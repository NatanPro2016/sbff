// Products page: search + list + detail with links; data from products.json

document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.querySelector('.product-list');
  const detailEl = document.querySelector('.product-detail');
  const searchEl = document.querySelector('#product-search');
  const isAmharic = document.documentElement.lang.toLowerCase().startsWith('am');
  const basePath = window.location.pathname.includes('/am/') ? '../' : '';

  let products = [];
  let filtered = [];
  let activeId = null;

  const resolveAsset = (path) => {
    if (!path || /^https?:\/\//.test(path) || path.startsWith('/') || path.startsWith('../')) {
      return path;
    }
    return `${basePath}${path}`;
  };

  const resolvePicture = (path, alt, loading = 'lazy') => {
    const orig = resolveAsset(path);
    const webp = orig.replace(/\.(jpe?g|png)$/i, '.webp');
    return `<picture><source srcset="${webp}" type="image/webp"><img src="${orig}" alt="${alt}" loading="${loading}" decoding="async" /></picture>`;
  };

  const renderList = () => {
    listEl.innerHTML = '';
    if (!filtered.length) {
      listEl.innerHTML = '<p class="text">No products match that search.</p>';
      return;
    }
    filtered.forEach(p => {
      const li = document.createElement('button');
      li.className = 'product-row' + (p.id === activeId ? ' active' : '');
      li.type = 'button';
      li.dataset.id = p.id;
      li.innerHTML = `
        ${resolvePicture(p.image, p.name, 'lazy')}
        <div class="product-row-text">
          <div class="name">${p.name}</div>
          <div class="muted">${p.sizes.join(', ')}</div>
        </div>
        <span class="pill">${isAmharic ? 'ይመልከቱ' : 'View'}</span>
      `;
      li.addEventListener('click', () => selectProduct(p.id));
      listEl.appendChild(li);
    });
  };

  const renderDetail = (p) => {
    if (!p) {
      detailEl.innerHTML = `<p class="text">${isAmharic ? 'ዝርዝሩን ለማየት ምርት ይምረጡ።' : 'Select a product to view details.'}</p>`;
      return;
    }
    const tags = p.tags?.map(t => `<span class="pill">${t}</span>`).join('') || '';
    const sizes = p.sizes?.map(s => `<span class="size-chip">${s}</span>`).join('') || '';
    detailEl.innerHTML = `
      <div class="detail-visual">${resolvePicture(p.image, p.name, 'eager')}</div>
      <div class="detail-meta">
        <h2>${p.name}</h2>
        <p>${p.description}</p>
        <div class="tag-list">${tags}</div>
        <div class="sizes">${sizes}</div>
        
      </div>
    `;
  };

  const selectProduct = (id) => {
    activeId = id;
    renderList();
    renderDetail(products.find(p => p.id === id));
  };

  const handleSearch = term => {
    const q = term.toLowerCase().trim();
    if (!q) {
      filtered = [...products];
    } else {
      filtered = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags?.some(t => t.toLowerCase().includes(q))
      );
    }
    renderList();
    if (activeId && !filtered.some(p => p.id === activeId)) {
      detailEl.innerHTML = `<p class="text">${isAmharic ? 'ዝርዝሩን ለማየት ምርት ይምረጡ።' : 'Select a product to view details.'}</p>`;
    }
  };

  const fallbackEn = [
    { id: 'flour-50kg', name: 'Sheger Fortified Wheat Flour 50kg (Sheger Duket)', image: 'assets/products/gemini-generated1.png', description: 'High-capacity fortified flour milled for bakeries and distributors. Ideal for bread, pastry, and injera blends.', sizes: ['50kg', '25kg', '10kg'], tags: ['Fortified', 'Sheger Flour', 'Sheger Duket', 'shger flour', 'Vitamin B complex', 'Zinc'], link: '/product/flour-50kg', location: 'https://maps.app.goo.gl' },
    { id: 'flour-5kg', name: 'Sheger Household Fortified Flour 5kg (Sheger Duket)', image: 'assets/products/product-1.png', description: 'Convenient pack for households and small shops; smooth texture for daily cooking and baking.', sizes: ['5kg', '3kg'], tags: ['Fortified', 'Sheger Flour', 'Sheger Duket', 'shger flour', 'Everyday use'], link: '/product/flour-5kg', location: 'https://maps.app.goo.gl' },
    { id: 'bread-fresh', name: 'Sheger Fresh Bread Loaves (Sheger Dabo)', image: 'assets/products/img2.png', description: 'Daily baked loaves with a soft crumb and thin crust, optimized for shelf life and transport.', sizes: ['Single loaf', '10-pack'], tags: ['Fresh', 'Sheger Bread', 'Sheger Dabo', 'Soft crumb'], link: '/product/bread-fresh', location: 'https://maps.app.goo.gl' }
  ];

  const fallbackAm = [
    { id: 'flour-50kg', name: 'የሸገር የተጠናከረ የስንዴ ዱቄት 50ኪ.ግ (Sheger Flour)', image: 'assets/products/gemini-generated1.png', description: 'ለዳቦ ቤቶችና ለአከፋፋዮች የተዘጋጀ ከፍተኛ ጥራት ያለው የሸገር የተጠናከረ የስንዴ ዱቄት።', sizes: ['50ኪ.ግ', '25ኪ.ግ', '10ኪ.ግ'], tags: ['የተጠናከረ', 'የሸገር ዱቄት', 'ሸገር ዱቄት'], link: '/product/flour-50kg', location: 'https://maps.app.goo.gl' },
    { id: 'flour-5kg', name: 'የሸገር የቤት አገልግሎት ዱቄት 5ኪ.ግ (Sheger Duket)', image: 'assets/products/img1.png', description: 'ለቤተሰብና ለአካባቢ ሱቆች የሚሆን ምቹ መጠን፣ ለዕለታዊ ምግብ አዘገጃጀት እና ለመጋገር ተስማሚ የሆነ ለስላሳ የሸገር ዱቄት።', sizes: ['5ኪ.ግ', '3ኪ.ግ'], tags: ['የተጠናከረ', 'የሸገር ዱቄት', 'ሸገር ዱቄት'], link: '/product/flour-5kg', location: 'https://maps.app.goo.gl' },
    { id: 'bread-fresh', name: 'የትኩስ ሸገር ዳቦ (Sheger Dabo)', image: 'assets/products/img2.png', description: 'በየቀኑ የሚጋገር ትኩስና ለስላሳ የሸገር ዳቦ፣ ለአዲስ አበባ ነዋሪዎች በተመጣጣኝ ዋጋ የሚቀርብ ጥራት ያለው ምርት።', sizes: ['አንድ ዳቦ', '10 ጥቅል'], tags: ['ትኩስ', 'የሸገር ዳቦ', 'ሸገር ዳቦ'], link: '/product/bread-fresh', location: 'https://maps.app.goo.gl' }
  ];

  const fallback = isAmharic ? fallbackAm : fallbackEn;

  fetch(`${basePath}data/${isAmharic ? 'products.am.json' : 'products.json'}`)
    .then(r => r.json())
    .catch(() => fallback)
    .then(data => {
      products = Array.isArray(data) ? data : fallback;
      filtered = [...products];
      renderList();
      if (products.length) selectProduct(products[0].id);
    })
    .catch(() => {
      products = fallback;
      filtered = [...products];
      renderList();
      selectProduct(products[0].id);
    });

  if (searchEl) searchEl.addEventListener('input', e => handleSearch(e.target.value));
});
