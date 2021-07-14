import {Nullable} from '../business-logic/fetch-geo-json';
import { GeoJson } from '../utils/constants';
export type TYPE = 'climbingspot' | 'poi' | 'city' | 'peak';


export interface ApiDatabaseEntryGeneric {
  type: TYPE;
}

export interface ApiDatabaseEntry<T> {
  url: string,
  data: T
}

export interface ApiResponseOverlay {
  type: TYPE;
  geoJson: Nullable<GeoJson>;
}

export const mergeData = <T extends ApiResponseOverlay>(geoJson: Nullable<GeoJson>, data: object): T => {
  return {
    geoJson,
    ...data,
  } as unknown as T;
}
