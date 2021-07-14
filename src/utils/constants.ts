export interface Geometry {
  type: string;
  coordinates: number[][];
}

export interface GeoJson {
  features?: any[];
  name: string;
  id : number;
  type: string;
  geometry?: Geometry;
  bbox?: number[];
  properties?: any;
}
