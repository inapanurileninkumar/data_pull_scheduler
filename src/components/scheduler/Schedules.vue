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
      <div class="flex-col-3 flex-box justify-center align-center">
        <span>
          Last modified
          <i class="fas fa-caret-down" />
        </span>
      </div>
    </div>
    <div
      style="max-height: calc(100vh - 120px);overflow-y: auto;"
    >
      <schedule
        v-for="(schedule,scheduleIndex) in schedules"
        :key="schedule['id']+'_'+scheduleIndex"
        :schedule="schedule"
        class="width-100 mt-5"
      />
    </div>
  </div>
</template>

<script>
  import Schedule from '@/components/scheduler/Schedule';

  export default {
    name: 'Schedules',
    components: { Schedule },
    data: function () {
      return {
        schedules: [
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
          {
            'id': 'abcde',
            'label': 'abcde',
            'data': {
              'cols': 5,
              'rows': 150
            },
            'last_modified': '20 Nov 2021'
          },
        ]
      };
    },
  };
</script>

<style scoped>

</style>