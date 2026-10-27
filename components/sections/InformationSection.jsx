// Information: couple-14/15, calendar, date/time/venue (top 5481–6718px)
//
// A left sticky note toggles between the two ceremonies — "Tiệc Cưới" (wedding
// party, Caravelle) and "Lễ Vu Quy" (bride's family rite, Thái Mỹ). Clicking it
// swaps the date, calendar heart day, weekday/lunar/time line, the venue address
// link, and the embedded map. State lives here so every dependent node updates.
import { useEffect, useState } from 'react';
import PNode from '../nodes/PNode';
import { CalendarNode, PhotoNode, TextNode } from '../nodes';
import CeremonyStickyNote from './CeremonyStickyNote';
import { EVENT_SLUG, EVENT_PATH } from '../../lib/ceremonyMeta';

// Build the iframe src for a ceremony's venue. Prefers the official Google Maps
// Embed API (/maps/embed/v1/place), which is contractually framable and never
// returns the cookie-consent interstitial that blocks the undocumented
// ?output=embed endpoint (cause of intermittent net::ERR_BLOCKED_BY_RESPONSE,
// especially in the Android WebView). Falls back to the legacy endpoint when no
// API key is configured so local dev still renders a map.
const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const mapSrc = (query) =>
  MAPS_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${MAPS_KEY}&q=${encodeURIComponent(query)}&zoom=17`
    : `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=17&output=embed`;

const CEREMONIES = [
  {
    // Tiệc Cưới — wedding party at Caravelle
    dd: '07/11',
    heartDay: 7,
    dateLine: 'Thứ Bảy, 07/11/2026',
    lunarTime: 'Âm lịch 29/09 | 18:30 PM',
    addrHref:
      'https://www.google.com/maps/search/?api=1&query=Caravelle+Saigon+Hotel+19-23+Cong+Truong+Lam+Son+Quan+1',
    addrL1: 'Khách sạn Caravelle, Tầng 3,',
    addrL2: 'Sảnh BallRoom',
    mapTitle: 'Bản đồ Khách sạn Caravelle',
    mapQuery: 'Caravelle Saigon Hotel, 19-23 Cong Truong Lam Son, Quan 1',
  },
  {
    // Lễ Vu Quy — rite at Thái Mỹ
    dd: '06/11',
    heartDay: 6,
    dateLine: 'Thứ Sáu, 06/11/2026',
    lunarTime: 'Âm lịch 28/09 | 11:00 AM',
    addrHref: 'https://www.google.com/maps/search/?api=1&query=11.010000,106.434417',
    addrL1: '18 Đường 656, Phước Hưng 1,',
    addrL2: 'X.Thái Mỹ, TP HCM',
    mapTitle: 'Bản đồ Lễ Vu Quy',
    mapQuery: '11.010000,106.434417',
  },
];

export default function InformationSection({ initialCeremony = 0 }) {
  const [sel, setSel] = useState(initialCeremony);
  const c = CEREMONIES[sel];

  // Backward compatibility with the old query-param links (e.g.
  // /?event=le-vu-quy): if ?event= names a ceremony, it overrides the route's
  // initial selection on mount. New links use the paths (/ and /le-vu-quy).
  useEffect(() => {
    try {
      const p = (new URLSearchParams(window.location.search).get('event') || '').toLowerCase();
      const i = EVENT_SLUG.indexOf(p);
      if (i >= 0) setSel(i);
    } catch (_) {}
  }, []);

  // Toggle + keep the URL path in sync (/ for Lễ Cưới, /le-vu-quy for Lễ Vu Quy)
  // so the current view is shareable. replaceState (not a route push) swaps the
  // path without a reload, so client state, audio and scroll position are
  // preserved.
  const toggle = () =>
    setSel((s) => {
      const n = (s + 1) % CEREMONIES.length;
      try {
        const u = new URL(window.location.href);
        u.pathname = EVENT_PATH[n];
        u.searchParams.delete('event'); // drop the legacy param if present
        window.history.replaceState({}, '', u);
      } catch (_) {}
      return n;
    });

  return (
    <>
      <style>{`
        @keyframes ceremony-swap {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        .ceremony-swap { display: inline-block; animation: ceremony-swap .7s ease both; }
      `}</style>
      <TextNode id="4YUXRUSBxQ" top={5481.41} left={67.75} width={365.1} anim="slide-up" delay={0} justify="center" align="center" color="#58c5fd" fontSize={48} fontFamily="Anisa Signature" letterSpacing={0}>
        You are back it with all the good things in this world.
      </TextNode>
      <PhotoNode id="uuA8jgYU_O" top={5623.59} left={190.964} width={275.4} height={63.8928} anim="slide-up" delay={0.2} src="assets/images/titles/information.png" radius={0} />
      <PhotoNode id="T6BKF2ebwz" top={5660.9} left={-0.219} width={498.9} height={746.04} anim="slide-up" delay={0.2} src="assets/images/photos/couple-14.jpg" mask="assets/images/decor/060_humpjyfwnvv.webp" radius={0} l3opacity={0.2} />
      <PhotoNode id="J0YdHmxRo5" top={5713} left={0} width={319.8} height={426.613} anim="slide-up" delay={0.2} src="assets/images/photos/couple-15.webp?v=2" radius={0} />
      <TextNode id="uCrncjLd65" top={6089.76} left={37.1} width={259} anim="slide-up" delay={0} justify="center" align="center" color="#ff368d" fontSize={48} fontFamily="Anisa Signature" letterSpacing={0}>
        I want to stay around you. Now and forever, let it be me.
      </TextNode>
      <CeremonyStickyNote id="ceremony-sticky" top={6255} left={12} width={70} anim="slide-right" delay={0.25} sel={sel} onToggle={toggle} />
      <PhotoNode id="INSs-ei8G_" top={6245.8} left={142.476} width={329.412} height={361.695} anim="slide-up" delay={0.2} src="assets/images/decor/frame.png" radius={0} />
      <CalendarNode id="5Z-LG1DGte" top={6319.09} left={160.7} width={295.7} height={275.987} anim="slide-up" delay={0.3} heartDay={c.heartDay} />
      <TextNode id="dNMncuCY-N" top={6286.47} left={162.75} width={127.5} anim="slide-up" delay={0} justify="center" align="center" color="#ffc368" fontSize={26} fontFamily="ShowcaseSans" letterSpacing={0} fontWeight="bold">
        <span key={sel} className="ceremony-swap">{c.dd}</span>
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
      <TextNode id="dXTOz9ghEA" top={6631.15} left={152.65} width={213.4} anim="slide-up" delay={0} justify="flex-end" align="right" color="#ffffff" fontSize={18} fontFamily="ShowcaseSans" letterSpacing={0} lineHeight={1.6}>
        <span key={sel} className="ceremony-swap">
          {c.dateLine}
          <div>{c.lunarTime}</div>
        </span>
      </TextNode>
      <TextNode id="6MrIeBGLUQ" top={6718} left={152.7} width={266.9} anim="slide-up" delay={0} justify="flex-start" align="left" color="#ffffff" fontSize={18} fontFamily="ShowcaseSans" letterSpacing={0}>
        <a
          href={c.addrHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'underline', pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <span key={sel} className="ceremony-swap">
            {c.addrL1}&nbsp;<div>{c.addrL2}</div>
          </span>
        </a>
      </TextNode>
      {/* Embedded interactive map of the venue. Sits in the band opened up by
          shifting the RSVP form + Closing section down (+380px). */}
      <PNode id="venue-map" top={6820} left={37} width={426} height={360} anim="slide-up" delay={0.2}>
        <div key={sel} className="ceremony-swap" style={{ width: '100%', height: '100%' }}>
          <iframe
            title={c.mapTitle}
            src={mapSrc(c.mapQuery)}
            style={{ width: '100%', height: '100%', border: 0, borderRadius: 12, display: 'block', pointerEvents: 'auto', filter: 'invert(90%) hue-rotate(180deg)' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </PNode>
    </>
  );
}
