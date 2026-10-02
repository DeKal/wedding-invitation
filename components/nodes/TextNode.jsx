// Text box node (class family jsx-1828971989).
import PNode, { px } from './PNode';

export function TextNode({
  justify = 'flex-start',
  align = 'left',
  color,
  fontSize,
  fontFamily,
  letterSpacing = 0,
  lineHeight = 'normal',
  fontStyle = 'normal',
  textDecoration = 'none',
  fontWeight = 500,
  overflow = 'hidden',
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
            fontWeight,
            fontFamily: `"${fontFamily}"`,
            textAlign: align,
            lineHeight,
            letterSpacing: px(letterSpacing),
            textTransform: 'none',
            textDecoration,
            fontStyle,
            pointerEvents: 'none',
            overflow,
            wordBreak: 'break-word',
          }}
        >
          {children}
        </div>
      </div>
    </PNode>
  );
}
