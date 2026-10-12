import { InjectionToken } from '@angular/core';
import { AccountApi } from './account-api';

export const ACCOUNT_API = new InjectionToken<AccountApi>('AccountApi');
