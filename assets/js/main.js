(() => {
  // mobile menu
  const btn = document.querySelector('.menu-btn');
  const nav = document.getElementById('gnav');
  if (btn && nav) {
    const close = () => { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-label', 'メニューを開く'); };
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    });
    nav.addEventListener('click', e => { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  // reveal on scroll (content stays visible without JS / with reduced motion)
  const els = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add('in'));
  }

  // staging form: validate only, never send
  const form = document.querySelector('form.form');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.website && form.website.value) return; // honeypot
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const n=form.querySelector('.f-note'); n.textContent='ステージングのため送信は行いません（入力チェックは正常です）。'; n.setAttribute('role','status');
  });
})();
