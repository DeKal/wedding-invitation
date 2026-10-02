// Photo / masked-photo node (class family jsx-1944329802).
import PNode, { px } from './PNode';
import { asset } from './util';

// L3 wrapper (flex-centered box holding the image).
function photoL3(opacity, radius) {
  return {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    border: '0px solid',
    padding: '0px',
    backgroundColor: 'transparent',
    textShadow: '0px 0px 2px rgba(0,0,0,0)',
    opacity,
    boxShadow: 'none',
    borderRadius: radius,
  };
}

function maskStyle(mask) {
  return {
    WebkitMaskBoxImageSource: mask ? asset(mask) : 'none',
    WebkitMaskBoxImageSlice: '0 fill',
    maskImage: mask ? asset(mask) : 'none',
    maskSize: '100% 100%',
    maskRepeat: 'no-repeat',
  };
}

export function PhotoNode({ src, mask = null, radius = 0, l3opacity = 1, ...node }) {
  const r = px(radius);
  return (
    <PNode outerClass="jsx-1944329802" {...node}>
      <div className="jsx-1944329802" style={photoL3(l3opacity, r)}>
        <div className="jsx-1944329802 photo-component" style={maskStyle(mask)}>
          <div
            className="jsx-1944329802 photo-bg-wrap"
            style={{ backgroundImage: asset(src), borderRadius: r }}
          />
        </div>
      </div>
    </PNode>
  );
}
