// Material image node (decor png, class family jsx-3557960200).
// src is optional: an empty material-component renders when omitted.
import PNode from './PNode';
import { asset } from './util';

export function MaterialImageNode({ src = null, ...node }) {
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
        {src ? (
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
        ) : (
          <div className="jsx-3557960200 material-component" />
        )}
      </div>
    </PNode>
  );
}
