let currentCategory = 'all';

// Category အလိုက် ရွေးချယ်ပြသခြင်း
function setCategory(category, button) {
  currentCategory = category;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');

  applyFilters();
}

// Search Bar နှင့် Category တွဲဖက်စစ်ထုတ်ခြင်း
function applyFilters() {
  const searchInput = document.getElementById('searchInput');
  const searchText = searchInput ? searchInput.value.toLowerCase() : '';
  const cards = document.querySelectorAll('.menu-card');

  cards.forEach(card => {
    const category = card.getAttribute('data-category');
    const title = card.querySelector('.food-title').innerText.toLowerCase();
    const enTitle = card.querySelector('.food-en').innerText.toLowerCase();

    const matchesCategory = (currentCategory === 'all' || category === currentCategory);
    const matchesSearch = (title.includes(searchText) || enTitle.includes(searchText));

    card.style.display = (matchesCategory && matchesSearch) ? 'flex' : 'none';
  });
}

// Menu အကွက်ကို နှိပ်သည့်အခါ ကြီးလာပြီး အလင်းတန်း လင်းပေးခြင်း
function initMenuCards() {
  const cards = document.querySelectorAll('.menu-card');
  const overlay = document.getElementById('zoomOverlay');
  const zoomImg = document.getElementById('zoomImg');
  const zoomBadge = document.getElementById('zoomBadge');
  const zoomTitle = document.getElementById('zoomTitle');
  const zoomEn = document.getElementById('zoomEn');
  const zoomPriceLabel = document.getElementById('zoomPriceLabel');
  const zoomPrice = document.getElementById('zoomPrice');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active-glow'));
      card.classList.add('active-glow');

      const img = card.querySelector('.image-wrapper img');
      const badge = card.querySelector('.badge');
      const title = card.querySelector('.food-title');
      const en = card.querySelector('.food-en');
      const priceLabel = card.querySelector('.price-label');
      const price = card.querySelector('.price');

      if (zoomImg && img) {
        zoomImg.src = img.src;
        zoomImg.alt = img.alt;
      }
      if (zoomBadge) zoomBadge.innerText = badge ? badge.innerText : '';
      if (zoomTitle) zoomTitle.innerText = title ? title.innerText : '';
      if (zoomEn) zoomEn.innerText = en ? en.innerText : '';
      if (zoomPriceLabel) zoomPriceLabel.innerText = priceLabel ? priceLabel.innerText : 'ဈေးနှုန်း';
      if (zoomPrice) zoomPrice.innerText = price ? price.innerText : '';

      if (overlay) {
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Keyboard ESC နှိပ်လျှင်လည်း ပြန်ပိတ်ပေးမည်
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeZoomCard();
    }
  });
}

// ကြီးနေသော အကွက်ကို ပြန်ပိတ်ခြင်း
function closeZoomCard(event) {
  const overlay = document.getElementById('zoomOverlay');
  if (!overlay) return;

  if (!event || event.target === overlay || event.target.classList.contains('zoom-close')) {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMenuCards);
} else {
  initMenuCards();
}
