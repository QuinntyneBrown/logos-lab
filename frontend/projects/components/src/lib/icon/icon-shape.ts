/** One shape of a line icon: a path, circle or rectangle with its SVG attributes. */
export interface IconShape {
  readonly tag: 'path' | 'circle' | 'rect';
  readonly d?: string;
  readonly cx?: string;
  readonly cy?: string;
  readonly r?: string;
  readonly x?: string;
  readonly y?: string;
  readonly width?: string;
  readonly height?: string;
  readonly rx?: string;
}
