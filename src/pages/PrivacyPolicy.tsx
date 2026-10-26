import { LegalPage } from './LegalPage';
import { privacyPolicy } from '../data/legal';

export function PrivacyPolicy() {
  return <LegalPage doc={privacyPolicy} />;
}
