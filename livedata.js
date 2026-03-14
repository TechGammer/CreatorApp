/* ═══════════════════════════════════════════════════════════════
   GEOPULSE INDIA — FREE LIVE DATA ENGINE  v2.0
   ─────────────────────────────────────────────────────────────
   Free sources (no API key needed):
     • Yahoo Finance  — NIFTY50, BANKNIFTY, SENSEX, VIX, USD/INR,
                        GOLD, CRUDE, sector indices
     • CoinGecko      — BTC/ETH for market sentiment
     • Stooq          — backup price feed
     • AllOrigins     — CORS proxy fallback
     • RSS2JSON       — live Indian market news (ET, MC, BS, NDTV)
     • exchangerate   — USD/INR live
   ═══════════════════════════════════════════════════════════════ */

'use strict';

window.LiveAPI = (function () {

  /* ─── CONFIG ─────────────────────────────────────────────── */
  const C = {
    YF1  : 'https://query1.finance.yahoo.com/v8/finance/chart/',
    YF2  : 'https://query2.finance.yahoo.com/v8/finance/chart/',
    YFQ  : 'https://query1.finance.yahoo.com/v7/finance/quote?symbols=',
    PROXY: 'https://api.allorigins.win/raw?url=',    // free CORS proxy
    STOOQ: 'https://stooq.com/q/l/?f=sd2t2ohlcvn&h&e=json&s=',
    RSS  : 'https://api.rss2json.com/v1/api.json?count=20&rss_url=',
    GECKO: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true',
    XR   : 'https://open.er-api.com/v6/latest/USD',   // USD/INR free
    T_PRICE: 30000,   // 30 s refresh for prices
    T_NEWS : 180000,  // 3 min refresh for news
    T_CHART: 60000,   // 1 min chart cache
  };

  /* ─── SYMBOLS ────────────────────────────────────────────── */
  const SYM = {
    nifty50    : { yf: '^NSEI',         stooq: '^nf50',    name: 'NIFTY 50'     },
    banknifty  : { yf: '^NSEBANK',      stooq: '^nfbn',    name: 'BANKNIFTY'    },
    sensex     : { yf: '^BSESN',        stooq: '^bse',     name: 'SENSEX'       },
    indiavix   : { yf: '^INDIAVIX',     stooq: null,       name: 'INDIA VIX'    },
    finnifty   : { yf: 'NIFTY_FIN_SERVICE.NS', stooq: null, name: 'FINNIFTY'   },
    niftyit    : { yf: '^CNXIT',        stooq: null,       name: 'NIFTY IT'     },
    niftyauto  : { yf: '^CNXAUTO',      stooq: null,       name: 'NIFTY AUTO'   },
    niftyphrm  : { yf: '^CNXPHARMA',    stooq: null,       name: 'NIFTY PHARMA' },
    niftymetal : { yf: '^CNXMETAL',     stooq: null,       name: 'NIFTY METAL'  },
    niftyfmcg  : { yf: '^CNXFMCG',      stooq: null,       name: 'NIFTY FMCG'  },
    usdinr     : { yf: 'INR=X',         stooq: 'usd/inr',  name: 'USD/INR'      },
    gold       : { yf: 'GC=F',          stooq: 'xauusd',   name: 'GOLD $/oz'    },
    crude      : { yf: 'CL=F',          stooq: 'cl.f',     name: 'CRUDE $/bbl'  },
    btcusd     : { yf: 'BTC-USD',       stooq: null,       name: 'BTC/USD'      },
  };

  /* ─── FREE RSS NEWS FEEDS ────────────────────────────────── */
  const FEEDS = [
    { url: 'https://economictimes.indiatimes.com/markets/rss.cms',         name: 'Economic Times'    },
    { url: 'https://economictimes.indiatimes.com/news/economy/rss.cms',    name: 'ET Economy'        },
    { url: 'https://www.moneycontrol.com/rss/marketsindia.xml',            name: 'Moneycontrol'      },
    { url: 'https://www.business-standard.com/rss/markets-106.rss',        name: 'Business Standard' },
    { url: 'https://feeds.feedburner.com/ndtvprofit-latest',               name: 'NDTV Profit'       },
    { url: 'https://www.livemint.com/rss/markets',                         name: 'LiveMint'          },
  ];

  /* ─── INFLUENCER KEYWORD MAP ─────────────────────────────── */
  // Maps influencer IDs to keywords that trigger a news association
  const INF_KEYWORDS = {
    1 : ['modi','india','bjp','government','pm india'],
    2 : ['nirmala','sitharaman','finance minister','budget','gst'],
    3 : ['reliance','ambani','jio','mukesh'],
    4 : ['adani','adani group','adani ports','adani green'],
    5 : ['fed','federal reserve','powell','fomc','interest rate'],
    6 : ['trump','tariff','us president','america','white house'],
    7 : ['musk','tesla','spacex','twitter','x.com','elon'],
    8 : ['ecb','lagarde','european central bank','euro'],
    9 : ['buffett','berkshire','warren'],
    10: ['dalio','bridgewater','ray dalio'],
    11: ['rajan','raghuram'],
    12: ['kotak','uday kotak','kotak bank'],
    13: ['zerodha','nithin','kamath'],
    21: ['blackrock','larry fink'],
    22: ['jpmorgan','jamie dimon'],
    33: ['yellen','treasury'],
    37: ['rbi','reserve bank','repo rate','monetary policy'],
    38: ['sebi','securities exchange','regulator'],
  };

  /* ─── SIMPLE CACHE ───────────────────────────────────────── */
  const _cache = {};
  const cacheGet = k => { const c = _cache[k]; return c && Date.now() - c.ts < c.ttl ? c.v : null; };
  const cacheSet = (k, v, ttl) => { _cache[k] = { v, ts: Date.now(), ttl }; };

  /* ─── HTTP HELPER ────────────────────────────────────────── */
  async function get(url) {
    const r = await fetch(url, { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }

  /* ─── YAHOO FINANCE CHART PARSER ─────────────────────────── */
  function parseYF(json) {
    const res = json?.chart?.result?.[0];
    if (!res) throw new Error('No YF result');
    const m   = res.meta;
    const q   = res.indicators?.quote?.[0] || {};
    const ts  = res.timestamp || [];
    const prev = m.chartPreviousClose || m.previousClose || m.regularMarketPreviousClose || m.regularMarketPrice;
    const price = m.regularMarketPrice;
    const chg   = price - prev;
    return {
      price, prev,
      open   : m.regularMarketOpen  || prev,
      high   : m.regularMarketDayHigh || price,
      low    : m.regularMarketDayLow  || price,
      volume : m.regularMarketVolume  || 0,
      change : chg,
      changePct : (chg / prev) * 100,
      currency  : m.currency || 'INR',
      exchange  : m.exchangeName || '',
      marketState: m.marketState || 'REGULAR',
      ohlcv  : ts.map((t, i) => ({
        time   : t,
        open   : q.open?.[i]   ?? null,
        high   : q.high?.[i]   ?? null,
        low    : q.low?.[i]    ?? null,
        close  : q.close?.[i]  ?? null,
        volume : q.volume?.[i] ?? 0,
      })).filter(c => c.close != null),
    };
  }

  /* ─── STOOQ PARSER ───────────────────────────────────────── */
  function parseStooq(json, sym) {
    const row = json?.symbols?.[sym];
    if (!row) throw new Error('No Stooq row');
    const price = +row.Close;
    const prev  = +row.Open; // approximate
    return {
      price, prev,
      open: +row.Open, high: +row.High, low: +row.Low,
      volume: +row.Volume || 0,
      change: price - prev,
      changePct: ((price - prev) / prev) * 100,
      ohlcv: [],
    };
  }

  /* ─── FETCH PRICE (multi-source fallback) ────────────────── */
  async function fetchPrice(id) {
    const s = SYM[id];
    if (!s) throw new Error('Unknown id: ' + id);

    // 1) Yahoo Finance query1
    for (const base of [C.YF1, C.YF2]) {
      try {
        const url = `${base}${encodeURIComponent(s.yf)}?interval=1m&range=1d&includePrePost=false`;
        return parseYF(await get(url));
      } catch (_) {}
    }

    // 2) Yahoo via CORS proxy
    try {
      const url = `${C.PROXY}${encodeURIComponent(C.YF1 + encodeURIComponent(s.yf) + '?interval=1m&range=1d')}`;
      return parseYF(await get(url));
    } catch (_) {}

    // 3) Stooq fallback (if symbol available)
    if (s.stooq) {
      try {
        const url = `${C.STOOQ}${encodeURIComponent(s.stooq)}`;
        return parseStooq(await get(url), s.stooq);
      } catch (_) {}
    }

    throw new Error('All sources failed for ' + id);
  }

  /* ─── FETCH CHART OHLCV ──────────────────────────────────── */
  async function fetchChart(id, interval = '5m', range = '1d') {
    const k = `chart_${id}_${interval}_${range}`;
    const cached = cacheGet(k);
    if (cached) return cached;
    const s = SYM[id];
    if (!s) throw new Error('Unknown id: ' + id);
    for (const base of [C.YF1, C.YF2]) {
      try {
        const url = `${base}${encodeURIComponent(s.yf)}?interval=${interval}&range=${range}&includePrePost=false`;
        const data = parseYF(await get(url)).ohlcv;
        cacheSet(k, data, C.T_CHART);
        return data;
      } catch (_) {}
    }
    throw new Error('Chart fetch failed: ' + id);
  }

  /* ─── FETCH CRYPTO (CoinGecko — free, no key) ───────────── */
  async function fetchCrypto() {
    try {
      const j = await get(C.GECKO);
      return {
        btc: { price: j.bitcoin?.usd, changePct: j.bitcoin?.usd_24h_change },
        eth: { price: j.ethereum?.usd, changePct: j.ethereum?.usd_24h_change },
      };
    } catch (_) { return null; }
  }

  /* ─── FETCH USD/INR (ExchangeRate-API — free, no key) ───── */
  async function fetchUSDINR() {
    try {
      const j = await get(C.XR);
      const inr = j?.rates?.INR;
      if (!inr) throw new Error('No INR rate');
      return { price: inr, change: 0, changePct: 0 };
    } catch (_) { return null; }
  }

  /* ─── FETCH NEWS (RSS2JSON — free for public feeds) ─────── */
  async function fetchNewsFromFeed(feedUrl) {
    const url = `${C.RSS}${encodeURIComponent(feedUrl)}`;
    const j   = await get(url);
    if (j.status !== 'ok') throw new Error('RSS error');
    return (j.items || []).map(item => ({
      title      : item.title?.trim() || '',
      description: (item.description || '').replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').trim().slice(0, 240),
      url        : item.link || '',
      source     : item.feed?.url ? new URL(item.feed.url).hostname.replace('www.', '') : 'market-news',
      time       : new Date(item.pubDate),
      thumbnail  : item.thumbnail || item.enclosure?.link || '',
    })).filter(i => i.title);
  }

  async function fetchAllNews() {
    for (const f of FEEDS) {
      try {
        const items = await fetchNewsFromFeed(f.url);
        if (items.length >= 5) {
          return items.map(i => ({ ...i, source: f.name }));
        }
      } catch (_) {}
    }
    return [];
  }

  /* ─── MAP NEWS TO INFLUENCERS ────────────────────────────── */
  function mapNewsToInfluencer(newsItem) {
    const text = (newsItem.title + ' ' + (newsItem.description || '')).toLowerCase();
    for (const [id, keywords] of Object.entries(INF_KEYWORDS)) {
      if (keywords.some(kw => text.includes(kw))) return +id;
    }
    return null;
  }

  /* ─── SENTIMENT FROM HEADLINE ────────────────────────────── */
  function sentimentFromText(text) {
    const t = text.toLowerCase();
    const bull = ['rise','surges','gain','rally','record','growth','positive','strong','buy','bullish','high','up','profit','beat','upgrade'];
    const bear = ['fall','drop','crash','decline','loss','negative','weak','sell','bearish','low','down','miss','risk','fear','downgrade'];
    const bs = bull.filter(w => t.includes(w)).length;
    const brs = bear.filter(w => t.includes(w)).length;
    return bs > brs ? 'bullish' : brs > bs ? 'bearish' : 'neutral';
  }

  /* ─── EVENT BUS ──────────────────────────────────────────── */
  const _listeners = {};
  const on   = (ev, cb) => { (_listeners[ev] = _listeners[ev] || []).push(cb); };
  const off  = (ev, cb) => { _listeners[ev] = (_listeners[ev] || []).filter(f => f !== cb); };
  const emit = (ev, d)  => { (_listeners[ev] || []).forEach(cb => { try { cb(d); } catch (_) {} }); };

  /* ─── LIVE STATE ─────────────────────────────────────────── */
  const state = {
    prices   : {},
    news     : [],
    crypto   : null,
    status   : 'starting',
    lastUpdate: null,
    errors   : 0,
    isLive   : false,
  };

  /* ─── UI STATUS BADGE ────────────────────────────────────── */
  function updateStatusBadge(live) {
    document.querySelectorAll('#mkt-badge, .mkt-badge').forEach(el => {
      if (live) {
        el.innerHTML = '<span class="pulse-dot"></span>NSE LIVE';
        el.className = el.className.replace('mkt-closed', 'mkt-open').replace(/\s*mkt-sim\s*/g, '') + ' mkt-open';
        el.style.color = '';
      } else {
        el.innerHTML = '<span style="opacity:.6">⚡</span> SIMULATED';
        el.style.color = '#ff9100';
      }
    });
    // Show status in any #live-status element
    const s = document.getElementById('live-status');
    if (s) {
      s.textContent  = live ? '● LIVE DATA' : '● SIMULATED';
      s.style.color  = live ? '#00e676' : '#ff9100';
    }
  }

  /* ─── REFRESH ALL PRICES ─────────────────────────────────── */
  const PRICE_KEYS = ['nifty50','banknifty','sensex','indiavix','niftyit','niftyauto','niftyphrm','gold','crude'];

  async function refreshPrices() {
    const results = await Promise.allSettled(
      PRICE_KEYS.map(k => fetchPrice(k).then(d => ({ id: k, ...d })))
    );

    // Also try USD/INR from ExchangeRate-API
    const usdInr = await fetchUSDINR();
    if (usdInr) state.prices.usdinr = { id: 'usdinr', ...usdInr };

    let got = 0;
    results.forEach(r => {
      if (r.status === 'fulfilled') {
        state.prices[r.value.id] = r.value;
        got++;
      }
    });

    if (got > 0) {
      state.isLive   = true;
      state.status   = 'live';
      state.errors   = 0;
      state.lastUpdate = new Date();
      updateStatusBadge(true);
      emit('prices', state.prices);
      emit('status', 'live');
      _applyPricesToEngines();
    } else {
      state.errors++;
      if (state.errors > 2) { state.isLive = false; updateStatusBadge(false); }
      emit('status', 'error');
    }
  }

  /* ─── REFRESH NEWS ───────────────────────────────────────── */
  async function refreshNews() {
    const items = await fetchAllNews();
    if (!items.length) return;
    // Attach sentiment + influencer mapping
    const enriched = items.map(item => ({
      ...item,
      sentiment   : sentimentFromText(item.title + ' ' + (item.description || '')),
      influencerId: mapNewsToInfluencer(item),
    }));
    state.news = enriched;
    emit('news', enriched);
    _applyNewsToFeed(enriched);
  }

  /* ─── REFRESH CRYPTO ─────────────────────────────────────── */
  async function refreshCrypto() {
    const data = await fetchCrypto();
    if (data) { state.crypto = data; emit('crypto', data); }
  }

  /* ─── APPLY PRICES TO APP.JS ENGINES ────────────────────── */
  function _applyPricesToEngines() {
    const GP = window.GeoPulse;
    if (!GP) return;
    const n  = state.prices.nifty50;
    const bn = state.prices.banknifty;
    if (n  && GP.NiftyEngine)     { GP.NiftyEngine.current  = n.price;  GP.NiftyEngine.prev = n.prev; }
    if (bn && GP.BankNiftyEngine) { GP.BankNiftyEngine.current = bn.price; GP.BankNiftyEngine.prev = bn.prev; }
    if (GP.updateHeaderTickers) GP.updateHeaderTickers();
    if (typeof updateSignalsNew === 'function') updateSignalsNew();
    // Also update hero panel if present
    _updateHeroPanel(n);
    // Update plain header elements that exist on sub-pages
    _updateSubPageHeader(n, bn);
  }

  function _updateHeroPanel(n) {
    if (!n) return;
    const $ = id => document.getElementById(id);
    if ($('hero-price')) $('hero-price').textContent = n.price.toFixed(2);
    if ($('hero-chg')) {
      $('hero-chg').textContent = (n.change >= 0 ? '▲ +' : '▼ ') + n.change.toFixed(2) + ' (' + (n.changePct >= 0 ? '+' : '') + n.changePct.toFixed(2) + '%)';
      $('hero-chg').style.color = n.change >= 0 ? '#00e676' : '#ff1744';
    }
    if ($('hero-high')) $('hero-high').textContent = n.high.toFixed(2);
    if ($('hero-low'))  $('hero-low').textContent  = n.low.toFixed(2);
  }

  function _updateSubPageHeader(n, bn) {
    const $ = id => document.getElementById(id);
    if (!n) return;
    const nv = $('nifty-val'), nc = $('nifty-chg');
    const bv = $('bn-val'),    bc = $('bn-chg');
    if (nv) nv.textContent = n.price.toFixed(2);
    if (nc) {
      nc.textContent = (n.change >= 0 ? '▲ +' : '▼ ') + Math.abs(n.change).toFixed(2) + ' (' + (n.changePct >= 0 ? '+' : '') + n.changePct.toFixed(2) + '%)';
      nc.className   = 'hticker-chg ' + (n.change >= 0 ? 'up' : 'dn');
    }
    if (bn && bv) bv.textContent = bn.price.toFixed(2);
    if (bn && bc) {
      bc.textContent = (bn.change >= 0 ? '▲ +' : '▼ ') + Math.abs(bn.change).toFixed(2) + ' (' + (bn.changePct >= 0 ? '+' : '') + bn.changePct.toFixed(2) + '%)';
      bc.className   = 'hticker-chg ' + (bn.change >= 0 ? 'up' : 'dn');
    }
    // Flash effect
    [nv, bv].forEach(el => {
      if (!el) return;
      el.style.transition = 'color .35s';
      el.style.color = '#00e5ff';
      setTimeout(() => { el.style.color = ''; }, 500);
    });
  }

  /* ─── APPLY NEWS TO FEED ─────────────────────────────────── */
  function _applyNewsToFeed(news) {
    // Update the ticker tape with real headlines
    const inner = document.getElementById('ticker-inner');
    if (inner && news.length) {
      const items = [...news.slice(0, 12), ...news.slice(0, 12)];
      inner.innerHTML = items.map(n =>
        `<span class="tn" style="color:${n.sentiment === 'bullish' ? '#00e676' : n.sentiment === 'bearish' ? '#ff1744' : '#ccdaf5'}">${n.title}</span>`
      ).join('');
    }
    // Emit to influencer live feed if on that page
    emit('news_feed_update', news);

    // Add top 3 news as posts to the GeoPulse feed
    const GP = window.GeoPulse;
    if (GP && GP.FeedEngine && GP.addNewPost) {
      news.slice(0, 3).forEach(n => {
        if (!n.title) return;
        GP.FeedEngine.posts.unshift({
          id       : Date.now() + Math.random(),
          txt      : n.title + (n.description ? ' — ' + n.description.slice(0, 80) + '…' : ''),
          influencer: { name: n.source, flag: '📰', avatar: '#1565c0', init: n.source.slice(0,2).toUpperCase() },
          time     : n.time,
          sent     : n.sentiment,
          impact   : 'high',
          source   : 'RSS: ' + n.source,
          liveNews : true,
          url      : n.url,
        });
      });
      if (GP.FeedEngine.posts.length > 80) GP.FeedEngine.posts = GP.FeedEngine.posts.slice(0, 80);
      if (typeof renderNewFeed === 'function') renderNewFeed();
      else if (GP.renderNewFeed) GP.renderNewFeed();
    }
  }

  /* ─── BUILD OPTIONS DATA FROM LIVE PRICE ────────────────── */
  function _buildLiveOptionsHints() {
    const n = state.prices.nifty50;
    if (!n) return;
    const vix = state.prices.indiavix;
    const spot = n.price;
    const iv = vix ? vix.price / 100 : 0.14;
    emit('options_hint', { spot, iv, index: 'nifty50' });
  }

  /* ─── GEOPOLITICS LIVE DATA ──────────────────────────────── */
  function _updateGeoPanel() {
    const crude = state.prices.crude;
    const gold  = state.prices.gold;
    const usd   = state.prices.usdinr;
    if (crude && document.getElementById('crude-price'))
      document.getElementById('crude-price').textContent = '$' + crude.price.toFixed(1);
    if (gold && document.getElementById('gold-price'))
      document.getElementById('gold-price').textContent = '$' + Math.round(gold.price).toLocaleString();
    if (usd && document.getElementById('usdinr-price'))
      document.getElementById('usdinr-price').textContent = usd.price.toFixed(2);
  }

  /* ─── FORMAT HELPERS ─────────────────────────────────────── */
  const fmt = {
    price : (v, d = 2)  => v != null ? (+v).toFixed(d) : '--',
    chg   : (v)         => v != null ? (v >= 0 ? '+' : '') + (+v).toFixed(2) : '--',
    pct   : (v)         => v != null ? (v >= 0 ? '+' : '') + (+v).toFixed(2) + '%' : '--',
    arrow : (v)         => v >= 0 ? '▲' : '▼',
    cls   : (v)         => v >= 0 ? 'up' : 'dn',
    vol   : (v)         => v >= 1e7 ? (v/1e7).toFixed(1) + 'Cr' : v >= 1e5 ? (v/1e5).toFixed(1) + 'L' : v >= 1e3 ? (v/1e3).toFixed(0) + 'K' : String(v),
  };

  /* ─── START / STOP ───────────────────────────────────────── */
  let _priceTimer = null;
  let _newsTimer  = null;
  let _cryptoTimer = null;

  function start() {
    // Immediate fetches
    refreshPrices();
    refreshNews();
    refreshCrypto();

    // Periodic refresh
    _priceTimer  = setInterval(refreshPrices,  C.T_PRICE);
    _newsTimer   = setInterval(refreshNews,    C.T_NEWS);
    _cryptoTimer = setInterval(refreshCrypto,  300000); // 5 min

    // Also update geo panel periodically
    setInterval(_updateGeoPanel, C.T_PRICE);
    setInterval(_buildLiveOptionsHints, C.T_PRICE);
  }

  function stop() {
    clearInterval(_priceTimer);
    clearInterval(_newsTimer);
    clearInterval(_cryptoTimer);
  }

  /* ─── PUBLIC INTERFACE ───────────────────────────────────── */
  return {
    /* state */
    state,
    SYM,
    FEEDS,
    INF_KEYWORDS,
    fmt,

    /* events */
    on, off, emit,

    /* control */
    start, stop,

    /* data accessors */
    getPrice    : id            => state.prices[id] || null,
    getAllPrices : ()            => state.prices,
    getNews     : ()            => state.news,
    getCrypto   : ()            => state.crypto,
    isLive      : ()            => state.isLive,
    getChart    : fetchChart,

    /* sentiment helper */
    sentimentFromText,
    mapNewsToInfluencer,

    /* manual refresh */
    refreshPrices,
    refreshNews,
  };

})();

/* ─── AUTO-START on DOMContentLoaded ────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  // Small delay so app.js engines can initialize first
  setTimeout(() => {
    if (window.LiveAPI) window.LiveAPI.start();
  }, 800);

  // Wire LiveAPI price updates to influencers.html updatePrices if present
  if (window.LiveAPI) {
    window.LiveAPI.on('prices', function (prices) {
      // influencers.html has its own updatePrices fn — override with real values
      if (typeof window._liveUpdatePrices === 'function') {
        window._liveUpdatePrices(prices);
      }
    });
    window.LiveAPI.on('news', function (news) {
      if (typeof window._liveUpdateNews === 'function') {
        window._liveUpdateNews(news);
      }
    });
  }
});
