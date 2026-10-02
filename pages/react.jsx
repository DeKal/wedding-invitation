import Head from 'next/head';
import { useInvitationBehaviour } from '../components/invitation/useInvitationBehaviour';
import { PhotoNode, TextNode, MaterialImageNode, BgShapeNode } from '../components/invitation/nodes';

// In-progress React migration of the invitation (iteration 1: first ~25% of
// nodes, top 0 -> ~1523px). The remaining nodes are still only on the static
// page at "/". Nodes are emitted in original document order so overlapping hero
// layers paint correctly. The canvas keeps its full 9138px height so positions
// and scroll match the original exactly; migrated content occupies the top.
export default function ReactInvitation() {
  useInvitationBehaviour();

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
            <div id="audio-control-wrapper" className="jsx-3522513885 cursor-pointer">
              <div className="jsx-3522513885 audio-toggle ">
                <img src="/assets/images/decor/audio-1.png" alt="music icon" className="jsx-3522513885 music-icon" />
                <div className="jsx-3522513885 icon-cancel">
                  <div className="jsx-3522513885 icon-line"></div>
                </div>
              </div>
            </div>
            <audio src="/assets/images/audio/d525d3a7-334b-4bef-847f-23a0c5abbac6.mp3" loop preload="auto" />
            <div className="relative overflow-x-hidden styles_customScroll__X5r6w h-full" style={{ backgroundColor: '#fff', overflowY: 'auto', touchAction: 'auto' }}>
              <div
                id="root-page-container"
                style={{ backgroundColor: '#000000', backgroundImage: 'none', backgroundSize: 'cover', width: '500px', height: '9138px', position: 'relative' }}
                className="jsx-2177353859"
              >
                <div style={{ position: 'relative', userSelect: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box', width: '500px', height: '9138px', minWidth: '50px', minHeight: '50px' }}>
                  <div className="jsx-2177353859 w-full h-full">
                    {/* --- migrated nodes (document order) --- */}
                    <BgShapeNode id="StLOICINNT" top={167.849} left={35.2716} width={405.076} height={405.076} anim="slide-up" delay={0.2} />
                    <PhotoNode id="rLbtyJtc5l" top={0} left={0} width={500} height={838.292} anim="fade-in" delay={0} transform="rotate(0deg) scale(1, 1)" src="assets/images/photos/couple-01.jpg" mask="assets/images/decor/017_qnyb431guuf.png" radius={0} l3opacity={0.34} />
                    <PhotoNode id="N7aok4qDsT" top={102.3251} left={37.059} width={425.5} height={470.6928} anim="slide-up" delay={0} src="assets/images/photos/couple-02.png" radius={0} />
                    <TextNode id="bd_7atgif2" top={34} left={37.1} width={159.992} anim="slide-right" delay={0} justify="flex-start" align="left" color="#ffffff" fontSize={26} fontFamily="Mallong" letterSpacing={4}>
                      WEDDING<div>DAY</div>
                    </TextNode>
                    <PhotoNode id="kjuSDaAb6w" top={614.791} left={22.1325} width={455.324} height={206.598} anim="slide-up" delay={0.2} src="assets/images/music/player-card.png" radius={0} />
                    <TextNode id="OJ3JDy50uV" top={648.9} left={140} width={172.992} anim="slide-up" delay={0} justify="flex-start" align="left" color="#000000" fontSize={23} fontFamily="PlayfairDisplay" letterSpacing={0}>
                      i will love you
                    </TextNode>
                    <TextNode id="YC3yZUeAlf" top={681.2} left={140} width={246} anim="slide-up" delay={0} justify="flex-start" align="left" color="#363636" fontSize={21} fontFamily="PlayfairDisplay" letterSpacing={0}>
                      Valentine - Kina Grannis
                    </TextNode>
                    <PhotoNode id="FrjfVHMc01" top={651.4} left={64.9} width={59.1} height={59.1} anim="slide-up" delay={0.2} src="assets/images/photos/couple-03.jpg" radius={7} />
                    <TextNode id="_2lvBi1Bet" top={853} left={10} width={480} anim="slide-up" delay={0} justify="center" align="center" color="#ffffff" fontSize={72} fontFamily="RetroSignature" letterSpacing={9}>
                      Invitation
                    </TextNode>
                    <MaterialImageNode id="zu2kv3uGQq" top={935} left={217} width={66} height={66} anim="slide-up" delay={0.2} src="assets/images/decor/7on8b1hvwsno0nluh0upv.png" />
                    <TextNode id="3muv_SoFsx" top={1033} left={10} width={480} anim="slide-up" delay={0} justify="center" align="center" color="#ffffff" fontSize={21} fontFamily="Madam Ghea" letterSpacing={0}>
                      Hết lần này đến lần khác,&nbsp;
                      <div>
                        biến những yêu thương thầm lặng thành niềm hạnh phúc sẻ chia.&nbsp;
                        <div>Bởi vì, có em bên cạnh,&nbsp;</div>
                        <div>luôn là điều đáng để tự hào và kể mãi không chán.</div>
                      </div>
                    </TextNode>
                    <PhotoNode id="jxqt54II30" top={1332.83} left={43.1} width={337.34} height={340.713} anim="slide-up" delay={0.2} src="assets/images/music/vinyl.png" radius={0} />
                    <PhotoNode id="8nt0MlKUg1" top={1309} left={22.1} width={335.986} height={194.2} anim="slide-up" delay={0.2} src="assets/images/titles/welcome.png" radius={0} />
                    <PhotoNode id="HqAAGFev-n" top={1275.81} left={42.8} width={194.326} height={407.313} anim="slide-right" delay={0.2} src="assets/images/photos/couple-04.png" radius={0} />
                    <PhotoNode id="OVndXKhJtI" top={1294.87} left={190.097} width={180.688} height={407.313} anim="slide-up" delay={0.2} src="assets/images/photos/couple-05.png" radius={0} />
                    <PhotoNode id="jndvrtteX1" top={1354.8} left={386} width={30.7} height={24.9437} anim="slide-left" delay={0.2} src="assets/images/music/music-note-blue.png" radius={0} />
                    <PhotoNode id="13hHarOAcz" top={1479.51} left={425.35} width={37.2247} height={30.245} anim="slide-left" delay={0.2} src="assets/images/music/music-note-pink.png" radius={0} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
