// @ts-ignore -- corrently no types available
import Procedural from "procedural-gl";

type ProceduralEventListener = (proceduralInstance: any, ...args: any[]) => void;

export const PROCEDURAL_EVENT_NAMES = [
  'onFeatureClicked',
] as const;
export type ProceduralEventName = typeof PROCEDURAL_EVENT_NAMES[number];
interface InitWaiters {
  resolve: (proceduralInstance: any) => void;
  reject: (error: Error) => void;
}
export class ProcedrualWrapper {
  private _initDone: boolean = false;
  private _initWaiters: InitWaiters[] = [];
  private _listeners: Map<string, ProceduralEventListener[]> = new Map();

  private _attachEventListeners(proceduralInstance: any, eventName: ProceduralEventName) {
    proceduralInstance[eventName] = (...args: any[]) => {
      if (!this._listeners.has(eventName)) {
        return;
      }
      this._listeners.get(eventName)!.forEach((callback) => callback(Procedural, ...args));
    }
  }

  getInstance(): Promise<any> {
    if (this._initDone) {
      return Promise.resolve(Procedural);
    }
    return new Promise((resolve, reject) => this._initWaiters.push({resolve, reject}));
  }

  init(container: HTMLElement, datasource: object) {
    Procedural.init({container, datasource});
    PROCEDURAL_EVENT_NAMES.forEach((eventName) => this._attachEventListeners(Procedural, eventName));
    this._initWaiters.forEach(({resolve}) => resolve(Procedural));
    this._initDone = true;
  }

  addEventListener(eventName: ProceduralEventName, callback: (...args: any[]) => void) {
    if (!this._listeners.has(eventName)) {
      this._listeners.set(eventName, []);
    }
    this._listeners.get(eventName)!.push(callback);
  }

  removeEventListener(eventName: ProceduralEventName, callback: (...args: any[]) => void) {
    if (!this._listeners.has(eventName)) {
      return;
    }
    const eventListeners = this._listeners.get(eventName);
    const index = eventListeners!.indexOf(callback);
    eventListeners!.splice(index, 1);
  }
}
