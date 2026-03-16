// Products page: search + list + detail with links; data from products.json

document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.querySelector('.product-list');
  const detailEl = document.querySelector('.product-detail');
  const searchEl = document.querySelector('#product-search');

  let products = [];
  let filtered = [];
  let activeId = null;

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
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="product-row-text">
          <div class="name">${p.name}</div>
          <div class="muted">${p.sizes.join(', ')}</div>
        </div>
        <span class="pill">View</span>
      `;
      li.addEventListener('click', () => selectProduct(p.id));
      listEl.appendChild(li);
    });
  };

  const renderDetail = (p) => {
    if (!p) {
      detailEl.innerHTML = '<p class="text">Select a product to view details.</p>';
      return;
    }
    const tags = p.tags?.map(t => `<span class="pill">${t}</span>`).join('') || '';
    const sizes = p.sizes?.map(s => `<span class="size-chip">${s}</span>`).join('') || '';
    detailEl.innerHTML = `
      <div class="detail-visual"><img src="${p.image}" alt="${p.name}" loading="lazy" /></div>
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
    const q = term.toLowerCase();
    filtered = products.filter(p => p.name.toLowerCase().includes(q) || p.tags?.some(t => t.toLowerCase().includes(q)));
    renderList();
    if (activeId && !filtered.some(p => p.id === activeId)) {
      detailEl.innerHTML = '<p class="text">Select a product to view details.</p>';
    }
  };

  const fallback = [
    { id: 'flour-50kg', name: 'Fortified Wheat Flour 50kg', image: 'assets/products/gemini-generated1.png', description: 'High-capacity fortified flour milled for bakeries and distributors. Ideal for bread, pastry, and injera blends.', sizes: ['50kg', '25kg', '10kg'], tags: ['Fortified', 'Vitamin B complex', 'Zinc'], link: '/product/flour-50kg', location: 'https://maps.app.goo.gl' },
    { id: 'flour-5kg', name: 'Household Fortified Flour 5kg', image: 'assets/products/img1.png', description: 'Convenient pack for households and small shops; smooth texture for daily cooking and baking.', sizes: ['5kg', '3kg'], tags: ['Fortified', 'Everyday use'], link: '/product/flour-5kg', location: 'https://maps.app.goo.gl' },
    { id: 'bread-fresh', name: 'Fresh Bread Loaves', image: 'assets/products/img2.png', description: 'Daily baked loaves with a soft crumb and thin crust, optimized for shelf life and transport.', sizes: ['Single loaf', '10-pack'], tags: ['Fresh', 'Soft crumb'], link: '/product/bread-fresh', location: 'https://maps.app.goo.gl' }
  ];

  fetch('data/products.json')
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
