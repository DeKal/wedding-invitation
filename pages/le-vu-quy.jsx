import InvitationPage from '../components/app/InvitationPage';
import { CEREMONY_META } from '../lib/ceremonyMeta';

// Lễ Vu Quy — bride's family rite at Thái Mỹ.
export default function LeVuQuy() {
  return <InvitationPage meta={CEREMONY_META[1]} initialCeremony={1} />;
}
