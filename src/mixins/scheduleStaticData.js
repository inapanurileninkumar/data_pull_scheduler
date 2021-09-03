export const scheduleStaticData = {
  data: function () {
    return {
      periodValueOptions: {
        'weekly': [
          {
            'label': 'Mondays',
            'value': 'monday',
          }, {
            'label': 'Tuesdays',
            'value': 'tuesday',
          }, {
            'label': 'Wednesdays',
            'value': 'wednesday',
          }, {
            'label': 'Thursdays',
            'value': 'thursday',
          }, {
            'label': 'Fridays',
            'value': 'friday',
          }, {
            'label': 'Saturdays',
            'value': 'saturday',
          }, {
            'label': 'Sundays',
            'value': 'sunday',
          }],
        'monthly': [...Array(31)].map((_, index) => {
          return {
            'label': index + 1,
            'value': index + 1
          };
        })
      }
    };
  },
  methods: {
    getPeriodValueOptions: function (period) {
      return this.periodValueOptions[period] || [];
    },
  }
};