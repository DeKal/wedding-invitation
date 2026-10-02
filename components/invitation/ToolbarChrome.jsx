// Fixed bottom toolbar + blessing feed + gift animation layer — a sibling of the
// scroll container, lifted to the viewport bottom by the toolbar-fixed script.
// Ported from the static invitation as verbatim markup (see toolbarMarkup.js)
// and driven by the verbatim scripts in useToolbar; kept as
// dangerouslySetInnerHTML so the port stays byte-identical.
import { CHROME_HTML } from './toolbarMarkup';

export function ToolbarChrome() {
  return <div dangerouslySetInnerHTML={{ __html: CHROME_HTML }} />;
}
