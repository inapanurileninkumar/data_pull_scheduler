<template>
  <div
    class="width-100 font-medium"
  >
    <navbar />
    <schedules-manager />
  </div>
</template>

<script>
  import Navbar from '@/components/navbar';
  import SchedulesManager from '@/components/scheduler/SchedulesManager';

  export default {
    name: 'Home',
    components: { SchedulesManager, Navbar }
  };
</script>

<style scoped>

</style>