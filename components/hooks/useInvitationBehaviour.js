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

    // --- zoom-fit: scale the fixed 500px canvas to the responsive container
    // width (35vw >=1366, 60vw 768-1365, full width below), matching the CSS
    // media rules that size #app-view-index / .pc-content. Without this the
    // canvas stays 500px while the frame is 60vw, so the frame overhangs.
    const fit = () => {
      const el = document.getElementById('root-page-container');
      if (!el) return;
      const w = document.documentElement.clientWidth || window.innerWidth;
      el.style.zoom = w >= 1366 ? (w * 0.35) / 500 : w >= 768 ? (w * 0.6) / 500 : w / 500;
    };
    window.addEventListener('resize', fit);
    fit();

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

    return () => {
      stopAuto();
      detachMusic();
      window.removeEventListener('resize', fit);
    };
  }, []);
}
