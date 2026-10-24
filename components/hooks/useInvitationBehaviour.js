// Client-side behaviour for the invitation page, ported 1:1 from the inline
// <script> blocks of the original static export:
//   - reveal:      IntersectionObserver that plays each node's entrance anim
//   - autoScroll:  gentle auto-scroll on first open, cancelled by user input
//   - music:       autoplay the soundtrack, resume on first interaction, toggle
// Each is defensive (no-ops if its target elements are absent).
import { useEffect } from 'react';

export function useInvitationBehaviour() {
  useEffect(() => {
    const sc = document.querySelector('.styles_customScroll__X5r6w') || null;

    // --- reveal ---
    const els = document.querySelectorAll('[data-transition-key]');
    const reveal = (e) => {
      e.style.opacity = '1';
      e.style.transform = 'none';
    };

    // Debug: #all reveals every node immediately and skips auto-scroll, so the
    // whole page can be inspected/screenshotted without scrolling.
    const revealAll = typeof window !== 'undefined' && window.location.hash.indexOf('all') !== -1;
    if (revealAll) {
      els.forEach(reveal);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      els.forEach(reveal);
    } else {
      const io = new IntersectionObserver(
        (en) => {
          en.forEach((e) => {
            if (e.isIntersecting) {
              reveal(e.target);
              io.unobserve(e.target);
            }
          });
        },
        { root: sc, rootMargin: '0px 0px 0px 0px', threshold: 0.01 }
      );
      els.forEach((e) => io.observe(e));
      if (sc) {
        sc.addEventListener('scroll', function onEnd() {
          if (sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 4) els.forEach(reveal);
        });
      }
    }

    // --- auto-scroll on first open; stops on any user input ---
    const stopAuto = (() => {
      const useSc = !!sc;
      const SPEED = 55; // px per second
      let stopped = false;
      let raf = 0;
      let last = 0;
      const cur = () =>
        useSc ? sc.scrollTop : window.scrollY || (document.scrollingElement || document.documentElement).scrollTop;
      const maxTop = () =>
        useSc
          ? sc.scrollHeight - sc.clientHeight
          : (document.scrollingElement || document.documentElement).scrollHeight - window.innerHeight;
      const setTop = (v) => (useSc ? (sc.scrollTop = v) : window.scrollTo(0, v));
      const evs = ['wheel', 'touchstart', 'touchmove', 'mousedown', 'pointerdown', 'keydown'];
      const stop = () => {
        if (stopped) return;
        stopped = true;
        if (raf) cancelAnimationFrame(raf);
        evs.forEach((n) => window.removeEventListener(n, stop, true));
      };
      const step = (ts) => {
        if (stopped) return;
        if (!last) last = ts;
        const dt = ts - last;
        last = ts;
        setTop(cur() + (SPEED * dt) / 1000);
        if (cur() >= maxTop() - 1) return stop();
        raf = requestAnimationFrame(step);
      };
      evs.forEach((n) => window.addEventListener(n, stop, { capture: true, passive: true }));
      const timer = setTimeout(() => {
        if (!stopped) raf = requestAnimationFrame(step);
      }, 900);
      return () => {
        clearTimeout(timer);
        stop();
      };
    })();

    // --- zoom-fit: scale the fixed 500px canvas to the responsive frame.
    // Reads #app-view-index's actual width (driven by CSS: full width <768,
    // min(60vw,520px) >=768) so the scale always matches the rendered frame —
    // no vw/clientWidth drift, no breakpoint maths duplicated here. Uses
    // transform:scale (not CSS `zoom`) so text scales uniformly on iOS Safari,
    // with #canvas-fit reserving the scaled footprint for correct scroll/width.
    const fit = () => {
      const el = document.getElementById('root-page-container');
      const wrap = document.getElementById('canvas-fit');
      const view = document.getElementById('app-view-index');
      if (!el || !view) return;
      const target = view.clientWidth;
      const z = target / 500;
      el.style.transform = `scale(${z})`;
      if (wrap) {
        wrap.style.width = target + 'px';
        wrap.style.height = 9578 * z + 'px';
      }
    };
    window.addEventListener('resize', fit);
    window.addEventListener('load', fit);
    fit();
    // CSS loads non-render-blocking (no resize event), so re-run once it has
    // likely applied and the frame width reflects the 520px cap.
    const fitT1 = setTimeout(fit, 150);
    const fitT2 = setTimeout(fit, 600);

    // --- music ---
    const a = document.querySelector('audio');
    let detachMusic = () => {};
    if (a) {
      a.loop = true;
      a.volume = 1;
      const wrap = document.getElementById('audio-control-wrapper');
      const toggle = wrap && wrap.querySelector('.audio-toggle');
      const spin = (on) => {
        if (toggle) on ? toggle.classList.add('mrotate') : toggle.classList.remove('mrotate');
        if (wrap) {
          const c = wrap.querySelector('.icon-cancel');
          if (c) c.style.display = on ? 'none' : 'block';
        }
      };
      const play = () =>
        a
          .play()
          .then(() => {
            spin(true);
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
          })
          .catch(() => {});
      const pause = () => {
        a.pause();
        spin(false);
        if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
      };
      // Media session: dedicated artwork + text shown on the lock screen / media
      // notification (independent of the app launcher icon). Without this, Android
      // falls back to the manifest icon.
      if ('mediaSession' in navigator && typeof MediaMetadata !== 'undefined') {
        try {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: '07.11.2026',
            artist: 'Phát & Duyên Wedding',
            artwork: [
              { src: '/assets/images/player-art-192.png?v=2', sizes: '192x192', type: 'image/png' },
              { src: '/assets/images/player-art-512.png?v=2', sizes: '512x512', type: 'image/png' },
            ],
          });
          navigator.mediaSession.setActionHandler('play', () => play());
          navigator.mediaSession.setActionHandler('pause', () => pause());
        } catch (_) {}
      }
      play();
      const once = () => {
        if (a.paused) play();
        window.removeEventListener('click', once);
        window.removeEventListener('touchstart', once);
        window.removeEventListener('scroll', once, true);
        window.removeEventListener('keydown', once);
      };
      window.addEventListener('click', once);
      window.addEventListener('touchstart', once);
      window.addEventListener('scroll', once, true);
      window.addEventListener('keydown', once);
      const onToggle = (e) => {
        e.stopPropagation();
        a.paused ? play() : pause();
      };
      if (wrap) wrap.addEventListener('click', onToggle);
      detachMusic = () => {
        if (wrap) wrap.removeEventListener('click', onToggle);
      };
    }

    // --- gallery pair: click either half to slide the two split halves
    // together (they meet centered + seamless), click again to part them.
    // Animates each L1 node's transform (separate from the reveal, which
    // drives the inner L2 element), so it never fights the entrance anim.
    const pairDetach = (() => {
      const a = document.querySelector('[data-node-id="slipf-3TVP"]');
      const b = document.querySelector('[data-node-id="CVzuuIYjq6"]');
      if (!a || !b) return () => {};
      const BASE = 'rotate(0deg) scale(1, 1)';
      // Boxes are equal (W=200.628, H=288.67). Center the pair and overlap the
      // right half by 1px so sub-pixel rounding under the canvas scale can't open
      // a seam; the right half paints last, so its first column covers the join.
      const AX = -36.153; // couple-11 left 85.5251 -> 49.372
      const BX = -50.705; // couple-12 left 299.705 -> 249.0 (= 49.372 + 200.628 - 1)
      [a, b].forEach((el) => {
        el.style.transition = 'transform .6s cubic-bezier(.4,0,.2,1)';
        el.style.cursor = 'pointer';
      });
      let joined = false;
      const apply = () => {
        a.style.transform = joined ? 'translateX(' + AX + 'px) ' + BASE : BASE;
        b.style.transform = joined ? 'translateX(' + BX + 'px) ' + BASE : BASE;
      };
      const onClick = () => { joined = !joined; apply(); };
      a.addEventListener('click', onClick);
      b.addEventListener('click', onClick);

      // Auto-unite once the first time the pair scrolls into view, then leave it
      // to the click toggle. Delayed a touch so the entrance reveal settles first.
      let autoDone = false;
      let autoIO = null;
      const autoJoin = () => {
        if (autoDone) return;
        autoDone = true;
        if (autoIO) autoIO.disconnect();
        setTimeout(() => { if (!joined) { joined = true; apply(); } }, 1500);
      };
      if ('IntersectionObserver' in window) {
        autoIO = new IntersectionObserver((en) => {
          en.forEach((e) => { if (e.isIntersecting) autoJoin(); });
        }, { root: sc, threshold: 0.6 });
        autoIO.observe(a);
      } else {
        autoJoin();
      }
      return () => {
        a.removeEventListener('click', onClick);
        b.removeEventListener('click', onClick);
        if (autoIO) autoIO.disconnect();
      };
    })();

    return () => {
      stopAuto();
      detachMusic();
      pairDetach();
      window.removeEventListener('resize', fit);
      window.removeEventListener('load', fit);
      clearTimeout(fitT1);
      clearTimeout(fitT2);
    };
  }, []);
}
