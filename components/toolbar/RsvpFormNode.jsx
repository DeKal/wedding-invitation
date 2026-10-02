// RSVP form — a positioned node that lives inside the canvas (top 6859px).
// Ported from the static invitation as verbatim markup (see toolbarMarkup.js)
// and driven by the verbatim rsvp-fx script in useToolbar; kept as
// dangerouslySetInnerHTML so the port stays byte-identical.
import { RSVP_HTML } from './toolbarMarkup';

export function RsvpFormNode() {
  return <div dangerouslySetInnerHTML={{ __html: RSVP_HTML }} />;
}
