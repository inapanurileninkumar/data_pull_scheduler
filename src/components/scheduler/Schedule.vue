<template>
  <div
    class="schedule flex-box bg-white pv-15 border-radius-2"
    :class="[isActiveSchedule?'bordered-primary-2 bordered-left-primary-4':'']"
  >
    <div class="flex-col-1" />
    <div class="flex-col-5">
      <span>{{ schedule['label'] }}</span>
    </div>
    <div class="flex-col-3 flex-box justify-center">
        <span>
          {{ schedule['data']['cols'] }} | {{ schedule['data']['rows'] }}
        </span>
    </div>
    <div class="flex-col-3 flex-box justify-center">
        <span>
          {{ schedule['last_modified'] }}
        </span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Schedule',
    props: {
      schedule: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      ...mapGetters({
        'getActiveSchedule': 'scheduleStore/getActiveSchedule'
      }),
      isActiveSchedule: function () {
        return this.getActiveSchedule && (this.getActiveSchedule['id'] === this.schedule['id']);
      },
    }
  };
</script>

<style scoped lang="scss">
  .schedule {
  }
</style>