// SVG shape node (background block, class family jsx-3557960200).
import PNode from './PNode';

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
