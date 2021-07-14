import {createApp} from 'vue';
import App from './App.vue';
import MapHandler from './plugin/map-handler';
createApp(App).use(MapHandler).mount('#app');
