// The interactive chrome, ported from the static invitation as verbatim markup
// (see toolbarMarkup.js) and driven by the verbatim scripts in useToolbar.
// Kept as dangerouslySetInnerHTML so the port stays byte-identical and the
// querySelector-based scripts find exactly the DOM they expect.
import { RSVP_HTML, CHROME_HTML } from './toolbarMarkup';

// RSVP form — a positioned node that lives inside the canvas (top 6859px).
export function RsvpFormNode() {
  return <div dangerouslySetInnerHTML={{ __html: RSVP_HTML }} />;
}

// Fixed bottom toolbar + blessing feed + gift animation layer — a sibling of the
// scroll container, lifted to the viewport bottom by the toolbar-fixed script.
export function ToolbarChrome() {
  return <div dangerouslySetInnerHTML={{ __html: CHROME_HTML }} />;
}
