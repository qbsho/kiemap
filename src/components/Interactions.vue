<template>
  <div class="interactions">
     <label
     @click="center"
      class="procedural-button"
      for="alignment"
    > C
    </label>
  </div>
<!-- <div class = "legend">
<span class="dot official"></span>  <label> Offizielle Trails</label> -
<span class="dot potential"></span> <label > Gewachsene Trails</label> -
<span class="dot uphill"></span>  <label> Zufahrten</label>

  </div>
-->
</template>


<script lang="ts">
  import {defineComponent, inject, ref} from 'vue';
  import MapHandler, {MAP_HANDLER_DI_NAME} from '../business-logic/map-handler';
  export default defineComponent({
    setup() {
      const mapHandler = inject<MapHandler>(MAP_HANDLER_DI_NAME)!;
      const getChecked = (event: Event) => (event.target as HTMLInputElement).checked;
      const isChecked = (event: Event) => getChecked(event) === true;

      const showOfficial = ref(true);
      const showEstablished = ref(false);
      const showPotential = ref(false);

      const center =  (event: Event) => {
       mapHandler.showLinz();
      }


      const toggleOfficialTrails = (event: Event) => {


        showOfficial.value = getChecked(event);

      }

      const toggleEstablishedTrails = (event: Event) => {

      }

      const togglePotentialTrails = (event: Event) => {

      }

      return {
        center,
        showOfficial,
        showEstablished,
        showPotential,
        toggleOfficialTrails,
        toggleEstablishedTrails,
        togglePotentialTrails,
      };
    },
  });
</script>

<style scoped>
  .interactions {
    position: absolute;
    top: 138px; /** copied from procedural */
    right: 8px; /** copied from procedural */
    width: 6rem;
    /* background: red; */
    z-index: 200;
    text-align: right;

  }

  .procedural-button {
      display: inline-block;
      box-sizing: border-box;
      /** start: styles lifted from procedural */
      border: 1px solid white; margin: 4px; color: white; width: 36px; height: 36px; line-height: 32px; text-align: center; padding: 0px; border-radius: 18px; background-color: rgb(51, 53, 66); outline: none; transition: background-color 0.5s ease 0s; cursor: pointer;
      /** end: styles lifted from procedural */
      line-height: 36px; /** Adjust value from procedural */
  }

  .procedural-button.is-active {
      border: 1px solid rgb(51, 53, 66);
      color: rgb(51, 53, 66);
      background-color: white;
  }

  .procedural-button input {
      display: none;
      visibility: hidden;
  }





.legend{
    position: absolute;
    bottom: 10px;
    right: 8px;
    background: cornsilk;
    text-align: center;
    z-index: 200;
}
.dot {
  height: 5px;
  width: 10px;
  border-radius: 20%;
  display: inline-block;
  vertical-align: middle;

}
.potential {
    background-color: #18FFFF;
}
.official {
    background-color: #FF9800;
}
.uphill {
    background-color: #78909C;
}
</style>
