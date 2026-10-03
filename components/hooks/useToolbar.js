// Interactive toolbar behaviour, ported verbatim from the static invitation's
// inline <script> blocks (toolbar-fx, gift-drawer, blessing-box-fx, toolbar-fixed,
// rsvp-fx). zoom-fit is intentionally omitted: /react uses the desktop preview
// frame, not the mobile zoom. Guarded so it initialises once.
import { useEffect } from 'react';

export function useToolbar() {
  useEffect(() => {
    if (typeof window === 'undefined' || window.__cineloveToolbarInit) return;
    window.__cineloveToolbarInit = true;
    const start = () => {
      /* ---- toolbar-fx (verbatim) ---- */
(function () {
      var HEART = 'assets/images/gifts/biubiu.png';
      var LIKE = 'assets/media/like.ea5798c7.png';
      var GIFT = 'assets/media/gift-box.f417ec86.png';
      var LOVE = 'assets/images/decor/ixntp8lomb7yu5fpt6g8q.png';
      var HAPPY = 'assets/images/decor/7on8b1hvwsno0nluh0upv.png';
      var layer = document.createElement('div');
      layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:3000;overflow:hidden';
      document.body.appendChild(layer);
      function floatImg(src, x, opts) {
        opts = opts || {};
        var im = document.createElement('img'); im.src = src;
        var size = opts.size || (30 + Math.random() * 28);
        im.style.cssText = 'position:absolute;left:' + x + 'px;bottom:' + (opts.bottom || 90) + 'px;width:' + size + 'px;height:auto;opacity:0;will-change:transform,opacity';
        layer.appendChild(im);
        var dx = (Math.random() * 120 - 60);
        var dur = opts.dur || (2200 + Math.random() * 1200);
        var rise = opts.rise || (window.innerHeight * 0.6 + Math.random() * 120);
        im.animate([
          { transform: 'translate(0,0) scale(0.4)', opacity: 0 },
          { opacity: 1, offset: 0.12 },
          { transform: 'translate(' + dx + 'px,-' + rise + 'px) scale(1)', opacity: 0 }
        ], { duration: dur, easing: 'cubic-bezier(.2,.6,.3,1)' });
        setTimeout(function () { im.remove(); }, dur + 60);
      }
      function burst(src, cx, n, opts) {
        for (var i = 0; i < n; i++) { (function (k) { setTimeout(function () { floatImg(src, cx + (Math.random() * 80 - 40), opts); }, k * 85); })(i); }
      }
      function cxOf(el) { var r = el.getBoundingClientRect(); return r.left + r.width / 2; }

      // ---- API helpers ----
      function api(path, opts) { return fetch(path, opts).then(function (r) { return r.ok ? r.json() : Promise.reject(r); }); }
      // stable per-browser anonymous label e.g. "Ẩn Danh 4821"
      function anonName() { var id; try { id = localStorage.getItem('wi_anon_id'); if (!id) { id = String(Math.floor(1000 + Math.random() * 9000)); localStorage.setItem('wi_anon_id', id); } } catch (e) { id = String(Math.floor(1000 + Math.random() * 9000)); } return 'Ẩn Danh ' + id; }
      window.__anonName = anonName;
      function postReaction(type) { return api('/api/reactions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: type }) }).catch(function () { }); }
      function loadReactions() { return api('/api/reactions').then(renderCounts).catch(function () { }); }
      function postWish(name, message) { return api('/api/wishes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, message: message }) }); }
      function loadWishes() { return api('/api/wishes?limit=100').then(function (d) { return d.wishes || []; }).catch(function () { return []; }); }

      // ---- reaction count badges ----
      function badge(el) {
        if (!el) return null;
        var b = el.querySelector('.fx-count');
        if (!b) {
          b = document.createElement('span'); b.className = 'fx-count';
          b.style.cssText = 'position:absolute;top:-6px;right:-6px;min-width:16px;height:16px;padding:0 4px;border-radius:9px;background:#ff5a7a;color:#fff;font:600 10px/16px sans-serif;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.3);z-index:5';
          if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
          el.appendChild(b);
        }
        return b;
      }
      var elLike = document.getElementById('cinelove-like-button');
      var elGift = document.getElementById('cinelove-gift-button');
      var elHeart = document.getElementById('animation-gift-preview-btn');
      function renderCounts(c) {
        c = c || {};
        var m = { like: elLike, gift: elGift, heart: elHeart };
        Object.keys(m).forEach(function (k) { var b = badge(m[k]); if (b && c[k] != null) b.textContent = c[k]; });
      }

      // ---- button handlers (animation + persist) ----
      if (elHeart) elHeart.addEventListener('click', function () { if (bump('heart')) { burst(HEART, window.innerWidth / 2, 14, {}); broadcastGift('', 'biubiu', 'Bắn tim'); } });

      // broadcast a gift/heart event to all viewers + local slide + blessing echo
      function broadcastGift(name, gkey, label) {
        name = (name || '').trim() || anonName();
        var base = window.__giftThumbBase || 'assets/images/gifts/';
        if (window.__giftSlide) window.__giftSlide(name, label, base + gkey + '.png');
        if (window.__blessing) window.__blessing(name, '', { label: label, thumb: base + gkey + '.png' });
        api('/api/gifts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, gkey: gkey, label: label }) })
          .then(function (d) { if (d && d.gift && window.__giftSeen) window.__giftSeen[d.gift.id] = 1; })
          .catch(function () { });
      }

      if (elGift) elGift.addEventListener('click', function () { if (window.__openGiftDrawer) window.__openGiftDrawer(); else { burst(GIFT, window.innerWidth / 2, 8, { size: 40 }); bump('gift'); } });
      function used(type) { try { return localStorage.getItem('wi_react_' + type); } catch (e) { return false; } } function mark(type) { try { localStorage.setItem('wi_react_' + type, '1'); } catch (e) { } } function bump(type) { if (used(type)) { toast('Bạn đã thực hiện hành động này rồi'); return false; } mark(type); var el = { gift: elGift, heart: elHeart }[type]; var b = badge(el); if (b) { b.textContent = (parseInt(b.textContent || '0', 10) || 0) + 1; } postReaction(type); return true; }

      // gift: up to 3 per user
      function giftLeft() { try { return 3 - (parseInt(localStorage.getItem('wi_gift_count') || '0', 10) || 0); } catch (e) { return 3; } }
      function giftBump() { if (giftLeft() <= 0) { toast('Bạn đã tặng quà tối đa 3 lần'); return false; } try { localStorage.setItem('wi_gift_count', String((parseInt(localStorage.getItem('wi_gift_count') || '0', 10) || 0) + 1)); } catch (e) { } var b = badge(elGift); if (b) { b.textContent = (parseInt(b.textContent || '0', 10) || 0) + 1; } postReaction('gift'); return true; }
      // wish: once per user
      function wishDone() { try { return !!localStorage.getItem('wi_wish_done'); } catch (e) { return false; } }
      function wishMark() { try { localStorage.setItem('wi_wish_done', '1'); } catch (e) { } }
      // remember entered name, reuse across popups
      function savedName() { try { return localStorage.getItem('wi_name') || ''; } catch (e) { return ''; } }
      function saveName(n) { try { if (n) localStorage.setItem('wi_name', n); } catch (e) { } }
      window.__savedName = savedName; window.__saveName = saveName;

      var msg = document.querySelector('.message-box-button');
      if (msg) msg.addEventListener('click', openWish);

      function openWish() {
        if (wishDone()) { toast('Bạn đã gửi lời chúc rồi'); return; }
        var HEARTLOGO = 'assets/media/message-heart.9f3f7935.png';
        var ov = document.createElement('div'); ov.className = 'bl-ov';
        ov.innerHTML = '<div class="bl-win">' +
          '<img class="bl-logo" src="' + HEARTLOGO + '" alt="">' +
          '<span class="bl-close">×</span>' +
          '<div class="bl-tit">Lời chúc</div>' +
          '<div class="bl-cont">' +
          '<div class="bl-info"><input class="bl-name" maxlength="25" type="text" placeholder="Tên của bạn"></div>' +
          '<div class="bl-info"><textarea class="bl-mess" maxlength="100" placeholder="Lời chúc của bạn (tối đa 100 ký tự)"></textarea><div class="bl-count" style="font-size:12px;color:#999;text-align:right;margin-top:4px">0/100</div></div>' +
          '</div>' +
          '<button class="bl-send">Gửi Lời Chúc</button></div>';
        document.body.appendChild(ov);
        requestAnimationFrame(function () { ov.classList.add('in'); });
        var ta = ov.querySelector('.bl-mess'); var nm = ov.querySelector('.bl-name');
        var cnt = ov.querySelector('.bl-count');
        function savedWish() { try { return localStorage.getItem('wi_wish_msg') || ''; } catch (e) { return ''; } }
        function saveWish(v) { try { localStorage.setItem('wi_wish_msg', v || ''); } catch (e) { } }
        ta.value = savedWish();
        if (cnt) cnt.textContent = ta.value.length + '/100';
        ta.addEventListener('input', function () { if (cnt) cnt.textContent = ta.value.length + '/100'; saveWish(ta.value); });
        nm.value = savedName();
        nm.addEventListener('input', function () { saveName(nm.value); });
        (nm.value ? ta : nm).focus();
        function close() { ov.classList.remove('in'); setTimeout(function () { ov.remove(); }, 250); }
        ov.querySelector('.bl-close').onclick = close;
        ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
        ov.querySelector('.bl-send').onclick = function () {
          if (wishDone()) { toast('Bạn đã gửi lời chúc rồi'); close(); return; }
          var nmv = (nm.value || '').trim();
          if (!nmv) { nm.focus(); toast('Vui lòng nhập tên của bạn'); return; }
          var t = (ta.value || '').trim(); if (!t) { ta.focus(); toast('Hãy nhập lời chúc'); return; }
          saveName(nmv);
          postWish(nmv, t).then(function () {
            wishMark();
            saveWish('');
            close(); toast('Cảm ơn lời chúc của bạn!'); burst(HAPPY, window.innerWidth / 2, 8, { size: 34 });
            if (window.__blessing) window.__blessing(nmv, t);
          }).catch(function () { toast('Gửi thất bại, thử lại sau.'); });
        };
      }
      function esc(s) { return (s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
      function toast(txt) {
        var t = document.createElement('div'); t.textContent = txt;
        t.style.cssText = 'position:fixed;left:50%;top:16%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:10px 16px;border-radius:20px;z-index:5000;font-family:sans-serif;font-size:14px';
        document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200);
      }

      window.__giftFx = { burst: burst, bump: bump, giftBump: giftBump, toast: toast };
      loadReactions();
    })();

      /* ---- gift-drawer (verbatim) ---- */
(function () {
      var THUMB = 'assets/images/gifts/';
      var COIN = 'assets/icons/coin.svg';
      var AV = 'assets/images/photos/avatar.jpg';
      var ARROW = 'assets/media/bottom-arrow.54525818.png';
      var GIFTS = [
        ['biubiu', 'Bắn tim', 520], ['petal', 'Hoa anh đào', 1180], ['two-hearts-locked', 'Khoá tình yêu', 1314],
        ['sweet-cake', 'Bánh ngọt', 1580], ['two-hearts', 'Trái tim', 1580], ['cannon', 'Pháo mừng', 1980],
        ['fireworks', 'Pháo hoa mừng', 1980], ['rabbit-flower', 'Hoa gấu bông', 2020], ['happy-wine', 'Rượu mừng', 2222],
        ['lixi', 'Lì xì', 2345], ['milk-bottle', 'Bình sữa tình yêu', 2600], ['baby-gold', 'Em bé vàng', 2899],
        ['bouquet', 'Bó hoa', 2950], ['instax', 'Máy ảnh', 2980], ['couple-birds', 'Bồ câu uyên ương', 3636],
        ['unicorn', 'Hộp kỳ lân', 3980], ['proposal-ring', 'Nhẫn cầu hôn', 3980], ['magic-stick', 'Gậy phép thuật', 5980],
        ['swan', 'Đôi thiên nga', 6980], ['air-balloon', 'Khinh khí cầu', 8099], ['love-airplane', 'Máy bay hạnh phúc', 9998],
        ['magic-wheel', 'Vòng quay phép thuật', 11200], ['happy-castle', 'Lâu đài tình ái', 12400], ['supper-flower-car', 'Xe hoa', 13900]
      ];
      var selected = 0;
      var ov = document.createElement('div'); ov.id = 'gd-ov';
      var cells = GIFTS.map(function (g, i) {
        return '<div class="gd-cell' + (i === 0 ? ' active' : '') + '" data-i="' + i + '">' +
          '<img class="gd-thumb" src="' + THUMB + g[0] + '.png" alt="' + g[1] + '">' +
          '<div class="gd-title">' + g[1] + '</div></div>';
      }).join('');
      ov.innerHTML = '<div class="gd-mask"></div><div id="gd-sheet">' +
        '<div class="gd-head"><div class="gd-tab">Tặng Quà <img class="gd-arrow" src="' + ARROW + '"></div></div>' +
        '<div class="gd-grid">' + cells + '</div>' +
        '<div class="gd-foot"><div class="gd-tip">Hãy để những món quà xinh đẹp này mang niềm vui bất ngờ đến với Người nhận nha</div>' +
        '<div class="gd-row"><input class="gd-name" type="text" placeholder="Tên của bạn"><button class="gd-send">Gửi</button></div></div></div>';
      document.body.appendChild(ov);

      var grid = ov.querySelector('.gd-grid');
      grid.addEventListener('click', function (e) {
        var c = e.target.closest('.gd-cell'); if (!c) return;
        selected = +c.getAttribute('data-i');
        grid.querySelectorAll('.gd-cell').forEach(function (x) { x.classList.remove('active'); });
        c.classList.add('active');
      });
      function close() { ov.classList.remove('open'); }
      ov.querySelector('.gd-mask').addEventListener('click', close);
      window.__openGiftDrawer = function () { var inp = ov.querySelector('.gd-name'); if (inp && !inp.value && window.__savedName) inp.value = window.__savedName(); ov.classList.add('open'); };

      ov.querySelector('.gd-send').addEventListener('click', function () {
        var g = GIFTS[selected];
        var name = (ov.querySelector('.gd-name').value || '').trim();
        if (!name) { var inp = ov.querySelector('.gd-name'); inp.focus(); if (window.__giftFx && window.__giftFx.toast) window.__giftFx.toast('Vui lòng nhập tên của bạn'); return; }
        var thumb = THUMB + g[0] + '.png';
        var fx = window.__giftFx;
        if (fx) { if (fx.giftBump()) { if (window.__saveName) window.__saveName(name); close(); slide(name, g[1], thumb); var n = Math.min(6 + Math.round(g[2] / 900), 22); fx.burst(thumb, window.innerWidth / 2, n, { size: 40 + Math.min(g[2] / 400, 40) }); send(name, g[0], g[1]); } }
        else { if (window.__saveName) window.__saveName(name); close(); slide(name, g[1], thumb); send(name, g[0], g[1]); }
      });

      // persist gift + broadcast to other viewers; echo into blessing box locally
      function send(name, gkey, label) {
        if (window.__blessing) window.__blessing(name, '', { label: label, thumb: THUMB + gkey + '.png' });
        fetch('/api/gifts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, gkey: gkey, label: label }) })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (d) { if (d && d.gift && window.__giftSeen) window.__giftSeen[d.gift.id] = 1; })
          .catch(function () { });
      }

      window.__giftSlide = slide;
      window.__giftThumbBase = THUMB;

      function slide(name, gift, thumb) {
        var s = document.createElement('div'); s.className = 'gd-slide';
        s.innerHTML = '<img class="gd-av" src="' + AV + '"><div><div class="gd-sname">' + esc(name) + '</div><div class="gd-sgift">Gửi ' + esc(gift) + '</div></div><img class="gd-sthumb" src="' + thumb + '">';
        document.body.appendChild(s);
        requestAnimationFrame(function () { s.classList.add('in'); });
        setTimeout(function () { s.classList.remove('in'); setTimeout(function () { s.remove(); }, 450); }, 2600);
      }
      function esc(x) { return (x || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    })();

      /* ---- blessing-box-fx (verbatim) ---- */
(function () {
      var box = document.createElement('div'); box.id = 'blessing-box';
      document.body.appendChild(box);
      function place() {
        var btn = document.querySelector('.message-box-button');
        if (!btn) return;
        var r = btn.getBoundingClientRect();
        if (!r.width) { return; }
        var pl = parseFloat(getComputedStyle(btn).paddingLeft) || 0;
        var x = r.left + pl;
        box.style.left = Math.round(x) + 'px';
        box.style.bottom = Math.round(window.innerHeight - r.top + 8) + 'px';
        box.style.width = Math.min(285, Math.round(window.innerWidth - x - 8)) + 'px';
      }
      place();
      window.addEventListener('resize', place);
      [250, 800, 1600].forEach(function (d) { setTimeout(place, d); });
      function esc(s) { return (s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
      function show(name, msg, gift) {
        var el = document.createElement('div'); el.className = 'blessing-message';
        var inner = '<strong>' + esc(name || 'Ẩn danh') + '</strong>: ';
        if (gift) { inner += 'Gửi <strong>' + esc(gift.label || '') + '</strong>' + (gift.thumb ? ' <img class="bl-gift-ic" src="' + gift.thumb + '" alt="">' : ''); }
        else { inner += esc(msg); }
        el.innerHTML = '<span class="blessing-text">' + inner + '</span>';
        box.appendChild(el);
        var anim = el.animate([
          { transform: 'translateY(14px)', opacity: 0 },
          { transform: 'translateY(0px)', opacity: 1, offset: 0.12 },
          { transform: 'translateY(-150px)', opacity: 1, offset: 0.82 },
          { transform: 'translateY(-200px)', opacity: 0 }
        ], { duration: 9000, easing: 'linear' });
        anim.onfinish = function () { el.remove(); };
        return el;
      }
      // looping danmu feed (newest items join the loop too)
      var feed = []; var looping = false; var FEED_MAX = 60;
      // show()'s keyframes float the bubble ~200px over 9000ms.
      var FLOAT_PXMS = 200 / 9000;
      function ensureLoop() {
        if (looping || !feed.length) return; looping = true;
        var DUR = 9000, idx = 0;
        function tick() {
          if (!feed.length) { looping = false; return; }
          var m = feed[idx % feed.length]; idx++;
          var el = show(m.name, m.message, m.gift);
          // base cadence: show each once when few, throttle when many.
          var base = feed.length <= 6 ? Math.round(DUR / feed.length) : Math.min(2600, Math.max(1500, 1200 + 70 * feed.length));
          // content-aware gap: a taller (longer, wrapped) bubble needs more time to
          // clear before the next spawns, else they overlap. bubble height / float speed.
          var h = el ? el.getBoundingClientRect().height : 16;
          var gap = Math.round((h + 12) / FLOAT_PXMS);
          setTimeout(tick, Math.min(4000, Math.max(base, gap)));
        }
        // defer the first tick so the ambient loop can't collide with the instant
        // show() that __blessing already fired (was double-floating on send).
        setTimeout(tick, feed.length <= 6 ? Math.round(DUR / feed.length) : 1500);
      }
      function addFeed(name, msg, gift) { feed.push({ name: name, message: msg, gift: gift || null }); if (feed.length > FEED_MAX) feed.shift(); ensureLoop(); }
      // public: float now AND keep it looping. gift = {label,thumb} for gift items
      window.__blessing = function (name, msg, gift) { show(name, msg, gift); addFeed(name, msg, gift); };
      window.__giftSeen = window.__giftSeen || {};
      function api(path) { return fetch(path).then(function (r) { return r.ok ? r.json() : Promise.reject(r); }); }

      // gd-slide minibar for a gift from any viewer, + loop it in the danmu feed
      function giftPopup(g) {
        var base = window.__giftThumbBase || 'assets/images/gifts/';
        var thumb = base + g.gkey + '.png';
        if (window.__giftSlide) window.__giftSlide(g.name || 'Ẩn danh', g.label || '', thumb);
        window.__blessing(g.name, '', { label: g.label || '', thumb: thumb });
      }

      var lastTs = 0;
      // rebuild the looping feed from the server (wishes + gifts under 1 day old)
      function refreshFeed() {
        return Promise.all([
          api('/api/wishes?limit=20').then(function (d) { return (d.wishes || []).slice(0, 20); }).catch(function () { return []; }),
          api('/api/gifts?limit=20').then(function (d) { return (d.gifts || []); }).catch(function () { return []; })
        ]).then(function (res) {
          var ws = res[0], gs = res[1];
          var base = window.__giftThumbBase || 'assets/images/gifts/';
          var CUT = Date.now() - 86400000; // only show items from the last 24h
          // advance poll cursor + mark fetched gifts seen so they are not replayed as popups
          gs.forEach(function (g) { if (g.ts > lastTs) lastTs = g.ts; if (g.id) window.__giftSeen[g.id] = 1; });
          // rebuild feed in place (keeps the running loop's reference)
          var seed = ws.filter(function (w) { return (w.ts || 0) >= CUT; }).map(function (w) { return { name: w.name, message: w.message, gift: null, ts: w.ts }; })
            .concat(gs.filter(function (g) { return (g.ts || 0) >= CUT; }).map(function (g) { return { name: g.name, message: '', gift: { label: g.label || '', thumb: base + g.gkey + '.png' }, ts: g.ts }; }));
          seed.sort(function (a, b) { return (a.ts || 0) - (b.ts || 0); });
          feed.length = 0;
          seed.forEach(function (m) { feed.push({ name: m.name, message: m.message, gift: m.gift }); });
          if (feed.length > FEED_MAX) feed.splice(0, feed.length - FEED_MAX);
          ensureLoop();
        }).catch(function () { });
      }
      refreshFeed();
      setInterval(refreshFeed, 60000); // refresh the blessing-box messages every minute

      // poll for new gifts from other viewers: slide popup + join the loop
      setInterval(function () {
        api('/api/gifts?since=' + lastTs).then(function (d) {
          (d.gifts || []).forEach(function (g) {
            if (g.ts > lastTs) lastTs = g.ts;
            if (window.__giftSeen[g.id]) return;
            window.__giftSeen[g.id] = 1;
            giftPopup(g);
          });
        }).catch(function () { });
      }, 4000);
    })();

      /* ---- toolbar-fixed (verbatim) ---- */
(function () {
      // Toolbar is absolute inside the tall zoomed canvas, so it only appears at the
      // very bottom and the phone nav bar can cover it. Lift it out to the viewport.
      var tb = document.getElementById('cinelove-toolbar');
      if (tb && tb.parentNode !== document.body) document.body.appendChild(tb);
      // reposition the danmu box now the button lives at the viewport bottom
      window.dispatchEvent(new Event('resize'));
    })();

      /* ---- rsvp-fx (verbatim) ---- */
(function () {
      var API = '/api/rsvps';
      function toast(txt) {
        if (window.__giftFx && window.__giftFx.toast) { window.__giftFx.toast(txt); return; }
        var t = document.createElement('div'); t.textContent = txt;
        t.style.cssText = 'position:fixed;left:50%;top:16%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:10px 16px;border-radius:20px;z-index:5000;font-family:sans-serif;font-size:14px';
        document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200);
      }
      function init() {
        var form = document.querySelector('.rsvp-form-container form');
        if (!form) { setTimeout(init, 400); return; }
        var nm = form.querySelector('input[name="rsvp-name"]');
        var wraps = form.querySelectorAll('.ant-radio-wrapper');
        var saved = localStorage.getItem('wi_rsvp_choice');
        function radioOf(w) { return w.querySelector('input[type=radio]'); }
        function setChoice(val) {
          wraps.forEach(function (w) {
            var r = radioOf(w); if (!r) return;
            var on = r.value === val;
            r.checked = on;
            w.classList.toggle('ant-radio-wrapper-checked', on);
            var box = w.querySelector('.ant-radio'); if (box) box.classList.toggle('ant-radio-checked', on);
          });
        }
        function getChoice() {
          var v = 'yes';
          wraps.forEach(function (w) { var r = radioOf(w); if (r && r.checked) v = r.value; });
          return v;
        }
        // static clone has no React handler, so drive the checked state ourselves
        wraps.forEach(function (w) {
          w.addEventListener('click', function () { var r = radioOf(w); if (r) setChoice(r.value); });
        });
        if (saved === 'yes' || saved === 'no') setChoice(saved);
        // prefill remembered name (shared with gift + lời chúc)
        if (nm && !nm.value && window.__savedName) { var sn = window.__savedName(); if (sn) nm.value = sn; }

        var btn = form.querySelector('button[type="submit"]');
        function lock() {
          if (!btn) return; btn.disabled = true; btn.style.display = 'none';
          var grp = form.querySelector('.ant-radio-group'); var fld = grp && grp.parentElement; if (fld) fld.style.display = 'none';
        }
        function showConfirm(att) {
          var c = form.querySelector('#rsvp-confirm');
          if (!c) {
            c = document.createElement('div'); c.id = 'rsvp-confirm';
            c.style.cssText = 'margin-top:12px;padding:10px 12px;border:1px solid rgba(212,175,55,.5);border-radius:12px;background:rgba(212,175,55,.12);color:#fff;font-size:14px;text-align:center;line-height:1.35;';
            form.appendChild(c);
          }
          c.innerHTML = '✓ Đã nhận xác nhận của bạn' + (att ? ('<br>' + (att === 'yes' ? 'Rất mong được gặp bạn tại lễ cưới ❤' : 'Rất tiếc bạn không thể tham dự')) : '');
        }
        // already confirmed in a previous visit -> keep it locked + show confirmation
        if (localStorage.getItem('wi_rsvp_id')) { lock(); showConfirm(localStorage.getItem('wi_rsvp_choice')); }

        var sending = false;
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          if (sending || (btn && btn.disabled)) return;
          var name = (nm && nm.value || '').trim();
          if (!name) { if (nm) nm.focus(); toast('Vui lòng nhập tên của bạn'); return; }
          var attending = getChoice();
          var id = localStorage.getItem('wi_rsvp_id') || '';
          sending = true;
          fetch(API, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, name: name, attending: attending })
          })
            .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
            .then(function (d) {
              sending = false;
              var had = !!id;
              if (d && d.rsvp && d.rsvp.id) localStorage.setItem('wi_rsvp_id', d.rsvp.id);
              localStorage.setItem('wi_rsvp_choice', attending);
              if (window.__saveName) window.__saveName(name);
              lock(); showConfirm(attending);
              toast(had ? 'Đã cập nhật phản hồi của bạn' : (attending === 'yes' ? 'Cảm ơn! Hẹn gặp bạn tại lễ cưới ❤' : 'Đã ghi nhận, rất tiếc bạn không tham dự được'));
            })
            .catch(function () { sending = false; toast('Gửi thất bại, thử lại sau.'); });
        });
      }
      init();
    })();
    };
    if (document.readyState !== 'loading') start();
    else document.addEventListener('DOMContentLoaded', start);
  }, []);
}
