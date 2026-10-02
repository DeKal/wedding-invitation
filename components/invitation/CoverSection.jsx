// Cover: hero couple photo + WEDDING DAY (top 0–838px)
import { BgShapeNode, PhotoNode, TextNode } from './nodes';

export default function CoverSection() {
  return (
    <>
      <BgShapeNode id="StLOICINNT" top={167.849} left={35.2716} width={405.076} height={405.076} anim="slide-up" delay={0.2} />
      <PhotoNode id="rLbtyJtc5l" top={0} left={0} width={500} height={838.292} anim="fade-in" delay={0} transform="rotate(0deg) scale(1, 1)" src="assets/images/photos/couple-01.jpg" mask="assets/images/decor/017_qnyb431guuf.png" radius={0} l3opacity={0.34} />
      <PhotoNode id="N7aok4qDsT" top={102.3251} left={37.059} width={425.5} height={470.6928} anim="slide-up" delay={0} src="assets/images/photos/couple-02.png" radius={0} />
      <TextNode id="bd_7atgif2" top={34} left={37.1} width={159.992} anim="slide-right" delay={0} justify="flex-start" align="left" color="#ffffff" fontSize={26} fontFamily="Mallong" letterSpacing={4}>
        WEDDING<div>DAY</div>
      </TextNode>
    </>
  );
}
