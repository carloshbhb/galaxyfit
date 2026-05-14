/**
 * topbar.js — vetor.blog
 * Injeta a barra de urgência + navbar em todas as páginas internas.
 * Inclua com:
 * <script src="/topbar.js"></script>
 * logo após <body>
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
   * CSS isolado da topbar
   * NÃO altera o tema global do site
   * ───────────────────────────────────────────── */
  var css = `

    :root{
      --samsung:#1428A0;
      --samsung-light:#4285F4;

      /* tema navbar */
      --vt-nav-bg:rgba(255,255,255,.92);
      --vt-nav-border:rgba(20,40,160,.08);

      --vt-text:#111827;
      --vt-muted:#5B6475;

      --red:#FF3A3A;
    }

    *,*::before,*::after{
      box-sizing:border-box;
    }

    /* ─────────────────────────
       urgency bar
    ───────────────────────── */
    .vt-urgency{
      background:var(--red);
      padding:10px 20px;
      text-align:center;

      font-family:'Syne',sans-serif;
      font-weight:700;
      font-size:.85rem;
      letter-spacing:.08em;
      text-transform:uppercase;

      color:#fff;

      display:flex;
      align-items:center;
      justify-content:center;
      gap:12px;

      position:relative;
      overflow:hidden;

      z-index:101;
    }

    .vt-urgency::after{
      content:'';
      position:absolute;
      inset:0;

      background:rgba(0,0,0,.18);

      opacity:0;
      animation:vt-pulse-bar 2s ease-in-out infinite;

      pointer-events:none;
    }

    @keyframes vt-pulse-bar{
      0%,100%{opacity:0}
      50%{opacity:1}
    }

    .vt-blink{
      display:inline-block;

      width:8px;
      height:8px;

      background:#fff;
      border-radius:50%;

      animation:vt-blink 1s step-end infinite;
    }

    @keyframes vt-blink{
      0%,100%{opacity:1}
      50%{opacity:0}
    }

    /* ─────────────────────────
       navbar
    ───────────────────────── */
    .vt-navbar{
      position:sticky;
      top:0;
      z-index:100;

      background:var(--vt-nav-bg);
      backdrop-filter:blur(20px);

      border-bottom:1px solid var(--vt-nav-border);

      padding:15px 40px;

      display:flex;
      align-items:center;
      justify-content:space-between;
    }

    .vt-logo{
      display:flex;
      align-items:center;
      gap:10px;

      text-decoration:none;
      user-select:none;
    }

    .vt-logo-mark{
      flex-shrink:0;
      width:36px;
      height:36px;
    }

    .vt-logo-wordmark{
      display:flex;
      flex-direction:column;
      line-height:1;
      gap:1px;
    }

    .vt-logo-name{
      font-family:'Syne',sans-serif;
      font-weight:800;
      font-size:1.05rem;
      letter-spacing:.03em;

      color:var(--vt-text);

      transition:color .2s ease;
    }

    .vt-logo-tld{
      font-family:'DM Sans',sans-serif;
      font-weight:500;
      font-size:.62rem;

      letter-spacing:.18em;
      text-transform:uppercase;

      color:#7EB3FF;

      transition:color .2s ease;
    }

    .vt-logo:hover .vt-logo-name{
      color:var(--samsung-light);
    }

    .vt-logo:hover .vt-logo-tld{
      color:#a8ccff;
    }

    /* ─────────────────────────
       nav links
    ───────────────────────── */
    .vt-nav-links{
      display:flex;
      gap:20px;

      list-style:none;
      align-items:center;
    }

    .vt-nav-links a{
      color:var(--vt-muted);

      text-decoration:none;
      font-size:.92rem;
      font-weight:600;

      transition:all .2s ease;
    }

    .vt-nav-links a:hover{
      color:var(--samsung-light);
    }

    /* ─────────────────────────
       CTA
    ───────────────────────── */
    .vt-nav-cta{
      background:var(--samsung-light);
      color:#fff;

      padding:10px 22px;
      border-radius:999px;

      font-family:'Syne',sans-serif;
      font-weight:700;
      font-size:.85rem;

      text-decoration:none;
      letter-spacing:.04em;
      text-transform:uppercase;

      transition:all .25s ease;

      display:inline-flex;
      align-items:center;
      justify-content:center;

      min-width:148px;
    }

    .vt-nav-cta:hover{
      background:#fff;
      color:var(--samsung);

      transform:translateY(-1px);

      box-shadow:0 8px 24px rgba(66,133,244,.25);
    }

    /* ─────────────────────────
       mobile
    ───────────────────────── */
    @media(max-width:768px){

      .vt-navbar{
        padding:12px 18px;
      }

      .vt-nav-links{
        display:none;
      }

      .vt-nav-cta{
        min-width:auto;
        padding:10px 18px;
        font-size:.78rem;
      }

      .vt-urgency{
        font-size:.72rem;
        line-height:1.4;
        padding:9px 14px;
      }

    }

    /* ─────────────────────────
       dark mode automático
    ───────────────────────── */
    @media (prefers-color-scheme: dark){

      :root{
        --vt-nav-bg:rgba(8,12,20,.92);
        --vt-nav-border:rgba(66,133,244,.15);

        --vt-text:#F0F4FF;
        --vt-muted:#8A96B0;
      }

    }

  `;

  /* injeta CSS */
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─────────────────────────────────────────────
   * Google Fonts
   * ───────────────────────────────────────────── */
  var fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href =
    'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap';

  fontLink.media = 'print';

  fontLink.onload = function () {
    this.media = 'all';
  };

  document.head.appendChild(fontLink);

  /* ─────────────────────────────────────────────
   * SVG Logo
   * ───────────────────────────────────────────── */
  var markSVG =
    '<svg class="vt-logo-mark" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
    + '<rect width="36" height="36" rx="9" fill="#1428A0"/>'
    + '<polygon points="8,10 14.5,10 18,22 21.5,10 28,10 19.5,27 16.5,27" fill="#4285F4"/>'
    + '<circle cx="18" cy="30.5" r="1.8" fill="#4285F4" opacity="0.5"/>'
    + '</svg>';

  /* ─────────────────────────────────────────────
   * urgency bar
   * ───────────────────────────────────────────── */
  var urgencyHTML =
    '<div class="vt-urgency" role="banner">'
    + '<span class="vt-blink" aria-hidden="true"></span>'
    + '⚡ OFERTA RELÂMPAGO: ESTOQUE LIMITADO – PREÇO PROMOCIONAL POR TEMPO LIMITADO!'
    + '<span class="vt-blink" aria-hidden="true"></span>'
    + '</div>';

  /* ─────────────────────────────────────────────
   * navbar
   * ───────────────────────────────────────────── */
  var navHTML =
    '<nav class="vt-navbar" aria-label="Navegação principal">'
    + '<a href="/" class="vt-logo" aria-label="Vetor Blog — página inicial">'
    + markSVG
    + '<div class="vt-logo-wordmark">'
    + '<span class="vt-logo-name">vetor</span>'
    + '<span class="vt-logo-tld" aria-hidden="true">.blog</span>'
    + '</div>'
    + '</a>'

    + '<ul class="vt-nav-links">'
    + '<li><a href="/">Home</a></li>'
    + '<li><a href="/samsung-galaxy-fit3-vale-a-pena.html">Review</a></li>'
    + '<li><a href="/samsung-galaxy-fit3-vs-mi-band-8.html">Comparativos</a></li>'
    + '<li><a href="/blog-preco.html">Preço</a></li>'
    + '</ul>'

    + '<a href="https://meli.la/2gyyBt9" class="vt-nav-cta" target="_blank" rel="noopener sponsored">'
    + 'Comprar Agora →'
    + '</a>'

    + '</nav>';

  /* ─────────────────────────────────────────────
   * injeta no body
   * ───────────────────────────────────────────── */
  var wrapper = document.createElement('div');

  wrapper.innerHTML = urgencyHTML + navHTML;

  var body = document.body;

  body.insertBefore(wrapper.lastChild, body.firstChild);
  body.insertBefore(wrapper.firstChild, body.firstChild);

})();
