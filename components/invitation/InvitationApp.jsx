import { useInvitationBehaviour } from './useInvitationBehaviour';
import { useToolbar } from './useToolbar';
import AudioControl from './AudioControl';
import { RsvpFormNode } from './RsvpFormNode';
import { ToolbarChrome } from './ToolbarChrome';
import {
  CoverSection,
  MusicCardSection,
  InvitationSection,
  LoveLetterSection,
  MarriedSection,
  GallerySection,
  InformationSection,
  ClosingSection,
} from './sections';

// Client-only body of the invitation. Loaded via next/dynamic({ ssr: false })
// from pages/index.jsx so it never server-renders: the page is a verbatim port
// of hand-written HTML (dangerouslySetInnerHTML chrome + 68 positioned nodes),
// which the browser re-parses/normalizes differently than React's SSR tree and
// triggered hydration mismatch (React #418/#423). It is purely client-interactive
// (IntersectionObserver reveal, auto-scroll, audio, toolbar scripts), so SSR adds
// nothing. The 500x9138 canvas keeps its full height so positions/scroll match.
export default function InvitationApp() {
  useInvitationBehaviour();
  useToolbar();

  return (
    <div style={{ backgroundColor: '#f0f2f5', height: '100vh', width: '100vw', paddingTop: '5vh' }} className="jsx-3147566159 pc-container">
      <div
        style={{ width: 'auto', height: '90vh', margin: 'auto', position: 'relative', border: '1px solid #e0e0e0', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)', borderRadius: '3px', overflow: 'hidden' }}
        className="jsx-3147566159 pc-content"
      >
        <div id="app-view-index" className="jsx-773491098 ">
          <AudioControl />
          <div className="relative overflow-x-hidden styles_customScroll__X5r6w h-full" style={{ backgroundColor: '#fff', overflowY: 'auto', touchAction: 'auto' }}>
            <div
              id="root-page-container"
              style={{ backgroundColor: '#000000', backgroundImage: 'none', backgroundSize: 'cover', width: '500px', height: '9138px', position: 'relative' }}
              className="jsx-2177353859"
            >
              <div style={{ position: 'relative', userSelect: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', width: '500px', height: '9138px', minWidth: '50px', minHeight: '50px' }}>
                <div className="jsx-2177353859 w-full h-full">
                  {/* 68 positioned nodes, grouped into scenes (document order) */}
                  <CoverSection />
                  <MusicCardSection />
                  <InvitationSection />
                  <LoveLetterSection />
                  <MarriedSection />
                  <GallerySection />
                  <InformationSection />
                  <ClosingSection />
                  <RsvpFormNode />
                </div>
              </div>
            </div>
          </div>
          <ToolbarChrome />
        </div>
      </div>
    </div>
  );
}
