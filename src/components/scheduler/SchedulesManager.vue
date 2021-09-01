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
        <schedules />
      </div>
      <div
        class="flex-col-6 pv-35"
      >
        <div
          class="width-100"
        >
          <schedule-manager />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Schedules from '@/components/scheduler/Schedules';
  import ScheduleManager from '@/components/scheduler/ScheduleManager';

  export default {
    name: 'SchedulesManager',
    components: { ScheduleManager, Schedules }
  };
</script>

<style scoped>

</style>