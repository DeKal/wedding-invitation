// Live music-player card — replaces the former static player-card.png.
//
// Renders the player chrome (progress bar, time labels, transport controls) as
// real DOM and wires it to the page soundtrack: it grabs the single <audio>
// element (owned by AudioControl, driven by useInvitationBehaviour) and mirrors
// its state. Progress + time labels track currentTime/duration, the centre
// button reflects play/pause, the bar is click-to-seek and the side buttons
// skip +-10s. Positioned via PNode so it keeps the original slide-up entrance.
//
// The song title / artist / couple thumbnail stay as separate overlay nodes in
// MusicCardSection (they paint on top of this card's empty top-left area).
import { useEffect, useRef, useState } from 'react';
import PNode from '../nodes/PNode';

const fmt = (t) => {
  if (!isFinite(t) || t < 0) t = 0;
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return m + ':' + String(s).padStart(2, '0');
};

const INK = '#000';
const BAR = '#000'; // elapsed fill — dark for contrast against the grey track

export default function MusicPlayerCard(props) {
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const audioRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const a = document.querySelector('audio');
    if (!a) return;
    audioRef.current = a;
    const onTime = () => setCur(a.currentTime);
    const onMeta = () => setDur(a.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('durationchange', onMeta);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    if (a.duration) setDur(a.duration);
    setCur(a.currentTime || 0);
    setPlaying(!a.paused);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('durationchange', onMeta);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
    };
  }, []);

  const toggle = (e) => {
    e.stopPropagation();
    const a = audioRef.current;
    if (!a) return;
    a.paused ? a.play().catch(() => {}) : a.pause();
  };
  const seek = (e) => {
    const a = audioRef.current;
    const bar = barRef.current;
    if (!a || !bar || !a.duration) return;
    const r = bar.getBoundingClientRect();
    const p = (e.clientX - r.left) / r.width;
    a.currentTime = Math.max(0, Math.min(1, p)) * a.duration;
  };
  const skip = (d) => (e) => {
    e.stopPropagation();
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.duration || 0, a.currentTime + d));
  };

  const pct = dur ? Math.max(0, Math.min(100, (cur / dur) * 100)) : 0;

  return (
    <PNode outerClass="jsx-1944329802" {...props}>
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 18,
          right: 16,
          bottom: 20,
          boxSizing: 'border-box',
          borderRadius: 22,
          background: 'rgba(229,229,239,0.58)',
          fontFamily: 'PlayfairDisplay',
        }}
      >
        {/* top-right dots */}
        <div style={{ position: 'absolute', top: 30, right: 24, display: 'flex', gap: 4 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#90929899' }} />
          ))}
        </div>

        {/* progress row */}
        <div
          style={{
            position: 'absolute',
            left: 22,
            right: 22,
            top: 96,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 13, color: '#8a8a90', minWidth: 34 }}>{fmt(cur)}</span>
          <div
            ref={barRef}
            onClick={seek}
            style={{
              position: 'relative',
              flex: 1,
              height: 5,
              borderRadius: 3,
              background: 'rgb(102,104,108)',
              cursor: 'pointer',
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: pct + '%', background: BAR, borderRadius: 3 }} />
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: pct + '%',
                width: 11,
                height: 11,
                marginLeft: -5.5,
                marginTop: -5.5,
                borderRadius: '50%',
                background: BAR,
              }}
            />
          </div>
          <span style={{ fontSize: 13, color: '#8a8a90', minWidth: 34, textAlign: 'right' }}>{fmt(dur)}</span>
        </div>

        {/* transport row */}
        <div
          style={{
            position: 'absolute',
            left: 22,
            right: 22,
            top: 132,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 52,
          }}
        >
          <button type="button" onClick={skip(-10)} aria-label="Lùi 10 giây" style={btn}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill={INK}>
              <path d="M11 6v12l-8.5-6L11 6zm9 0v12l-8.5-6L20 6z" />
            </svg>
          </button>
          <button type="button" onClick={toggle} aria-label={playing ? 'Tạm dừng' : 'Phát'} style={btn}>
            {playing ? (
              <svg width="34" height="34" viewBox="0 0 24 24" fill={INK}>
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="34" height="34" viewBox="0 0 24 24" fill={INK}>
                <path d="M7 5l12 7-12 7V5z" />
              </svg>
            )}
          </button>
          <button type="button" onClick={skip(10)} aria-label="Tua 10 giây" style={btn}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill={INK}>
              <path d="M13 6v12l8.5-6L13 6zM4 6v12l8.5-6L4 6z" />
            </svg>
          </button>
        </div>
      </div>
    </PNode>
  );
}

const btn = {
  border: 'none',
  background: 'transparent',
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 0,
};
