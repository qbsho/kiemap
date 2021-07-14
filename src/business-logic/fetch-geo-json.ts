import { GeoJson } from '../utils/constants';

export type Nullable<T> = T | null;
export const fetchGeoJson = async (url: string): Promise<Nullable<GeoJson>> => {
  try {
    const response = await fetch(url, {
      // @ts-ignore
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};




