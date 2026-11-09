// Extracted page interactions from the original Stitch export


  (function() {
    // 1. Live Countdown Timer to Dec 08, 2026 09:00:00 IST
    const targetDate = new Date('2026-12-08T09:00:00+05:30').getTime();
    function updateCountdown() {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const elDays = document.getElementById('cd-days');
        const elHours = document.getElementById('cd-hours');
        const elMinutes = document.getElementById('cd-minutes');
        const elSeconds = document.getElementById('cd-seconds');

        if (elDays) elDays.innerText = String(days).padStart(2, '0');
        if (elHours) elHours.innerText = String(hours).padStart(2, '0');
        if (elMinutes) elMinutes.innerText = String(minutes).padStart(2, '0');
        if (elSeconds) elSeconds.innerText = String(seconds).padStart(2, '0');
      }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 2. Interactive APC Calculator Widget
    const authorTypeEl = document.getElementById('calc-author-type');
    const authorsCountEl = document.getElementById('calc-authors-count');
    const pagesCountEl = document.getElementById('calc-pages-count');
    const totalDisplayEl = document.getElementById('calc-total-display');
    const breakdownTextEl = document.getElementById('calc-breakdown-text');

    function calculateAPC() {
      if (!authorTypeEl || !authorsCountEl || !pagesCountEl || !totalDisplayEl) return;
      
      const type = authorTypeEl.value;
      const authors = Math.max(1, parseInt(authorsCountEl.value, 10) || 1);
      const pages = Math.max(1, parseInt(pagesCountEl.value, 10) || 1);

      const extraAuthors = Math.max(0, authors - 5);
      const extraPages = Math.max(0, pages - 10);

      if (type === 'indian') {
        const base = 2000;
        const extraAuthorFee = extraAuthors * 300;
        const extraPageFee = extraPages * 200;
        const total = base + extraAuthorFee + extraPageFee;

        totalDisplayEl.innerText = '₹' + total.toLocaleString('en-IN');
        breakdownTextEl.innerText = `Base ₹2,000 + ${extraAuthors} extra author(s) (₹${extraAuthorFee}) + ${extraPages} extra page(s) (₹${extraPageFee})`;
      } else {
        const base = 35;
        const extraAuthorFee = extraAuthors * 3;
        const extraPageFee = extraPages * 2;
        const total = base + extraAuthorFee + extraPageFee;

        totalDisplayEl.innerText = '$' + total + ' / €' + total;
        breakdownTextEl.innerText = `Base $35 + ${extraAuthors} extra author(s) ($${extraAuthorFee}) + ${extraPages} extra page(s) ($${extraPageFee})`;
      }
    }

    if (authorTypeEl) authorTypeEl.addEventListener('change', calculateAPC);
    if (authorsCountEl) authorsCountEl.addEventListener('input', calculateAPC);
    if (pagesCountEl) pagesCountEl.addEventListener('input', calculateAPC);
    calculateAPC();

    // 3. Technical Tracks Accordion Toggling
    const trackToggles = document.querySelectorAll('.track-toggle');
    trackToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const parentCard = btn.closest('.track-card');
        const content = parentCard.querySelector('.track-content');
        const icon = btn.querySelector('.track-icon');

        if (content.classList.contains('hidden')) {
          content.classList.remove('hidden');
          icon.style.transform = 'rotate(0deg)';
        } else {
          content.classList.add('hidden');
          icon.style.transform = 'rotate(-90deg)';
        }
      });
    });
  })();


/* --- Page logic block --- */
const drawer=document.getElementById('academic-drawer');const drawerPanel=document.getElementById('academic-drawer-panel');const toggleBtn=document.getElementById('menu-toggle-btn');const closeBtn=document.getElementById('menu-close-btn');function openDrawer(){drawer.classList.remove('opacity-0','pointer-events-none');drawerPanel.classList.remove('-translate-x-full');}function closeDrawer(){drawer.classList.add('opacity-0','pointer-events-none');drawerPanel.classList.add('-translate-x-full');}if(toggleBtn)toggleBtn.addEventListener('click',openDrawer);if(closeBtn)closeBtn.addEventListener('click',closeDrawer);if(drawer)drawer.addEventListener('click',(e)=>{if(e.target===drawer)closeDrawer();});