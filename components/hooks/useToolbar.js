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
      // Name lock: once the guest confirms their RSVP (wi_rsvp_id set), the name
      // is fixed everywhere it's editable — RSVP form + the shared wish/gift name
      // (.bl-name / .gd-name), which all read/write the same saved name.
      function lockNameEl(el) { if (!el) return; el.readOnly = true; el.style.opacity = '0.7'; el.style.cursor = 'not-allowed'; }
      function namesLocked() { try { return !!localStorage.getItem('wi_rsvp_id'); } catch (e) { return false; } }
      function lockAllNames() { document.querySelectorAll('.bl-name,.gd-name,input[name="rsvp-name"]').forEach(lockNameEl); }
      window.__lockNameEl = lockNameEl; window.__namesLocked = namesLocked; window.__lockAllNames = lockAllNames;
      // Shared full-screen "sending" spinner, used by wish / gift / RSVP submits.
      var spin = (function () {
        var el = null;
        function ensure() {
          if (el) return el;
          var s = document.createElement('style');
          s.textContent = '@keyframes wiSpin{to{transform:rotate(360deg)}}';
          document.head.appendChild(s);
          el = document.createElement('div');
          el.style.cssText = 'position:fixed;inset:0;z-index:100000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.45);-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)';
          el.innerHTML = '<div style="width:46px;height:46px;border:4px solid rgba(255,255,255,.3);border-top-color:#ffc368;border-radius:50%;animation:wiSpin .8s linear infinite"></div>';
          document.body.appendChild(el);
          return el;
        }
        return { show: function () { ensure().style.display = 'flex'; }, hide: function () { if (el) el.style.display = 'none'; } };
      })();
      window.__spin = spin;

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
        if (namesLocked()) lockNameEl(nm);
        nm.addEventListener('input', function () { saveName(nm.value); });
        (nm.value ? ta : nm).focus();
        function close() { ov.classList.remove('in'); setTimeout(function () { ov.remove(); }, 250); }
        ov.querySelector('.bl-close').onclick = close;
        ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
        var wSending = false;
        ov.querySelector('.bl-send').onclick = function () {
          if (wSending) return;
          if (wishDone()) { toast('Bạn đã gửi lời chúc rồi'); close(); return; }
          var nmv = (nm.value || '').trim();
          if (!nmv) { nm.focus(); toast('Vui lòng nhập tên của bạn'); return; }
          var t = (ta.value || '').trim(); if (!t) { ta.focus(); toast('Hãy nhập lời chúc'); return; }
          saveName(nmv);
          wSending = true;
          if (window.__spin) window.__spin.show();
          postWish(nmv, t).then(function (res) {
            wSending = false;
            if (window.__spin) window.__spin.hide();
            wishMark();
            saveWish('');
            close(); toast('Cảm ơn lời chúc của bạn!'); burst(HAPPY, window.innerWidth / 2, 8, { size: 34 });
            // mark our own wish seen so the 10s poll doesn't float it a second time
            var w = res && res.wish;
            if (w && w.id) { window.__wishSeen = window.__wishSeen || {}; window.__wishSeen[w.id] = 1; }
            if (window.__blessing) window.__blessing(nmv, t);
          }).catch(function () { wSending = false; if (window.__spin) window.__spin.hide(); toast('Gửi thất bại, thử lại sau.'); });
        };
      }
      function esc(s) { return (s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
      function toast(txt) {
        var t = document.createElement('div'); t.textContent = txt;
        t.style.cssText = 'position:fixed;left:50%;top:16%;transform:translateX(-50%);background:rgba(0,0,0,.8);color:#fff;padding:10px 16px;border-radius:20px;z-index:5000;font-family:sans-serif;font-size:14px';
        document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200);
      }

      window.__giftFx = { burst: burst, bump: bump, giftBump: giftBump, giftLeft: giftLeft, toast: toast };
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
      window.__openGiftDrawer = function () { var inp = ov.querySelector('.gd-name'); if (inp && !inp.value && window.__savedName) inp.value = window.__savedName(); if (inp && window.__namesLocked && window.__namesLocked()) window.__lockNameEl(inp); ov.classList.add('open'); };

      var gSending = false;
      ov.querySelector('.gd-send').addEventListener('click', function () {
        if (gSending) return;
        var g = GIFTS[selected];
        var name = (ov.querySelector('.gd-name').value || '').trim();
        if (!name) { var inp = ov.querySelector('.gd-name'); inp.focus(); if (window.__giftFx && window.__giftFx.toast) window.__giftFx.toast('Vui lòng nhập tên của bạn'); return; }
        var fx = window.__giftFx;
        // gate on quota without consuming it; it's committed only once the send succeeds
        if (fx && fx.giftLeft && fx.giftLeft() <= 0) { fx.toast('Bạn đã tặng quà tối đa 3 lần'); return; }
        var thumb = THUMB + g[0] + '.png';
        if (window.__saveName) window.__saveName(name);
        gSending = true;
        if (window.__spin) window.__spin.show();
        send(name, g[0], g[1]).then(function () {
          gSending = false;
          if (window.__spin) window.__spin.hide();
          if (fx) fx.giftBump();
          if (window.__blessing) window.__blessing(name, '', { label: g[1], thumb: thumb });
          close(); slide(name, g[1], thumb);
          if (fx) { var n = Math.min(6 + Math.round(g[2] / 900), 22); fx.burst(thumb, window.innerWidth / 2, n, { size: 40 + Math.min(g[2] / 400, 40) }); }
        }).catch(function () {
          gSending = false;
          if (window.__spin) window.__spin.hide();
          if (fx) fx.toast('Gửi thất bại, thử lại sau.');
        });
      });

      // persist gift + broadcast to other viewers; returns the POST promise so the
      // caller can show a "sending" spinner and only animate on success.
      function send(name, gkey, label) {
        return fetch('/api/gifts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, gkey: gkey, label: label }) })
          .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (d) { if (d && d.gift && window.__giftSeen) window.__giftSeen[d.gift.id] = 1; return d; });
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

      // --- hide/show toggle for the floating wishes (choice persisted) ---
      // Docked next to the "Gửi lời chúc" button, styled to match the toolbar pills.
      var blessingHidden = false;
      try { blessingHidden = localStorage.getItem('wi_blessing_hidden') === '1'; } catch (e) {}
      var EYE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>';
      var EYE_OFF = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-7-11-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
      var tog = document.createElement('button');
      tog.id = 'blessing-toggle'; tog.type = 'button';
      tog.style.cssText = 'display:inline-flex;align-items:center;gap:6px;height:35px;padding:0 14px;border:none;border-radius:30px;background:rgba(0,0,0,.2);color:#fff;font-size:13px;line-height:1;cursor:pointer;white-space:nowrap;flex:none;-webkit-tap-highlight-color:transparent';
      function renderTog() {
        var label = blessingHidden ? 'Hiện Chat' : 'Ẩn Chat';
        tog.innerHTML = (blessingHidden ? EYE_OFF : EYE) + '<span>' + label + '</span>';
        tog.title = label; tog.setAttribute('aria-label', label);
      }
      function applyHidden() {
        box.style.display = blessingHidden ? 'none' : '';
        if (blessingHidden) { while (box.firstChild) box.removeChild(box.firstChild); lastEl = null; }
        renderTog();
      }
      tog.addEventListener('click', function (e) {
        e.stopPropagation();
        blessingHidden = !blessingHidden;
        try { localStorage.setItem('wi_blessing_hidden', blessingHidden ? '1' : '0'); } catch (e2) {}
        applyHidden();
        if (!blessingHidden) ensureLoop();
      });
      (function dock() {
        var btn = document.querySelector('.message-box-button');
        if (!btn || !btn.parentNode) { setTimeout(dock, 300); return; } // wait for toolbar HTML
        var left = btn.parentNode; // .toolbar-left
        left.style.display = 'flex';
        left.style.alignItems = 'center';
        left.style.gap = '8px';
        if (!tog.parentNode) left.appendChild(tog);
      })();
      applyHidden();

      function esc(s) { return (s || '').replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
      // Build a bubble but DON'T float it yet (opacity 0 so we can measure its
      // real height for collision gating). Call floatIt() to release it.
      function build(name, msg, gift) {
        var el = document.createElement('div'); el.className = 'blessing-message';
        var inner = '<strong>' + esc(name || 'Ẩn danh') + '</strong>: ';
        if (gift) { inner += 'Gửi <strong>' + esc(gift.label || '') + '</strong>' + (gift.thumb ? ' <img class="bl-gift-ic" src="' + gift.thumb + '" alt="">' : ''); }
        else { inner += esc(msg); }
        el.innerHTML = '<span class="blessing-text">' + inner + '</span>';
        el.style.opacity = '0';
        box.appendChild(el);
        return el;
      }
      function floatIt(el) {
        el.style.opacity = '';
        var anim = el.animate([
          { transform: 'translateY(14px)', opacity: 0 },
          { transform: 'translateY(0px)', opacity: 1, offset: 0.12 },
          { transform: 'translateY(-150px)', opacity: 1, offset: 0.82 },
          { transform: 'translateY(-200px)', opacity: 0 }
        ], { duration: 6500, easing: 'linear' });
        anim.onfinish = function () { el.remove(); if (lastEl === el) lastEl = null; };
      }
      // the most recently released bubble, used to gate the next spawn.
      var lastEl = null;
      function show(name, msg, gift) {
        if (blessingHidden) return null;
        var el = build(name, msg, gift); floatIt(el); lastEl = el; return el;
      }
      // looping danmu feed (newest items join the loop too)
      var feed = []; var looping = false; var FEED_MAX = 60;
      // Density knob: how much sooner the next bubble releases vs. full clearance.
      // Higher = tighter/denser (bubbles sit closer); lower = more airy. The next
      // bubble releases once the previous has risen by (its height - DENSITY).
      var DENSITY = 22;
      function ensureLoop() {
        if (looping || !feed.length || blessingHidden) return; looping = true;
        var idx = 0;
        function tick() {
          if (!feed.length || blessingHidden) { looping = false; return; }
          var m = feed[idx % feed.length]; idx++;
          var el = build(m.name, m.message, m.gift);
          var h = el.getBoundingClientRect().height;
          // Track-occupancy gate: release this bubble once the previous one has
          // risen by (h - DENSITY). Spacing adapts to length; DENSITY controls how
          // tightly they pack without stacking.
          (function wait() {
            if (!feed.length || blessingHidden) { el.remove(); looping = false; return; }
            var ready = true;
            if (lastEl && lastEl.isConnected) {
              var boxBottom = box.getBoundingClientRect().bottom;
              ready = lastEl.getBoundingClientRect().bottom <= boxBottom - Math.max(6, h - DENSITY);
            }
            if (ready) { floatIt(el); lastEl = el; setTimeout(tick, 150); }
            else requestAnimationFrame(wait);
          })();
        }
        setTimeout(tick, 300);
      }
      function addFeed(name, msg, gift) { feed.push({ name: name, message: msg, gift: gift || null }); if (feed.length > FEED_MAX) feed.shift(); ensureLoop(); }
      // public: float now AND keep it looping. gift = {label,thumb} for gift items
      window.__blessing = function (name, msg, gift) { show(name, msg, gift); addFeed(name, msg, gift); };
      window.__giftSeen = window.__giftSeen || {};
      window.__wishSeen = window.__wishSeen || {};
      function api(path) { return fetch(path).then(function (r) { return r.ok ? r.json() : Promise.reject(r); }); }

      // gd-slide minibar for a gift from any viewer, + loop it in the danmu feed
      function giftPopup(g) {
        var base = window.__giftThumbBase || 'assets/images/gifts/';
        var thumb = base + g.gkey + '.png';
        if (window.__giftSlide) window.__giftSlide(g.name || 'Ẩn danh', g.label || '', thumb);
        window.__blessing(g.name, '', { label: g.label || '', thumb: thumb });
      }

      var lastTs = 0;
      var lastWishTs = 0;
      // rebuild the looping feed from the server (wishes + gifts under 1 day old)
      function refreshFeed() {
        return Promise.all([
          api('/api/wishes?limit=20').then(function (d) { return (d.wishes || []).slice(0, 20); }).catch(function () { return []; }),
          api('/api/gifts?limit=20').then(function (d) { return (d.gifts || []); }).catch(function () { return []; })
        ]).then(function (res) {
          var ws = res[0], gs = res[1];
          var base = window.__giftThumbBase || 'assets/images/gifts/';
          var CUT = Date.now() - 86400000; // only show items from the last 24h
          // advance poll cursors + mark fetched items seen so they are not replayed as popups
          gs.forEach(function (g) { if (g.ts > lastTs) lastTs = g.ts; if (g.id) window.__giftSeen[g.id] = 1; });
          ws.forEach(function (w) { if (w.ts > lastWishTs) lastWishTs = w.ts; if (w.id) window.__wishSeen[w.id] = 1; });
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

      // poll for new gifts + wishes from other viewers: slide/float + join the loop
      setInterval(function () {
        api('/api/gifts?since=' + lastTs).then(function (d) {
          (d.gifts || []).forEach(function (g) {
            if (g.ts > lastTs) lastTs = g.ts;
            if (window.__giftSeen[g.id]) return;
            window.__giftSeen[g.id] = 1;
            giftPopup(g);
          });
        }).catch(function () { });
        api('/api/wishes?since=' + lastWishTs).then(function (d) {
          (d.wishes || []).sort(function (a, b) { return (a.ts || 0) - (b.ts || 0); }).forEach(function (w) {
            if (w.ts > lastWishTs) lastWishTs = w.ts;
            if (!w.id || window.__wishSeen[w.id]) return;
            window.__wishSeen[w.id] = 1;
            if (window.__blessing) window.__blessing(w.name, w.message || '');
          });
        }).catch(function () { });
      }, 10000);
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
          if (nm) { nm.readOnly = true; nm.style.opacity = '0.7'; nm.style.cursor = 'not-allowed'; }
          if (window.__lockAllNames) window.__lockAllNames();
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
          if (window.__spin) window.__spin.show();
          fetch(API, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, name: name, attending: attending })
          })
            .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
            .then(function (d) {
              sending = false;
              if (window.__spin) window.__spin.hide();
              var had = !!id;
              if (d && d.rsvp && d.rsvp.id) localStorage.setItem('wi_rsvp_id', d.rsvp.id);
              localStorage.setItem('wi_rsvp_choice', attending);
              if (window.__saveName) window.__saveName(name);
              lock(); showConfirm(attending);
              toast(had ? 'Đã cập nhật phản hồi của bạn' : (attending === 'yes' ? 'Cảm ơn! Hẹn gặp bạn tại lễ cưới ❤' : 'Đã ghi nhận, rất tiếc bạn không tham dự được'));
            })
            .catch(function () { sending = false; if (window.__spin) window.__spin.hide(); toast('Gửi thất bại, thử lại sau.'); });
        });
      }
      init();
    })();
    };
    if (document.readyState !== 'loading') start();
    else document.addEventListener('DOMContentLoaded', start);
  }, []);
}
