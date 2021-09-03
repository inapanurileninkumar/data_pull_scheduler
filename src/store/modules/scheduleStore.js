export const scheduleStore = {
  namespaced: true,
  state: {
    schedules: [],
    activeSchedule: null,
  },
  getters: {
    'getAvailableSchedules': state => state['schedules'],
    'getActiveSchedule': state => state['activeSchedule']
  },
  mutations: {
    'ADD_NEW_SCHEDULE': function (state, schedule) {
      state['schedules'].push(schedule);
    },
    'UPDATE_SCHEDULE': function (state, schedule) {
      let scheduleIndex = state['schedules'].findIndex(stateSchedule => stateSchedule['id'] === schedule['id']);
      if (scheduleIndex > -1) {
        state['schedules'][scheduleIndex] = schedule;
        if (state['activeSchedule']['id'] === schedule['id']) {
          state['activeSchedule'] = schedule;
        }
      }
    },
    'REMOVE_SCHEDULE': function (state, scheduleId) {
      state['schedules'] = state['schedules'].filter(schedule => schedule['id'] !== scheduleId);
      if (state['activeSchedule']['id'] === scheduleId) {
        state['activeSchedule'] = null;
      }
    },
    'SET_ACTIVE_SCHEDULE': function (state, schedule) {
      if (schedule && state['activeSchedule']) {
        if (state['activeSchedule']['id'] === schedule['id']) {
          state['activeSchedule'] = null;
        } else {
          state['activeSchedule'] = schedule;
        }
      } else {
        state['activeSchedule'] = schedule;
      }
    },
  },
  actions: {
    addNewSchedule: function (store, schedule) {
      store.commit('ADD_NEW_SCHEDULE', schedule);
    },
    setActiveSchedule: function (store, schedule) {
      store.commit('SET_ACTIVE_SCHEDULE', schedule);
    },
    removeSchedule: function (store, scheduleId) {
      store.commit('REMOVE_SCHEDULE', scheduleId);
    },
    updateSchedule: function (store, schedule) {
      store.commit('UPDATE_SCHEDULE', schedule);
    }
  }
};