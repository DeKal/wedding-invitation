// Calendar node (template-three grid). Classless L1 in the original; renders the
// month grid with `empty` lead cells and a heart marker on the highlighted day.
import PNode, { px } from './PNode';

export function CalendarNode({
  color = '#ffc368',
  fontSize = 14,
  fontFamily = 'ShowcaseSans',
  emptyLead = 3,
  days = 30,
  heartDay = 7,
  heartSrc = 'assets/images/decor/calen_heart_1.png',
  ...node
}) {
  const cells = [];
  for (let i = 0; i < emptyLead; i++) {
    cells.push(
      <div className="empty" key={`e${i}`}>
        <div />
      </div>
    );
  }
  for (let d = 1; d <= days; d++) {
    cells.push(
      d === heartDay ? (
        <div key={d}>
          <img className="heart-date" src={`/${heartSrc}`} alt="heart" width="160" height="162" />
          <div className="colorF">{d}</div>
        </div>
      ) : (
        <div key={d}>
          <div>{d}</div>
        </div>
      )
    );
  }
  return (
    <PNode outerClass="" transform="rotate(0deg)" {...node}>
      <div
        style={{
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
          opacity: 1,
          borderRadius: '0px',
          boxShadow: 'none',
        }}
      >
        <div
          className="calendar componentBOX"
          style={{ opacity: 1, zIndex: 154, borderRadius: 0, width: '100%', height: '100%', color, fontSize: px(fontSize), fontFamily: `"${fontFamily}"` }}
        >
          <div className="template-three">{cells}</div>
        </div>
      </div>
    </PNode>
  );
}
