<template>
  <div
    class="width-100 font-medium"
    style="height: 100vh;max-height: 100vh;"
  >
    <navbar
      class="width-100"
    />
    <div>
      <schedules-manager />
    </div>
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