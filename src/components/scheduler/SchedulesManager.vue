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
    <modal
      v-if="isModalActive"
    >
      <template
        v-if="modalComponent==='editSchedule'"
      >
        <div
          class="pv-20 ph-30"
          style="min-width: 30vw;max-width: 30vw"
        >
          <schedule-editor
            v-bind="getModalComponentProps"
            @event-emitted="handleChildEvent"
          />
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
  import Schedules from '@/components/scheduler/Schedules';
  import ScheduleManager from '@/components/scheduler/ScheduleManager';
  import { mapGetters, mapActions } from 'vuex';
  import Modal from '@/components/helpers/Modal';
  import ScheduleEditor from '@/components/scheduler/ScheduleEditor';

  export default {
    name: 'SchedulesManager',
    components: { ScheduleEditor, Modal, ScheduleManager, Schedules },
    data: function () {
      return {
        //MODAL SECTION
        isModalActive: false,
        modalComponent: 'editSchedule',
        modalData: {},
        //DATA SECTION
      };
    },
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
        'removeSchedule': 'scheduleStore/removeSchedule',
        'updateSchedule': 'scheduleStore/updateSchedule'
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
      editSchedule: function (scheduleId) {
        let schedule = this.availableSchedules.find(storeSchedule => storeSchedule['id'] === scheduleId);
        this.openModal('editSchedule', { 'schedule': this.deepCopy(schedule) });
      },
      //EVENT HANDLERS
      handleChildEvent: function (action, payload) {
        let actionMap = {
          'select-schedule': this.handleSelectedSchedule,
          'edit-schedule': this.handleScheduleEdit,
          'delete-schedule': this.handleScheduleDelete,
          'cancelScheduleEdit': this.handleScheduleEditCancel,
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
      },
      handleScheduleEdit: function (scheduleId) {
        this.editSchedule(scheduleId);
      },
      handleScheduleEditCancel: function () {
        this.closeModal();
      },
      //MODAL
      openModal: function (component, data = {}) {
        this.modalComponent = component;
        this.modalData = data;
        this.isModalActive = true;
      },
      closeModal: function () {
        this.isModalActive = false;
      },
      getModalComponentProps: function () {
        switch (this.modalComponent) {
          case 'editSchedule':
            return {
              'schedule': this.modalData['schedule']
            };
        }
      },
    }
  };
</script>

<style scoped>

</style>