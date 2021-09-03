<template>
  <div
    class="width-100"
  >
    <div
      class="ph-10"
    >
      <div
        ref="scheduleTitle"
        class="bg-white p-20 font-medium border-radius-2"
      >
        <div
          class="flex-box justify-space-between"
        >
          <span
            class="text-bold text-dark"
          >
            {{ schedule['label'] }}
          </span>
          <i
            class="fas fa-times pointer-cursor"
            style="color:#d3d3d3"
            @click="closeActiveSchedule"
          />
        </div>
        <div>
        <span
          class="text-dark text-bold"
        >
          Last Update :
        </span>
          <span>
          {{ getDaysAgoFromTimestamp(schedule['last_modified']) || 'N/A' }}
        </span>
        </div>
        <div
          class="mt-20 flex-box justify-space-between"
        >
          <div>
            <span
              class="bg-primary text-white border-radius-2 ph-20 pv-5"
            >
              OPEN
            </span>
            <span
              class="ph-10"
            >
              <i class="fas fa-ellipsis-v text-secondary" />
            </span>
          </div>
          <i
            class="far fa-trash-alt pointer-cursor"
            style="color:#646363"
            @click="deleteSchedule"
          />
        </div>
      </div>
      <div
        class="mt-30 bg-white ph-20 pt-5 pb-20 border-radius-5"
        :style="schedulePropertiesStyle"
        style="overflow-y: auto;"
      >
        <p
          class="text-bold text-dark"
        >
          Properties
        </p>
        <div>
        <span
          class="text-bold"
        >
          Name :
        </span>
          <span>
          {{ schedule['label'] }}
        </span>
        </div>
        <div>
        <span>
          Created on {{ getDateFromTimestamp(schedule['created_time']) }} by {{ schedule['created_by'] }}
        </span>
        </div>
        <div class="bordered-top mt-10" />
        <div
          class="mt-10"
        >
        <span
          class="text-bold"
        >
          Rows:
        </span>
          <span>
          {{ schedule['data']['rows'] }}
        </span>
          <span
            class="ml-10 text-bold"
          >
          Columns:
        </span>
          <span>
          {{ schedule['data']['cols'] }}
        </span>
          <div>
          <span
            class="text-bold"
          >
            Size:
          </span>
            <span>
             {{ schedule['data']['size'] }}
          </span>
          </div>
        </div>
        <div class="bordered-top mt-10" />
        <div
          class="mt-10"
        >
          <div class="width-100 flex-box align-center justify-space-between">
          <span
            class="text-bold"
          >
            QUERY METRICS
          </span>
            <span
              class="text-underline"
            >
            Edit Metrics
          </span>
          </div>
          <div
            class="bg-code p-5"
            style="min-height: 100px"
          >
            <p>
              {{ schedule['data']['query_metrics'] }}
            </p>
          </div>
        </div>
        <div class="bordered-top mt-10" />
        <div
          class="mt-10"
        >
          <div class="width-100 flex-box align-flex-start justify-space-between">
            <div
              class="flex-box align-center"
            >
              <span
                class="text-bold"
              >
                DATA RETRIEVAL SCHEDULE
              </span>
              <boolean-input
                disabled
                :value="schedule['schedule']['status']"
                class="ml-10"
              />
            </div>
            <div>
            <span
              class="text-underline pointer-cursor"
              @click="editSchedule"
            >
              Edit Schedule
            </span>
              <br />
              <span
                class="text-underline text-primary"
              >
              Retrieve Latest Data
            </span>
            </div>
          </div>
          <template
            v-if="schedule['schedule']['status']"
          >
            <div>
              {{ getDataRetrievalSchedule }}
            </div>
            <div
              class="mt-5"
            >
          <span
            class="text-bold"
          >
            Range:
          </span>
              <span>
            Start {{ getDateFromTimestamp(schedule['range']['start']) }}
          </span>
            </div>
            <div
              class="mt-20"
            >
          <span
            class="text-bold"
          >
            Last datapull:
          </span>
              <span>
            {{ getDateFromTimestamp(schedule['last_datapull']) }}
          </span>
            </div>
            <div
              class="mt-5"
            >
          <span
            class="text-bold"
          >
            Next schedule datapull:
          </span>
              <span>
            {{ getDateFromTimestamp(schedule['next_datapull']) }}
          </span>
            </div>
          </template>
        </div>

        <template
          v-if="schedule['schedule']['status']"
        >
          <div class="bordered-top mt-10" />
          <div
            class="mt-10"
          >
            <div class="width-100">
          <span
            class="text-bold"
          >
            SYNC SETTINGS
          </span>
              <div
                class="mt-5 flex-box align-center"
              >
            <span
              class="font-small"
            >
              AUTO-SYNC
            </span>
                <boolean-input
                  :value="schedule['auto_sync']"
                  disabled
                  class="ml-10"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import BooleanInput from '@/components/helpers/booleanInput';

  export default {
    name: 'ScheduleManager',
    components: { BooleanInput },
    emits: ['event-emitted'],
    props: {
      schedule: {
        type: Object,
        default: () => ({})
      }
    },
    data: function () {
      return {
        schedulePropertiesStyle: {},
      };
    },
    computed: {
      getDataRetrievalSchedule: function () {
        let period = '', selection = '';
        switch (this.schedule['schedule']['period']) {
          case 'just_once':
            period = 'Just Once';
            selection = '';
            break;
          case 'daily':
            period = 'Daily';
            break;
          default:
            period = '';
            break;
        }
        return period + selection;
      },
    },
    mounted: function () {
      let style = {};
      try {
        let heightToSubtract = 173 + this.$refs['scheduleTitle'].getBoundingClientRect()['height'];
        style['max-height'] = `calc(100vh - ${ heightToSubtract }px)`;
      } catch (e) {
        console.log(e);
      }
      this.schedulePropertiesStyle = style;
    },
    methods: {
      closeActiveSchedule: function () {
        this.emitEvent('select-schedule', { 'schedule': null });
      },
      deleteSchedule: function () {
        this.emitEvent('delete-schedule', this.schedule['id']);
      },
      editSchedule: function () {
        this.emitEvent('edit-schedule', this.schedule['id']);
      },
      emitEvent: function (action, payload) {
        this.$emit('event-emitted', action, payload);
      }
    }
  };
</script>

<style scoped>

</style>