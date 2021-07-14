import {fetchGeoJson} from './fetch-geo-json';
import {ProcedrualWrapper, ProceduralEventName} from './procedural-gl-wrapper';
import POIS from '../data/pois';
import PEAKS from '../data/peaks';
import SPOTS from '../data/climbingspots';
import {mapPoiPin} from './map-poi-pin';
import {LOSENSTEIN} from '../data/coordinates';
import {ApiDatabaseEntry, ApiDatabaseEntryGeneric, ApiResponseOverlay, mergeData} from '../data';
import { mapSpotPin } from './map-spot-spin';

const NASADEM_APIKEY = "1e5f1947aca8c45c7a4b76d1754e84410";
const MAPTILER_APIKEY = "cLb6ie37kUNRSj6VHe6J";
const DATASOURCE = {
  elevation: {
    apiKey: NASADEM_APIKEY,
  },
  imagery: {
   // urlFormat: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=cLb6ie37kUNRSj6VHe6J',
    urlFormat:'https://maps1.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpg',
    attribution: 'Tiles &copy; <a href="https://www.basemap.at/">basemap.at</a>'
  }
};

export const MAP_HANDLER_DI_NAME = 'mapHandler';
export const MAP_HANDLER_GLOBAL_NAME = '$' + MAP_HANDLER_DI_NAME;

export default class MapHandler {

  private _proceduralWrapper: ProcedrualWrapper;

  // Not too much thought went into this... just needed a quick solution
  // to save the current state. I wasn't able to get this info from Procedural.gl
  private _state: Map<string, ApiResponseOverlay> = new Map();

  constructor(proceduralWrapper: ProcedrualWrapper) {
    this._proceduralWrapper = proceduralWrapper;
  }

  private async _loadGeoJsons<T extends ApiResponseOverlay>(data: ApiDatabaseEntry<ApiDatabaseEntryGeneric>[], onLoaded: (arg: T) => void) {
    await Promise.all(
      data.map((entry) => {
        return new Promise<void>((resolve) => {
          fetchGeoJson(entry.url).then((geoJson) => {
            onLoaded(mergeData(geoJson, entry.data));
            resolve();
          });
        });
      })
    );
  }

  private _addOverlay(procedural: any, data: ApiResponseOverlay) {
    const geoJson = data.geoJson;
    if (!geoJson) {
      console.warn('no geojson to add');
      return;
    }
    if (!geoJson.name) {
      console.error('geoJson has no name');
      return;
    }
    procedural.addOverlay(geoJson);
    this._state.set(geoJson.name, data);
  }

  private _removeOverlay(procedural: any, overlayNames: string | string[]) {
    const toRemove = (!Array.isArray(overlayNames)) ? [overlayNames] : overlayNames;
    toRemove.forEach((overlayName) => {
      if (this._state.has(overlayName)) {
        this._state.delete(overlayName);
      }
    });
    procedural.removeOverlay(overlayNames);
  }

  public async init(container: HTMLElement) {
    this._proceduralWrapper.init(container, DATASOURCE);
    const procedural = await this._proceduralWrapper.getInstance();
    // @todo remove me after debugging
    (window as any).Procedural = procedural;

    // Configuration
    procedural.setRotationControlVisible(true);
    procedural.setCameraModeControlVisible(true);
    procedural.setCompassVisible(false);
    procedural.setRotationControlVisible(true);
    procedural.setZoomControlVisible(true);
  }

  public async showLinz() {
    const procedural = await this._proceduralWrapper.getInstance();
    procedural.displayLocation(LOSENSTEIN);

  }


  public async showPeaks() {
    const procedural = await this._proceduralWrapper.getInstance();
    await this._loadGeoJsons(PEAKS, (data) => this._addOverlay(procedural, data));
  }

  public async showSpots() {
    const procedural = await this._proceduralWrapper.getInstance();
    await this._loadGeoJsons(SPOTS, (data) => {
      const poisList = data.geoJson;
      console.log(data.geoJson);
      if (!poisList) {
        console.error('No geoJson loaded');
        return;
      }

      const featureCollection:any = mapSpotPin(
        (poisList as any)._icon,
        (poisList as any).features,
        (poisList as any)._icon,
        14,
        (poisList as any)._generalFading
      );
      data.geoJson = featureCollection;
      console.log(featureCollection)
      this._addOverlay(procedural, data);
    });
  }




  public async showPois() {
    const procedural = await this._proceduralWrapper.getInstance();
    await this._loadGeoJsons(POIS, (data) => {
      const poisList = data.geoJson;
      if (!poisList) {
        console.error('No geoJson loaded');
        return;
      }
      if ((poisList as any)._style === 'custom') {
        const featureCollection:any = mapPoiPin(
          (poisList as any)._icon,
          (poisList as any).features,
          (poisList as any)._icon,
          12,
          (poisList as any)._generalFading
        );
        data.geoJson = featureCollection;
        this._addOverlay(procedural, data);
      } else {
        this._addOverlay(procedural, data);
      }
    });
  }



  public async addEventListener(eventName: ProceduralEventName, callback: (procedural: any, ...args: any) => void) {
    this._proceduralWrapper.addEventListener(eventName, callback);
  }

  public async removeEventListener(eventName: ProceduralEventName, callback: (procedural: any, ...args: any) => void) {
    this._proceduralWrapper.removeEventListener(eventName, callback);
  }

}
