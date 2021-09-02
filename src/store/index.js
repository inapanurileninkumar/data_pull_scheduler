import { createStore } from 'vuex';
import { scheduleStore } from '@/store/modules/scheduleStore';

const store = createStore({
  modules: {
    scheduleStore
  }
});

export default store;