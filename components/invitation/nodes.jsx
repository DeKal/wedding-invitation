// Content components rendered inside a PNode. Each maps one node "type" from the
// original export. Class names are preserved verbatim so the shared stylesheets
// (assets/css + inline-styles.css) style them identically.
import PNode, { px } from './PNode';

const asset = (p) => `url(/${p})`;

// L3 wrapper shared by photo nodes (flex-centered box holding the image).
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

// Photo / masked-photo node (class family jsx-1944329802).
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

// Text box node (class family jsx-1828971989).
export function TextNode({
  justify = 'flex-start',
  align = 'left',
  color,
  fontSize,
  fontFamily,
  letterSpacing = 0,
  children,
  ...node
}) {
  return (
    <PNode outerClass="jsx-1828971989 text-box-component " transform="rotate(0deg)" {...node}>
      <div
        className="jsx-1828971989"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          padding: '0px',
          borderRadius: '0px',
          boxShadow: 'none',
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: justify,
          boxSizing: 'border-box',
          opacity: 1,
          border: '0px solid',
        }}
      >
        <div
          style={{
            height: 'auto',
            width: '100%',
            minWidth: 20,
            color,
            fontSize: px(fontSize),
            textShadow: '0px 0px 2px rgba(0,0,0,0)',
            fontWeight: 500,
            fontFamily: `"${fontFamily}"`,
            textAlign: align,
            lineHeight: 'normal',
            letterSpacing: px(letterSpacing),
            textTransform: 'none',
            textDecoration: 'none',
            fontStyle: 'normal',
            pointerEvents: 'none',
            overflow: 'hidden',
            wordBreak: 'break-word',
          }}
        >
          {children}
        </div>
      </div>
    </PNode>
  );
}

// Material image node (decor png, class family jsx-3557960200).
export function MaterialImageNode({ src, ...node }) {
  return (
    <PNode outerClass="jsx-3557960200" {...node}>
      <div
        className="jsx-3557960200"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          backgroundColor: 'transparent',
          textShadow: '0px 0px 2px rgba(0,0,0,0)',
          opacity: 1,
        }}
      >
        <div className="jsx-3557960200 material-component">
          <div
            className="jsx-3557960200 photo-bg-wrap"
            style={{
              backgroundImage: asset(src),
              border: '0px solid',
              borderRadius: '0px',
              padding: '0px',
              boxShadow: 'none',
            }}
          />
        </div>
      </div>
    </PNode>
  );
}

// SVG shape node (background block, class family jsx-3557960200).
export function BgShapeNode({ fill = '#d2d3e3', ...node }) {
  return (
    <PNode outerClass="jsx-3557960200" {...node}>
      <div
        className="jsx-3557960200"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxSizing: 'border-box',
          backgroundColor: 'transparent',
          textShadow: '0px 0px 2px rgba(0,0,0,0)',
          opacity: 1,
        }}
      >
        <div className="jsx-3557960200 material-component">
          <div
            id={`svg-${node.id}`}
            className="jsx-3557960200 svg-wrap"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              border: '0px solid',
              borderRadius: 20,
              padding: '0px',
              boxShadow: 'none',
            }}
          >
            <svg
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill={fill} d="M100,100H0V0h100V100z" />
            </svg>
          </div>
        </div>
      </div>
    </PNode>
  );
}
