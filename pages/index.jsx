import Head from 'next/head';
import { useInvitationBehaviour } from '../components/invitation/useInvitationBehaviour';
import { useToolbar } from '../components/invitation/useToolbar';
import AudioControl from '../components/invitation/AudioControl';
import { RsvpFormNode, ToolbarChrome } from '../components/invitation/chrome';
import {
  CoverSection,
  MusicCardSection,
  InvitationSection,
  LoveLetterSection,
  MarriedSection,
  GallerySection,
  InformationSection,
  ClosingSection,
} from '../components/invitation/sections';

// React migration of the invitation (complete). The 68 positioned nodes are
// split into scene components (rendered in original document order so overlapping
// layers paint correctly); the RSVP form node and the fixed toolbar / gift /
// blessing chrome are ported as verbatim markup + verbatim scripts (useToolbar).
// The canvas keeps its full 9138px height so positions and scroll match exactly.
export default function ReactInvitation() {
  useInvitationBehaviour();
  useToolbar();

  return (
    <>
      <Head>
        <title>Thiệp cưới 6 — React</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
    </>
  );
}
