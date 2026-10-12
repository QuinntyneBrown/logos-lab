import { Observable } from 'rxjs';
import { CurrentMember } from './current-member';

/** The signed-in member; `getMe` emits `null` for a visitor (the API answers 401). */
export interface MeApi {
  getMe(): Observable<CurrentMember | null>;
}
