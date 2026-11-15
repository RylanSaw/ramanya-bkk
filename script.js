let currentCategory = 'all';

function setCategory(category, button) {
  currentCategory = category;

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');

  applyFilters();
}

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
