<template>
  <div
    class="flex-box bg-white pv-15"
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
          <i class="fas fa-caret-down" />
        </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Schedule',
    props: {
      schedule: {
        type: Object,
        default: () => ({})
      }
    }
  };
</script>

<style scoped>

</style>