<template>
  <div
    class="width-100"
  >
    <div
      class="flex-box width-100 pv-10"
      style="max-height: 30px;overflow: hidden"
    >
      <div class="flex-col-1 align-center" />
      <div
        class="flex-col-5 flex-box align-center"
      >
        <span>File name</span>
      </div>
      <div class="flex-col-3 flex-box justify-center align-center">
        <span>
          Cols | Rows
        </span>
      </div>
      <div class="flex-col-3 flex-box align-center">
        <span>
          Last modified
          <i class="fas fa-caret-down" />
        </span>
      </div>
    </div>
    <div
      style="max-height: calc(100vh - 120px);overflow-y: auto;"
      class="ph-10"
    >
      <template
        v-if="schedules.length>0"
      >
        <schedule
          v-for="(schedule,scheduleIndex) in schedules"
          :key="schedule['id']+'_'+scheduleIndex"
          :schedule="schedule"
          class="width-100 mb-5 pointer-cursor"
          @click="selectSchedule(schedule)"
        />
      </template>
      <template
        v-else
      >
        <div
          class="mt-30"
          style="text-align: center"
        >
          <span
            class="font-regular text-muted"
          >
            No Schedules Available.
          </span>
          <div
            class="mt-10 font-medium"
          >
            <span
              class="text-primary text-underline pointer-cursor"
              @click="emitEvent('createSchedule')"
            >
              Click here
            </span>
            <span>
              to create a new schedule
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import Schedule from '@/components/scheduler/Schedule';

  export default {
    name: 'Schedules',
    components: { Schedule },
    props: {
      schedules: {
        type: Array,
        default: () => ([])
      }
    },
    emits: ['event-emitted'],
    data: function () {
      return {};
    },
    methods: {
      selectSchedule: function (schedule) {
        this.emitEvent('select-schedule', {
          'schedule': schedule
        });
      },
      //EVENTS
      emitEvent: function (action, payload) {
        this.$emit('event-emitted', action, payload);
      }
    }
  };
</script>

<style scoped>

</style>