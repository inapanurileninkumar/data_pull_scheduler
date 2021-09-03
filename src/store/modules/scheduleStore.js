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
    'REMOVE_SCHEDULE': function (state, scheduleId) {
      state['schedules'] = state['schedules'].filter(schedule => schedule['id'] !== scheduleId);
      if (state['activeSchedule']['id'] === scheduleId) {
        state['activeSchedule'] = null;
      }
    }
  },
  actions: {
    addNewSchedule: function (state, schedule) {
      state.commit('ADD_NEW_SCHEDULE', schedule);
    },
    setActiveSchedule: function (state, schedule) {
      state.commit('SET_ACTIVE_SCHEDULE', schedule);
    },
    removeSchedule: function (state, scheduleId) {
      state.commit('REMOVE_SCHEDULE', scheduleId);
    }
  }
};