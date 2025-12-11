const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const storageKey = 'conventional-gitmojis:theme';
let cardsEnhanced = false;

  function getSystemPreference() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      toggle && (toggle.querySelector('.theme-toggle-icon').textContent = '☀️');
    } else if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      toggle && (toggle.querySelector('.theme-toggle-icon').textContent = '🌙');
    } else {
      root.removeAttribute('data-theme');
      toggle && (toggle.querySelector('.theme-toggle-icon').textContent = getSystemPreference() === 'dark' ? '☀️' : '🌙');
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved);
    } else {
      applyTheme(undefined);
    }
  }

  toggle && toggle.addEventListener('click', function () {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : current === 'light' ? undefined : 'dark';
    if (next) {
      localStorage.setItem(storageKey, next);
    } else {
      localStorage.removeItem(storageKey);
    }
    applyTheme(next);
  });

  initTheme();

  // Copy feedback helpers
  function ensureLiveRegion() {
    let region = document.getElementById('live-region');
    if (!region) {
      region = document.createElement('div');
      region.id = 'live-region';
      region.className = 'sr-only';
      region.setAttribute('aria-live', 'polite');
      document.body.appendChild(region);
    }
    return region;
  }

  function ensureToast() {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    return toast;
  }

  function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        const success = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (success) resolve(); else reject(new Error('execCommand copy failed'));
      } catch (err) {
        document.body.removeChild(textarea);
        reject(err);
      }
    });
  }

  function showToast(message) {
    const toast = ensureToast();
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(function () {
      toast.classList.remove('show');
    }, 1200);
  }

  function handleCopyEmoji(emojiEl) {
    if (cardsEnhanced) return;
    const emoji = (emojiEl.textContent || '').trim();
    if (!emoji) return;
    copyTextToClipboard(emoji).then(function () {
      emojiEl.setAttribute('data-copied', 'true');
      const live = ensureLiveRegion();
      live.textContent = 'Copied: ' + emoji;
      showToast('Copied: ' + emoji);
      window.setTimeout(function () {
        emojiEl.removeAttribute('data-copied');
      }, 900);
    }).catch(function () {
      emojiEl.setAttribute('data-copied', 'true');
      window.setTimeout(function () {
        emojiEl.removeAttribute('data-copied');
      }, 900);
    });
  }

  function enhanceEmojis() {
    const emojiEls = document.querySelectorAll('.grid .emoji');
    emojiEls.forEach(function (el) {
      const symbol = (el.textContent || '').trim();
      el.setAttribute('aria-label', 'Kopírovat emoji ' + symbol);
      el.removeAttribute('aria-hidden');
      el.addEventListener('click', function () { handleCopyEmoji(el); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.key === ' ') e.preventDefault();
          handleCopyEmoji(el);
        }
      });
    });
  }

  function getEmojiFromCard(cardEl) {
    const emojiEl = cardEl.querySelector('.emoji');
    return emojiEl ? (emojiEl.textContent || '').trim() : '';
  }

  function handleCopyFromCard(cardEl) {
    const emoji = getEmojiFromCard(cardEl);
    if (!emoji) return;
    copyTextToClipboard(emoji).then(function () {
      cardEl.setAttribute('data-copied', 'true');
      const live = ensureLiveRegion();
      live.textContent = 'Copied: ' + emoji;
      showToast('Copied: ' + emoji);
      window.setTimeout(function () {
        cardEl.removeAttribute('data-copied');
      }, 900);
    }).catch(function () {
      cardEl.setAttribute('data-copied', 'true');
      window.setTimeout(function () {
        cardEl.removeAttribute('data-copied');
      }, 900);
    });
  }

  function enhanceCards() {
    const cards = document.querySelectorAll('.grid .card');
    cards.forEach(function (card) {
      const symbol = getEmojiFromCard(card);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      if (symbol) card.setAttribute('aria-label', 'Kopírovat emoji ' + symbol);
      card.addEventListener('click', function () {
        handleCopyFromCard(card);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          if (e.key === ' ') e.preventDefault();
          handleCopyFromCard(card);
        }
      });
    });
    cardsEnhanced = true;
  }

  function renderCards(items) {
    const grid = document.querySelector('.grid');
    if (!grid) return;
    const frag = document.createDocumentFragment();
    items.forEach(function (item) {
      const article = document.createElement('article');
      article.className = 'card';
      if (item.type) {
        article.setAttribute('data-type', item.type);
      }
      if (item.color) {
        article.style.setProperty('--stripe-color', item.color);
      }
      // inline stripe for emoji card (instead of CSS ::before)
      const stripe = document.createElement('div');
      stripe.setAttribute('aria-hidden', 'true');
      stripe.style.position = 'absolute';
      stripe.style.left = '0';
      stripe.style.top = '0';
      stripe.style.bottom = '0';
      stripe.style.width = '98px';
      stripe.style.background = item.color || '#e6e8eb';
      article.appendChild(stripe);
      const emoji = document.createElement('div');
      emoji.className = 'emoji';
      emoji.setAttribute('aria-hidden', 'true');
      emoji.textContent = item.emoji || '';
      // emoji box inline sizing
      emoji.style.display = 'grid';
      emoji.style.placeItems = 'center';
      emoji.style.width = '80px';
      emoji.style.height = '80px';
      emoji.style.fontSize = '54px';
      const content = document.createElement('div');
      content.className = 'content';
      const h2 = document.createElement('h2');
      h2.className = 'label';
      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = item.name || '';
      h2.appendChild(name);
      const p = document.createElement('p');
      p.className = 'description';
      p.textContent = item.description || '';
      content.appendChild(h2);
      content.appendChild(p);
      article.appendChild(emoji);
      article.appendChild(content);
      frag.appendChild(article);
    });
    grid.innerHTML = '';
    grid.appendChild(frag);
  }

  function loadEmojis() {
    return fetch('./emojis.json', { cache: 'no-cache' })
      .then(function (r) { return r.json(); });
  }


  loadEmojis().then(function (items) {
    renderCards(items);
    enhanceEmojis();
    enhanceCards();
  }).catch(function () {
    // If loading fails, keep grid empty
  });
