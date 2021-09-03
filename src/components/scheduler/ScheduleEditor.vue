<template>
  <div>
    <div
      class="width-100 flex-box text-bold font-large align-center"
    >
      <span>
        Datapull Schedule
      </span>
      <boolean-input
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
              class="mt-10"
              label="Now"
            />
          </div>
          <div>
            <radio-input
              class="mt-10"
              label="At specific time"
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
        this.editingSchedule = this.deepCopy(this.getEmptySchedule());
      },
      cancelEditing: function () {
        this.emitEvent('cancelScheduleEdit');
      },
      getEmptySchedule: function () {
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
          // 'created_time': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          // 'created_by': this.getRandomString(10),
          // 'last_modified': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          // 'last_datapull': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          // 'next_datapull': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          // 'range': {
          //   'start': this.getTimestampFromDate(this.getRandomDate(leastDate, todaysDate)),
          // },
          'auto_sync': false
        };
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