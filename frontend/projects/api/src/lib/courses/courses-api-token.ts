import { InjectionToken } from '@angular/core';
import { CoursesApi } from './courses-api';

export const COURSES_API = new InjectionToken<CoursesApi>('CoursesApi');
