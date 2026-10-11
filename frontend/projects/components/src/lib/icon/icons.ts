import { IconName } from './icon-name';
import { IconShape } from './icon-shape';

/** The icon set, drawn on a 24-unit grid; generated from the icons in docs/mocks. */
export const ICONS: Record<IconName, readonly IconShape[]> = {
  'arrow-down': [{ tag: 'path', d: 'M12 5v14M6 13l6 6 6-6' }],
  'arrow-left': [
    { tag: 'path', d: 'M19.5 12h-15' },
    { tag: 'path', d: 'm10.5 6-6 6 6 6' },
  ],
  'arrow-right': [
    { tag: 'path', d: 'M4.5 12h15' },
    { tag: 'path', d: 'm13.5 6 6 6-6 6' },
  ],
  'arrow-up': [{ tag: 'path', d: 'M12 19V5M6 11l6-6 6 6' }],
  article: [
    { tag: 'path', d: 'M6.5 3.5h8l3 3v14h-11z' },
    { tag: 'path', d: 'M9 11h6M9 14.5h6M9 18h3.5' },
  ],
  attention: [
    { tag: 'circle', cx: '12', cy: '12', r: '8.5' },
    { tag: 'path', d: 'M12 7.5v5.5M12 16.2v.3' },
  ],
  bell: [
    { tag: 'path', d: 'M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z' },
    { tag: 'path', d: 'M10 20.5a2.2 2.2 0 0 0 4 0' },
  ],
  bookmark: [{ tag: 'path', d: 'M7 4h10v16.5l-5-3.5-5 3.5z' }],
  calendar: [
    { tag: 'rect', height: '15', rx: '2.5', width: '16', x: '4', y: '5.5' },
    { tag: 'path', d: 'M4 10h16M8.5 3.5v4M15.5 3.5v4' },
  ],
  captions: [
    { tag: 'rect', height: '13', rx: '2.5', width: '17', x: '3.5', y: '5.5' },
    { tag: 'path', d: 'M10.5 10.2a2 2 0 1 0 0 3.6M17 10.2a2 2 0 1 0 0 3.6' },
  ],
  check: [{ tag: 'path', d: 'm5 12.5 4.5 4.5L19 7.5' }],
  'chevron-down': [{ tag: 'path', d: 'm6 9 6 6 6-6' }],
  circle: [{ tag: 'circle', cx: '12', cy: '12', r: '8.5' }],
  clock: [
    { tag: 'circle', cx: '12', cy: '12', r: '8.5' },
    { tag: 'path', d: 'M12 7.5V12l3 2' },
  ],
  close: [{ tag: 'path', d: 'M6 6l12 12M18 6 6 18' }],
  collection: [
    { tag: 'path', d: 'M4 8.5 12 4l8 4.5-8 4.5z' },
    { tag: 'path', d: 'm4 12.5 8 4.5 8-4.5M4 16.5l8 4.5 8-4.5' },
  ],
  course: [
    {
      tag: 'path',
      d: 'M4.5 5.5A1.5 1.5 0 0 1 6 4h12.5v14H6a1.5 1.5 0 0 0-1.5 1.5zM4.5 19.5A1.5 1.5 0 0 0 6 21h12.5v-3',
    },
  ],
  document: [{ tag: 'path', d: 'M6.5 3.5h8l3 3v14h-11z' }],
  done: [{ tag: 'path', d: 'm4.5 12.5 5 5 10-11' }],
  download: [
    { tag: 'path', d: 'M12 4v12M7 11l5 5 5-5' },
    { tag: 'path', d: 'M4.5 15v3.5A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5V15' },
  ],
  edit: [
    { tag: 'path', d: 'M4.5 19.5h4l10-10-4-4-10 10z' },
    { tag: 'path', d: 'm13 7 4 4' },
  ],
  flag: [{ tag: 'path', d: 'M5.5 21V4.5M5.5 4.5h11l-2 4 2 4h-11' }],
  fullscreen: [{ tag: 'path', d: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5' }],
  grip: [
    { tag: 'circle', cx: '9', cy: '6.5', r: '1' },
    { tag: 'circle', cx: '15', cy: '6.5', r: '1' },
    { tag: 'circle', cx: '9', cy: '12', r: '1' },
    { tag: 'circle', cx: '15', cy: '12', r: '1' },
    { tag: 'circle', cx: '9', cy: '17.5', r: '1' },
    { tag: 'circle', cx: '15', cy: '17.5', r: '1' },
  ],
  image: [
    { tag: 'rect', height: '15', rx: '2.5', width: '17', x: '3.5', y: '4.5' },
    { tag: 'circle', cx: '9', cy: '10', r: '1.8' },
    { tag: 'path', d: 'm4 17 5-4.5 4 3.5 3-2.5 4 3.5' },
  ],
  lock: [
    { tag: 'rect', height: '10', rx: '2', width: '13', x: '5.5', y: '10.5' },
    { tag: 'path', d: 'M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5' },
  ],
  mail: [
    { tag: 'rect', height: '13', rx: '2', width: '17', x: '3.5', y: '5.5' },
    { tag: 'path', d: 'm4 7 8 6 8-6' },
  ],
  menu: [{ tag: 'path', d: 'M4 7h16M4 12h16M4 17h10' }],
  message: [{ tag: 'path', d: 'M4.5 5.5h15v10h-9l-4.5 4v-4h-1.5z' }],
  module: [
    { tag: 'path', d: 'm12 3 8 4.5v9L12 21l-8-4.5v-9z' },
    { tag: 'path', d: 'M4 7.5 12 12l8-4.5M12 12v9' },
  ],
  monitor: [
    { tag: 'rect', height: '12', rx: '2', width: '17', x: '3.5', y: '4.5' },
    { tag: 'path', d: 'M8.5 20h7M12 16.5V20' },
  ],
  moon: [{ tag: 'path', d: 'M19.5 14.5A7.5 7.5 0 0 1 9.5 4.5a7.5 7.5 0 1 0 10 10z' }],
  more: [
    { tag: 'circle', cx: '5.5', cy: '12', r: '1' },
    { tag: 'circle', cx: '12', cy: '12', r: '1' },
    { tag: 'circle', cx: '18.5', cy: '12', r: '1' },
  ],
  offline: [
    {
      tag: 'path',
      d: 'M3 3l18 18M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 4.5-2.6M19 13a10 10 0 0 0-3-2M12 20h.01',
    },
  ],
  pause: [{ tag: 'path', d: 'M8.5 5.5v13M15.5 5.5v13' }],
  people: [
    { tag: 'circle', cx: '9', cy: '8.5', r: '3' },
    { tag: 'path', d: 'M3.5 19a5.5 5.5 0 0 1 11 0' },
    { tag: 'path', d: 'M15.5 6a3 3 0 0 1 0 5.5M17.5 19a5 5 0 0 0-2.5-4.3' },
  ],
  place: [
    { tag: 'path', d: 'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z' },
    { tag: 'circle', cx: '12', cy: '10', r: '2.3' },
  ],
  play: [{ tag: 'path', d: 'M8 5.5v13l10.5-6.5z' }],
  search: [
    { tag: 'circle', cx: '11', cy: '11', r: '6.5' },
    { tag: 'path', d: 'm20 20-4.2-4.2' },
  ],
  shield: [{ tag: 'path', d: 'M12 3.5 19 6v6c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V6z' }],
  'sign-out': [
    { tag: 'path', d: 'M9.5 4.5h-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3M15 8l4 4-4 4M19 12H9.5' },
  ],
  sliders: [
    { tag: 'path', d: 'M4 7h10M18 7h2M4 17h2M10 17h10' },
    { tag: 'circle', cx: '16', cy: '7', r: '2' },
    { tag: 'circle', cx: '8', cy: '17', r: '2' },
  ],
  sun: [
    { tag: 'circle', cx: '12', cy: '12', r: '4' },
    {
      tag: 'path',
      d: 'M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4',
    },
  ],
  trash: [{ tag: 'path', d: 'M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13' }],
  upload: [
    { tag: 'path', d: 'M12 16V4M7 9l5-5 5 5' },
    { tag: 'path', d: 'M4.5 15v3.5A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5V15' },
  ],
  video: [
    { tag: 'rect', height: '13', rx: '2.5', width: '17', x: '3.5', y: '5.5' },
    { tag: 'path', d: 'm10.5 9.5 4 2.5-4 2.5z' },
  ],
  warning: [
    { tag: 'path', d: 'M12 4 21 19.5H3z' },
    { tag: 'path', d: 'M12 10v4.5M12 17.2v.3' },
  ],
};
