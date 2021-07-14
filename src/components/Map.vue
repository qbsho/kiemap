<template>
  <div class="map-container">
    <Interactions />
    <div
      class="map-canvas"
      ref="mapCanvas"
    ></div>

  </div>
</template>

<script lang="ts">

  import {ref, defineComponent, onMounted, inject} from "vue";
  import Interactions from './Interactions.vue';
  import SpotList from './SpotList.vue'
  import MapHandler, {MAP_HANDLER_DI_NAME} from '../business-logic/map-handler';
  export default defineComponent({
    components: {
      Interactions,
      SpotList
    },
    setup() {
      const mapCanvas = ref(null);
      const mapHandler = inject<MapHandler>(MAP_HANDLER_DI_NAME)!;
      onMounted(async () => {
        const container = mapCanvas.value;
        // Initialize library and optionally add UI controls
        await mapHandler.init(container!);
        await mapHandler.showLinz();
        mapHandler.showPois();
        //mapHandler.showPeaks();
        mapHandler.showSpots();



        // if an event is missing please just add it to PROCEDURAL_EVENT_NAMES in
        // the file: src/business-logic/procedural-gl-wrapper.ts the rest happens
        // auto-magically :-)
        mapHandler.addEventListener('onFeatureClicked', (procedural: any, id: number) => { //TODO: find a solution for mobile
          console.log("Feature clicked:", id);
        });
      });

      return {
        mapCanvas,
      };
    },
  });
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
}
</style>
