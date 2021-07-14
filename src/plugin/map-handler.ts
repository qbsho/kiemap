import MapHandler, {MAP_HANDLER_DI_NAME, MAP_HANDLER_GLOBAL_NAME} from '../business-logic/map-handler';
import {ProcedrualWrapper} from '../business-logic/procedural-gl-wrapper';

export default {
  install(app: any) {
    const proceduralWrapper = new ProcedrualWrapper();
    const mapHandler = new MapHandler(proceduralWrapper);
    app.config.globalProperties[MAP_HANDLER_GLOBAL_NAME] = mapHandler;
    app.provide(MAP_HANDLER_DI_NAME, mapHandler);
  }
}
