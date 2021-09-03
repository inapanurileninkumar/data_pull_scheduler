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
            @event-emitted="handleChildEvent"
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
      let firstSchedule = this.getSampleSchedule();
      this.addNewSchedule(firstSchedule);
      this.addNewSchedule(this.getSampleSchedule());
      this.addNewSchedule(this.getSampleSchedule());
      this.addNewSchedule(this.getSampleSchedule());
      this.addNewSchedule(this.getSampleSchedule());
      this.selectSchedule(firstSchedule);
    },
    methods: {
      ...mapActions({
        'addNewSchedule': 'scheduleStore/addNewSchedule',
        'selectSchedule': 'scheduleStore/setActiveSchedule',
        'removeSchedule': 'scheduleStore/removeSchedule'
      }),
      getSampleSchedule: function () {
        let todaysDate = new Date();
        let leastDate = new Date('01/01/2019 00:00:00');
        return {
          'id': this.getUniqId(),
          'label': this.getRandomString(10),
          'data': {
            'cols': 2 + Math.ceil(Math.random() * 10),
            'rows': Math.floor(Math.random() * 5000),
            'size': `${ Number.parseFloat(Math.random() * 1000).toFixed(2) } KB`,
            'query_metrics': 'SELECT * FROM "customer"'
          },
          'schedule': {
            'status': (Math.random() >= 0.5),
            'period': 'daily',
          },
          'created_time': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          'created_by': this.getRandomString(10),
          'last_modified': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          'last_datapull': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          'next_datapull': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          'range': {
            'start': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
            // 'end': this.getTimestampFromDate('02/13/2009 23:31:30')
          },
          'auto_sync': (Math.random() >= 0.5)
        };
      },
      //EVENT HANDLERS
      handleChildEvent: function (action, payload) {
        let actionMap = {
          'select-schedule': this.handleSelectedSchedule,
          'delete-schedule': this.handleScheduleDelete,
        };
        if (actionMap[action]) {
          actionMap[action](payload);
        }
      },
      handleSelectedSchedule: function ({ schedule }) {
        this.selectSchedule(schedule);
      },
      handleScheduleDelete: function (scheduleId) {
        this.removeSchedule(scheduleId);
      }
    }
  };
</script>

<style scoped>

</style>