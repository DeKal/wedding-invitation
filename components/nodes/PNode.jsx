// Positioned node wrapper for the invitation canvas.
// Reproduces the two-level structure of the original export:
//   L1: absolutely-positioned box (coords live here)
//   L2: the [data-transition-key] element the reveal observer animates
// Content (L3) is passed as children.

const px = (v) => (typeof v === 'number' ? `${v}px` : v);

const INIT = {
  'fade-in': { transform: 'none', opacity: 0 },
  'slide-up': { transform: 'translateY(50px)', opacity: 0 },
  'slide-right': { transform: 'translateX(-50px)', opacity: 0 },
  'slide-left': { transform: 'translateX(50px)', opacity: 0 },
};

export default function PNode({
  id,
  top,
  left,
  width,
  height = null,
  zIndex = 0,
  transform = 'rotate(0deg) scale(1, 1)',
  outerClass = 'jsx-1944329802',
  anim = 'slide-up',
  delay = 0.2,
  children,
}) {
  const init = INIT[anim] || INIT['slide-up'];
  const key = `${id}-${anim}-1.3-${delay}-ease-out-false`;
  const outerStyle = {
    position: 'absolute',
    top: px(top),
    left: px(left),
    width: px(width),
    height: height == null ? 'auto' : px(height),
    zIndex,
    cursor: 'default',
    transform,
  };
  return (
    <div data-node-id={id} style={outerStyle} className={outerClass}>
      <div
        data-transition-key={key}
        data-node-id={id}
        style={{
          transition: `all 1.3s ease-out ${delay}s`,
          transform: init.transform,
          opacity: init.opacity,
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export { px };
