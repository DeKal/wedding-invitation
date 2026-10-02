import Head from 'next/head';
import { useInvitationBehaviour } from '../components/invitation/useInvitationBehaviour';
import { PhotoNode, TextNode, MaterialImageNode, BgShapeNode } from '../components/invitation/nodes';

// In-progress React migration of the invitation (iterations 1–2: first ~34 of
// 67 nodes, top 0 -> ~3741px). The remaining nodes are still only on the static
// page at "/". Nodes are emitted in original document order so overlapping
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
                    {/* --- iteration 2: nodes 17–33 (top ~1523–3655px) --- */}
                    <PhotoNode id="kpODDp1arX" top={1523} left={349} width={87.1} height={66.6504} anim="slide-left" delay={0.2} src="assets/images/decor/brush-stroke.png" radius={0} />
                    <TextNode id="HZWmHPWqep" top={1615.67} left={148.25} width={329.2} anim="slide-up" delay={0} justify="center" align="center" color="#ff368d" fontSize={42} fontFamily="Faugllin Balseyn" letterSpacing={0} lineHeight={1.17}>
                      As the clouds and mist dissipate,&nbsp;
                      <span style={{ letterSpacing: '0px', backgroundColor: 'transparent' }}>I love you and everyone knows it.</span>
                    </TextNode>
                    <TextNode id="KIiIOP2oxg" top={1776.83} left={82} width={389.9} anim="slide-up" delay={0} justify="flex-start" align="left" color="#ffffff" fontSize={30} fontFamily="Carlytte" letterSpacing={0} lineHeight={1.15}>
                      <p>Cảm ơn bạn đã đến nơi đây,<br />chia vui, chứng giám phút giây ngọt ngào.</p>
                      <p>Mong mai này, lúc nhớ lại,<br />vẫn nghe hạnh phúc đong đầy trong tim.</p>
                      <p>Lời thề còn đó, mắt cười lấp lánh,<br />niềm vui ngày ấy, mãi chẳng phai mờ.</p>
                    </TextNode>
                    <MaterialImageNode id="wM6lF5A_wi" top={1796.27} left={56.95} width={15.9} height={151.818} anim="slide-right" delay={0.2} />
                    <PhotoNode id="5U4BAluoVP" top={1999.63} left={69.3532} width={360.832} height={240.811} anim="slide-up" delay={0.2} src="assets/images/photos/couple-06.jpg" radius={15} />
                    <PhotoNode id="fHaFrmoUF9" top={2338.16} left={69.85} width={360.9} height={241.082} anim="slide-up" delay={0.2} src="assets/images/photos/couple-07.jpg" radius={15} />
                    <PhotoNode id="YeJXmeZAm8" top={2142.42} left={30.1} width={260.9} height={138.963} anim="slide-up" delay={0.2} src="assets/images/titles/love-letter.png" radius={0} />
                    <TextNode id="Q1DygbKk4Z" top={2310.19} left={69.85} width={361.5} anim="slide-up" delay={0} justify="center" align="center" color="#ffffff" fontSize={20} fontFamily="ShowcaseSans" letterSpacing={12}>
                      WE ARE MARRIED
                    </TextNode>
                    <TextNode id="5Bc1vlS3Ft" top={2613} left={9.8} width={480} anim="slide-up" delay={0} justify="center" align="center" color="#ffc368" fontSize={26} fontFamily="Scarlet Bradley.regular" letterSpacing={0} fontStyle="italic" textDecoration="underline">
                      Hữu Phát &amp; Mỹ Duyên
                    </TextNode>
                    <TextNode id="TRlwtEJNQn" top={2692.96} left={0.8} width={500} anim="slide-up" delay={0} justify="center" align="center" color="#ffffff" fontSize={32} fontFamily="Carlytte" letterSpacing={0}>
                      Anh không phải là lựa chọn sau khi em đắn đo suy tính,&nbsp;
                      <div>mà là người em yêu bằng cả con tim,&nbsp;</div>
                      <div>dù biết khó khăn vẫn chẳng hề do dự.</div>
                    </TextNode>
                    <PhotoNode id="Ykxx6gelAO" top={2736.86} left={0.003} width={498.8} height={859.082} anim="slide-up" delay={0.2} src="assets/images/photos/couple-08.jpg" mask="assets/images/decor/060_humpjyfwnvv.png" radius={0} l3opacity={0.2} />
                    <TextNode id="B97fZJpzM4" top={3506.09} left={10.8} width={480} anim="slide-up" delay={0} justify="center" align="center" color="#ffffff" fontSize={36} fontFamily="BethanWhite" letterSpacing={0}>
                      Giữa hàng tỷ vì sao trong dải ngân hà,&nbsp;
                      <div>Em chỉ muốn kề bên anh mãi mãi.</div>
                    </TextNode>
                    <PhotoNode id="-DyBz-kAYB" top={2933.56} left={139.752} width={360} height={499.68} anim="slide-up" delay={0.2} src="assets/images/photos/couple-09.png" radius={0} />
                    <TextNode id="hsd7MzmaEN" top={3107.89} left={30.1} width={167} anim="slide-right" delay={0} justify="center" align="center" color="#58c5fd" fontSize={43} fontFamily="Carlytte" letterSpacing={0}>
                      &quot;There is nothing I want more for myself than a future with you.&quot;
                    </TextNode>
                    <MaterialImageNode id="0__XxMtHJk" top={2848} left={266.402} width={93} height={57.0179} anim="slide-up" delay={0.2} transform="rotate(39.9551deg) scale(1, 1)" src="assets/images/decor/ixntp8lomb7yu5fpt6g8q.png" />
                    <PhotoNode id="R8TWBhefN9" top={3655.48} left={0.8} width={370} height={493.58} anim="slide-up" delay={0.2} src="assets/images/photos/couple-10.jpg" radius={0} />
                    <PhotoNode id="Jz-qcguaYX" top={3585.5} left={245} width={258.5} height={155.1} anim="slide-up" delay={0.2} src="assets/images/titles/step-by-step.png" radius={0} />
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
