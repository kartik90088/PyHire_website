import { LegalPage } from './LegalPage';
import { termsOfUse } from '../data/legal';

export function TermsOfUse() {
  return <LegalPage doc={termsOfUse} />;
}
