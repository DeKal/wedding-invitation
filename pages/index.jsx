import InvitationPage from '../components/app/InvitationPage';
import { CEREMONY_META } from '../lib/ceremonyMeta';

// Default route — Lễ Cưới (wedding party). Shares content with /le-cuoi.
export default function Home() {
  return <InvitationPage meta={CEREMONY_META[0]} initialCeremony={0} />;
}
