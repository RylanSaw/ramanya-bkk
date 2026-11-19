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

// 4 second ခြားတစ်ခါ စက်ဝိုင်းအသေးမှ လေးထောင့်ပုံစံပြောင်းမည့် Top Notification
function initTopNotification() {
  const notif = document.getElementById('topNotif');
  const notifIcon = document.getElementById('notifIcon');
  const notifText = document.getElementById('notifText');
  if (!notif || !notifText) return;

  const messages = [
    { icon: '😎', text: 'ချက်မယ် ပြုတ်မယ် Ramanya food house နော် 😎😎' },
    { icon: '💛', text: 'လာလည်ပါ ကွယ် ဖိတ်ခေါ်တယ် 😎😎' },
    { icon: '🍜', text: 'မုန့်ဟင်းခါး ပူပူနွေးနွေးနဲ့ ပဲပြုတ်ထမင်း ဆီဆမ်း အနံ့လေးတွေတောင် ဒီဘက်ထိ မွှေးလာသလိုပဲ 😎🍜' },
    { icon: '✨', text: 'ဘန်ကောက်ရောက် မြန်မာအစားအစာ ချစ်သူတွေအတွက်တော့ Ramanya Food House က ရှယ်နေရာလေး ဖြစ်နေပြီပေါ့။' },
    { icon: '🍲', text: 'မုန့်ဟင်းခါး ယနေ့ရပြီနော်' },
    { icon: '🫘', text: 'ယနေ့ ပဲပြုတ်ရပြီ နော်' }
  ];

  let currentIndex = 0;

  function playNotificationCycle() {
    const item = messages[currentIndex];
    if (notifIcon) notifIcon.innerText = item.icon;
    notifText.innerText = item.text;

    // 1. စက်ဝိုင်းအသေး ပေါ်လာမည်
    notif.classList.remove('expanded');
    notif.classList.add('circle-in');

    // 2. ခဏအကြာတွင် စက်ဝိုင်းအသေးမှ လေးထောင့်ပုံစံသို့ ပြောင်းပြီး စာသားပေါ်လာမည်
    setTimeout(() => {
      notif.classList.add('expanded');
    }, 400);

    // 3. 4 second မပြည့်ခင် လေးထောင့်မှ စက်ဝိုင်းအသေးသို့ ပြန်ကျုံ့မည်
    setTimeout(() => {
      notif.classList.remove('expanded');
    }, 3250);

    // 4. စက်ဝိုင်းအသေး ပျောက်သွားမည်
    setTimeout(() => {
      notif.classList.remove('circle-in');
    }, 3650);

    // နောက်တစ်ကြိမ်အတွက် စာသားပြောင်းမည်
    currentIndex = (currentIndex + 1) % messages.length;
  }

  // စာမျက်နှာပွင့်သည်နှင့် ပထမစာသား စပြမည်
  playNotificationCycle();

  // 4 second (4000ms) ခြားတစ်ခါ ထပ်ခါတလဲလဲ ပြသမည်
  setInterval(playNotificationCycle, 4000);
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

function initAll() {
  initTopNotification();
  initMenuCards();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
