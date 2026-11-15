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
  const searchText = document.getElementById('searchInput').value.toLowerCase();
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

// Menu အကွက်ကို နှိပ်သည့်အခါ နောက်ခံအလင်းတန်း လင်းပေးခြင်း
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.menu-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isAlreadyGlowing = card.classList.contains('active-glow');

      // အခြားကတ်များ၏ အလင်းကို အရင်ပိတ်မည်
      cards.forEach(c => c.classList.remove('active-glow'));

      // နှိပ်လိုက်သော ကတ်ကို အလင်းဖွင့်ပေးမည် (လင်းနေပြီးသားဆိုလျှင် ပြန်ပိတ်မည်)
      if (!isAlreadyGlowing) {
        card.classList.add('active-glow');
      }
    });
  });
});
