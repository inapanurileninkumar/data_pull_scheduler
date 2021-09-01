<template>
  <div
    class="width-100 ph-5"
  >
    <div
      ref="scheduleTitle"
      class="bg-white p-20 font-medium border-radius-2"
    >
      <div>
        <span
          class="text-bold text-dark"
        >
          Film Actor Activity
        </span>
      </div>
      <div>
        <span
          class="text-dark text-bold"
        >
          Last Update :
        </span>
        <span>
          {{ schedule['last_modified'] || '6 Hours Ago' }}
        </span>
      </div>
      <div
        class="mt-20"
      >
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
    </div>
    <div
      class="mt-30 bg-white ph-20 pt-5 pb-10"
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
          Film Actor Weekly
        </span>
      </div>
      <div>
        <span>
          Created on January 12,2021 by Nuno Moura
        </span>
      </div>
      <div class="bordered mt-10" />
      <div
        class="mt-10"
      >
        <span
          class="text-bold"
        >
          Rows:
        </span>
        <span>
          5,462
        </span>
        <span
          class="ml-10 text-bold"
        >
          Columns:
        </span>
        <span>
          3
        </span>
        <div>
          <span
            class="text-bold"
          >
            Size:
          </span>
          <span>
            328.00 KB
          </span>
        </div>
      </div>
      <div class="bordered mt-10" />
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
            SELECT * FROM "customer"
          </p>
        </div>
      </div>
      <div class="bordered mt-10" />
      <div
        class="mt-10"
      >
        <div class="width-100 flex-box align-flex-start justify-space-between">
          <span
            class="text-bold"
          >
            DATA RETRIEVAL SCHEDULE
          </span>
          <div>
            <span
              class="text-underline"
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
        <div>
          Every Week on Monday
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
            Start February 26,2021 06:35PM
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
            January 13,2021 09:50PM
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
            January 13,2021 09:50PM
          </span>
        </div>
      </div>
      <div class="bordered mt-10" />
      <div
        class="mt-10"
      >
        <div class="width-100 flex-box align-center">
          <span
            class="text-bold"
          >
            SYNC SETTINGS
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ScheduleManager',
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
    mounted: function () {
      let style = {};
      try {
        let heightToSubtract = 180 + this.$refs['scheduleTitle'].getBoundingClientRect()['height'];
        style['max-height'] = `calc(100vh - ${ heightToSubtract }px)`;
      } catch (e) {
        console.log(e);
      }
      this.schedulePropertiesStyle = style;
    },
  };
</script>

<style scoped>

</style>