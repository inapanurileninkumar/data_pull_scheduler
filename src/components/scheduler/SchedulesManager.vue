<template>
  <div
    class="schedule-container width-100"
  >
    <div class="flex-box width-100">
      <div class="flex-col-1 flex-box align-flex-start justify-center pt-40">
        <span
          class="pv-10 ph-14 border-radius-10 pointer-cursor bg-primary-lite"
          @click="createNewSchedule"
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
            :schedule="modalData['schedule']"
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
        let tomorrow = new Date(todaysDate);
        tomorrow.setDate(tomorrow.getDate() + 1);
        let leastDate = new Date('01/01/2019 00:00:00');
        let isRetrievingNow = (Math.random() >= 0.5);
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
            'period': 'monthly',
            'period_value': '23',
          },
          'created_time': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          'created_by': this.getRandomString(10),
          'last_modified': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          'last_datapull': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          'next_datapull': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          'retrieval': {
            'type': isRetrievingNow ? 'now' : 'specified_time',
            'time': this.getTimestampFromDate(this.getRandomDate(todaysDate, tomorrow)),
            'next_retrievals': []
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
          'createSchedule': this.createNewSchedule,
          'saveEditingSchedule': this.handleEditingScheduleSave,
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
      handleEditingScheduleSave: function (schedule) {
        schedule['last_modified'] = this.getTimestampFromDate(new Date());
        this.updateSchedule(schedule);
        this.closeModal();
      },
      handleScheduleEditCancel: function () {
        this.closeModal();
      },
      createNewSchedule: function () {
        this.addNewSchedule(this.getSampleSchedule());
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
    }
  };
</script>

<style scoped>

</style>