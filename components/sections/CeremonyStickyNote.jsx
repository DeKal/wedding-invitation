// Sticky note on the far-left of the information band, beside the frame node
// (INSs-ei8G_). Shows the current ceremony name stacked word-per-line inside the
// same decor frame. Controlled by InformationSection: `sel` picks which name to
// show, `onToggle` fires on click to swap the whole ceremony (date/time/address/
// map update there too). No dropdown — clicking anywhere just swaps.
//
// Client-only (the whole InvitationApp is dynamic/ssr:false). pointerEvents:auto
// because canvas nodes default to pass-through.
import PNode from '../nodes/PNode';

const OPTIONS = ['Tiệc Cưới', 'Lễ Vu Quy'];

export default function CeremonyStickyNote({ sel = 0, onToggle, ...props }) {
  const lines = OPTIONS[sel].split(' ');

  return (
    <PNode outerClass="jsx-1944329802" {...props}>
      <div style={{ position: 'relative', pointerEvents: 'auto' }}>
        <style>{`
          @keyframes ceremony-sway {
            0%, 100% { transform: rotate(-6deg); }
            50%      { transform: rotate(3deg); }
          }
        `}</style>

        {/* framed label — click to swap the ceremony name */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (onToggle) onToggle();
          }}
          style={{
            backgroundImage: 'url("/assets/images/decor/frame.png")',
            backgroundColor: 'rgba(58,42,22,0.55)',
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            borderRadius: 0,
            transformOrigin: '50% 0%',
            animation: 'ceremony-sway 3.4s ease-in-out infinite',
            boxSizing: 'border-box',
            width: '100%',
            height: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px 10px',
            textAlign: 'center',
            cursor: 'pointer',
            fontFamily: 'ShowcaseSans',
            color: '#ffc368',
            userSelect: 'none',
          }}
        >
          {lines.map((w, i) => (
            <div key={sel + '-' + i} className="ceremony-swap" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.15, whiteSpace: 'nowrap' }}>
              {w}
            </div>
          ))}
          {/* swap icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffc368" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 5, opacity: 0.8 }}>
            <path d="M17 1l4 4-4 4" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <path d="M7 23l-4-4 4-4" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
        </div>
      </div>
    </PNode>
  );
}
