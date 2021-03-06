<template>
  <div>
    <div
      class="width-100 flex-box text-bold font-large align-center"
    >
      <span>
        Datapull Schedule
      </span>
      <boolean-input
        v-model="editingSchedule['schedule']['status']"
        :value="editingSchedule['schedule']['status']"
        @input="handleScheduleStatusChange"
        class="ml-10"
      />
    </div>
    <div>
      <span
        class="text-bold"
      >
        {{ editingSchedule['label'] }}
      </span>
    </div>
    <div
      :style="editingSchedule['schedule']['status']?{}:{'color': 'lightgrey','pointer-events':'none'}"
    >
      <div
        class="flex-box mt-20 align-center"
      >
        <span
          class="text-bold"
        >
          Retrieve Data
        </span>
        <select
          v-model="editingSchedule['schedule']['period']"
          :disabled="!editingSchedule['schedule']['status']"
          class="ml-10"
        >
          <option value="">Select</option>
          <option value="just_once">Just Once</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <template
          v-if="showPeriodValueOptions"
        >
          <span
            class="ml-10"
          >
            on
          </span>
          <select
            v-model="editingSchedule['schedule']['period_value']"
            :disabled="!editingSchedule['schedule']['status']"
            class="ml-10"
          >
            <option
              v-for="(periodValue,periodValueIndex) in getPeriodValues"
              :key="periodValue['label']+'_'+periodValueIndex"
              :value="periodValue['value']"
            >
              {{ periodValue['label'] }}
            </option>
          </select>
        </template>
      </div>
      <template
        v-if="showDataRetrievalOptions"
      >
        <div
          class="mt-20"
        >
          <div>
        <span
          class="text-bold"
        >
          Start Retrieving
        </span>
          </div>
          <div>
            <radio-input
              v-model="editingSchedule['retrieval']['type']"
              :value="editingSchedule['retrieval']['type']"
              :disabled="!editingSchedule['schedule']['status']"
              data="now"
              class="mt-10"
              label="Now"
              @input="(data)=>editingSchedule['retrieval']['type']=data"
            />
          </div>
          <div
            class="flex-box"
          >
            <radio-input
              v-model="editingSchedule['retrieval']['type']"
              :value="editingSchedule['retrieval']['type']"
              :disabled="!editingSchedule['schedule']['status']"
              data="specified_time"
              class="mt-10 mt--5"
              label="At specific time"
              @input="(data)=>editingSchedule['retrieval']['type']=data"
            />
            <input
              v-model="editingScheduleRetrievalTime"
              :disabled="editingSchedule['retrieval']['type']!=='specified_time'"
              type="date"
              class="mtl-10"
            />
          </div>
        </div>
        <div
          class="mt-50"
        >
        <span
          class="text-bold"
        >
          The data will be pulled on
        </span>
        </div>
      </template>
    </div>
    <template
      v-if="!showDataRetrievalOptions"
    >
      <div class="mt-150" />
    </template>
    <div
      class="mt-20 flex-box align-center justify-flex-end"
    >
        <span
          @click="cancelEditing"
          class="pointer-cursor"
          title="Cancel Editing"
        >
          Cancel
        </span>
      <span
        class="ph-35 pv-5 border-radius-2 bg-primary ml-30 text-white"
        @click="saveEditingSchedule"
      >
          Apply
        </span>
    </div>
  </div>
</template>

<script>
  import BooleanInput from '@/components/helpers/booleanInput';
  import RadioInput from '@/components/helpers/RadioInput';
  import { scheduleStaticData } from '@/mixins/scheduleStaticData';

  export default {
    name: 'ScheduleEditor',
    props: {
      schedule: {
        type: Object,
        default: null
      }
    },
    mixins: [scheduleStaticData],
    components: { RadioInput, BooleanInput },
    data: function () {
      return {
        editingSchedule: null,
        editingScheduleRetrievalTime: new Date(),
      };
    },
    computed: {
      getPeriodValues: function () {
        return [
          { 'label': 'Select', value: null },
          ...this.getPeriodValueOptions(this.editingSchedule['schedule']['period'])
        ];
      },
      showPeriodValueOptions: function () {
        return (['just_once', 'daily'].indexOf(this.editingSchedule['schedule']['period']) === -1);
      },
      showDataRetrievalOptions: function () {
        return (this.editingSchedule['schedule']['period'] !== 'just_once');
      },
    },
    watch: {
      schedule: {
        deep: true,
        handler: function () {
          this.setupEditingSchedule(this.schedule);
        }
      }
    },
    beforeMount: function () {
      this.setupEditingSchedule(this.schedule);
    },
    methods: {
      setupEditingSchedule: function () {
        this.editingSchedule = this.deepCopy(this.schedule);
        if (this.schedule['retrieval']['type'] === 'specified_time') {
          let editingScheduleRetrievalTime = new Date(this.schedule['retrieval']['time'] * 1000);
          let year = editingScheduleRetrievalTime.getFullYear();
          let month = (editingScheduleRetrievalTime.getMonth() + 1);
          month = (month < 10 ? '0' : '') + month;
          let date = editingScheduleRetrievalTime.getDate();
          date = (date < 10 ? '0' : '') + date;
          this.editingScheduleRetrievalTime = (year + '-' + month + '-' + date);
        }
      },
      cancelEditing: function () {
        this.emitEvent('cancelScheduleEdit');
      },
      saveEditingSchedule: function () {
        let retrievalType = this.editingSchedule['retrieval']['type'];
        this.editingSchedule['retrieval']['time'] = this.getTimestampFromDate(
          retrievalType === 'now' ? (new Date()) : this.editingScheduleRetrievalTime
        );
        this.emitEvent('saveEditingSchedule', this.editingSchedule);
      },
      //EVENTS
      emitEvent: function (action, payload) {
        this.$emit('event-emitted', action, payload);
      },
      handleScheduleStatusChange: function (value) {
        this.editingSchedule['schedule']['status'] = value;
      },
    }
  };
</script>

<style scoped>

</style>