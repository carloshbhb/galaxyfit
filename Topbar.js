/**
 * topbar.js — vetor.blog
 * Injeta a barra de urgência + navbar em todas as páginas internas.
 * Inclua com: <script src="/topbar.js"></script> logo após <body>.
 */
(function () {
  'use strict';

  /* ── Estilos críticos injetados via <style> (evita FOUC) ─── */
  var css = `
    :root{--samsung:#1428A0;--samsung-light:#4285F4;--bg:#080C14;--surface:#0F1623;--muted:#8A96B0;--text:#F0F4FF;--red:#FF3A3A;--green:#00D46A;}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;}

    /* ── urgency bar ── */
    .vt-urgency{
      background:var(--red);padding:10px 20px;text-align:center;
      font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;
      letter-spacing:.08em;text-transform:uppercase;
      display:flex;align-items:center;justify-content:center;gap:12px;
      position:relative;overflow:hidden;
    }
    .vt-urgency::after{
      content:'';position:absolute;inset:0;background:rgba(0,0,0,.18);
      opacity:0;animation:vt-pulse-bar 2s ease-in-out infinite;pointer-events:none;
    }
    @keyframes vt-pulse-bar{0%,100%{opacity:0}50%{opacity:1}}
    .vt-blink{
      display:inline-block;width:8px;height:8px;background:#fff;
      border-radius:50%;animation:vt-blink 1s step-end infinite;
    }
    @keyframes vt-blink{0%,100%{opacity:1}50%{opacity:0}}

    /* ── navbar ── */
    .vt-navbar{
      position:sticky;top:0;z-index:100;
      background:rgba(8,12,20,.95);backdrop-filter:blur(20px);
      border-bottom:1px solid rgba(66,133,244,.15);
      padding:15px 40px;
      display:flex;align-items:center;justify-content:space-between;
    }
    .vt-logo{display:flex;align-items:center;gap:10px;text-decoration:none;user-select:none;}
    .vt-logo-mark{flex-shrink:0;width:36px;height:36px;}
    .vt-logo-wordmark{display:flex;flex-direction:column;line-height:1;gap:1px;}
    .vt-logo-name{
      font-family:'Syne',sans-serif;font-weight:800;font-size:1.05rem;
      letter-spacing:.03em;color:#fff;
    }
    .vt-logo-tld{
      font-family:'DM Sans',sans-serif;font-weight:400;font-size:.62rem;
      letter-spacing:.18em;text-transform:uppercase;
      color:#7EB3FF; /* ≥4.5:1 on #0F1623 — WCAG AA */
    }
    .vt-logo:hover .vt-logo-name{color:var(--samsung-light);}
    .vt-logo:hover .vt-logo-tld{color:#a8ccff;}

    .vt-nav-links{display:flex;gap:20px;list-style:none;align-items:center;}
    .vt-nav-links a{
      color:var(--muted);text-decoration:none;font-size:.9rem;
      font-weight:600;transition:color .2s;
    }
    .vt-nav-links a:hover{color:var(--samsung-light);}

    .vt-nav-cta{
      background:var(--samsung-light);color:#fff;
      padding:10px 22px;border-radius:50px;
      font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;
      text-decoration:none;letter-spacing:.04em;
      transition:all .2s;text-transform:uppercase;
      /* explicit dimensions prevent CLS */
      display:inline-flex;align-items:center;
      min-width:148px;justify-content:center;
    }
    .vt-nav-cta:hover{
      background:#fff;color:var(--samsung);transform:translateY(-1px);
      box-shadow:0 8px 24px rgba(66,133,244,.3);
    }

    @media(max-width:600px){
      .vt-navbar{padding:12px 20px;}
      .vt-nav-links{display:none;}
    }
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── Fonts (non-blocking) ── */
  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap';
  fontLink.media = 'print';
  fontLink.onload = function () { this.media = 'all'; };
  document.head.appendChild(fontLink);

  /* ── SVG mark (inline, zero requests) ── */
  var markSVG = '<svg class="vt-logo-mark" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
    + '<rect width="36" height="36" rx="9" fill="#1428A0"/>'
    + '<polygon points="8,10 14.5,10 18,22 21.5,10 28,10 19.5,27 16.5,27" fill="#4285F4"/>'
    + '<circle cx="18" cy="30.5" r="1.8" fill="#4285F4" opacity="0.5"/>'
    + '</svg>';

  /* ── Urgency bar HTML ── */
  var urgencyHTML = '<div class="vt-urgency" role="banner">'
    + '<span class="vt-blink" aria-hidden="true"></span>'
    + '⚡ OFERTA RELÂMPAGO: ESTOQUE LIMITADO – PREÇO PROMOCIONAL POR TEMPO LIMITADO!'
    + '<span class="vt-blink" aria-hidden="true"></span>'
    + '</div>';

  /* ── Navbar HTML ── */
  var navHTML = '<nav class="vt-navbar" aria-label="Navegação principal">'
    + '<a href="/" class="vt-logo" aria-label="Vetor Blog — página inicial">'
    + markSVG
    + '<div class="vt-logo-wordmark">'
    + '<span class="vt-logo-name">vetor</span>'
    + '<span class="vt-logo-tld" aria-hidden="true">.blog</span>'
    + '</div>'
    + '</a>'
    + '<ul class="vt-nav-links">'
    + '<li><a href="/">Home</a></li>'
    + '<li><a href="/blog-vale-pena.html">Review</a></li>'
    + '<li><a href="/blog-vs-mi-band.html">Comparativos</a></li>'
    + '<li><a href="/blog-preco.html">Preço</a></li>'
    + '</ul>'
    + '<a href="https://meli.la/2gyyBt9" class="vt-nav-cta" target="_blank" rel="noopener sponsored">Comprar Agora →</a>'
    + '</nav>';

  /* ── Inject before first child of <body> ── */
  var wrapper = document.createElement('div');
  wrapper.innerHTML = urgencyHTML + navHTML;
  var body = document.body;
  body.insertBefore(wrapper.lastChild, body.firstChild); // navbar
  body.insertBefore(wrapper.firstChild, body.firstChild); // urgency (on top)
})();
