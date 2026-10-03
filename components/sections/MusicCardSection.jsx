// Music card: player card, song title, couple-03 (top 614–820px)
import { PhotoNode, TextNode } from '../nodes';

export default function MusicCardSection() {
  return (
    <>
      <PhotoNode id="kjuSDaAb6w" top={614.791} left={22.1325} width={455.324} height={206.598} anim="slide-up" delay={0.2} src="assets/images/music/player-card.png" radius={0} />
      <TextNode id="OJ3JDy50uV" top={648.9} left={140} width={172.992} anim="slide-up" delay={0} justify="flex-start" align="left" color="#000000" fontSize={23} fontFamily="PlayfairDisplay" letterSpacing={0}>
        i will love you
      </TextNode>
      <TextNode id="YC3yZUeAlf" top={681.2} left={140} width={246} anim="slide-up" delay={0} justify="flex-start" align="left" color="#363636" fontSize={21} fontFamily="PlayfairDisplay" letterSpacing={0}>
        Valentine - Kina Grannis
      </TextNode>
      <PhotoNode id="FrjfVHMc01" top={651.4} left={64.9} width={59.1} height={59.1} anim="slide-up" delay={0.2} src="assets/images/photos/couple-03.webp" radius={7} />
    </>
  );
}
