// Information: couple-14/15, calendar, date/time/venue (top 5481–6718px)
import PNode from '../nodes/PNode';
import { CalendarNode, PhotoNode, TextNode } from '../nodes';

export default function InformationSection() {
  return (
    <>
      <TextNode id="4YUXRUSBxQ" top={5481.41} left={67.75} width={365.1} anim="slide-up" delay={0} justify="center" align="center" color="#58c5fd" fontSize={48} fontFamily="Anisa Signature" letterSpacing={0}>
        You are back it with all the good things in this world.
      </TextNode>
      <PhotoNode id="uuA8jgYU_O" top={5623.59} left={190.964} width={275.4} height={63.8928} anim="slide-up" delay={0.2} src="assets/images/titles/information.png" radius={0} />
      <PhotoNode id="T6BKF2ebwz" top={5660.9} left={-0.219} width={498.9} height={746.04} anim="slide-up" delay={0.2} src="assets/images/photos/couple-14.jpg" mask="assets/images/decor/060_humpjyfwnvv.webp" radius={0} l3opacity={0.2} />
      <PhotoNode id="J0YdHmxRo5" top={5713} left={0} width={319.8} height={426.613} anim="slide-up" delay={0.2} src="assets/images/photos/couple-15.webp?v=2" radius={0} />
      <TextNode id="uCrncjLd65" top={6089.76} left={37.1} width={259} anim="slide-up" delay={0} justify="center" align="center" color="#ff368d" fontSize={48} fontFamily="Anisa Signature" letterSpacing={0}>
        I want to stay around you. Now and forever, let it be me.
      </TextNode>
      <PhotoNode id="INSs-ei8G_" top={6245.8} left={142.476} width={329.412} height={361.695} anim="slide-up" delay={0.2} src="assets/images/decor/frame.png" radius={0} />
      <CalendarNode id="5Z-LG1DGte" top={6319.09} left={160.7} width={295.7} height={275.987} anim="slide-up" delay={0.3} />
      <TextNode id="dNMncuCY-N" top={6286.47} left={162.75} width={127.5} anim="slide-up" delay={0} justify="center" align="center" color="#ffc368" fontSize={26} fontFamily="ShowcaseSans" letterSpacing={0} fontWeight="bold">
        07/11
      </TextNode>
      <TextNode id="cLmyc_qyDt" top={6286.44} left={303.15} width={135.3} anim="slide-left" delay={0} justify="center" align="center" color="#ffc368" fontSize={26} fontFamily="ShowcaseSans" letterSpacing={0} fontWeight="bold">
        -2026-
      </TextNode>
      <TextNode id="LwGeZiqk9D" top={6638.04} left={379.1} width={98.3} anim="slide-left" delay={0} justify="flex-start" align="left" color="#58c5fd" fontSize={35} fontFamily="Katty Diona" letterSpacing={0} fontWeight="bold">
        / Time
      </TextNode>
      <TextNode id="VSe93u7Pa_" top={6714.65} left={10.25} width={129.5} anim="slide-right" delay={0} justify="flex-end" align="right" color="#58c5fd" fontSize={35} fontFamily="Katty Diona" letterSpacing={0} fontWeight="bold">
        Address /
      </TextNode>
      <TextNode id="dXTOz9ghEA" top={6631.15} left={152.65} width={213.4} anim="slide-up" delay={0} justify="flex-end" align="right" color="#ffffff" fontSize={18} fontFamily="PlayfairDisplay" letterSpacing={0} lineHeight={1.6}>
        Thứ Bảy, 07/11/2026<div>Âm lịch 29/09 | 18:30 PM</div>
      </TextNode>
      <TextNode id="6MrIeBGLUQ" top={6718} left={152.7} width={266.9} anim="slide-up" delay={0} justify="flex-start" align="left" color="#ffffff" fontSize={18} fontFamily="PlayfairDisplay" letterSpacing={0}>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Caravelle+Saigon+Hotel+19-23+Cong+Truong+Lam+Son+Quan+1"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline', pointerEvents: 'auto', cursor: 'pointer' }}
        >
          Khách sạn Caravelle, Tầng 3,&nbsp;<div>Sảnh BallRoom</div>
        </a>
      </TextNode>
      {/* Embedded interactive map of the venue. Sits in the band opened up by
          shifting the RSVP form + Closing section down (+380px). */}
      <PNode id="venue-map" top={6820} left={37} width={426} height={360} anim="slide-up" delay={0.2}>
        <iframe
          title="Bản đồ Khách sạn Caravelle"
          src="https://www.google.com/maps?q=Caravelle+Saigon+Hotel,+19-23+Cong+Truong+Lam+Son,+Quan+1&output=embed"
          style={{ width: '100%', height: '100%', border: 0, borderRadius: 12, display: 'block', pointerEvents: 'auto', filter: 'invert(90%) hue-rotate(180deg)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </PNode>
    </>
  );
}
