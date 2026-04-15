// ============ 中英文切换 ============
(function () {
  const STORAGE_KEY = 'site-lang';
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  function applyLang(lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.querySelectorAll('[data-en]').forEach(el => {
      // 第一次切换前保存原始中文
      if (!el.dataset.zh) el.dataset.zh = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.zh;
    });
    // 切换 title
    document.querySelectorAll('title[data-en]').forEach(t => {
      if (!t.dataset.zh) t.dataset.zh = t.textContent;
      t.textContent = lang === 'en' ? t.dataset.en : t.dataset.zh;
    });
    btn.textContent = lang === 'en' ? '中文' : 'EN';
    btn.setAttribute('aria-label', lang === 'en' ? '切换到中文' : 'Switch to English');
  }

  const saved = localStorage.getItem(STORAGE_KEY) || 'zh';
  applyLang(saved);

  btn.addEventListener('click', () => {
    const current = localStorage.getItem(STORAGE_KEY) || 'zh';
    const next = current === 'zh' ? 'en' : 'zh';
    localStorage.setItem(STORAGE_KEY, next);
    applyLang(next);
  });
})();

// ============ 证书轮播 ============
(function () {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = track.querySelectorAll('img');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let current = 0;

    images.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      current = (index + images.length) % images.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
  });
})();
