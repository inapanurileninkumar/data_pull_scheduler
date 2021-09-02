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
      state['activeSchedule'] = schedule;
    }
  },
  actions: {
    addNewSchedule: function (state, schedule) {
      state.commit('ADD_NEW_SCHEDULE', schedule);
    },
    setActiveSchedule: function (state, schedule) {
      state.commit('SET_ACTIVE_SCHEDULE', schedule);
    }
  }
};