<template>
  <div
    class="schedule-container width-100"
  >
    <div class="flex-box width-100">
      <div class="flex-col-1 flex-box align-flex-start justify-center pt-40">
        <span
          class="pv-10 ph-14 border-radius-10 pointer-cursor bg-primary-lite"
        >
          <i class="fas fa-plus text-white" />
        </span>
      </div>
      <div class="flex-col-5">
        <schedules
          :schedules="availableSchedules"
          @event-emitted="handleChildEvent"
        />
      </div>
      <div
        class="flex-col-6 pv-35"
      >
        <div
          v-if="getActiveSchedule"
          class="width-100"
        >
          <schedule-manager
            :schedule="getActiveSchedule"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Schedules from '@/components/scheduler/Schedules';
  import ScheduleManager from '@/components/scheduler/ScheduleManager';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'SchedulesManager',
    components: { ScheduleManager, Schedules },
    computed: {
      ...mapGetters({
        'availableSchedules': 'scheduleStore/getAvailableSchedules',
        'getActiveSchedule': 'scheduleStore/getActiveSchedule'
      })
    },
    beforeMount: function () {
      this.addNewSchedule(this.getSampleSchedule());
      this.addNewSchedule(this.getSampleSchedule());
      this.addNewSchedule(this.getSampleSchedule());
      this.addNewSchedule(this.getSampleSchedule());
      this.addNewSchedule(this.getSampleSchedule());
    },
    methods: {
      ...mapActions({
        'addNewSchedule': 'scheduleStore/addNewSchedule',
        'selectSchedule': 'scheduleStore/setActiveSchedule'
      }),
      getSampleSchedule: function () {
        return {
          'id': this.getUniqId(),
          'label': this.getRandomString(10),
          'data': {
            'cols': Math.ceil(Math.random() * 10),
            'rows': Math.floor(Math.random() * 5000),
            'size': `${ Number.parseFloat(Math.random() * 1000).toFixed(2) } KB`,
            'query_metrics': 'SELECT * FROM "customer"'
          },
          'schedule': {
            'status': (Math.random() >= 0.5),
            'period': 'daily'
          },
          'created_time': this.getTimestampFromDate('02/13/2009 23:31:30'),
          'created_by': this.getRandomString(10),
          'last_modified': this.getTimestampFromDate('02/13/2009 23:31:30'),
        };
      },
      //EVENT HANDLERS
      handleChildEvent: function (action, payload) {
        let actionMap = {
          'select-schedule': this.handleSelectedSchedule,
        };
        if (actionMap[action]) {
          actionMap[action](payload);
        }
      },
      handleSelectedSchedule: function ({ schedule }) {
        this.selectSchedule(schedule);
      },
    }
  };
</script>

<style scoped>

</style>