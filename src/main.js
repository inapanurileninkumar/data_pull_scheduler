import { createApp } from 'vue';

import App from './App.vue';
//Store
import store from '@/store';
//Mixins
import { globalMixin } from '@/mixins/globalMixin';
//Styles
import '../src/assets/scss/globalStyles.scss';
import '../src/assets/css/globalStyles.css';
import '../src/assets/font-awesome/css/all.min.css';

createApp(App)
  .use(store)
  .mixin(globalMixin)
  .mount('#app');