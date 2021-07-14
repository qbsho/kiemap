import {ApiDatabaseEntry, ApiDatabaseEntryGeneric} from '.';

export default [
  {url: "./geojson/places/einkehr.geojson", data: {type: 'poi'}},
  {url: "./geojson/places/parking.geojson", data: {type: 'poi'}}
] as Array<ApiDatabaseEntry<ApiDatabaseEntryGeneric>>;
