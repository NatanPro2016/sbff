// Gallery rendering from JSON
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  const isAmharic = document.documentElement.lang.toLowerCase().startsWith('am');
  const basePath = window.location.pathname.includes('/am/') ? '../' : '';

  const resolveAsset = (path) => {
    if (!path || /^https?:\/\//.test(path) || path.startsWith('/') || path.startsWith('../')) {
      return path;
    }
    return `${basePath}${path}`;
  };

  const fallback = [
    { id: 'flour-bags', image: 'assets/gallery/featured-products-images/featured-products-img2.png', caption: 'Fortified flour prepared for shipment', alt: 'Flour bags ready for dispatch' },
    { id: 'line', image: 'assets/gallery/featured-products-images/featured-products-img3.png', caption: 'Automated production line in Kaliti', alt: 'Production line' },
    { id: 'bread', image: 'assets/gallery/featured-products-images/featured-products-img4.png', caption: 'Daily baked loaves cooling', alt: 'Bread loaves' },
    { id: 'packaging', image: 'assets/gallery/featured-products-images/featured-products-img5.png', caption: 'Quality-checked packaging', alt: 'Packaging' },
    { id: 'exterior', image: 'assets/gallery/featured-products-images/featured-products-img.png', caption: 'Sheger facility exterior', alt: 'Facility exterior' },
    { id: 'team', image: 'assets/gallery/featured-products-group/featured-products-img6.png', caption: 'Team behind the production', alt: 'Team photo' },
  ];

  const render = (items) => {
    grid.innerHTML = '';
    items.forEach(item => {
      const fig = document.createElement('figure');
      const img = document.createElement('img');
      const date = document.createElement('p')
      img.src = resolveAsset(item.image);
      img.alt = item.alt || item.caption || item.id;
      img.loading = 'lazy';
      date.innerText = item.date
      const cap = document.createElement('figcaption');
      cap.textContent = item.caption || '';
      fig.appendChild(img);
      fig.appendChild(cap);
      fig.appendChild(date)
      grid.appendChild(fig);

    });
  };

  fetch(`${basePath}data/${isAmharic ? 'gallery.am.json' : 'gallery.json'}`)
    .then(r => r.json())
    .then(data => Array.isArray(data) && data.length ? data : fallback)
    .catch(() => fallback)
    .then(render)
    .catch(() => render(fallback));
});
