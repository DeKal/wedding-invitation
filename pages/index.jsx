import Head from 'next/head';
import dynamic from 'next/dynamic';

// The invitation body is a verbatim port of hand-written HTML and is purely
// client-interactive, so we load it with ssr:false. This skips server rendering
// (and therefore hydration), which eliminated the hydration mismatch crash
// (React #418/#423) caused by the browser normalizing the raw markup differently
// than React's SSR output.
const InvitationApp = dynamic(() => import('../components/invitation/InvitationApp'), {
  ssr: false,
});

export default function ReactInvitation() {
  return (
    <>
      <Head>
        <title>Thiệp cưới 6 — React</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <InvitationApp />
    </>
  );
}
